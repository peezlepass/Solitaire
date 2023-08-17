/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "card-back": 'url("./assets/cardback.svg")',
        felt: 'url("./assets/felt.jpg")',
      },
      width: {
        card: "13rem",
      },
      height: {
        card: "18.94rem",
      },
      gridTemplateRows: {
        field: "18.94rem 1fr",
      },
      space: {
        68: "17rem",
        70: "17.5rem",
      },
    },
  },
  plugins: [],
};
