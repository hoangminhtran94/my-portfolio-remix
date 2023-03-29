/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "main-screen": "url('public/images/background.jpg')",
      },
      backgroundColor: {
        modal: "rgba(255, 255, 255, 0.7)",
      },
    },
  },

  plugins: [],
};
