import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { CTABand } from '@/components/sections/CTABand';
import { services, getService } from '@/content/services';

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
  return { title: service.name, description: service.summary };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

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
          <Reveal className="mt-8 max-w-3xl">
            <Icon name={service.icon} className="h-9 w-9 text-brass" />
            <h1 className="mt-6 text-display-lg font-medium text-stone-900">{service.name}</h1>
            <div className="rule-brass mt-6" />
            <p className="mt-6 text-fluid-lg text-stone-600">{service.summary}</p>
            <p className="mt-6 text-fluid-base text-stone-600">{service.body}</p>
          </Reveal>
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
