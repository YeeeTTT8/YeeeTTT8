import type { Material } from '@/content/types';

/**
 * SAMPLE DATA — see content/SAMPLE_DATA.md. Copy is written to be accurate to
 * natural stone in general; specifics a client must confirm are marked
 * TODO(client). Imagery uses labelled placeholders until real photos land.
 */
export const materials: Material[] = [
  {
    slug: 'granite',
    name: 'Granite',
    tagline: 'Igneous, hard-wearing, endlessly varied.',
    intro:
      'Granite is an igneous stone formed as molten rock cools slowly underground, giving it a dense, crystalline structure and remarkable durability. Every slab carries its own field of feldspar, quartz and mica — no two are alike.',
    characteristics: [
      'Very hard and scratch-resistant',
      'Heat and abrasion tolerant',
      'Distinct crystalline grain and speckle',
      'Sealed to resist staining',
    ],
    bestUses: ['Kitchen countertops', 'Islands and bar tops', 'Outdoor kitchens', 'Commercial surfaces'],
    careSummary:
      'Wipe with mild soap and water; reseal periodically. Avoid acidic or abrasive cleaners.',
    image: { src: '/placeholders/material-granite', alt: 'Close-up of granite slab with crystalline speckle' },
  },
  {
    slug: 'marble',
    name: 'Marble',
    tagline: 'Metamorphic, luminous, full of movement.',
    intro:
      'Marble is limestone recrystallised under heat and pressure, prized for its soft translucency and flowing veins. It rewards a considered hand — a surface that ages into character rather than staying pristine.',
    characteristics: [
      'Soft, luminous depth',
      'Dramatic directional veining',
      'Softer than granite — patinas over time',
      'Best honed for a matte, forgiving finish',
    ],
    bestUses: ['Vanity tops', 'Fireplace surrounds', 'Feature walls', 'Low-traffic counters'],
    careSummary:
      'Seal and wipe spills promptly — acids (citrus, wine) can etch. Use pH-neutral cleaners.',
    image: { src: '/placeholders/material-marble', alt: 'Close-up of white marble slab with grey veining' },
  },
  {
    slug: 'quartz',
    name: 'Quartz',
    tagline: 'Engineered, consistent, low-maintenance.',
    intro:
      'Quartz surfaces are engineered from roughly 90% ground natural quartz bound with resin, producing a non-porous slab with consistent colour and pattern. A practical choice where uniformity and easy care matter most.',
    characteristics: [
      'Non-porous — no sealing required',
      'Highly consistent colour and pattern',
      'Stain and scratch resistant',
      'Wide palette, including marble looks',
    ],
    bestUses: ['High-traffic kitchens', 'Bathrooms', 'Commercial worktops', 'Family homes'],
    careSummary: 'Wipe with soap and water. Avoid direct high heat and harsh solvents.',
    image: { src: '/placeholders/material-quartz', alt: 'Close-up of engineered quartz surface' },
  },
  {
    slug: 'quartzite',
    name: 'Quartzite',
    tagline: 'Natural, marble-like, granite-tough.',
    intro:
      'Quartzite is a natural metamorphic stone — sandstone recrystallised into interlocking quartz. It offers the flowing look many love in marble with hardness closer to granite, a favourite for kitchens that want both.',
    characteristics: [
      'Very hard and durable',
      'Marble-like movement, natural stone',
      'Heat resistant',
      'Sealed to resist staining',
    ],
    bestUses: ['Kitchen countertops', 'Islands', 'Feature surfaces', 'High-use areas'],
    careSummary: 'Seal periodically; clean with mild soap and water. Avoid acidic cleaners.',
    image: { src: '/placeholders/material-quartzite', alt: 'Close-up of quartzite slab with flowing veining' },
  },
];

export function getMaterial(slug: string): Material | undefined {
  return materials.find((m) => m.slug === slug);
}
