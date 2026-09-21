import type { Location } from '@/content/types';

/**
 * SAMPLE DATA — six showrooms across two brands. All addresses, phones, hours
 * and coordinates are TODO(client) placeholders and must not be treated as
 * real. A Google Maps directions URL built from city/state is used until a
 * precise address is supplied.
 */

const PLACEHOLDER_HOURS = [
  { day: 'Mon – Fri', hours: 'TODO(client)' },
  { day: 'Saturday', hours: 'TODO(client)' },
  { day: 'Sunday', hours: 'Closed' },
];

type LocationSeed = [slug: string, city: string, state: string, brand: 'InStyle' | 'Avani'];

const seeds: LocationSeed[] = [
  ['houston', 'Houston', 'TX', 'InStyle'],
  ['memphis', 'Memphis', 'TN', 'Avani'],
  ['nashville', 'Nashville', 'TN', 'Avani'],
  ['denver', 'Denver', 'CO', 'Avani'],
  ['atlanta', 'Atlanta', 'GA', 'InStyle'],
  ['columbus', 'Columbus', 'OH', 'InStyle'],
];

export const locations: Location[] = seeds.map(([slug, city, state, brand]) => ({
  slug,
  city,
  state,
  brand,
  addressLines: ['TODO(client): street address', `${city}, ${state}`],
  phone: 'TODO(client)',
  email: 'TODO(client)',
  hours: PLACEHOLDER_HOURS,
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${brand} Granite Marble ${city} ${state}`,
  )}`,
  image: { src: `/placeholders/showroom-${slug}`, alt: `${brand} showroom in ${city}, ${state}` },
}));

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
