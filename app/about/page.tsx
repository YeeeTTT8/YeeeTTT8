import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StoneImage } from '@/components/ui/StoneImage';
import { StatCounter } from '@/components/ui/StatCounter';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { site } from '@/lib/site';
import { locations } from '@/content/locations';

export const metadata: Metadata = {
  title: 'About',
  description: `Natural stone importer and distributor since ${site.established}. The story of InStyle and its sister brand Avani.`,
};

const values = [
  {
    title: 'Selection first',
    body: 'Everything we do is built around helping you find the right slab — not just any slab.',
  },
  {
    title: 'Direct sourcing',
    body: 'Bringing stone in directly keeps our range wide and our supply dependable.',
  },
  {
    title: 'Straight talk',
    body: 'Honest guidance on how each material behaves, so you choose with clear eyes.',
  },
];

export default function AboutPage() {
  const years = new Date().getFullYear() - site.established;

  return (
    <>
      <PageIntro
        eyebrow="About"
        title="A stone business built on selection"
        intro={`Since ${site.established}, we've imported and distributed natural stone — granite, marble, quartz and quartzite — direct from quarry to project.`}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Story + image */}
      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-stone-900">
                <StoneImage
                  image={{ src: '/placeholders/about-warehouse', alt: 'Natural stone slabs stored in a warehouse' }}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  showTag={false}
                />
              </div>
            </Reveal>
            <Reveal delay={0.08} className="flex flex-col justify-center">
              <h2 className="font-display text-display-sm font-medium text-stone-900">Our story</h2>
              <div className="mt-6 space-y-5 text-fluid-base text-stone-600">
                <p>
                  InStyle Granite &amp; Marble was established in {site.established} as a natural
                  stone importer and distributor, bringing slabs in direct from the quarry and
                  holding them in depth for fabricators, builders, designers and homeowners.
                </p>
                <p>
                  Today the business spans two brands — InStyle in Houston, and its sister brand
                  Avani Granite &amp; Marble in Memphis, Nashville and Denver — with additional
                  reach in Atlanta and Columbus.
                </p>
                <p className="text-stone-600">
                  TODO(client): expand the story with any milestones, founding details or figures
                  you&rsquo;d like to include (all verified).
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="bg-paper py-band">
        <Container>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <StatCounter value={years} suffix="+" label="Years in stone" />
            <StatCounter value={locations.length} label="Showroom cities" />
            <StatCounter value={2} label="Brands" />
            <StatCounter value={4} label="Core materials" />
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading eyebrow="What we value" title="How we work" />
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08} className="border-t border-hairline pt-6">
                <h3 className="font-display text-2xl font-medium text-stone-900">{v.title}</h3>
                <p className="mt-2 text-fluid-base text-stone-600">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Come see for yourself"
        title="Visit a showroom"
        primary={{ label: 'Find a showroom', href: '/showrooms' }}
        secondary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
      />
    </>
  );
}
