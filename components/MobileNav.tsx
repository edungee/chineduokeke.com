"use client"

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Icons for menu button
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose, // Import SheetClose
} from "@/components/ui/sheet";

// Define navigation items type (optional but good practice)
interface NavItem {
  href: string;
  title: string;
  external?: boolean;
}

const navItems: NavItem[] = [
  { href: "/", title: "Home" },
  { href: "/speaking", title: "Speaking" },
  { href: "YOUR_YOUTUBE_LINK", title: "YouTube", external: true }, // Replace link
  { href: "/blogs", title: "Blogs" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">{/* Only show on mobile */}
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader className="border-b pb-4 mb-4">
          <SheetTitle>
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center">
               <span className="font-bold text-lg">Chinedu Okeke</span>
            </Link>
          </SheetTitle>
            {/* Optional: Add SheetDescription if needed */}
            {/* Explicit close button inside header (alternative to SheetClose wrapper) */}
           <SheetClose asChild className="absolute right-4 top-4">
              <Button variant="ghost" size="icon">
                <X className="h-5 w-5" />
                <span className="sr-only">Close</span>
              </Button>
           </SheetClose>
        </SheetHeader>
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </a>
            ) : (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.title}
              </Link>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
} 