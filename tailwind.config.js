/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0a3d62',
          dark: '#083050',
          light: '#1565a8',
        },
      },
    },
  },
  plugins: [],
};
