import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PageIntro } from '@/components/sections/PageIntro';
import { GalleryGrid } from '@/components/sections/GalleryGrid';
import { CTABand } from '@/components/sections/CTABand';
import { galleryItems } from '@/content/gallery';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Natural stone in finished spaces — kitchens, bathrooms, living areas and commercial projects.',
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gallery"
        title="Stone in place"
        intro="Slabs become surfaces. A look at natural stone across kitchens, bathrooms, living spaces and commercial work. Imagery below is placeholder until project photography is supplied."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Gallery' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <GalleryGrid items={galleryItems} />
        </Container>
      </section>

      <CTABand
        eyebrow="Start yours"
        title="Bring us your project"
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
        secondary={{ label: 'Explore collections', href: '/collections' }}
      />
    </>
  );
}
