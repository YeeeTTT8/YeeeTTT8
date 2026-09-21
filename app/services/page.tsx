import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { services } from '@/content/services';
import { ArrowUpRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Services',
  description: 'How we support your project — slab selection, trade program, fabrication referrals, delivery and more.',
};

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Services"
        title="From selection to delivery"
        intro="We are a distributor built around helping you choose the right stone and get it where it needs to go."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="article" key={s.slug} delay={i * 0.06} className="border-t border-hairline pt-6">
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
        eyebrow="Trade or homeowner"
        title="Let's talk about your project"
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
      />
    </>
  );
}
