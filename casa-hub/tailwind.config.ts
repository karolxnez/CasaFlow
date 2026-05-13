import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f1f3f5",
        cocoa: "#17181a",
        sage: "#667268",
        coral: "#5f6770",
        honey: "#e6e9ed",
        skysoft: "#727a83",
        lilac: "#7b7680"
      },
      boxShadow: {
        soft: "0 4px 18px rgba(23, 24, 26, 0.06)"
      }
    }
  },
  plugins: []
};

export default config;
