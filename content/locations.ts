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

type LocationSeed = [
  slug: string,
  city: string,
  state: string,
  brand: 'InStyle' | 'Avani',
  lat: number,
  lng: number,
];

// Coordinates are the real city centres (public geography), used for the
// network map + LocalBusiness JSON-LD. Precise showroom addresses remain
// TODO(client).
const seeds: LocationSeed[] = [
  ['houston', 'Houston', 'TX', 'InStyle', 29.76, -95.37],
  ['memphis', 'Memphis', 'TN', 'Avani', 35.15, -90.05],
  ['nashville', 'Nashville', 'TN', 'Avani', 36.16, -86.78],
  ['denver', 'Denver', 'CO', 'Avani', 39.74, -104.99],
  ['atlanta', 'Atlanta', 'GA', 'InStyle', 33.75, -84.39],
  ['columbus', 'Columbus', 'OH', 'InStyle', 39.96, -83.0],
];

export const locations: Location[] = seeds.map(([slug, city, state, brand, lat, lng]) => ({
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
  geo: { lat, lng },
}));

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
