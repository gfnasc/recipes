/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts}"],
  theme: {
    extend: {
      colors: {        
        "dodgeroll-gold": "#e83240",
        "apple-green": "#046E1B",
        "dire-wolf": "#292727",
        "cream": "#f1f1f1",
      },
      fontFamily: {
        "Montserrat": ["Montserrat", "sans-serif"]
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
}

