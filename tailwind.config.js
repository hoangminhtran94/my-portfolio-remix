/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1720px",
        "5xl": "1920px",
      },
      backgroundImage: {
        "main-screen": "url('public/images/background.jpg')",
      },
      backgroundColor: {
        modal: "rgba(255, 255, 255, 0.7)",
      },
      dropShadow: {
        "white-lg": "0 10px 8px rgba(255, 255, 255, 0.8)",
      },
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
