import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "tan-pearl": ["TanPearl", "sans-serif"],
        "high-summit": ["HighSummit", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "typing-effect": "pulse 1s linear infinite",
      },
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        typing: {
          "0%": { visibility: "hidden" },
          "100%": { visibility: "visible" },
        },
      },
      colors: {
        dashboard: {
          primary: "#ffbd59",
          secondary: "#0b282c",
          dark: "#212224",
        },
        aakarshana: {
          primary: "#604A32",
          gold: "#B99470",
          "dark-chocolate": "#1e1918",
        },
        samaya: {
          primary: "#D1CAA1",
          dark: "#101010",
        },
        flora: {
          primary: "#E1D7C6",
          dark: "#252015",
        },
        nirvaya: {
          dark: "#101010",
          primary: "#40534C",
        },
        aruna: {
          dark: "#101010",
          background: "#f7f7f2",
          primary: "#886B5B",
        },
        admin: {
          primary: "#3366FF",
          success: "#33B747",
          info: "#548EF9",
          warning: "#FFE23F",
          danger: "#E63946",
          dark: "#333333",
          "hover-dark": "#1A1A1A",
          "light-gray": "#f5f5f5",
          border: "#EAEAEA ",
        },
      },
    },
  },
  plugins: [],
};
export default config;
