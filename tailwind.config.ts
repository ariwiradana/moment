import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        theme1: {
          primary: "#604A32",
          gold: "#B99470",
          "dark-chocolate": "#1e1918",
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
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".scrollbar-hide": {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      });
    },
  ],
};
export default config;
