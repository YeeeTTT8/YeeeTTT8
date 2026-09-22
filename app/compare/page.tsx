import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageIntro } from '@/components/sections/PageIntro';
import { SlabComparer } from '@/components/sections/SlabComparer';
import { CTABand } from '@/components/sections/CTABand';
import { stones } from '@/content/stones';

export const metadata: Metadata = {
  title: 'Compare Slabs',
  description: 'Pick any two stones and compare them side by side — colour, veining and finish.',
  alternates: { canonical: '/compare' },
};

export default function ComparePage() {
  return (
    <>
      <PageIntro
        eyebrow="Compare"
        title="Two slabs, side by side"
        intro="Choosing between stones? Pick any two and drag to compare their colour, veining and finish — then request a quote on the one you love."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <SlabComparer stones={stones} />
        </Container>
      </section>

      <CTABand
        eyebrow="Narrowed it down?"
        title="Reserve a slab or request a quote"
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'Browse collections', href: '/collections' }}
      />
    </>
  );
}
