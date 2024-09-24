/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {colors: {
      mainPurple: "#4b0097",
      secondPurple: "#8b5cf6",
      mainPurpleHover: "#7b1fa2",
      secondPurpleHover: "#a75de5"
    }},
  },
  plugins: [],
}

