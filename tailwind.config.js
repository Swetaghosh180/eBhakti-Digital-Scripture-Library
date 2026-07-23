/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F1',
        gold: '#C48A3A',
        charcoal: '#1F2937',
        'text-secondary': '#6B7280',
        'text-muted': '#9CA3AF',
        'border-subtle': '#E7E5E4',
        'card-bg': '#FFFFFF'
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
        sanskrit: ['Noto Serif Devanagari', 'serif']
      },
      maxWidth: {
        reading: '1100px'
      },
      boxShadow: {
        divine: '0 4px 24px rgba(196, 138, 58, 0.12)',
        'divine-lg': '0 8px 40px rgba(196, 138, 58, 0.2)'
      }
    }
  },
  plugins: []
}
