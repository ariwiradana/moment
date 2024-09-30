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
        theme1: {
          primary: "#604A32",
          gold: "#ba9e69",
          "dark-chocolate": "#1e1918",
        },
      },
    },
  },
  plugins: [],
};
export default config;
