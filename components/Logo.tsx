import React from "react";
import { cn } from "@/lib/utils";

/**
 * Two overlapping circles for C and O — an open ring and a solid disc, offset
 * on a diagonal. Geometry is taken from the design's 56px lockup: both circles
 * are 36px on a 56px square, so they overlap by 16px.
 *
 * The ring's 4px border sits inside its 36px box, so the stroke spans radius
 * 14–18. SVG centres a stroke on its path, hence r=16 with strokeWidth=4.
 *
 * Everything is currentColor: the mark is monochrome by design, so it inherits
 * the surrounding text colour and flips with the theme on its own.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={className}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="18" cy="18" r="16" stroke="currentColor" strokeWidth="4" />
      <circle cx="38" cy="38" r="18" fill="currentColor" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  /** Hide the name and show the mark alone — used where space is tight. */
  markOnly?: boolean;
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      {!markOnly && (
        <span className="text-base font-semibold tracking-tight">
          Chinedu Okeke
        </span>
      )}
    </span>
  );
}
