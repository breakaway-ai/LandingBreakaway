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
        background: '#0F0117',
        'blue-dark': '#1E0B2C',
        blue: '#4A2C6D',
        'blue-light': '#8A4FFF',
        cream: '#FFFFFF',
        'cream-highlight': '#FFFFFF',
        text: '#FFFFFF',
        'text-highlight': '#FFFFFF',
        'card-bg': '#1E0B2C',
        'section-alt': '#1E0B2C',
        gray: '#9A9A9D',
        'text-secondary': '#B68FFF',
        border: 'rgba(138, 79, 255, 0.3)'
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