import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Logo amber-orange (mountain + "CV Manta")
        brand: {
          50: '#fff8ed',
          100: '#feedca',
          200: '#fdd791',
          300: '#fbbb57',
          400: '#f9a236',
          500: '#f7941e',
          600: '#e07a12',
          700: '#ba5d12',
          800: '#944916',
          900: '#793d16',
          950: '#411e07',
        },
        // Logo sky-blue (boat + "Balinusa Tour")
        sky: {
          50: '#eff9fe',
          100: '#daf1fc',
          200: '#bde7fa',
          300: '#8fd7f6',
          400: '#5bbff0',
          500: '#33a7dd',
          600: '#2389bf',
          700: '#1f6e9a',
          800: '#205c7f',
          900: '#1f4d6a',
          950: '#143247',
        },
        // Deep navy-blue for dark sections, text and structure
        ink: {
          50: '#f2f6fa',
          100: '#e2ebf3',
          200: '#c5d7e6',
          300: '#9bb6d1',
          400: '#6b8fb2',
          500: '#4a7193',
          600: '#385a78',
          700: '#2e4961',
          800: '#243a4e',
          900: '#102c46',
          950: '#0a1d31',
        },
        // WhatsApp green
        wa: {
          400: '#34d278',
          500: '#25b85f',
          600: '#1f9e51',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #f9a236 0%, #e07a12 100%)',
        'sky-gradient': 'linear-gradient(135deg, #5bbff0 0%, #2389bf 100%)',
        'ink-gradient': 'linear-gradient(135deg, #102c46 0%, #173a5b 100%)',
      },
      boxShadow: {
        soft: '0 18px 40px -22px rgba(16, 44, 70, 0.28)',
        card: '0 24px 60px -30px rgba(16, 44, 70, 0.4)',
        glow: '0 16px 40px -16px rgba(247, 148, 30, 0.45)',
        'glow-blue': '0 16px 40px -16px rgba(51, 167, 221, 0.45)',
      },
      borderRadius: {
        xs: '0.125rem',
        '4xl': '2rem',
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        reveal: 'reveal 0.25s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        reveal: {
          from: { opacity: '0', transform: 'translateY(-6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
