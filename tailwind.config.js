/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF4E6',
        leaf: '#2F6B3B',
        moss: '#567D46',
        earth: '#8C6844',
        soft: '#F3EBD8',
      },
      boxShadow: {
        card: '0 18px 36px rgba(47, 107, 59, 0.10)',
      },
    },
  },
  plugins: [],
};
