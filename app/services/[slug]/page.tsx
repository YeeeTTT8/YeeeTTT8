import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { RevealImage } from '@/components/ui/RevealImage';
import { StoneImage } from '@/components/ui/StoneImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CTABand } from '@/components/sections/CTABand';
import { services, getService } from '@/content/services';
import { ArrowUpRight } from 'lucide-react';

/** Representative imagery per service (resolved via lib/images like the rest
 * of the site). TODO(client): swap for real photography. */
const SERVICE_IMAGE: Record<string, { src: string; alt: string }> = {
  'slab-selection': {
    src: '/placeholders/journal-read-a-slab',
    alt: 'Inspecting a full slab in the warehouse',
  },
  'trade-program': {
    src: '/placeholders/room-commercial',
    alt: 'Commercial interior finished in natural stone',
  },
  'fabrication-partners': {
    src: '/placeholders/room-kitchen',
    alt: 'Fabricated stone kitchen island',
  },
  'delivery-logistics': {
    src: '/placeholders/about-warehouse',
    alt: 'Slabs racked in the warehouse ready for delivery',
  },
  sourcing: { src: '/placeholders/material-quartzite', alt: 'Quartzite slab surface' },
  'prefab-tops': { src: '/placeholders/room-bathroom', alt: 'Stone vanity top in a bathroom' },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const image = SERVICE_IMAGE[service.slug];
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="bg-ivory pb-band pt-32 sm:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: service.name },
            ]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <Icon name={service.icon} className="h-9 w-9 text-brass" />
              <h1 className="mt-6 text-display-lg font-medium text-stone-900">{service.name}</h1>
              <div className="rule-brass mt-6" />
              <p className="mt-6 text-fluid-lg text-stone-600">{service.summary}</p>
              <p className="mt-6 text-fluid-base text-stone-600">{service.body}</p>
            </Reveal>
            {image ? (
              <RevealImage className="relative aspect-[4/5] w-full rounded-sm bg-stone-900 lg:aspect-[4/5]">
                <StoneImage
                  image={image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  showTag={false}
                />
              </RevealImage>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-band-lg">
        <Container>
          <SectionHeading eyebrow="Also from InStyle" title="Other services" />
          <div className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s, i) => (
              <Reveal
                as="article"
                key={s.slug}
                delay={i * 0.06}
                className="border-t border-hairline pt-6"
              >
                <Icon name={s.icon} className="h-7 w-7 text-brass" />
                <h2 className="mt-4 font-display text-2xl font-medium text-stone-900">{s.name}</h2>
                <p className="mt-2 text-fluid-base text-stone-600">{s.summary}</p>
                <Link
                  href={`/services/${s.slug}`}
                  className="link-underline mt-4 inline-flex items-center gap-1 text-fluid-sm font-medium text-stone-900"
                >
                  Learn more
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Next step"
        title="Request a quote"
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'All services', href: '/services' }}
      />
    </>
  );
}
