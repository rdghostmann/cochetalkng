/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
  extend: {
    colors: {
      primary: "#00EBBA",
      secondary: "#00BFA5",
      accent: "#50FFDC",

      background: "#F7FAFA",
      foreground: "#1C1B1F",

      surface: "#FFFFFF",
      card: "#FFFFFF",

      muted: "#EEF4F3",

      border: "#DCE8E5",

      success: "#10B981",
      warning: "#F59E0B",
      destructive: "#EF4444",

      verified: "#00EBBA",
      pro: "#A78BFA",
    },

    borderRadius: {
      DEFAULT: "10px",
      lg: "10px",
      xl: "14px",
      "2xl": "18px",
    },

    fontFamily: {
      display: ["Spline Sans", "Inter", "sans-serif"],
      rounded: ["SF Pro Rounded", "sans-serif"],
      mono: ["SFMono-Regular", "monospace"],
      serif: ["Georgia", "serif"],
    },
  },
},
  plugins: [],
}