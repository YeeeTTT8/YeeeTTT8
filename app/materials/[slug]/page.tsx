import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StoneImage } from '@/components/ui/StoneImage';
import { CollectionCard } from '@/components/ui/CollectionCard';
import { StoneGrid } from '@/components/ui/StoneGrid';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { materials, getMaterial } from '@/content/materials';
import { collections } from '@/content/collections';
import { getStonesByMaterial } from '@/content/stones';
import { Check } from 'lucide-react';

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) return {};
  return {
    title: `${material.name} — Natural Stone`,
    description: material.intro,
    alternates: { canonical: `/materials/${material.slug}` },
  };
}

export default async function MaterialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();

  const related = collections.filter((c) => c.material === material.slug);
  const stones = getStonesByMaterial(material.slug);

  return (
    <>
      <PageIntro
        eyebrow="Material"
        title={material.name}
        intro={material.intro}
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Materials', href: '/materials' },
          { label: material.name },
        ]}
      />

      {/* Image band */}
      <section className="bg-ivory pb-band">
        <Container>
          <RevealImage className="relative aspect-[16/7] w-full rounded-sm bg-stone-900">
            <StoneImage image={material.image} sizes="100vw" priority showTag={false} />
          </RevealImage>
        </Container>
      </section>

      {/* Characteristics + best uses + care */}
      <section className="bg-paper py-band-lg">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal>
              <h2 className="font-display text-3xl font-medium text-stone-900">Characteristics</h2>
              <ul className="mt-6 space-y-3">
                {material.characteristics.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-fluid-base text-stone-600">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brass" aria-hidden strokeWidth={2} />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="font-display text-3xl font-medium text-stone-900">Best uses</h2>
              <ul className="mt-6 space-y-3">
                {material.bestUses.map((u) => (
                  <li key={u} className="flex items-start gap-3 text-fluid-base text-stone-600">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brass" aria-hidden strokeWidth={2} />
                    {u}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.16}>
              <h2 className="font-display text-3xl font-medium text-stone-900">Care</h2>
              <p className="mt-6 text-fluid-base text-stone-600">{material.careSummary}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Related collections */}
      {related.length > 0 ? (
        <section className="bg-ivory py-band-lg">
          <Container>
            <SectionHeading eyebrow="Within this material" title="Related collections" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <CollectionCard collection={c} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      {/* Stones in this material */}
      {stones.length > 0 ? (
        <section className="bg-paper py-band-lg">
          <Container>
            <SectionHeading eyebrow="Slabs" title={`${material.name} we stock`} />
            <div className="mt-10">
              <StoneGrid stones={stones} filters={['colour', 'finish']} />
            </div>
          </Container>
        </section>
      ) : null}

      <CTABand
        eyebrow="Ready to choose?"
        title={`Request ${material.name.toLowerCase()} slabs`}
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'View collections', href: '/collections' }}
      />
    </>
  );
}
