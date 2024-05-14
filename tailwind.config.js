import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
    // flowbite
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    fontFamily: {
      header: ["Helvetica", "Arial", "sans-serif"],
    },
    colors: {
      "cornflower-blue": {
        50: "#eef3ff",
        100: "#e0e9ff",
        200: "#c6d6ff",
        300: "#a4b9fd",
        400: "#8093f9",
        500: "#5865f2",
        600: "#4445e7",
        700: "#3836cc",
        800: "#2f2fa4",
        900: "#2d2f82",
        950: "#1a1a4c",
      },
      shark: {
        50: "#f6f7f7",
        100: "#e0e5e7",
        200: "#c1cace",
        300: "#9aa7ae",
        400: "#74848d",
        500: "#5a6872",
        600: "#46535b",
        700: "#3b444a",
        800: "#32383d",
        900: "#23272a",
        950: "#161a1d",
      },
    },
  },
  darkMode: "media",
  plugins: [flowbite.plugin(),],
};
