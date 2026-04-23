export const Colors = {
  background: ['#0f0c29', '#302b63', '#24243e'] as const,

  white: '#ffffff',
  whiteHigh: 'rgba(255,255,255,0.85)',
  whiteMid: 'rgba(255,255,255,0.55)',
  whiteLow: 'rgba(255,255,255,0.3)',
  whiteHint: 'rgba(255,255,255,0.1)',

  purple: '#a78bfa',
  purpleDim: 'rgba(167,139,250,0.15)',
  purpleBorder: 'rgba(167,139,250,0.25)',

  blue: '#38bdf8',
  blueDim: 'rgba(56,189,248,0.12)',
  blueBorder: 'rgba(56,189,248,0.25)',

  amber: '#fbbf24',
  amberDim: 'rgba(251,191,36,0.12)',
  amberBorder: 'rgba(251,191,36,0.25)',

  green: '#34d399',
  greenDim: 'rgba(52,211,153,0.12)',
  greenBorder: 'rgba(52,211,153,0.25)',

  red: '#f87171',
  redRaw: '#ef4444',
  redDim: 'rgba(239,68,68,0.12)',
  redBorder: 'rgba(239,68,68,0.25)',

  orange: '#fb923c',
  orangeDim: 'rgba(251,146,60,0.12)',
  orangeBorder: 'rgba(251,146,60,0.25)',

  card: 'rgba(255,255,255,0.05)',
  cardBorder: 'rgba(255,255,255,0.1)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 10,
  md: 14,
  lg: 20,
  full: 999,
};

export const Typography = {
  h1: { fontSize: 28, fontWeight: '800' as const, letterSpacing: -0.5, color: '#fff' },
  h2: { fontSize: 22, fontWeight: '800' as const, color: '#fff' },
  h3: { fontSize: 16, fontWeight: '700' as const, color: '#fff' },
  body: { fontSize: 14, color: 'rgba(255,255,255,0.55)' as const, lineHeight: 20 },
  label: { fontSize: 12, fontWeight: '600' as const, color: 'rgba(255,255,255,0.55)' as const },
  caption: { fontSize: 11, color: 'rgba(255,255,255,0.3)' as const },
};
