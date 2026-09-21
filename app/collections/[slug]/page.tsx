import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { StoneImage } from '@/components/ui/StoneImage';
import { StoneGrid } from '@/components/ui/StoneGrid';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { collections, getCollection } from '@/content/collections';
import { getStonesByCollection } from '@/content/stones';
import { getMaterial } from '@/content/materials';

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return { title: collection.name, description: collection.description };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const stones = getStonesByCollection(collection.slug);
  const material = getMaterial(collection.material);

  return (
    <>
      <PageIntro
        eyebrow={material ? `${material.name} collection` : 'Collection'}
        title={collection.name}
        intro={collection.description}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Collections', href: '/collections' },
          { label: collection.name },
        ]}
      />

      <section className="bg-ivory pb-band">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/7] w-full overflow-hidden rounded-sm bg-stone-900">
              <StoneImage image={collection.image} sizes="100vw" priority showTag={false} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-band-lg">
        <Container>
          <h2 className="font-display text-display-sm font-medium text-stone-900">
            Stones in this collection
          </h2>
          <div className="rule-brass mt-6" />
          <div className="mt-10">
            <StoneGrid stones={stones} filters={['colour', 'finish']} />
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Found one you like?"
        title="Reserve a slab or request a quote"
        body="Tell us which stones caught your eye — we'll check availability and hold what you need."
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'All collections', href: '/collections' }}
      />
    </>
  );
}
