/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx,css}'],
  theme: {
    extend: {
      colors: {
        'pokedex-red': '#DC0A2D',
        'pokedex-background': '#EFEFEF',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
