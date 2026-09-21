import { Cormorant_Garamond, Inter } from 'next/font/google';

/**
 * Fonts are self-hosted by next/font at build time (downloaded from Google
 * Fonts during the build, then served from our own origin). If the build
 * environment cannot reach Google Fonts, swap these for `next/font/local`
 * with bundled .woff2 files in /public/fonts.
 */
export const fontDisplay = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-display',
});

export const fontSans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
