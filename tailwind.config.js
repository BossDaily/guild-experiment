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
    },
  },
  darkMode: "media",
  plugins: [require("flowbite/plugin")],
};
