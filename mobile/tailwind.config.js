/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#0D0E0C',
        surface: '#1E1C18',
        'surface-alt': '#2A2722',
        ink: '#EDE8DF',
        muted: '#A49C90',
        accent: '#E3C6A6',
        'accent-strong': '#C7A47F',
        'accent-soft': '#3A322A',
        line: '#34302A',
        success: '#4ADE80',
        danger: '#F87171',
      },
      fontFamily: {
        display: ['Georgia', 'Playfair Display', 'ui-serif', 'serif'],
      },
    },
  },
  plugins: [],
};