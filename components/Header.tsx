import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileNav } from "@/components/MobileNav";
import { Logo } from "@/components/Logo";

const Header = () => {
  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    )}>
      <div className="container flex h-14 max-w-screen-2xl items-center mx-auto px-4">
        {/* Left Side: Mobile Nav Trigger + Logo/Name */}
        <div className="flex items-center flex-1 md:flex-none">
            <MobileNav />
            <Link
              href="/"
              aria-label="Chinedu Okeke — home"
              className="ml-2 md:ml-0 flex items-center transition-opacity hover:opacity-80"
            >
                {/* Mark only: the name was deliberately removed from the header
                    in 8427528, and a wordmark here widens the left column
                    enough to push the centred nav off-centre. */}
                <Logo markOnly />
            </Link>
        </div>

        {/* Desktop Navigation - Centered, styled like reference */}
        <nav className="hidden flex-1 justify-center items-center space-x-3 text-sm font-medium md:flex">
          {/* Use text-light-accent2 / dark:text-dark-accent2 for link color */}
          <Link href="/" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Home</Link>
          
          <span className="h-4 w-px bg-border/50" aria-hidden="true"></span>{/* Separator */}
          
          <Link href="/speaking" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Speaking</Link>
          
          <span className="h-4 w-px bg-border/50" aria-hidden="true"></span>{/* Separator */}

          <a href="https://www.youtube.com/@edunge" target="_blank" rel="noopener noreferrer" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">YouTube</a>
          
          {/* <span className="h-4 w-px bg-border/50" aria-hidden="true"></span> */}{/* Separator */}

          <Link href="/writing" className="transition-colors text-light-accent2 dark:text-dark-accent2 hover:text-foreground/80">Writing</Link>
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