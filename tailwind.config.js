/** @type {import('tailwindcss').Config} */
import textShadow from './src/tailwind-plugins/text-shadow.js';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#2A1B3D',
        'blue-dark': '#3D2C5F',
        blue: '#6A319B',
        'blue-light': '#AC4BA3',
        cream: '#F5F0FF',
        'cream-highlight': '#E8A5D9',
        text: '#F5F0FF',
        'text-highlight': '#AC4BA3',
        'card-bg': '#F8F3FF',
        'section-alt': '#EDE3FF',
        gray: '#C169B5',
        'text-secondary': '#8B3E9F',
        border: 'rgba(172, 75, 163, 0.4)'
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(172, 75, 163, 0.2)',
        'lg': '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(172, 75, 163, 0.3)',
        'xl': '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(172, 75, 163, 0.4)',
        'glow': '0 0 15px rgba(172, 75, 163, 0.5)',
        'glow-hover': '0 0 20px rgba(172, 75, 163, 0.8)',
      },
      textShadow: {
        'sm': '0 0 5px rgba(0, 0, 0, 0.3)',
        'md': '0 0 10px rgba(0, 0, 0, 0.5)',
        'lg': '0 0 15px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 10px rgba(172, 75, 163, 0.6)',
        'highlight': '0 0 15px rgba(232, 165, 217, 0.5)',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      screens: {
        'md': {'max': '768px'},
        'sm': {'max': '640px'},
      },
    },
  },
  plugins: [textShadow],
} 