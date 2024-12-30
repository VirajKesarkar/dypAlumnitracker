/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        playfair : "'Playfair Display',serif",
        leto : "'Leto',sans-serif",
      }
    },
  },
  plugins: [],
}