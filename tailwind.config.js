/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
  ],
  theme: {
    extend: {
      colors: {
        "dodgeroll-gold": "#e83240",
        "dodgeroll-gold-darker": "#c42a36",
        "apple-green": "#046E1B",
        "dire-wolf": "#292727",
        "cream": "#f1f1f1",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
      },
      container: {
        center: true,
        padding: "2rem",
      },
    },
  },
  plugins: [],
};
