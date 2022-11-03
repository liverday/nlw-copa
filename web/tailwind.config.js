/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.tsx',
    './pages/**/*.tsx',
    './components/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: "Roboto, sans-serif",

      backgroundImage: {
        app: 'url(/assets/app-bg.png)'
      },

      colors: {
        ignite: {
          500: '#129E57'
        },
        gray: {
          100: '#E1E1E6',
          300: '#8D8D99',
          600: '#323238',
          800: '#202024',
          900: "#121214"
        },
        yellow: {
          500: '#F7DD43',
          700: '#E5Cd3D'
        }
      }
    },
  },
  plugins: [],
}
