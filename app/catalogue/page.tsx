import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { PageIntro } from '@/components/sections/PageIntro';
import { hasCatalogue, catalogueRequestHref } from '@/lib/catalogue';
import { Download, FileText, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Catalogue',
  description: 'The InStyle Granite & Marble catalogue of materials, collections and finishes.',
};

export default function CataloguePage() {
  return (
    <>
      <PageIntro
        eyebrow="Resources"
        title="Catalogue"
        intro="A PDF overview of our materials, collections and finishes to share with your fabricator or design team."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Catalogue' }]}
      />
      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="flex max-w-2xl flex-col gap-6 rounded-sm border border-hairline bg-paper p-8">
            <div className="flex items-start gap-4">
              <FileText className="h-10 w-10 shrink-0 text-brass" aria-hidden strokeWidth={1.25} />
              <div>
                <h2 className="font-display text-2xl font-medium text-stone-900">
                  InStyle catalogue (PDF)
                </h2>
                {/* TODO(client): add the finished catalogue at /public/catalogue.pdf — the
                    download button below links there and serves it once present. */}
                <p className="mt-2 text-fluid-sm text-stone-600">
                  Materials, collections and finishes in one overview — ready to share with your
                  fabricator or design team.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {hasCatalogue ? (
                <Button href="/catalogue.pdf" external variant="primary" size="lg">
                  <Download className="h-5 w-5" aria-hidden />
                  Download catalogue
                </Button>
              ) : (
                <Button href={catalogueRequestHref} variant="primary" size="lg">
                  <Mail className="h-5 w-5" aria-hidden />
                  Request the catalogue
                </Button>
              )}
              <Button href="/contact?intent=quote" variant="outline" size="lg">
                Request a quote instead
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
