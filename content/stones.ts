import type { Stone, MaterialSlug, ColourFamily, Finish } from '@/content/types';

/**
 * SAMPLE DATA — 24 placeholder stones across the six collections. Origins and
 * exact thickness availability are TODO(client). Names are invented and
 * non-trademarked.
 */

type StoneSeed = [
  slug: string,
  name: string,
  material: MaterialSlug,
  colour: ColourFamily,
  finish: Finish,
  collection: string,
  note: string,
];

const seeds: StoneSeed[] = [
  // Ivory Coast
  ['ivory-drift', 'Ivory Drift', 'marble', 'White', 'Honed', 'ivory-coast', 'Soft cream ground with a faint grey drift.'],
  ['pale-carrara', 'Pale Carrara', 'marble', 'White', 'Polished', 'ivory-coast', 'Fine, feathery grey veins on a bright white.'],
  ['chalk-vein', 'Chalk Vein', 'marble', 'White', 'Honed', 'ivory-coast', 'Matte white with quiet, chalky veining.'],
  ['linen-white', 'Linen White', 'quartzite', 'White', 'Honed', 'ivory-coast', 'Warm off-white with a woven, linen-like texture.'],
  // Nero Reserve
  ['nero-gold', 'Nero Gold', 'granite', 'Black', 'Polished', 'nero-reserve', 'True black threaded with fine gold veins.'],
  ['midnight-quartz', 'Midnight Quartz', 'quartzite', 'Black', 'Leathered', 'nero-reserve', 'Deep charcoal with a soft, matte leathered hand.'],
  ['obsidian-grain', 'Obsidian Grain', 'granite', 'Black', 'Polished', 'nero-reserve', 'Glassy near-black with a tight crystalline grain.'],
  ['graphite-flow', 'Graphite Flow', 'quartzite', 'Grey', 'Honed', 'nero-reserve', 'Dark graphite grey with silver movement.'],
  // Calacatta Noir
  ['noir-vein', 'Noir Vein', 'quartzite', 'White', 'Polished', 'calacatta-noir', 'Bold charcoal veins across a bright ground.'],
  ['thunder-white', 'Thunder White', 'quartzite', 'Grey', 'Polished', 'calacatta-noir', 'Storm-grey veining scattered like lightning.'],
  ['ink-river', 'Ink River', 'marble', 'White', 'Honed', 'calacatta-noir', 'A single dark vein running like a river.'],
  ['monsoon-grey', 'Monsoon Grey', 'quartzite', 'Grey', 'Leathered', 'calacatta-noir', 'Grey-on-grey movement with a matte finish.'],
  // Terra Warm
  ['honey-field', 'Honey Field', 'granite', 'Gold', 'Polished', 'terra-warm', 'Golden field flecked with amber and cream.'],
  ['amber-grain', 'Amber Grain', 'granite', 'Brown', 'Polished', 'terra-warm', 'Warm brown with an even amber grain.'],
  ['desert-gold', 'Desert Gold', 'quartzite', 'Gold', 'Honed', 'terra-warm', 'Sunlit gold with soft sand-toned banding.'],
  ['sienna-drift', 'Sienna Drift', 'granite', 'Brown', 'Leathered', 'terra-warm', 'Deep sienna with a tactile leathered surface.'],
  // Coastal Green
  ['sea-glass', 'Sea Glass', 'quartzite', 'Green', 'Polished', 'coastal-green', 'Pale sea-glass green with translucent depth.'],
  ['forest-vein', 'Forest Vein', 'quartzite', 'Green', 'Honed', 'coastal-green', 'Deep forest green with darker veining.'],
  ['tide-blue', 'Tide Blue', 'quartzite', 'Blue', 'Polished', 'coastal-green', 'Cool blue-grey with a tidal, flowing pattern.'],
  ['jade-flow', 'Jade Flow', 'marble', 'Green', 'Honed', 'coastal-green', 'Muted jade with soft white movement.'],
  // Atelier Pure
  ['pure-white', 'Pure White', 'quartz', 'White', 'Polished', 'atelier-pure', 'Clean, consistent white — engineered quartz.'],
  ['studio-grey', 'Studio Grey', 'quartz', 'Grey', 'Honed', 'atelier-pure', 'Even mid-grey with a matte studio finish.'],
  ['cloud-vein', 'Cloud Vein', 'quartz', 'White', 'Polished', 'atelier-pure', 'White with a soft, cloud-like grey vein.'],
  ['silk-carrara', 'Silk Carrara', 'quartz', 'White', 'Polished', 'atelier-pure', 'A dependable Carrara look in engineered quartz.'],
];

export const stones: Stone[] = seeds.map(([slug, name, material, colourFamily, finish, collectionSlug, note]) => ({
  slug,
  name,
  material,
  colourFamily,
  finish,
  collectionSlug,
  note,
  thicknessCm: [2, 3], // TODO(client): confirm stocked thicknesses
  origin: 'TODO(client)',
  pairsWith: [],
  image: { src: `/placeholders/stone-${slug}`, alt: `${name} — ${material} slab, ${finish.toLowerCase()} finish` },
}));

// Derive simple pairing suggestions: two other stones from the same collection.
for (const stone of stones) {
  stone.pairsWith = stones
    .filter((s) => s.collectionSlug === stone.collectionSlug && s.slug !== stone.slug)
    .slice(0, 2)
    .map((s) => s.slug);
}

export function getStone(slug: string): Stone | undefined {
  return stones.find((s) => s.slug === slug);
}

export function getStonesByCollection(collectionSlug: string): Stone[] {
  return stones.filter((s) => s.collectionSlug === collectionSlug);
}

export function getStonesByMaterial(material: MaterialSlug): Stone[] {
  return stones.filter((s) => s.material === material);
}
