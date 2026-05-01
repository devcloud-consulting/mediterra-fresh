import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette: olive forest + warm terracotta accent + cream
        olive: {
          50: '#f6f8f1',
          100: '#e9efd9',
          200: '#d2dfb4',
          300: '#b3c884',
          400: '#94ad58',
          500: '#76903b',
          600: '#5b722c',
          700: '#475825',
          800: '#3a4720',
          900: '#2f3a1d',
          950: '#181f0d',
        },
        terracotta: {
          50: '#fbf5f1',
          100: '#f4e6db',
          200: '#e8cab5',
          300: '#daa687',
          400: '#cb8159',
          500: '#bf6638',
          600: '#a8502b',
          700: '#893f25',
          800: '#6f3522',
          900: '#5b2e1f',
          950: '#30150e',
        },
        cream: {
          50: '#fdfbf6',
          100: '#faf5e8',
          200: '#f3e9c9',
          300: '#ead7a0',
          400: '#dec076',
          500: '#d2a953',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        arabic: ['var(--font-noto-arabic)', 'Tahoma', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
};

export default config;
