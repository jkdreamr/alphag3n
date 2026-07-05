import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#050609",
          900: "#080a12",
          850: "#0b0e18",
          800: "#0f131f",
          700: "#161b2b",
        },
        electric: {
          DEFAULT: "#3b82f6",
          bright: "#38bdf8",
          cyan: "#22d3ee",
        },
        violet: {
          brand: "#7c3aed",
          fuchsia: "#c026d3",
        },
        ember: {
          DEFAULT: "#f59e0b",
          hot: "#f97316",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        shell: "1200px",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(59,130,246,0.5)",
        "glow-violet": "0 0 50px -10px rgba(124,58,237,0.55)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "marquee-rev": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--marquee-duration,40s) linear infinite",
        "marquee-rev": "marquee-rev var(--marquee-duration,40s) linear infinite",
        "spin-slow": "spin-slow 26s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
