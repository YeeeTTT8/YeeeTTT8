import { env } from '@/lib/env';

/**
 * Global, structural site configuration: brand identity and primary
 * navigation. Route targets here are the source of truth for the Header,
 * MobileMenu, Footer and sitemap. Pages are added in later phases; links to
 * not-yet-built routes are expected during the build-out.
 */

export const site = {
  name: 'InStyle Granite & Marble',
  shortName: 'InStyle',
  tagline: 'Granite · Marble · Quartz · Quartzite',
  established: 2011,
  description:
    'Natural stone importer and distributor — granite, marble, quartz and quartzite slabs, selected slab by slab and delivered from our warehouses to your project.',
} as const;

export type NavLink = {
  label: string;
  href: string;
  /** External links open in a new tab with rel=noopener noreferrer. */
  external?: boolean;
};

/** Primary in-site navigation (order matters). */
export const primaryNav: readonly NavLink[] = [
  { label: 'Materials', href: '/materials' },
  { label: 'Collections', href: '/collections' },
  { label: 'Services', href: '/services' },
  { label: 'Showrooms', href: '/showrooms' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Right-aligned action links. */
export const inventoryLink: NavLink = {
  label: 'Live Inventory',
  href: env.inventory.instyle,
  external: true,
};

export const quoteLink: NavLink = {
  label: 'Request a Quote',
  href: '/contact?intent=quote',
};

/** Footer link groups. */
export const footerNav: { heading: string; links: readonly NavLink[] }[] = [
  {
    heading: 'Explore',
    links: [
      { label: 'Materials', href: '/materials' },
      { label: 'Collections', href: '/collections' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Showrooms', href: '/showrooms' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Live Inventory', href: env.inventory.instyle, external: true },
      { label: 'FAQ', href: '/faq' },
      { label: 'Catalogue', href: '/catalogue' },
      { label: 'Care Guides', href: '/journal' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];
