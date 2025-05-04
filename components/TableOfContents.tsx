"use client";

import React from 'react';
import { TocHeading } from '@/lib/projects'; // Import the heading type
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: TocHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  // Removed useState for activeSlug

  // TODO: Implement active heading highlighting based on scroll position
  // This usually involves adding scroll event listeners and checking
  // which section is currently in the viewport.
  // For simplicity, we'll omit active highlighting for now.

  if (!headings || headings.length === 0) {
    return null; // Don't render if no headings
  }

  return (
    <nav className="space-y-2 text-sm" aria-label="Table of contents">
      <p className="font-medium">On This Page</p>
      <ul className="space-y-1">
        {headings.map((heading) => (
          <li key={heading.slug} className={cn(
            "ml-" + (heading.level - 2) * 4 // Indent based on level (h2=0, h3=4)
          )}>
            <a 
              href={`#${heading.slug}`}
              className={cn(
                "inline-block text-muted-foreground hover:text-foreground transition-colors",
                // Add active state styling later if implemented
                // activeSlug === heading.slug ? "text-primary font-medium" : ""
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 