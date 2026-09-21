/**
 * Domain content types. In v1 these are backed by typed local data files in
 * /content. The shapes are deliberately CMS-agnostic so a headless source
 * (Sanity / Payload) can populate them later without touching components.
 *
 * Convention: every user-facing string that is not yet verified by the client
 * is written literally with a `TODO(client)` marker and tracked in
 * docs/TODO-CLIENT.md.
 */

export type MaterialSlug = 'granite' | 'marble' | 'quartz' | 'quartzite';

export type Finish = 'Polished' | 'Honed' | 'Leathered' | 'Brushed';

export type ColourFamily =
  | 'White'
  | 'Grey'
  | 'Black'
  | 'Beige'
  | 'Gold'
  | 'Green'
  | 'Blue'
  | 'Brown';

/** A supplied image reference. `src` may point at a labelled placeholder in v1. */
export interface ImageRef {
  src: string;
  alt: string;
  /** Optional low-quality blur data URL for next/image placeholder. */
  blurDataURL?: string;
  width?: number;
  height?: number;
}

export interface Material {
  slug: MaterialSlug;
  name: string;
  /** One-line summary for tiles. */
  tagline: string;
  /** Longer editorial intro for the material page. */
  intro: string;
  characteristics: string[];
  bestUses: string[];
  careSummary: string;
  image: ImageRef;
}

export interface Collection {
  slug: string;
  name: string;
  /** Evocative one-line story. */
  story: string;
  /** Longer description for the collection page. */
  description: string;
  /** Primary material this collection leans on. */
  material: MaterialSlug;
  image: ImageRef;
  /** Slugs of stones belonging to this collection. */
  stoneSlugs: string[];
  featured?: boolean;
}

export interface Stone {
  slug: string;
  name: string;
  material: MaterialSlug;
  colourFamily: ColourFamily;
  finish: Finish;
  /** Slug of the collection this stone belongs to. */
  collectionSlug: string;
  /** Short descriptive note about veining / movement. */
  note: string;
  /** Thickness options in cm. TODO(client) confirm real availability. */
  thicknessCm: number[];
  /** Origin quarry / country — TODO(client). */
  origin: string;
  /** Slugs of stones that pair well. */
  pairsWith: string[];
  image: ImageRef;
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  body: string;
  /** Lucide icon name (mapped in the component). */
  icon: string;
}

export interface ShowroomHours {
  day: string;
  hours: string;
}

export interface Location {
  /** URL slug, e.g. "houston". */
  slug: string;
  city: string;
  state: string;
  /** Which brand operates this location. */
  brand: 'InStyle' | 'Avani';
  /** TODO(client) — placeholder until supplied. */
  addressLines: string[];
  phone: string;
  email: string;
  hours: ShowroomHours[];
  /** Google Maps directions URL. */
  mapsUrl: string;
  image: ImageRef;
  /** Geo coordinates for LocalBusiness JSON-LD. TODO(client). */
  geo?: { lat: number; lng: number };
}

export interface Faq {
  question: string;
  answer: string;
  category: 'Ordering' | 'Materials' | 'Care' | 'Trade' | 'Delivery';
}

export interface JournalPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Educate' | 'Products' | 'Care';
  /** ISO date string. */
  date: string;
  readingMinutes: number;
  /** MDX/markdown body. */
  body: string;
  image: ImageRef;
  relatedSlugs?: string[];
}
