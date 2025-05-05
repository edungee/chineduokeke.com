import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import tailwindcssTypography from "@tailwindcss/typography"

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Your custom color palettes define the base
        light: {
          background: "#FFFDF6",
          foreground: "#222831",
          card: "#FAF6E9",
          accent1: "#DDEB9D",
          accent2: "#A0C878",
          // Shadcn variables mapped to your theme
          border: "#D1D5DB",
          input: "#E5E7EB",
          ring: "#A0C878", // accent2
          primary: { // Based on accent2
            DEFAULT: "#A0C878",
            foreground: "#222831",
          },
          secondary: { // Based on accent1
            DEFAULT: "#DDEB9D",
            foreground: "#222831",
          },
          muted: { // Based on card
            DEFAULT: "#FAF6E9",
            foreground: "#6B7280", // Muted text
          },
          accent: { // Often for hover/focus, maps to card bg here
             DEFAULT: "#FAF6E9",
             foreground: "#222831",
          },
          popover: { // Match background
             DEFAULT: "#FFFDF6",
             foreground: "#222831",
          },
          // Destructive is separate
          destructive: {
            DEFAULT: "hsl(var(--destructive))", // Keep shadcn default or customize
            foreground: "hsl(var(--destructive-foreground))",
          },
        },
        dark: {
          background: "#222831",
          foreground: "#FFFDF6",
          card: "#393E46",
          accent1: "#948979",
          accent2: "#DFD0B8",
           // Shadcn variables mapped to your theme
          border: "#4B5563",
          input: "#374151",
          ring: "#DFD0B8", // accent2
          primary: { // Based on accent2
            DEFAULT: "#DFD0B8",
            foreground: "#222831",
          },
          secondary: { // Based on accent1
            DEFAULT: "#948979",
            foreground: "#FFFDF6",
          },
          muted: { // Based on card
            DEFAULT: "#393E46",
            foreground: "#D1D5DB", // Muted text
          },
          accent: { // Hover/focus, maps to card bg
             DEFAULT: "#393E46",
             foreground: "#FFFDF6",
          },
           popover: { // Match background
             DEFAULT: "#222831",
             foreground: "#FFFDF6",
          },
          // Destructive is separate
           destructive: {
            DEFAULT: "hsl(var(--destructive))", // Keep shadcn default or customize
            foreground: "hsl(var(--destructive-foreground))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"], // Reference layout variable
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate, tailwindcssTypography],
} satisfies Config

export default config 