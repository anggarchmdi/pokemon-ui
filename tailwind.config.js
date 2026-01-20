/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
       rotobo: ["Roboto", 'sans-serif'],
       montserrat: ["montserrat", 'sans-serif'],
       poppins: ["Poppins", 'sans-serif'],
      }
    },
  },
  plugins: [],
}