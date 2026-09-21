import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { inventoryLink } from '@/lib/site';

/**
 * Dark full-bleed band driving to the external StoneProfitsWeb live inventory.
 * Link opens in a new tab with rel=noopener noreferrer (handled by Button).
 */
export function InventoryBanner() {
  return (
    <section className="bg-stone-900 text-paper">
      <Container className="py-band">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <Reveal>
            <p className="eyebrow text-brass">Updated continuously</p>
            <h2 className="mt-4 max-w-2xl text-display-md font-medium text-paper">
              See what&rsquo;s in stock today.
            </h2>
            <p className="mt-4 max-w-xl text-fluid-base text-paper/70">
              Browse live slab inventory on StoneProfitsWeb — current availability across
              our warehouses, updated as stock moves.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button
              href={inventoryLink.href}
              external
              variant="outline"
              size="lg"
              className="border-paper text-paper hover:bg-paper hover:text-stone-900"
            >
              Browse Live Inventory
            </Button>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
