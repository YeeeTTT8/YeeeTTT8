/**
 * Centralised, typed access to environment variables.
 *
 * We intentionally avoid failing hard at import time: the site must run in dev
 * with no env configured. Instead we read with sensible fallbacks and expose
 * helpers that describe capability (e.g. `env.isResendConfigured`).
 *
 * NOTE: only `NEXT_PUBLIC_*` values are safe to read in client components.
 * Server-only secrets (RESEND_API_KEY etc.) must be read in server code.
 */

function readPublic(key: string, fallback = ''): string {
  // NEXT_PUBLIC_ vars are inlined at build; access them statically.
  const map: Record<string, string | undefined> = {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_INVENTORY_URL_INSTYLE: process.env.NEXT_PUBLIC_INVENTORY_URL_INSTYLE,
    NEXT_PUBLIC_INVENTORY_URL_AVANI: process.env.NEXT_PUBLIC_INVENTORY_URL_AVANI,
    NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE,
    NEXT_PUBLIC_WHATSAPP: process.env.NEXT_PUBLIC_WHATSAPP,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    NEXT_PUBLIC_HERO_MEDIA: process.env.NEXT_PUBLIC_HERO_MEDIA,
  };
  return map[key] ?? fallback;
}

export const env = {
  siteUrl: readPublic('NEXT_PUBLIC_SITE_URL', 'http://localhost:3000'),
  inventory: {
    instyle: readPublic(
      'NEXT_PUBLIC_INVENTORY_URL_INSTYLE',
      'https://instylegm.stoneprofitsweb.com',
    ),
    avani: readPublic(
      'NEXT_PUBLIC_INVENTORY_URL_AVANI',
      'https://avanimarble.stoneprofitsweb.com',
    ),
  },
  phone: readPublic('NEXT_PUBLIC_PHONE'),
  whatsapp: readPublic('NEXT_PUBLIC_WHATSAPP'),
  contactEmail: readPublic('NEXT_PUBLIC_CONTACT_EMAIL'),
  gaId: readPublic('NEXT_PUBLIC_GA_ID'),
  /** Set to "true" once /public/warehouse-tour.mp4 + poster exist. */
  heroMedia: readPublic('NEXT_PUBLIC_HERO_MEDIA') === 'true',
  get isAnalyticsConfigured(): boolean {
    return this.gaId.length > 0;
  },
} as const;

/** Server-only: whether Resend email delivery is configured. */
export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.QUOTE_RECIPIENT_EMAIL);
}
