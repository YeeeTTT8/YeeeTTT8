import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { ImageTile } from '@/components/ui/ImageTile';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { materials } from '@/content/materials';
import { inventoryLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Materials — Granite, Marble, Quartz & Quartzite',
  description:
    'The four stone materials we stock, how each behaves, and where each is at its best.',
};

export default function MaterialsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Materials"
        title="Four stones, four temperaments"
        intro="Granite, marble, quartz and quartzite look different, wear differently and suit different rooms. Start with the material, then explore the collections within it."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Materials' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      <CTABand
        eyebrow="Not sure which?"
        title="Tell us about your project"
        body="Describe the room and how you use it — we'll point you to the materials and slabs that fit."
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'Live Inventory', href: inventoryLink.href, external: true }}
      />
    </>
  );
}
