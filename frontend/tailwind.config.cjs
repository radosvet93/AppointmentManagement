const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      primary: colors.orange[500],
      secondary: colors.gray[100],
      danger: colors.red[500],
      success: colors.green[500],
    },
  },
  plugins: [],
};
