import React from 'react';
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("border-t border-border/40 py-6 md:py-8")}>
      <div className="container mx-auto px-4 flex items-center justify-center md:h-16">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          &copy; {currentYear} Chinedu Okeke. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer; 