"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { slug } from "github-slugger";
import { cn } from "@/lib/utils";
import type { Components, ExtraProps } from "react-markdown";

interface MarkdownRendererProps {
  children: string;
  className?: string;
}

const renderHeading = (level: number): React.FC<React.PropsWithChildren<ExtraProps>> => {
  const HeadingComponent: React.FC<React.PropsWithChildren<ExtraProps>> = ({
    children,
    ...props
  }) => {
    const textContent = React.Children.toArray(children)
      .map((child) => (typeof child === "string" ? child : ""))
      .join("");
    const id = slug(textContent);
    const Tag = `h${level}` as React.ElementType;
    return (
      <Tag id={id} {...props}>
        {children}
      </Tag>
    );
  };
  HeadingComponent.displayName = `MarkdownHeading${level}`;
  return HeadingComponent;
};

export function MarkdownRenderer({ children, className }: MarkdownRendererProps) {
  const customComponents: Components = {
    h2: renderHeading(2),
    h3: renderHeading(3),
    h4: renderHeading(4),
    a: ({ ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
  };

  return (
    <div
      className={cn(
        "max-w-none",
        // Headings
        "[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:scroll-mt-20",
        "[&_h3]:text-xl [&_h3]:font-medium [&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:text-muted-foreground [&_h3]:scroll-mt-20",
        "[&_h4]:text-lg [&_h4]:font-medium [&_h4]:mt-4 [&_h4]:mb-2 [&_h4]:scroll-mt-20",
        // Paragraphs and lists
        "[&_p]:my-4 [&_p]:text-foreground/90 [&_p]:leading-relaxed",
        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-1",
        "[&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-1",
        "[&_li]:text-foreground/90",
        // Links
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:opacity-80",
        // Inline and block
        "[&_strong]:font-semibold",
        "[&_blockquote]:border-l-4 [&_blockquote]:border-muted-foreground/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:my-4 [&_blockquote]:text-foreground/90",
        "[&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm",
        "[&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm",
        "[&_hr]:my-8 [&_hr]:border-border",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={customComponents}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
