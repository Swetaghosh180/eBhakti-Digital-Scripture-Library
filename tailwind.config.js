/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        ivory:        '#FAF7F2',
        parchment:    '#F5EFE4',
        gold:         '#C48A3A',
        'gold-light': '#E8B96A',
        'gold-dark':  '#9E6B22',
        saffron:      '#E8821A',
        'saffron-soft':'#FDF0E0',
        maroon:       '#7B1F2E',
        'maroon-soft':'#F9EEF0',
        lotus:        '#D4607A',
        'lotus-soft': '#FDF0F3',
        charcoal:     '#1C1917',
        'charcoal-soft':'#292524',
        'text-secondary': '#6B7280',
        'text-muted':     '#9CA3AF',
        'border-subtle':  '#E8E2D9',
        'border-warm':    '#D6CCBC',
        'card-bg':        '#FFFFFF',
        'surface':        '#FFFDF9',
      },
      fontFamily: {
        serif:   ['Playfair Display', 'Georgia', 'serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        sanskrit:['Noto Serif Devanagari', 'serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
      },
      maxWidth: {
        reading: '1100px',
        prose:   '680px',
      },
      boxShadow: {
        divine:    '0 4px 24px rgba(196,138,58,0.15)',
        'divine-lg':'0 12px 48px rgba(196,138,58,0.22)',
        'warm':    '0 4px 20px rgba(28,25,23,0.08)',
        'warm-lg': '0 12px 40px rgba(28,25,23,0.12)',
        'card':    '0 2px 12px rgba(28,25,23,0.06)',
        'card-hover':'0 8px 32px rgba(28,25,23,0.12)',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C48A3A 0%, #E8B96A 50%, #C48A3A 100%)',
        'saffron-gradient': 'linear-gradient(135deg, #E8821A 0%, #F5A623 100%)',
        'parchment-gradient': 'linear-gradient(180deg, #FAF7F2 0%, #F5EFE4 100%)',
        'hero-gradient': 'linear-gradient(160deg, #FAF7F2 0%, #F5EFE4 40%, #FDF0E0 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'sm': '4px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow':  'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        glow: {
          from: { textShadow: '0 0 8px rgba(196,138,58,0.3)' },
          to:   { textShadow: '0 0 20px rgba(196,138,58,0.6)' },
        }
      }
    }
  },
  plugins: []
}
