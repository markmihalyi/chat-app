/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#2F80EC",
        "theme-dark": "#2d7be3",
        "theme-darker": "#356ece",
        primary: "#0e1114",
        secondary: "#616C76",
        "secondary-light": "#f8f9fa",
        "light-1": "#f3f4f6",
        "light-2": "#edeef0",
        gray: "#CDD5DE",
        "success-light": "#C6FED0",
        "info-light": "#E8F2FE",
        "warning-light": "#FFEFD4",
        "error-light": "#FFECED",
      },
      fontFamily: {
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
