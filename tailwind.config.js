/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#FAF7EF',
        primary: '#1F5B42',
        accent: '#DE7C2D',
        ink: '#1D2B20',
        mist: '#EFF2E6',
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        sans: ['Trebuchet MS', 'Verdana', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 40px rgba(31, 91, 66, 0.12)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(222,124,45,0.24), transparent 30%), radial-gradient(circle at top right, rgba(31,91,66,0.18), transparent 28%), linear-gradient(135deg, #f7f1e1 0%, #faf7ef 40%, #eef2e8 100%)',
      },
    },
  },
  plugins: [],
};
