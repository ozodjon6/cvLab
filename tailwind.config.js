/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A2540',
          50: '#E8F0FE',
          100: '#C7D9FC',
          400: '#3B6EF3',
          500: '#1A56DB',
          600: '#1444B0',
          800: '#0A2540',
          900: '#061528',
        },
        blue: {
          brand: '#1A56DB',
          light: '#E8F0FE',
          accent: '#3B82F6',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-up-d1': 'fadeUp 0.6s 0.1s ease both',
        'fade-up-d2': 'fadeUp 0.6s 0.2s ease both',
        'fade-up-d3': 'fadeUp 0.6s 0.3s ease both',
        'float-in': 'floatIn 0.8s 0.4s ease both',
        'blink': 'blink 2s infinite',
        'slide-in': 'slideIn 0.25s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        floatIn: {
          from: { opacity: '0', transform: 'translateY(-50%) translateX(40px)' },
          to:   { opacity: '1', transform: 'translateY(-50%) translateX(0)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        slideIn: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
