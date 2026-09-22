import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageIntro } from '@/components/sections/PageIntro';
import { SelectionBoard } from '@/components/selection/SelectionBoard';
import { stones } from '@/content/stones';

export const metadata: Metadata = {
  title: 'My Selection',
  description: 'Your saved stones — request samples or a quote for the whole set at once.',
  robots: { index: false, follow: false },
};

export default function SelectionPage() {
  return (
    <>
      <PageIntro
        eyebrow="My selection"
        title="Your saved stones"
        intro="Everything you've hearted, in one place. Request samples or a quote for the whole set."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'My Selection' }]}
      />
      <section className="bg-ivory pb-band-lg">
        <Container>
          <SelectionBoard stones={stones} />
        </Container>
      </section>
    </>
  );
}
