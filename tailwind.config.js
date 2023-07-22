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
        "message-sent": "url('public/icons/message-sent.svg')",
      },
      backgroundColor: {
        modal: "rgba(255, 255, 255, 0.7)",
        skills: "rgba(255, 255, 255, 0.9)",
      },
      dropShadow: {
        "white-lg": "0 10px 8px rgba(255, 255, 255, 0.8)",
        "white-around": "0 0px 8px rgba(255, 255, 255, 0.8)",
        "white-around-sm": "0 0px 4px rgba(255, 255, 255, 0.6)",
        "slate-around": "0 0px 8px rgba(201, 201, 201, 0.8)",
        "orand-around": "0 0px 15px rgba(255, 148, 197, 0.8)",
        "blue-around": "0 0px 5px rgba(114, 120, 255, 0.8)",
      },
      animation: {
        typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
        bouncing: "bouncing 0.4s linear",
      },
      keyframes: {
        typing: {
          "0%": {
            width: "0%",
            visibility: "hidden",
          },
          "100%": {
            width: "100%",
          },
        },
        blink: {
          "50%": {
            borderColor: "transparent",
          },
          "100%": {
            borderColor: "white",
          },
        },
        bouncing: {
          "40%": { transform: "scale(1.4)" },
          "60%": { transform: "scale(0.8)" },
          "80%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
      },
    },
  },

  plugins: [require("@tailwindcss/line-clamp")],
};
