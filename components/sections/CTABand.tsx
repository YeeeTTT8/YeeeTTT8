import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

interface CTABandProps {
  eyebrow?: string;
  title: string;
  body?: string;
  primary: { label: string; href: string; external?: boolean };
  secondary?: { label: string; href: string; external?: boolean };
  /** 'paper' (light raised) or 'ivory'. */
  surface?: 'paper' | 'ivory';
}

/**
 * Reusable call-to-action band on a light surface. Used on the home page for
 * the catalogue download and reused across inner pages.
 */
export function CTABand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  surface = 'paper',
}: CTABandProps) {
  return (
    <section className={surface === 'paper' ? 'bg-paper' : 'bg-ivory'}>
      <Container className="py-band">
        <Reveal className="mx-auto max-w-3xl text-center">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2 className="mt-4 font-display text-display-md font-medium text-stone-900">{title}</h2>
          {body ? <p className="mx-auto mt-4 max-w-prose text-fluid-base text-stone-600">{body}</p> : null}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href={primary.href} external={primary.external} variant="primary" size="lg">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} external={secondary.external} variant="outline" size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
