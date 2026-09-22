import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { LocationCard } from '@/components/ui/LocationCard';
import { PageIntro } from '@/components/sections/PageIntro';
import { ShowroomsNetwork } from '@/components/sections/ShowroomsNetwork';
import { CTABand } from '@/components/sections/CTABand';
import { locations } from '@/content/locations';

export const metadata: Metadata = {
  title: 'Showrooms',
  description: 'Visit an InStyle or Avani showroom to view full slabs in person across our locations.',
};

export default function ShowroomsPage() {
  const instyle = locations.filter((l) => l.brand === 'InStyle');
  const avani = locations.filter((l) => l.brand === 'Avani');

  return (
    <>
      <PageIntro
        eyebrow="Showrooms"
        title="See the slabs in person"
        intro="Natural stone is best chosen face to face. Visit us across the InStyle and Avani brands. Addresses and hours are being finalised — TODO(client)."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Showrooms' }]}
      />

      <ShowroomsNetwork />

      <section className="bg-ivory py-band-lg">
        <Container>
          <h2 className="font-display text-display-sm font-medium text-stone-900">InStyle</h2>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {instyle.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>

          <h2 className="mt-20 font-display text-display-sm font-medium text-stone-900">Avani</h2>
          <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {avani.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Planning a visit?"
        title="Tell us what you're looking for"
        body="Let us know the material and look you're after and we'll have relevant slabs ready when you arrive."
        primary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
      />
    </>
  );
}
