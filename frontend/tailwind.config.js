/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
        Lexend: ['Lexend', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
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
    require('flowbite/plugin')
  ],
  darkMode: 'class',
}