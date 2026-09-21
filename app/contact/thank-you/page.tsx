import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { inventoryLink } from '@/lib/site';
import { Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Thank you',
  description: 'Your request has been received.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <section className="flex min-h-[70vh] items-center bg-ivory pt-24">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 text-paper">
            <Check className="h-7 w-7" aria-hidden strokeWidth={2} />
          </span>
          <p className="eyebrow mt-8">Request received</p>
          <h1 className="mt-4 font-display text-display-md font-medium text-stone-900">
            Thank you — we&rsquo;ll be in touch.
          </h1>
          <p className="mx-auto mt-6 max-w-prose text-fluid-lg text-stone-600">
            Your request has been received. A member of our team will reply by email or phone,
            usually within one business day.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/collections" variant="dark" size="lg">
              Keep exploring collections
            </Button>
            <Button href={inventoryLink.href} external variant="outline" size="lg">
              Browse live inventory
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
