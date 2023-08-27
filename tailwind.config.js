/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      phone: {
        max: "1024px",
      },
    },
    extend: {
      backgroundImage: {
        "card-back": 'url("./assets/cardback.svg")',
        felt: 'url("./assets/felt.jpg")',
      },
      width: {
        card: "13rem",
        "card-mobile": "5.2rem",
      },
      height: {
        card: "18.94rem",
        "card-mobile": "7.576rem",
      },
      gridTemplateRows: {
        field: "18.94rem 1fr",
        "field-mobile": "7.576rem 1fr",
      },
      space: {
        68: "17rem",
        70: "17.5rem",
      },
    },
  },
  plugins: [],
};
