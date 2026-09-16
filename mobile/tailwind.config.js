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
        accent: '#F97316',
        'accent-strong': '#C2410C',
        'accent-soft': '#3A2A1E',
        line: '#34302A',
        success: '#4ADE80',
        danger: '#F87171',
      },
      fontFamily: {
        display: ['Spline Sans', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};