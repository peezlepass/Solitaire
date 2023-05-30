/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'card-back': 'url("./assets/cardback.svg")'
      },
      width: {
        card: '13rem'
      },
      height: {
        card: '18.94rem'
      }
    },
  },
  plugins: [],
}