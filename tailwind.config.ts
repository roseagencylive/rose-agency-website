import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        roseBlack: '#070505',
        roseInk: '#13090B',
        roseWine: '#3A0813',
        roseBurgundy: '#641628',
        roseCream: '#F8EEDC',
        roseMuted: '#CDBFA7',
        roseGold: '#D8B66A',
        roseGoldSoft: '#F1D991',
      },
      fontFamily: {
        editorial: ['var(--font-editorial)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 90px rgba(216, 182, 106, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
