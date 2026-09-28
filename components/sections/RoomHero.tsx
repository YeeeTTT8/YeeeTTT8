import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/MagneticButton';
import { site, quoteLink } from '@/lib/site';

interface RoomHeroProps {
  image: ImageRef;
}

/**
 * Opening frame: one finished room, full-bleed, with a single short line and
 * one clear action. Deliberately sparse — the stone does the talking; the
 * interactive slab compare follows directly below.
 */
export function RoomHero({ image }: RoomHeroProps) {
  return (
    <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-stone-900 text-paper">
      <div className="absolute inset-0">
        <StoneImage image={image} sizes="100vw" priority showTag={false} />
      </div>

      {/* Legibility scrims: a soft bottom-left pool for the copy, a light top
          wash for the transparent header. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/25 to-stone-900/40"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-stone-900/55 via-transparent to-transparent"
      />
      <div className="grain" />

      <Container className="relative z-10 flex h-full flex-col justify-end pb-24 pt-32 sm:pb-28">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow eyebrow-rule text-paper/80">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-display-xl font-normal text-paper">
              Stone, chosen <em className="italic text-brass">slab by slab</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-fluid-lg text-paper/85">
              Natural granite, marble, quartz and quartzite — imported direct since{' '}
              {site.established}.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Magnetic>
                <Button href="/collections" variant="light" size="lg">
                  Explore Collections
                </Button>
              </Magnetic>
              <Button href={quoteLink.href} variant="link-light" className="text-fluid-base">
                {quoteLink.label} →
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-4 z-10 hidden flex-col items-center gap-3 sm:right-6 sm:flex lg:right-10">
        <span className="text-[11px] uppercase tracking-eyebrow text-paper/70 [writing-mode:vertical-rl]">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-paper/60 to-transparent" aria-hidden />
      </div>
    </section>
  );
}
