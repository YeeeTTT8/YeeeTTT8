import type { Config } from 'tailwindcss';

/**
 * Design tokens are declared as CSS custom properties in app/globals.css and
 * mapped here so components reference semantic names (e.g. `bg-ivory`,
 * `text-stone-900`) rather than raw hex. Do not introduce raw hex in JSX.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: 'var(--ivory)',
        paper: 'var(--paper)',
        stone: {
          900: 'var(--stone-900)',
          600: 'var(--stone-600)',
          300: 'var(--stone-300)',
        },
        brass: 'var(--brass)',
        'brand-red': 'var(--brand-red)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid scale — clamp(min, preferred, max)
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'fluid-sm': ['clamp(0.9rem, 0.85rem + 0.25vw, 1rem)', { lineHeight: '1.6' }],
        'fluid-base': ['clamp(1.0625rem, 1rem + 0.3vw, 1.125rem)', { lineHeight: '1.7' }],
        'fluid-lg': ['clamp(1.25rem, 1.1rem + 0.6vw, 1.5rem)', { lineHeight: '1.5' }],
        'display-sm': ['clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)', { lineHeight: '1.1' }],
        'display-md': ['clamp(2.25rem, 1.7rem + 2.6vw, 3.5rem)', { lineHeight: '1.05' }],
        'display-lg': ['clamp(2.75rem, 1.8rem + 4.4vw, 5rem)', { lineHeight: '1.02' }],
        'display-xl': ['clamp(3.25rem, 2rem + 6vw, 6.5rem)', { lineHeight: '0.98' }],
      },
      letterSpacing: {
        eyebrow: '0.18em',
        tight: '-0.02em',
        tighter: '-0.03em',
      },
      maxWidth: {
        content: '1320px',
        prose: '68ch',
      },
      spacing: {
        // 8px scale supplements Tailwind's default 4px scale for band rhythm.
        band: '6rem',
        'band-lg': '9rem',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        700: '700ms',
        900: '900ms',
      },
      borderColor: {
        hairline: 'var(--stone-300)',
      },
    },
  },
  plugins: [],
};

export default config;
