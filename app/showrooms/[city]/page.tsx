import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { StoneImage } from '@/components/ui/StoneImage';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTABand } from '@/components/sections/CTABand';
import { JsonLd } from '@/components/seo/JsonLd';
import { localBusinessJsonLd } from '@/lib/seo/jsonld';
import { locations, getLocation } from '@/content/locations';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export function generateStaticParams() {
  return locations.map((l) => ({ city: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) return {};
  return {
    title: `${loc.brand} — ${loc.city}, ${loc.state} Showroom`,
    description: `Visit the ${loc.brand} natural stone showroom in ${loc.city}, ${loc.state}.`,
    alternates: { canonical: `/showrooms/${loc.slug}` },
  };
}

function TodoOr({ value, children }: { value: string; children?: React.ReactNode }) {
  const isTodo = value.startsWith('TODO');
  return isTodo ? (
    <span className="text-stone-600">To be confirmed</span>
  ) : (
    <>{children ?? value}</>
  );
}

export default async function ShowroomPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const loc = getLocation(city);
  if (!loc) notFound();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(loc)} />
      <section className="bg-ivory pb-band pt-32 sm:pt-36">
        <Container>
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Showrooms', href: '/showrooms' },
              { label: `${loc.city}, ${loc.state}` },
            ]}
          />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
            <RevealImage className="relative aspect-[4/3] w-full rounded-sm bg-stone-900">
              <StoneImage image={loc.image} sizes="(min-width: 1024px) 55vw, 100vw" priority showTag={false} />
            </RevealImage>
            <div>
              <Reveal>
                <p className="eyebrow">{loc.brand}</p>
                <h1 className="mt-4 text-display-md font-medium text-stone-900">
                  {loc.city}, {loc.state}
                </h1>
                <div className="rule-brass mt-6" />
              </Reveal>
              <Reveal delay={0.08}>
                <dl className="mt-8 space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                    <div>
                      <dt className="sr-only">Address</dt>
                      <dd className="text-fluid-base text-stone-600">
                        <TodoOr value={loc.addressLines.join(', ')}>
                          {loc.addressLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </TodoOr>
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd className="text-fluid-base text-stone-600">
                        <TodoOr value={loc.phone} />
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd className="text-fluid-base text-stone-600">
                        <TodoOr value={loc.email} />
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                    <div>
                      <dt className="sr-only">Hours</dt>
                      <dd className="text-fluid-base text-stone-600">
                        {loc.hours.map((h) => (
                          <span key={h.day} className="flex justify-between gap-6">
                            <span>{h.day}</span>
                            <span>{h.hours.startsWith('TODO') ? 'To be confirmed' : h.hours}</span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  </div>
                </dl>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href={loc.mapsUrl} external variant="dark" size="md">
                    Get directions
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <Button href="/contact?intent=quote" variant="outline" size="md">
                    Request a Quote
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Other locations"
        title="Find another showroom"
        primary={{ label: 'All showrooms', href: '/showrooms' }}
      />
    </>
  );
}
