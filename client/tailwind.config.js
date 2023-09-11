/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'dark-gray':'#A4A4A4',
        'light-gray':'#BDBDBD',
        'light-purple':'#E8D3E7',
        'dark-purple':'#8A2387'
      },
    }
  },
  plugins: [],
}

