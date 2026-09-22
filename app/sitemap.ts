import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';
import { materials } from '@/content/materials';
import { collections } from '@/content/collections';
import { stones } from '@/content/stones';
import { services } from '@/content/services';
import { locations } from '@/content/locations';
import { journal } from '@/content/journal';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    '',
    '/materials',
    '/collections',
    '/compare',
    '/services',
    '/showrooms',
    '/gallery',
    '/about',
    '/journal',
    '/contact',
    '/faq',
    '/catalogue',
    '/privacy',
    '/terms',
  ];

  const dynamicRoutes = [
    ...materials.map((m) => `/materials/${m.slug}`),
    ...collections.map((c) => `/collections/${c.slug}`),
    ...stones.map((s) => `/stones/${s.slug}`),
    ...services.map((s) => `/services/${s.slug}`),
    ...locations.map((l) => `/showrooms/${l.slug}`),
    ...journal.map((p) => `/journal/${p.slug}`),
  ];

  return [...staticRoutes, ...dynamicRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.7,
  }));
}
