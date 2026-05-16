import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Sharp Grotesk"', 'system-ui', 'sans-serif'],
        body: ['"Sharp Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['"Sharp Grotesk"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#F25C00',
        'primary-hover': '#D45200',
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          1: '#DDDDDD',
          2: '#9E9E9E',
          3: '#4A4A4A',
          4: '#232323',
          5: '#171717',
        },
        surface: {
          DEFAULT: '#1F1F1F',
          elevated: '#232323',
          overlay: '#2E2E2E',
        },
        status: {
          success: '#6DB611',
          error: '#FF1111',
          warning: '#FFB700',
        },
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '44px', fontWeight: '400', letterSpacing: '0.04em' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: '400', letterSpacing: '0.03em' }],
        'h3': ['16px', { lineHeight: '24px', fontWeight: '400', letterSpacing: '0.03em' }],
        'body': ['14px', { lineHeight: '20px', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-muted': ['12px', { lineHeight: '16px', fontWeight: '400', letterSpacing: '0.02em' }],
        'btn': ['14px', { lineHeight: '20px', fontWeight: '300', letterSpacing: '0.06em' }],
        'btn-lg': ['20px', { lineHeight: '28px', fontWeight: '400', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        lg: '12px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

export default config
