import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { collections } from '@/content/collections';
import { inventoryLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Collections',
  description:
    'Named collections that organise our stone by colour and character — from pale marbles to dramatic dark granites.',
};

export default function CollectionsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Collections"
        title="Organised by colour and character"
        intro="A wide inventory made navigable. Each collection gathers stones that share a mood — start with the one that fits your room."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Collections' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.06}>
                <CollectionCard collection={c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="See it live"
        title="Check current availability"
        body="Collections show the look; live inventory shows what's in stock right now."
        primary={{ label: 'Live Inventory', href: inventoryLink.href, external: true }}
        secondary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
      />
    </>
  );
}
