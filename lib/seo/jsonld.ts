import { env } from '@/lib/env';
import { site } from '@/lib/site';
import type { Location, Stone, Faq, JournalPost, Material } from '@/content/types';

const base = env.siteUrl.replace(/\/$/, '');

export function abs(path: string): string {
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Organization + WebSite — emitted once in the root layout. */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: base,
    foundingDate: String(site.established),
    description: site.description,
    brand: [
      { '@type': 'Brand', name: 'InStyle Granite & Marble' },
      { '@type': 'Brand', name: 'Avani Granite & Marble' },
    ],
  };
}

export function webSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: base,
  };
}

/** LocalBusiness per showroom. Placeholder fields are omitted, not faked. */
export function localBusinessJsonLd(loc: Location) {
  const streetLine = loc.addressLines.find((l) => !l.startsWith('TODO'));
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HomeGoodsStore',
    name: `${loc.brand} Granite & Marble — ${loc.city}`,
    url: abs(`/showrooms/${loc.slug}`),
    address: {
      '@type': 'PostalAddress',
      addressLocality: loc.city,
      addressRegion: loc.state,
      addressCountry: 'US',
      ...(streetLine ? { streetAddress: streetLine } : {}),
    },
  };
  if (!loc.phone.startsWith('TODO')) data.telephone = loc.phone;
  if (loc.geo) data.geo = { '@type': 'GeoCoordinates', latitude: loc.geo.lat, longitude: loc.geo.lng };
  return data;
}

/** Product-lite for a stone. Price/availability are intentionally omitted. */
export function stoneProductJsonLd(stone: Stone, material?: Material) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: stone.name,
    category: material?.name ?? stone.material,
    description: stone.note,
    url: abs(`/stones/${stone.slug}`),
    material: material?.name ?? stone.material,
    brand: { '@type': 'Brand', name: site.name },
  };
}

export function faqPageJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function articleJsonLd(post: JournalPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: abs(`/journal/${post.slug}`),
    publisher: { '@type': 'Organization', name: site.name },
  };
}

export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href) } : {}),
    })),
  };
}
