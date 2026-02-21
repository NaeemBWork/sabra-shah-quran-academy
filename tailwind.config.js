/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'andalusian': {
          'gold': '#D4AF37',
          'dark-gold': '#B8941F',
          'cream': '#F5F1E8',
          'sage': '#9CAF88',
          'terracotta': '#C17A5F',
          'deep-blue': '#2C3E50',
          'warm-brown': '#8B6F47',
        },
        'islamic': {
          'green': '#0D7377',
          'dark-green': '#0A5D61',
          'light-green': '#14A085',
        }
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
