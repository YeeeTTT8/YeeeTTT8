import type { Collection } from '@/content/types';

/**
 * SAMPLE DATA — six collections with evocative, non-trademarked names. Stone
 * membership references slugs in content/stones.ts (four per collection).
 */
export const collections: Collection[] = [
  {
    slug: 'ivory-coast',
    name: 'Ivory Coast',
    story: 'Pale, quiet whites with the softest drift of grey.',
    description:
      'A collection of luminous light stones — whites and creams with restrained veining. Built for rooms that want to breathe: north-lit kitchens, calm bathrooms, surfaces that recede and let the space speak.',
    material: 'marble',
    featured: true,
    image: { src: '/placeholders/collection-ivory-coast', alt: 'Pale ivory marble with faint grey veining' },
    stoneSlugs: ['ivory-drift', 'pale-carrara', 'chalk-vein', 'linen-white'],
  },
  {
    slug: 'nero-reserve',
    name: 'Nero Reserve',
    story: 'Deep blacks with gold and silver running through.',
    description:
      'Dramatic dark stones — true blacks and near-blacks threaded with brass, gold and cool silver. A collection for statement islands and moody, confident interiors.',
    material: 'granite',
    featured: true,
    image: { src: '/placeholders/collection-nero-reserve', alt: 'Black granite with fine gold veining' },
    stoneSlugs: ['nero-gold', 'midnight-quartz', 'obsidian-grain', 'graphite-flow'],
  },
  {
    slug: 'calacatta-noir',
    name: 'Calacatta Noir',
    story: 'Bold veining, high contrast, unmistakable.',
    description:
      'High-contrast stones where dark veins move across a bright ground. The most photographed look in modern kitchens — sculptural, graphic, made for a bookmatched centrepiece.',
    material: 'quartzite',
    featured: true,
    image: { src: '/placeholders/collection-calacatta-noir', alt: 'White quartzite with bold dark veining' },
    stoneSlugs: ['noir-vein', 'thunder-white', 'ink-river', 'monsoon-grey'],
  },
  {
    slug: 'terra-warm',
    name: 'Terra Warm',
    story: 'Beiges, golds and honeyed browns.',
    description:
      'Warm earth tones — beige, honey, caramel and soft brown. Grounding stones that pair beautifully with timber and brass, for kitchens that feel lived-in and generous.',
    material: 'granite',
    image: { src: '/placeholders/collection-terra-warm', alt: 'Warm beige granite with golden movement' },
    stoneSlugs: ['honey-field', 'amber-grain', 'desert-gold', 'sienna-drift'],
  },
  {
    slug: 'coastal-green',
    name: 'Coastal Green',
    story: 'Sea-glass greens and cool blues.',
    description:
      'Cooler, quieter stones in green and blue — from soft sea-glass to deep forest. An unexpected palette for vanities and feature surfaces that want a little colour.',
    material: 'quartzite',
    image: { src: '/placeholders/collection-coastal-green', alt: 'Green quartzite with blue-grey veining' },
    stoneSlugs: ['sea-glass', 'forest-vein', 'tide-blue', 'jade-flow'],
  },
  {
    slug: 'atelier-pure',
    name: 'Atelier Pure',
    story: 'Engineered consistency, marble looks.',
    description:
      'Engineered quartz in dependable whites and greys — consistent slab to slab, non-porous and easy to live with. The practical route to a marble look in a busy home.',
    material: 'quartz',
    image: { src: '/placeholders/collection-atelier-pure', alt: 'Engineered white quartz with soft grey veining' },
    stoneSlugs: ['pure-white', 'studio-grey', 'cloud-vein', 'silk-carrara'],
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getFeaturedCollections(): Collection[] {
  return collections.filter((c) => c.featured);
}
