/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkBg: "#20212c",
        darkTiles: "#2b2c37",
        darkModeTitle: "#ffffff",
        subtextColor: "#828fa3",
        lightBg: "#f4f7fd",
        lightTiles: "#ffffff",
        lightModeTitle: "#000",
        purple: "#635fc7",
        red: "#ea5555",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0, 1, 0, 1)",
      },
    },
  },
  plugins: [],
};
