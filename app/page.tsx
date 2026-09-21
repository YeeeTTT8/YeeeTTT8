import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageTile } from '@/components/ui/ImageTile';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { PillarList, type Pillar } from '@/components/ui/PillarList';
import { StatCounter } from '@/components/ui/StatCounter';
import { LocationCard } from '@/components/ui/LocationCard';
import { JournalCard } from '@/components/ui/JournalCard';
import { VideoHero } from '@/components/sections/VideoHero';
import { InventoryBanner } from '@/components/sections/InventoryBanner';
import { CTABand } from '@/components/sections/CTABand';
import { site, inventoryLink } from '@/lib/site';
import { materials } from '@/content/materials';
import { getFeaturedCollections } from '@/content/collections';
import { locations } from '@/content/locations';
import { getRecentJournal } from '@/content/journal';

export const metadata: Metadata = {
  title: 'Natural Stone Slabs — Granite, Marble, Quartz & Quartzite',
  description: site.description,
  alternates: { canonical: '/' },
};

const pillars: Pillar[] = [
  {
    icon: 'Mountain',
    title: 'Direct sourcing',
    body: 'Stone imported direct — a wide, consistent selection brought in from the quarry.',
  },
  {
    icon: 'Layers',
    title: 'Deep slab inventory',
    body: 'Full slabs held in depth so you can select the exact piece for your project.',
  },
  {
    icon: 'MapPin',
    title: 'Showrooms you can visit',
    body: 'View slabs in person across locations under the InStyle and Avani brands.',
  },
  {
    icon: 'Handshake',
    title: 'Trade support',
    body: 'A dependable source for fabricators, builders, designers and architects.',
  },
  {
    icon: 'Truck',
    title: 'Delivery & logistics',
    body: 'Local delivery from warehouse stock to fabrication shops and job sites.',
  },
];

const roomScenes = [
  { title: 'Kitchen', caption: 'Islands, counters, backsplashes', href: '/collections?room=kitchen', seed: 'room-kitchen' },
  { title: 'Bathroom', caption: 'Vanities and surrounds', href: '/collections?room=bathroom', seed: 'room-bathroom' },
  { title: 'Living', caption: 'Fireplaces and features', href: '/collections?room=living', seed: 'room-living' },
];

export default function HomePage() {
  const featured = getFeaturedCollections();
  const recentPosts = getRecentJournal(3);
  const years = new Date().getFullYear() - site.established;

  return (
    <>
      {/* 1 — Video hero */}
      <VideoHero src="/warehouse-tour.mp4" poster="/warehouse-poster.jpg">
        <Container className="pb-20 pt-40">
          <Reveal>
            <p className="eyebrow text-brass">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-display-xl font-medium text-paper">
              Stone selected slab by slab, from our quarries to your project.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-fluid-lg text-paper/80">
              A natural-stone importer and distributor since {site.established} — granite,
              marble, quartz and quartzite, held in depth across our warehouses.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/collections" variant="primary" size="lg">
                Explore Collections
              </Button>
              <Button href="/contact?intent=quote" variant="outline" size="lg" className="border-paper/70 text-paper hover:bg-paper hover:text-stone-900">
                Request a Quote
              </Button>
            </div>
          </Reveal>
        </Container>

        {/* Scroll cue */}
        <div className="absolute inset-x-0 bottom-6 flex justify-center">
          <span className="text-[11px] uppercase tracking-eyebrow text-paper/60">Scroll</span>
        </div>
      </VideoHero>

      {/* 2 — Intro statement band */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <Reveal>
            <div className="rule-brass" />
            <p className="mt-8 max-w-4xl font-display text-display-md font-normal leading-tight text-stone-900">
              Every slab is a single, unrepeatable thing — a record of pressure, heat and
              time. We hold them in depth so you can choose the one that&rsquo;s right, and
              stand behind it from selection to delivery.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* 3 — Materials */}
      <section className="bg-ivory pb-band">
        <Container>
          <SectionHeading
            eyebrow="Four materials"
            title="Choose by the stone itself"
            intro="Granite, marble, quartz and quartzite each behave differently. Start where it makes sense for how you live."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {materials.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06}>
                <ImageTile
                  href={`/materials/${m.slug}`}
                  image={m.image}
                  title={m.name}
                  caption={m.tagline}
                  priority={i === 0}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 4 — Featured collections */}
      <section className="bg-paper py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Collections"
            title="Curated by colour and character"
            intro="Named groupings that make a wide inventory easy to navigate — each with its own story."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08}>
                <CollectionCard collection={c} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Button href="/collections" variant="link">
                View all collections →
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 5 — Why InStyle */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading eyebrow="Why InStyle" title="A distributor built around selection" />
          <div className="mt-12">
            <PillarList pillars={pillars} />
          </div>
        </Container>
      </section>

      {/* 6 — Stats */}
      <section className="bg-ivory pb-band-lg">
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 gap-8 border-y border-hairline py-12 lg:grid-cols-4">
              <StatCounter value={years} suffix="+" label="Years in stone" />
              <StatCounter value={locations.length} label="Showroom cities" />
              <StatCounter value={materials.length} label="Core materials" />
              <StatCounter value={2} label="Brands" />
            </div>
          </Reveal>
          <p className="mt-4 text-fluid-sm text-stone-600">
            Established {site.established}. Further figures (slab counts, delivery reach) are
            TODO(client) pending verified numbers.
          </p>
        </Container>
      </section>

      {/* 7 — Live inventory band */}
      <InventoryBanner />

      {/* 8 — Inspiration / room scenes */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Find it in place"
            title="See stone in the room"
            intro="Curated scenes by space. A full 3D visualizer is on the roadmap; for now, explore collections suited to each room."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {roomScenes.map((room, i) => (
              <Reveal key={room.title} delay={i * 0.06}>
                <ImageTile
                  href={room.href}
                  image={{ src: `/placeholders/${room.seed}`, alt: `${room.title} scene in natural stone` }}
                  eyebrow="Room"
                  title={room.title}
                  caption={room.caption}
                  ratio="aspect-[4/3]"
                  sizes="(min-width: 640px) 33vw, 100vw"
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 9 — Showrooms */}
      <section className="bg-paper py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Showrooms"
            title="Come see the slabs"
            intro="Locations across the InStyle and Avani brands. Addresses and hours are being finalised."
          />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Button href="/showrooms" variant="link">
                All showrooms →
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 10 — Journal preview */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Journal"
            title="Reading the stone"
            intro="Practical, honest guidance on choosing and caring for natural surfaces."
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.08}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <div className="mt-10">
              <Link href="/journal" className="link-underline text-fluid-sm font-medium text-stone-900">
                Read the journal →
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* 11 — Catalogue CTA */}
      <CTABand
        eyebrow="Take it with you"
        title="Download the catalogue"
        body="A PDF overview of materials, collections and finishes to share with your fabricator or design team."
        primary={{ label: 'Download catalogue', href: '/catalogue' }}
        secondary={{ label: 'Browse live inventory', href: inventoryLink.href, external: true }}
      />
    </>
  );
}
