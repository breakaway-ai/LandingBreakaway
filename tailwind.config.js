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
        background: '#0B0815',
        'blue-dark': '#2A1D3F',
        blue: '#9d71e8',
        'blue-light': '#be99ff',
        cream: '#f2f7ff',
        'cream-highlight': '#b2c9ff',
        text: '#f2f7ff',
        'text-highlight': '#9d71e8',
        'card-bg': '#e6eeff',
        'section-alt': '#c9dcff',
        gray: '#b2c9ff',
        'text-secondary': '#9d71e8',
        border: 'rgba(190, 153, 255, 0.4)'
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 15px rgba(0, 0, 0, 0.4), 0 0 10px rgba(138, 79, 255, 0.2)',
        'lg': '0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(138, 79, 255, 0.3)',
        'xl': '0 15px 35px rgba(0, 0, 0, 0.5), 0 0 30px rgba(138, 79, 255, 0.4)',
        'glow': '0 0 15px rgba(138, 79, 255, 0.5)',
        'glow-hover': '0 0 20px rgba(138, 79, 255, 0.8)',
      },
      textShadow: {
        'sm': '0 0 5px rgba(0, 0, 0, 0.3)',
        'md': '0 0 10px rgba(0, 0, 0, 0.5)',
        'lg': '0 0 15px rgba(0, 0, 0, 0.7)',
        'glow': '0 0 10px rgba(138, 79, 255, 0.6)',
        'highlight': '0 0 15px rgba(255, 255, 255, 0.5)',
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