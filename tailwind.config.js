/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e6fffa',
          100: '#b2f5ea',
          400: '#38b2ac',
          500: '#10b981',
          600: '#059669',
          900: '#064e3b',
          accent: '#00E676',
          cyan: '#00E5FF',
          dark: '#0B0E14',
          card: '#121824',
          cardBorder: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(0, 230, 118, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(0, 230, 118, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
