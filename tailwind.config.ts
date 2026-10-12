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
        navy: {
          900: "#0A1827",
          DEFAULT: "#10243A",
          light: "#183654",
        },
        ivory: {
          DEFAULT: "#F7F3EA",
          light: "#FCFAF6",
          dark: "#EFE9DC",
        },
        gold: {
          DEFAULT: "#B99A5B",
          light: "#CDB278",
          dark: "#9D8045",
        },
        text: {
          primary: "#202936",
          secondary: "#596579",
          muted: "#7A8799",
        },
        border: {
          subtle: "#E5E0D7",
          dark: "#2A3B4F",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(16, 36, 58, 0.05), 0 1px 2px -1px rgba(16, 36, 58, 0.05)",
        card: "0 4px 6px -1px rgba(16, 36, 58, 0.07), 0 2px 4px -2px rgba(16, 36, 58, 0.07)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
  ],
};

export default config;
