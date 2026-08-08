import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFF9F3',
        champagne: '#F5E6D3',
        blush: '#F7D9DD',
        rose: '#C9878E',
        burgundy: '#702F3B',
        'burgundy-deep': '#4A1C26',
        gold: '#C8A45D',
        'gold-light': '#E4C98B',
        'gold-dark': '#A9853F',
        ink: '#3A2A2A',
        'ink-soft': '#6E5653',
      },
      fontFamily: {
        script: ['var(--font-great-vibes)', 'cursive'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px 6px rgba(200, 164, 93, 0.35)',
        'glow-soft': '0 0 24px 2px rgba(200, 164, 93, 0.22)',
        card: '0 24px 60px -24px rgba(112, 47, 59, 0.25)',
      },
      backgroundImage: {
        'radial-fade':
          'radial-gradient(circle at center, transparent 0%, rgba(255,249,243,0.6) 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
