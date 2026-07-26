/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        /* ------------------------------------------------------------------
         * Brand
         * ------------------------------------------------------------------ */

        primary: "#00C787",
        "primary-hover": "#00B97C",
        "primary-active": "#009E69",
        "primary-foreground": "#FFFFFF",

        secondary: "#16A34A",
        "secondary-foreground": "#FFFFFF",

        accent: "#34D399",
        "accent-foreground": "#052E22",

        /* ------------------------------------------------------------------
         * Background
         * ------------------------------------------------------------------ */

        background: "#F8FAFC",
        foreground: "#0F172A",

        card: "#FFFFFF",
        "card-foreground": "#111827",

        surface: "#FFFFFF",
        "surface-secondary": "#F8FAFC",
        "surface-tertiary": "#EEF2F3",

        popover: "#FFFFFF",
        "popover-foreground": "#111827",

        /* ------------------------------------------------------------------
         * Dark UI
         * ------------------------------------------------------------------ */

        dark: "#0F172A",
        "dark-secondary": "#111827",
        "dark-tertiary": "#1E293B",
        "dark-border": "#334155",

        /* ------------------------------------------------------------------
         * Borders
         * ------------------------------------------------------------------ */

        border: "#E2E8F0",
        input: "#D8E2E5",
        ring: "#00C787",

        /* ------------------------------------------------------------------
         * Text
         * ------------------------------------------------------------------ */

        muted: "#F1F5F9",
        "muted-foreground": "#64748B",

        /* ------------------------------------------------------------------
         * Status
         * ------------------------------------------------------------------ */

        success: "#22C55E",
        warning: "#F59E0B",
        destructive: "#EF4444",
        info: "#2563EB",

        /* ------------------------------------------------------------------
         * Platform
         * ------------------------------------------------------------------ */

        verified: "#00C787",
        "pro-circle": "#8B5CF6",
        premium: "#FBBF24",

        /* ------------------------------------------------------------------
         * Features
         * ------------------------------------------------------------------ */

        marketplace: "#10B981",
        ai: "#3B82F6",
        rating: "#F59E0B",

        /* ------------------------------------------------------------------
         * Opacity Helpers
         * ------------------------------------------------------------------ */

        "primary-10": "rgba(0,199,135,0.10)",
        "primary-20": "rgba(0,199,135,0.20)",
        "primary-30": "rgba(0,199,135,0.30)",

        "marketplace-10": "rgba(16,185,129,0.10)",
        "marketplace-20": "rgba(16,185,129,0.20)",

        "ai-10": "rgba(59,130,246,0.10)",
        "ai-20": "rgba(59,130,246,0.20)",

        "success-10": "rgba(34,197,94,0.10)",
        "warning-10": "rgba(245,158,11,0.10)",
        "destructive-10": "rgba(239,68,68,0.10)",
      },

      borderRadius: {
        xs: "6px",
        sm: "10px",
        DEFAULT: "14px",
        lg: "18px",
        xl: "24px",
        "2xl": "30px",
        full: "9999px",
      },

      fontFamily: {
        display: ["Spline Sans", "Inter", "sans-serif"],
        rounded: ["SF Pro Rounded", "Inter", "sans-serif"],
        mono: ["SFMono-Regular", "monospace"],
        serif: ["Georgia", "serif"],
      },

      boxShadow: {
        xs: "0 1px 2px rgba(15,23,42,0.05)",
        sm: "0 4px 8px rgba(15,23,42,0.06)",
        DEFAULT: "0 10px 24px rgba(15,23,42,0.08)",
        lg: "0 18px 40px rgba(15,23,42,0.12)",
      },
    },
  },

  plugins: [],
};