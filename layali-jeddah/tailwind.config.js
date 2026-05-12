/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lj-bg': '#0d0905',
        'lj-gold': '#c5a059',
        'lj-blue': '#1f6593',
        'lj-green': '#5eb090',
        'lj-lime': '#9ece47',
        'lj-pink': '#eab2bb',
      },
      fontFamily: {
        sans: ['Cairo', 'ui-sans-serif', 'system-ui'],
        serif: ['Amiri', 'ui-serif', 'Georgia'],
      },
      boxShadow: {
        'gold-glow': '0 0 15px rgba(197, 160, 89, 0.2)',
        'gold-glow-hover': '0 0 25px rgba(197, 160, 89, 0.4)',
      }
    },
  },
  plugins: [],
}
