import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageIntro } from '@/components/sections/PageIntro';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'The terms governing use of the InStyle Granite & Marble website.',
};

export default function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms of Use"
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Terms' }]}
      />
      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="max-w-prose space-y-6 text-fluid-base text-stone-600">
            <p className="rounded-sm border border-hairline bg-paper p-4 text-fluid-sm">
              <strong className="text-stone-900">TODO(client):</strong> Placeholder copy and
              structure only. Replace with terms reviewed by qualified counsel before launch.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Use of this site</h2>
            <p>
              This website is provided for information about our natural stone products and
              services. Product imagery is representative; natural stone varies slab to slab, and
              actual slabs should be viewed before purchase.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Availability &amp; pricing</h2>
            <p>
              Inventory shown on linked third-party systems reflects stock at the time of viewing
              and may change. TODO(client): confirm how quotes, availability and pricing are
              handled contractually.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Intellectual property</h2>
            <p>
              Content on this site is owned by or licensed to us. TODO(client): confirm ownership,
              trademarks and permitted use.
            </p>
            <h2 className="font-display text-2xl font-medium text-stone-900">Liability</h2>
            <p>
              TODO(client): add limitation-of-liability, warranty and governing-law provisions as
              advised by counsel.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
