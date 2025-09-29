/** @type {import('tailwindcss').Config} */
module.exports = {
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
        switzer100: ["SwitzerThin", "sans-serif"],
        switzer100italic: ["SwitzerThinItalic", "sans-serif"],
        switzer200: ["SwitzerExtralight", "sans-serif"],
        switzer200italic: ["SwitzerExtralightItalic", "sans-serif"],
        switzer300: ["SwitzerLight", "sans-serif"],
        switzer300italic: ["SwitzerLightItalic", "sans-serif"],
        switzer400: ["SwitzerRegular", "sans-serif"],
        switzer400italic: ["SwitzerItalic", "sans-serif"],
        switzer500: ["SwitzerMedium", "sans-serif"],
        switzer500italic: ["SwitzerMediumItalic", "sans-serif"],
        switzer600: ["SwitzerSemibold", "sans-serif"],
        switzer600italic: ["SwitzerSemiboldItalic", "sans-serif"],
        switzer700: ["SwitzerBold", "sans-serif"],
        switzer700italic: ["SwitzerBoldItalic", "sans-serif"],
        switzer800: ["SwitzerExtrabold", "sans-serif"],
        switzer800italic: ["SwitzerExtraboldItalic", "sans-serif"],
        switzer900: ["SwitzerBlack", "sans-serif"],
        switzer900italic: ["SwitzerBlackItalic", "sans-serif"],
        switzervariable: ["SwitzerVariable", "sans-serif"],
        switzervariableitalic: ["SwitzerVariableItalic", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      spacing: {
        '25': '6.25rem', // 100px
        '30': '7.5rem',  // 120px
      },
    },
  },
  plugins: [],
}