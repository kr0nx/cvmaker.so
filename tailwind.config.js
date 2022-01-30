const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'pink-lavender': '#cdb4dbff',
        'orchid-pink': '#ffc8ddff',
        'nadeshiko-pink': '#ffafccff',
        'uranian-blue': '#bde0feff',
        'baby-blue-eyes': '#a2d2ffff'
      }
    }
  },
  plugins: []
}
