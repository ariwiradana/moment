import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dashboard: {
          primary: "#ffbd59",
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
  plugins: [],
};
export default config;
