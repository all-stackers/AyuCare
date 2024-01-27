/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        dark1: "#313131",
        dark2: "#616161",
        dark3: "#919191",
        'purple-light': '#CAB7FF',
        'purple-dark': '#7C4DFF',
      },
      screens: {
        'sm': {'max':'576px'}
      },
      transitionProperty: {
        "height": "height",
        "width": "width"
      }
    }
  },
  plugins: [
    require('flowbite/plugin'),
    require('flowbite/plugin'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
  darkMode: 'class',
}