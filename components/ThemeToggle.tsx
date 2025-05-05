"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react" // Using lucide-react included by shadcn
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  const currentEffectiveTheme = theme === "system" ? resolvedTheme : theme;

  const toggleTheme = () => {
    setTheme(currentEffectiveTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {currentEffectiveTheme === 'dark' ? (
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
          <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 