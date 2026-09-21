import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StoneCard } from '@/components/ui/StoneCard';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { StoneDetailImage } from '@/components/sections/StoneDetailImage';
import { stones, getStone } from '@/content/stones';
import { getCollection } from '@/content/collections';
import { getMaterial } from '@/content/materials';
import { inventoryLink } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';

export function generateStaticParams() {
  return stones.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stone = getStone(slug);
  if (!stone) return {};
  return {
    title: `${stone.name} — ${stone.material}`,
    description: `${stone.name}: ${stone.note}`,
  };
}

export default async function StonePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const stone = getStone(slug);
  if (!stone) notFound();

  const material = getMaterial(stone.material);
  const collection = getCollection(stone.collectionSlug);
  const pairs = stone.pairsWith.map((s) => getStone(s)).filter(Boolean);
  const quoteHref = `/contact?intent=quote&stone=${encodeURIComponent(stone.name)}`;

  const specs: { label: string; value: string }[] = [
    { label: 'Material', value: material?.name ?? stone.material },
    { label: 'Colour family', value: stone.colourFamily },
    { label: 'Finish', value: stone.finish },
    { label: 'Thickness', value: stone.thicknessCm.map((t) => `${t} cm`).join(' · ') },
    { label: 'Origin', value: stone.origin },
    { label: 'Collection', value: collection?.name ?? '—' },
  ];

  return (
    <>
      <section className="bg-ivory pb-band pt-32 sm:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Collections', href: '/collections' },
              ...(collection
                ? [{ label: collection.name, href: `/collections/${collection.slug}` }]
                : []),
              { label: stone.name },
            ]}
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* Image + lightbox */}
            <Reveal>
              <StoneDetailImage images={[stone.image]} />
            </Reveal>

            {/* Details */}
            <div>
              <Reveal>
                {collection ? (
                  <p className="eyebrow">{collection.name}</p>
                ) : null}
                <h1 className="mt-4 text-display-md font-medium text-stone-900">{stone.name}</h1>
                <div className="rule-brass mt-6" />
                <p className="mt-6 text-fluid-lg text-stone-600">{stone.note}</p>
              </Reveal>

              <Reveal delay={0.08}>
                <dl className="mt-8 divide-y divide-hairline border-y border-hairline">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-fluid-sm uppercase tracking-eyebrow text-stone-600">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-medium text-stone-900">
                        {spec.value === 'TODO(client)' ? (
                          <span className="font-normal text-stone-600">To be confirmed</span>
                        ) : (
                          spec.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-col gap-3">
                  <Button href={quoteHref} variant="primary" size="lg">
                    Request a sample or quote
                  </Button>
                  <Button
                    href={inventoryLink.href}
                    external
                    variant="outline"
                    size="lg"
                    className="justify-center"
                  >
                    Check live availability
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Pairs with */}
      {pairs.length > 0 ? (
        <section className="bg-paper py-band-lg">
          <Container>
            <SectionHeading eyebrow="Pairs well with" title="Complementary stones" />
            <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {pairs.map((s) =>
                s ? <StoneCard key={s.slug} stone={s} /> : null,
              )}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
