import type { JournalPost } from '@/content/types';

/**
 * SAMPLE DATA — three seed articles. Copy is written to be genuinely accurate
 * and useful (not SEO filler). Bodies are Markdown.
 */
export const journal: JournalPost[] = [
  {
    slug: 'granite-vs-quartzite-kitchen-surface',
    title: 'Granite vs Quartzite: choosing a kitchen surface',
    excerpt:
      'They look similar on a sample and both suit hard-working kitchens — but they behave differently. Here is how to choose between them.',
    category: 'Educate',
    date: '2025-11-04',
    readingMinutes: 5,
    image: { src: '/placeholders/journal-granite-quartzite', alt: 'Granite and quartzite slabs side by side' },
    relatedSlugs: ['read-a-slab-before-you-buy', 'caring-for-natural-stone'],
    body: `Granite and quartzite are both natural stones, both hard, and both well suited to kitchens. On a small sample they can be hard to tell apart. The differences show up in how they look across a full slab and how they wear.

## What they are

**Granite** is an igneous rock — molten rock cooled slowly underground into a dense field of crystals. Its look tends toward speckle and grain rather than long veins, though some granites do move.

**Quartzite** is a metamorphic rock — sandstone recrystallised under heat and pressure into interlocking quartz. It often carries flowing, marble-like veining, which is why people drawn to marble but worried about durability land on quartzite.

## How they behave

Both are hard and heat-tolerant, and both are porous enough to benefit from periodic sealing. Quartzite is frequently as hard as or harder than granite. Neither should be confused with **quartz**, which is an engineered, non-porous material — a different product entirely.

## How to choose

- **Want movement and veining?** Quartzite usually gives a more marble-like look.
- **Want a speckled, uniform field?** Granite offers that in a huge range of colours.
- **Worried about etching?** Both resist acids far better than marble.
- **On a budget?** Granite is often the more economical of the two.

The most reliable way to decide is to view full slabs in person. A 4-inch sample tells you the colour; it does not tell you how the veining moves across two metres of counter.`,
  },
  {
    slug: 'read-a-slab-before-you-buy',
    title: 'How to read a slab before you buy',
    excerpt:
      'A full slab is not a countertop yet. Learn what to look for — movement, matching, fissures and finish — before you commit.',
    category: 'Educate',
    date: '2025-10-18',
    readingMinutes: 4,
    image: { src: '/placeholders/journal-read-a-slab', alt: 'Person inspecting a large stone slab in a warehouse' },
    relatedSlugs: ['granite-vs-quartzite-kitchen-surface', 'caring-for-natural-stone'],
    body: `Selecting natural stone slab by slab is the whole point of buying it in person. Here is what to look at when you stand in front of one.

## Movement and orientation

Look at how the veining or grain travels. Picture where the seams and the sink cut-out will fall — you want the best movement on the run people see most. Ask to see the slab standing up and, if possible, laid flat.

## Bookmatching

Slabs cut in sequence from the same block can be **bookmatched** — opened like a book so the pattern mirrors. On an island or a feature wall this is dramatic. If you want it, reserve the consecutive slabs together.

## Fissures, pits and fills

Natural stone has natural characteristics. **Fissures** (hairline separations along the crystal structure) are normal and usually not structural. Some stones are **resin-filled** at the factory to stabilise them. None of this is a defect — but you should know what you are looking at and be comfortable with it.

## Finish

The same stone reads very differently **polished** (glossy, deeper colour), **honed** (matte, softer, more forgiving of fingerprints) or **leathered** (textured, low-sheen). Ask to see your stone in the finish you are considering.

## Reserve the actual slab

If you love a specific slab, tag it and reserve it. Two slabs of the "same" stone can look meaningfully different — the one you saw is the one you want.`,
  },
  {
    slug: 'caring-for-natural-stone',
    title: 'Caring for natural stone',
    excerpt:
      'Sealing, cleaning and the few things to avoid. A short, practical guide to keeping stone surfaces looking their best.',
    category: 'Care',
    date: '2025-09-30',
    readingMinutes: 4,
    image: { src: '/placeholders/journal-stone-care', alt: 'Cleaning a stone countertop with a soft cloth' },
    relatedSlugs: ['granite-vs-quartzite-kitchen-surface', 'read-a-slab-before-you-buy'],
    body: `Natural stone is durable, but it rewards a little routine care. The essentials are simple.

## Everyday cleaning

Wipe with warm water and a little mild dish soap, or a **pH-neutral stone cleaner**. Skip acidic cleaners (vinegar, lemon), bleach and abrasive pads — these can dull or etch the surface over time.

## Sealing

Most porous natural stones (granite, quartzite, marble) benefit from periodic sealing, which slows absorption and buys you time to wipe up spills. A quick test: drop a little water on the surface. If it beads, the seal is working; if it soaks in and darkens, it is time to reseal. Frequency depends on the stone and use — often once or twice a year.

## Marble needs a lighter touch

Marble is softer and reacts to acids: citrus, wine and some cleaners can leave dull **etch** marks. Use coasters and trivets, wipe spills promptly, and consider a honed finish, which hides wear better than a polish.

## Quartz is the low-maintenance one

Engineered quartz is non-porous, so it does not need sealing. Clean it the same gentle way, and avoid direct high heat — always use a trivet.

## Heat, knives and weight

Whatever the material: use trivets under hot pans, cutting boards for knives (which also protects your blades), and avoid standing or sitting on countertops, especially near unsupported cut-outs.`,
  },
];

export function getJournalPost(slug: string): JournalPost | undefined {
  return journal.find((p) => p.slug === slug);
}

export function getRecentJournal(count: number): JournalPost[] {
  return [...journal].sort((a, b) => b.date.localeCompare(a.date)).slice(0, count);
}
