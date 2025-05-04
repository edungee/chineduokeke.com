import React from 'react';
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border/40 py-6 md:py-8")}>
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {currentYear} Chinedu Okeke. All rights reserved.
        </p>
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-right">
          Built with <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Next.js</a> and <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">Tailwind CSS</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 