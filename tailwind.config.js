/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        pink: "#F8F5F0",
        brown: "#201F23",
        green: "#0f7d1b",
      },
    },
  },
  plugins: [],
};
