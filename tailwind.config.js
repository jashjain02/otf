/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        clash: ['Clash Display', 'sans-serif'],
      },
      colors: {
        'brand-purple': '#6b58cd',
      },
    },
  },
  plugins: [],
};
