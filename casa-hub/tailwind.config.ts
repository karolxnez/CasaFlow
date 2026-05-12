import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cream: "#f7f2ec",
        cocoa: "#312824",
        sage: "#8d9b8a",
        coral: "#a98473",
        honey: "#d8c4a8",
        skysoft: "#97a9aa",
        lilac: "#b7a9bd"
      },
      boxShadow: {
        soft: "0 18px 50px rgba(63, 51, 45, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
