import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";

const Header = () => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
        {/* Left Side: Mobile Nav Trigger + Logo/Name */}
        <div className="flex items-center flex-1 md:flex-none">
            <MobileNav /> 
            {/* Optional: Add SVG logo here if desired */}
            <Link href="/" className="ml-2 md:ml-0 flex items-center space-x-2">
                {/* <span className="font-bold sm:inline-block text-lg">Chinedu Okeke</span> */}
            </Link>
        </div>

        {/* Desktop Navigation - Centered, styled like reference */}
        <nav className="hidden flex-1 justify-center items-center space-x-3 text-sm font-medium md:flex">
          {/* Use text-light-accent2 / dark:text-dark-accent2 for link color */}
          <Link href="/" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Home</Link>
          
          <span className="h-4 w-px bg-border/50" aria-hidden="true"></span>{/* Separator */}
          
          <Link href="/speaking" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Speaking</Link>
          
          <span className="h-4 w-px bg-border/50" aria-hidden="true"></span>{/* Separator */}

          <a href="YOUR_YOUTUBE_LINK" target="_blank" rel="noopener noreferrer" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">YouTube</a>
          
          <span className="h-4 w-px bg-border/50" aria-hidden="true"></span>{/* Separator */}

          <Link href="/blogs" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Blogs</Link>
        </nav>

        {/* Right Side: Theme Toggle */}
        <div className="flex flex-1 items-center justify-end md:flex-none">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header; 