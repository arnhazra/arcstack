import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        progress: {
          "0%": { transform: "translateX(0) scaleX(0)" },
          "40%": { transform: "translateX(0) scaleX(0.4)" },
          "100%": { transform: "translateX(100%) scaleX(0.5)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        progress: "progress 1s infinite linear",
      },
      colors: {
        main: "#121212",
        background: "#18181b",
        border: "#27272a",
        lightborder: "#3f3f46",
        primary: "#1db954",
        secondary: "#ff2056",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
