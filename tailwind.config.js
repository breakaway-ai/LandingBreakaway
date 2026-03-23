/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0A0012',
        surface: '#1A0D2E',
        'surface-light': '#271545',
        primary: '#8A4FFF',
        'primary-dark': '#4A2C6D',
        'primary-light': '#C4A0FF',
        accent: '#00E5FF',
        'accent-soft': '#7DD8E8',
        text: '#FFFFFF',
        'text-muted': '#C4A0FF',
        'text-dim': '#B8B5C0',
        border: 'rgba(138, 79, 255, 0.3)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(138, 79, 255, 0.4)',
        'glow-lg': '0 0 40px rgba(138, 79, 255, 0.3)',
        'glow-accent': '0 0 20px rgba(0, 229, 255, 0.25)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 24px rgba(138, 79, 255, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #8A4FFF, #00E5FF)',
        'gradient-surface': 'linear-gradient(135deg, #1A0D2E, #0A0012)',
      },
    },
  },
  plugins: [],
}
