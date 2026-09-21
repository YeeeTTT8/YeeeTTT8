import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { env } from '@/lib/env';
import { Phone, Mail, MessageCircle, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Request a Quote',
  description: 'Request a quote or reach an InStyle Granite & Marble showroom. Homeowner and trade enquiries welcome.',
};

function digits(s: string): string {
  return s.replace(/[^\d]/g, '');
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; stone?: string; audience?: string }>;
}) {
  const sp = await searchParams;
  const initialStone = sp.stone ?? '';
  const initialAudience = sp.audience === 'trade' ? 'trade' : 'homeowner';
  const hasPhone = env.phone && !env.phone.startsWith('+1000');
  const hasWhatsApp = env.whatsapp && !env.whatsapp.startsWith('+1000');
  const hasEmail = env.contactEmail && !env.contactEmail.includes('example.com');

  return (
    <section className="bg-ivory pb-band-lg pt-32 sm:pt-36">
      <Container>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <Reveal className="mt-8 max-w-3xl">
          <p className="eyebrow mb-4">Request a Quote</p>
          <h1 className="text-display-lg font-medium text-stone-900">
            Tell us about your project
          </h1>
          <div className="rule-brass mt-6" />
          <p className="mt-6 text-fluid-lg text-stone-600">
            Homeowner or trade — share the details and we&rsquo;ll help you find the right stone,
            check availability and get you a quote.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <QuoteForm initialStone={initialStone} initialAudience={initialAudience} />
          </Reveal>

          <Reveal delay={0.1} as="aside" className="lg:border-l lg:border-hairline lg:pl-12">
            <h2 className="font-display text-2xl font-medium text-stone-900">Prefer to reach us directly?</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">Phone</p>
                  {hasPhone ? (
                    <a href={`tel:${digits(env.phone)}`} className="link-underline text-fluid-base text-stone-900">
                      {env.phone}
                    </a>
                  ) : (
                    <p className="text-fluid-base text-stone-600">TODO(client): phone</p>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">WhatsApp</p>
                  {hasWhatsApp ? (
                    <a
                      href={`https://wa.me/${digits(env.whatsapp)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline text-fluid-base text-stone-900"
                    >
                      Message us
                    </a>
                  ) : (
                    <p className="text-fluid-base text-stone-600">TODO(client): WhatsApp</p>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">Email</p>
                  {hasEmail ? (
                    <a href={`mailto:${env.contactEmail}`} className="link-underline text-fluid-base text-stone-900">
                      {env.contactEmail}
                    </a>
                  ) : (
                    <p className="text-fluid-base text-stone-600">TODO(client): email</p>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brass" aria-hidden strokeWidth={1.5} />
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">Showrooms</p>
                  <Link href="/showrooms" className="link-underline text-fluid-base text-stone-900">
                    Find a location
                  </Link>
                </div>
              </li>
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
