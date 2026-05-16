export const colors = {
  primary: '#F25C00',
  primaryHover: '#D45200',
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    1: '#DDDDDD',
    2: '#9E9E9E',
    3: '#4A4A4A',
    4: '#232323',
    5: '#171717',
  },
  surface: {
    base: '#1F1F1F',
    elevated: '#232323',
    overlay: '#2E2E2E',
  },
  status: {
    success: '#6DB611',
    error: '#FF1111',
    warning: '#FFB700',
  },
} as const

export const typography = {
  // Sharp Grotesk Medium 20
  h1: { size: '36px', weight: 500, lineHeight: '44px', font: 'Sharp Grotesk' },
  h2: { size: '24px', weight: 500, lineHeight: '32px', font: 'Sharp Grotesk' },
  h3: { size: '16px', weight: 500, lineHeight: '24px', font: 'Sharp Grotesk' },
  // SF Pro Text Regular
  body: { size: '14px', weight: 400, lineHeight: '20px', font: 'SF Pro Text' },
  // Sharp Grotesk Book 20
  bodyMuted: { size: '12px', weight: 400, lineHeight: '16px', font: 'Sharp Grotesk' },
  // Sharp Grotesk Medium 20
  button: { size: '14px', weight: 500, lineHeight: '20px', font: 'Sharp Grotesk' },
  buttonLg: { size: '20px', weight: 500, lineHeight: '28px', font: 'Sharp Grotesk' },
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const

export const radius = {
  sm: '4px',
  md: '6px',
  lg: '12px',
  full: '9999px',
} as const
