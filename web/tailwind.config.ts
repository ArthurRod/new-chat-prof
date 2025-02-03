import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        primaryDark: "var(--primary-dark)",
        secondary: "var(--secondary)",
        neutralLight: "var(--neutral-light)",
      },
    },
  },
  plugins: [],
} satisfies Config;
