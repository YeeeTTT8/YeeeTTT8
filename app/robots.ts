import type { MetadataRoute } from 'next';
import { env } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  const base = env.siteUrl.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Internal/utility routes kept out of the index.
      disallow: ['/_design', '/contact/thank-you'],
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
