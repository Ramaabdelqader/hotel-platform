/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors :{
      myColor: "#0cb6b6ff",
      hoverColor:"#436767ff"
    }
  },
  },
  plugins: [],
}
