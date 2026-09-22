import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ImageTile } from '@/components/ui/ImageTile';
import { PillarList, type Pillar } from '@/components/ui/PillarList';
import { StatCounter } from '@/components/ui/StatCounter';
import { Marquee } from '@/components/ui/Marquee';
import { LocationCard } from '@/components/ui/LocationCard';
import { JournalCard } from '@/components/ui/JournalCard';
import { VideoHero } from '@/components/sections/VideoHero';
import { InventoryBanner } from '@/components/sections/InventoryBanner';
import { CTABand } from '@/components/sections/CTABand';
import { Bookmatch } from '@/components/sections/Bookmatch';
import { CollectionScroller } from '@/components/sections/CollectionScroller';
import { MaterialVisualizer } from '@/components/sections/MaterialVisualizer';
import { ShaderBand } from '@/components/sections/ShaderBand';
import { CompareSlider } from '@/components/ui/CompareSlider';
import { Tilt } from '@/components/ui/Tilt';
import { Magnetic } from '@/components/ui/MagneticButton';
import { SectionRail } from '@/components/ui/SectionRail';
import { site, inventoryLink } from '@/lib/site';
import { heroVideoUrl } from '@/lib/images';
import { materials } from '@/content/materials';
import { collections } from '@/content/collections';
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
  const recentPosts = getRecentJournal(3);
  const years = new Date().getFullYear() - site.established;

  return (
    <>
      {/* 1 — Video hero */}
      <VideoHero
        src={heroVideoUrl}
        enabled
        image={{ src: '/placeholders/warehouse-hero', alt: 'Rows of natural stone slabs in the InStyle warehouse' }}
      >
        <Container className="pb-20 pt-40">
          <Reveal>
            <p className="eyebrow eyebrow-rule text-brass">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-display-xl font-medium text-paper">
              Stone selected <em className="font-normal italic text-brass">slab by slab</em>, from
              our quarries to your project.
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
              <Magnetic>
                <Button href="/collections" variant="primary" size="lg">
                  Explore Collections
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href="/contact?intent=quote" variant="outline" size="lg" className="border-paper/70 text-paper hover:bg-paper hover:text-stone-900">
                  Request a Quote
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </Container>

        {/* Scroll cue */}
        <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-eyebrow text-paper/60">Scroll</span>
          <span className="h-10 w-px bg-gradient-to-b from-paper/50 to-transparent" aria-hidden />
        </div>
      </VideoHero>

      {/* 2 — Intro statement band */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <Reveal>
            <p className="eyebrow eyebrow-rule mb-8">Est. {site.established}</p>
            <p className="dropcap max-w-4xl font-display text-display-md font-normal leading-tight text-stone-900">
              Every slab is a single, unrepeatable thing — a record of pressure, heat and
              time. We hold them in depth so you can choose the one that&rsquo;s right, and
              stand behind it from selection to delivery.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Marquee band */}
      <Marquee items={['Granite', 'Marble', 'Quartz', 'Quartzite']} />

      {/* 3 — Materials */}
      <section className="bg-ivory py-band">
        <Container>
          <SectionHeading
            index="01"
            eyebrow="Four materials"
            title="Choose by the stone itself"
            intro="Granite, marble, quartz and quartzite each behave differently. Start where it makes sense for how you live."
          />
          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {materials.map((m, i) => (
              <Reveal key={m.slug} delay={i * 0.06}>
                <Tilt>
                  <ImageTile
                    href={`/materials/${m.slug}`}
                    image={m.image}
                    title={m.name}
                    caption={m.tagline}
                    priority={i === 0}
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </Tilt>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Material visualizer */}
      <section className="snap-start bg-paper py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Try it"
            title="See the surface"
            intro="Pick a collection and watch the surface change. A quick way to feel the palette before you visit."
          />
          <div className="mt-12">
            <MaterialVisualizer collections={collections} />
          </div>
        </Container>
      </section>

      {/* 4 — Collections (horizontal gallery) */}
      <section className="bg-paper py-band-lg">
        <Container>
          <SectionHeading
            index="02"
            eyebrow="Collections"
            title="Curated by colour and character"
            intro="Named groupings that make a wide inventory easy to navigate — each with its own story. Drag or scroll through them."
          />
          <div className="mt-12">
            <CollectionScroller collections={collections} />
          </div>
          <Reveal delay={0.1}>
            <div className="mt-8">
              <Button href="/collections" variant="link">
                View all collections →
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Bookmatched slab band */}
      <Bookmatch
        image={{ src: '/placeholders/collection-calacatta-noir', alt: 'Bookmatched quartzite slab with mirrored veining' }}
        eyebrow="Bookmatched"
        title="Opened like a book, veining mirrored across the seam."
      />

      {/* 5 — Why InStyle */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionRail label="Why InStyle">
            <SectionHeading index="03" eyebrow="Why InStyle" title="A distributor built around selection" />
            <div className="mt-12">
              <PillarList pillars={pillars} />
            </div>
          </SectionRail>
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

      {/* Compare finishes */}
      <section className="bg-ivory pb-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Polished or honed"
            title="The same stone, two finishes"
            intro="Drag to compare. Polished deepens the colour and reflects; honed is matte, softer and more forgiving."
          />
          <Reveal delay={0.1} className="mt-12">
            <CompareSlider
              before={{ src: '/placeholders/collection-ivory-coast', alt: 'Honed marble finish' }}
              after={{ src: '/placeholders/collection-calacatta-noir', alt: 'Polished marble finish' }}
              beforeLabel="Honed"
              afterLabel="Polished"
            />
          </Reveal>
        </Container>
      </section>

      {/* Material research — WebGL shader band */}
      <ShaderBand eyebrow="Material research" title="Stone is never the same twice.">
        <p className="max-w-xl">
          Every slab records its own history of pressure, heat and time. We read that movement
          slab by slab, so what reaches your project is chosen, not just supplied.
        </p>
      </ShaderBand>

      {/* 7 — Live inventory band */}
      <InventoryBanner />

      {/* 8 — Inspiration / room scenes */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading
            index="04"
            eyebrow="Curated environments"
            title="Stone in its element"
            intro="Rooms composed around the material. Explore collections suited to each space — a fuller visualizer is on the roadmap."
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
            index="05"
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
            index="06"
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
