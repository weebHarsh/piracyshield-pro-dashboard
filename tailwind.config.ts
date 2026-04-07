import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
        primary: {
          teal: "#0f766e",
          "teal-light": "#14b8a6",
          "teal-lighter": "#5eead4",
          "teal-dark": "#0d5e56",
          "teal-darker": "#134e4a",
        },
        secondary: {
          slate: "#475569",
          "slate-light": "#64748b",
          "slate-dark": "#334155",
        },
        accent: {
          amber: "#f59e0b",
          rose: "#e11d48",
          emerald: "#10b981",
        },
        status: {
          critical: "#dc2626",
          high: "#ea580c",
          medium: "#d97706",
          low: "#65a30d",
          resolved: "#16a34a",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
        account: {
          free: "#6b7280",
          pro: "#0f766e",
          enterprise: "#134e4a",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        heading: ["Poppins", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      fontSize: {
        h1: ["3.75rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h2: ["2.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h3: ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h4: ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h5: ["1.125rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        h6: ["1rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
      },
      spacing: {
        0: "0",
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
      },
      borderRadius: {
        sm: "0.25rem",
        md: "0.5rem",
        lg: "0.75rem",
        xl: "1rem",
        "2xl": "1.5rem",
        full: "9999px",
      },
      backgroundImage: {
        "teal-primary": "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
        "teal-soft": "linear-gradient(135deg, #14b8a6 0%, #5eead4 100%)",
        "teal-dark": "linear-gradient(135deg, #134e4a 0%, #0f766e 100%)",
        hero: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #ffffff 100%)",
      },
    },
  },
  plugins: [],
};

export default config;