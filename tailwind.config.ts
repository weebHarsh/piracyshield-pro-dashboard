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
        // Semantic tokens — map to CSS vars set in globals.css
        bg:       "var(--bg)",
        surface:  "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        border:   "var(--border)",
        "border-strong": "var(--border-strong)",
        text:     "var(--text)",
        "text-muted":   "var(--text-muted)",
        "text-subtle":  "var(--text-subtle)",
        brand:    "var(--brand)",
        "brand-strong": "var(--brand-strong)",
        "brand-soft":   "var(--brand-soft)",
        // Status — canonical five-tier palette
        status: {
          critical: "var(--status-critical)",
          high:     "var(--status-high)",
          medium:   "var(--status-medium)",
          low:      "var(--status-low)",
          info:     "var(--status-info)",
        },
      },
      fontFamily: {
        sans:    ["PP Neue Montreal", "system-ui", "-apple-system", "sans-serif"],
        display: ["PP Editorial New", "PP Neue Montreal", "system-ui", "sans-serif"],
        mono:    ["PP Fraktion Mono", "ui-monospace", "Cascadia Code", "monospace"],
      },
      fontSize: {
        // Dashboard fixed-rem scale
        "3xl": ["1.875rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "2xl": ["1.5rem",   { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        xl:    ["1.25rem",  { lineHeight: "1.3",  letterSpacing: "-0.015em" }],
        lg:    ["1.0625rem",{ lineHeight: "1.4",  letterSpacing: "-0.01em" }],
        md:    ["0.9375rem",{ lineHeight: "1.55", letterSpacing: "-0.005em" }],
        sm:    ["0.8125rem",{ lineHeight: "1.5",  letterSpacing: "0" }],
        xs:    ["0.75rem",  { lineHeight: "1.5",  letterSpacing: "0" }],
      },
      spacing: {
        // 4pt base scale
        0:  "0",
        1:  "0.25rem",  //  4px
        1.5:"0.375rem", //  6px
        2:  "0.5rem",   //  8px
        3:  "0.75rem",  // 12px
        4:  "1rem",     // 16px
        5:  "1.25rem",  // 20px
        6:  "1.5rem",   // 24px
        8:  "2rem",     // 32px
        10: "2.5rem",   // 40px
        12: "3rem",     // 48px
        16: "4rem",     // 64px
        20: "5rem",     // 80px
        24: "6rem",     // 96px
      },
      borderRadius: {
        sm:  "0.1875rem", //  3px
        md:  "0.375rem",  //  6px
        lg:  "0.5rem",    //  8px
        xl:  "0.75rem",   // 12px
        "2xl": "1rem",    // 16px
        full: "9999px",
      },
      transitionTimingFunction: {
        "out-strong":    "cubic-bezier(0.23, 1, 0.32, 1)",
        "out-quart":     "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-strong": "cubic-bezier(0.77, 0, 0.175, 1)",
        "drawer":        "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      transitionDuration: {
        "press":   "160ms",
        "ui-fast": "150ms",
        "ui":      "200ms",
        "enter":   "320ms",
        "landing": "480ms",
      },
    },
  },
  plugins: [],
};

export default config;
