/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    padding: {
      main_mobile: "4rem",
    },
    extend: {
      colors: {
        pink_main: "#A3DDE4",
        pink_light: "#A3DDE4",
        green_main: "#15CC48",
        red_main: "#FF4040",
      },
    },
  },
  plugins: [],
};

// lg: pc
// md: tablet/screen pc small
// sm: smaller md
// none: mobile
