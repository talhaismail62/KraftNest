import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: "#00e5ff",
        },
        bg: {
          DEFAULT: "#050505",
          2: "#0a0a0a",
          3: "#101010",
        },
        ink: "#f0f0f0",
        muted: "#555",
        subtle: "#333",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
      keyframes: {
        blink: {
          "0%,100%": { opacity: "1", boxShadow: "0 0 6px #00e5ff" },
          "50%": { opacity: "0.3", boxShadow: "none" },
        },
        tick: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
        tick: "tick 28s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
