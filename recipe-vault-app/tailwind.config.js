/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.{js,ts,jsx,tsx}',
    './global.css', // Inclure explicitement le fichier CSS global si nécessaire
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};