import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nohemi300: ["NohemiLight", "sans-serif"],
        nohemi200: ["NohemiExtraLight", "sans-serif"],
        nohemi400: ["NohemiRegular", "sans-serif"],
        nohemi500: ["NohemiBold", "sans-serif"],
        nohemi600: ["NohemiExtraBold", "sans-serif"],
        instrument: ["Instrument Serif", "serif"],
        switzer300: ["SwitzerLight", "sans-serif"],
        switzer400: ["SwitzerRegular", "sans-serif"],
        switzer500: ["SwitzerMedium", "sans-serif"],
        switzer600: ["SwitzerSemibold", "sans-serif"],
        switzer700: ["SwitzerBold", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
