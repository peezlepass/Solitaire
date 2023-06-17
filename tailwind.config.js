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
        card: "10.53rem",
      },
      height: {
        card: "15.3414rem",
      },
    },
  },
  plugins: [],
};
