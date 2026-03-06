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
        bg: {
          primary: "#14181c",
          secondary: "#1c2228",
          elevated: "#242c36",
          input: "#2c3440",
        },
        accent: {
          green: "#00e054",
          "green-hover": "#00c048",
          orange: "#ff8000",
        },
      },
      fontFamily: {
        display: ["Titillium Web", "sans-serif"],
        body: ["Source Sans 3", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
