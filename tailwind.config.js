/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        /* Brand */

        primary: "#00EBBA",
        "primary-hover": "#00D8AB",
        "primary-active": "#00C39A",
        "primary-foreground": "#03120E",

        secondary: "#13C6B3",
        "secondary-foreground": "#05231C",

        accent: "#65F8DA",
        "accent-foreground": "#03261D",

        /* Background */

        background: "#F6F8F9",
        foreground: "#101828",

        card: "#FFFFFF",
        "card-foreground": "#111827",

        surface: "#FFFFFF",
        "surface-secondary": "#F8FAFB",
        "surface-tertiary": "#EEF2F3",

        /* Dark */

        dark: "#0B1117",
        "dark-secondary": "#131B23",
        "dark-border": "#25303B",

        /* Border */

        border: "#E4EAEC",
        input: "#D8E2E5",

        /* Text */

        muted: "#F1F5F6",
        "muted-foreground": "#667085",

        /* Status */

        success: "#16A34A",
        warning: "#F59E0B",
        destructive: "#EF4444",

        /* Platform */

        verified: "#00EBBA",
        "pro-circle": "#8B5CF6",
        premium: "#FBBF24",

        /* Features */

        marketplace: "#10B981",
        ai: "#3B82F6",
      },

      borderRadius: {
        sm: "8px",
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "30px",
      },

      fontFamily: {
        display: ["Spline Sans"],
        rounded: ["SF Pro Rounded"],
        mono: ["SFMono-Regular"],
        serif: ["Georgia"],
      },
    },
  },

  plugins: [],
};