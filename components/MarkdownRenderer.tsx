"use client"; // Needs to be client for react-markdown

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { slug } from 'github-slugger'; // Import slugger
import { cn } from '@/lib/utils';
import type { Components, ExtraProps } from 'react-markdown'; // Import ExtraProps too

interface MarkdownRendererProps {
  children: string; // Expects markdown string as children
  className?: string; // Class for the wrapper div
}

// Custom heading renderer function - Use React.ElementType
const renderHeading = (level: number): React.FC<React.PropsWithChildren<ExtraProps>> => {
  // We can ignore the node prop if not needed by using ({ children, ...props }) instead of ({ node, children, ...props })
  const HeadingComponent: React.FC<React.PropsWithChildren<ExtraProps>> = ({ children, ...props }) => {
    const textContent = React.Children.toArray(children)
      .map(child => (typeof child === 'string' ? child : ''))
      .join('');
    const id = slug(textContent); 
    const Tag = `h${level}` as React.ElementType; // Cast to React.ElementType
    return <Tag id={id} {...props}>{children}</Tag>;
  };
  HeadingComponent.displayName = `MarkdownHeading${level}`; // Add display name
  return HeadingComponent;
};

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  // Define custom components for h2 and h3
  const customComponents: Components = {
    h2: renderHeading(2),
    h3: renderHeading(3),
    // Add other custom components like links if needed
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />, 
  };

  return (
    // Apply prose classes to a wrapper div
    <div className={cn(
        "prose dark:prose-invert", 
        "prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80",
        "prose-h3:text-xl prose-h3:font-medium prose-h3:text-muted-foreground",
        "prose-p:text-foreground/90 prose-li:text-foreground/90", 
        "max-w-none", 
        className 
        )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Enable GitHub Flavored Markdown
        components={customComponents} // Pass custom components
        // You can add custom components here later if needed (e.g., for images, links)
        // components={{ 
        //   // Example: customize links
        //   // a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
        // }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
} 