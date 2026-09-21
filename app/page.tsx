import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { site } from '@/lib/site';
import { quoteLink, inventoryLink } from '@/lib/site';

/**
 * Interim home page (Phase 1). The full home — video hero, materials tiles,
 * featured collections, pillars, stats, inventory band, showrooms, journal —
 * is built in Phase 2. This placeholder still exercises the header's
 * transparent-over-hero behaviour with a dark full-bleed band.
 */
export default function HomePage() {
  return (
    <>
      {/* Dark hero band — stands in for the warehouse video hero. */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-stone-900 text-paper">
        {/* Placeholder texture. TODO(client): warehouse-tour.mp4 + poster. */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(120% 80% at 70% 10%, #2a2621 0%, #1a1816 55%, #100f0d 100%)',
          }}
        />
        <div aria-hidden className="absolute inset-0 bg-stone-900/30" />
        <Container className="relative z-10 pb-band pt-40">
          <Reveal>
            <p className="eyebrow text-brass">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 max-w-4xl text-display-xl font-medium text-paper">
              Stone selected slab by slab, from our quarries to your project.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-fluid-lg text-paper/80">
              A Houston natural-stone distributor since {site.established} — granite,
              marble, quartz and quartzite, held in depth across six locations.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/collections" variant="primary" size="lg">
                Explore Collections
              </Button>
              <Button
                href={inventoryLink.href}
                external
                variant="outline"
                size="lg"
                className="border-paper/70 text-paper hover:bg-paper hover:text-stone-900"
              >
                {inventoryLink.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Intro statement band */}
      <section className="bg-ivory py-band-lg">
        <Container>
          <SectionHeading
            eyebrow="Foundation in place"
            title="Phase 1 — the design system is built."
            intro="Tokens, fonts, layout, header, footer and the core UI primitives are wired up. The full home page and inner routes land in the phases that follow."
          />
          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/_design" variant="dark" size="md">
                View design tokens
              </Button>
              <Button href={quoteLink.href} variant="link">
                Request a quote →
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
