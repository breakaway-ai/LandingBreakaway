/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#EDEAF7',
        'background-alt': '#E5E1F2',
        surface: '#FFFFFF',
        ink: '#151122',
        'ink-soft': '#514A63',
        'ink-dim': '#837C96',
        primary: '#6D28D9',
        'primary-bright': '#7C3AED',
        'primary-soft': '#A78BFA',
        'primary-wash': '#F1ECFE',
        accent: '#22D3EE',
        night: '#1B1424',
        'night-soft': '#271E33',
        'node-idle': '#241B31',
        'node-primary': '#3B1F66',
        'node-accent': '#123F4F',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        label: '0.18em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21, 17, 34, 0.04), 0 8px 24px -14px rgba(21, 17, 34, 0.16)',
        'card-lift': '0 2px 6px rgba(21, 17, 34, 0.06), 0 28px 50px -24px rgba(21, 17, 34, 0.28)',
        pill: '0 1px 2px rgba(21, 17, 34, 0.05), 0 14px 32px -16px rgba(21, 17, 34, 0.24)',
        console: '0 40px 80px -40px rgba(21, 17, 34, 0.55)',
        'glow-primary': '0 12px 30px -12px rgba(109, 40, 217, 0.6)',
        'node-glow-primary': '0 0 18px 5px rgba(167, 139, 250, 0.65)',
        'node-glow-accent': '0 0 18px 5px rgba(34, 211, 238, 0.55)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'orbit-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.06)' },
        },
        'node-active-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.35)' },
        },
        'scan-ring': {
          '0%': { transform: 'scale(0.35)', opacity: '0.45' },
          '100%': { transform: 'scale(1.15)', opacity: '0' },
        },
        'data-flow': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: '-100' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        blink: 'blink 1.1s steps(1) infinite',
        'orbit-pulse': 'orbit-pulse 5s ease-in-out infinite',
        'node-active-pulse': 'node-active-pulse 1.4s ease-in-out infinite',
        'scan-ring': 'scan-ring 3.5s ease-out infinite',
        'data-flow': 'data-flow 1.6s linear infinite',
        'spin-slow': 'spin-slow 90s linear infinite',
        'spin-slow-reverse': 'spin-slow 120s linear infinite reverse',
      },
    },
  },
  plugins: [],
}
