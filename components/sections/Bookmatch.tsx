import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { RevealImage } from '@/components/ui/RevealImage';
import { Container } from '@/components/ui/Container';

/**
 * Full-bleed bookmatched slab band — two mirrored copies of the same slab
 * meeting at the centre seam, the way fabricators open a block like a book.
 * An optional caption sits over the join.
 */
export function Bookmatch({
  image,
  eyebrow,
  title,
}: {
  image: ImageRef;
  eyebrow?: string;
  title?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-stone-900">
      <RevealImage className="grid grid-cols-2">
        <div className="relative aspect-[4/3] sm:aspect-[16/9]">
          <StoneImage image={image} sizes="50vw" showTag={false} />
        </div>
        <div className="relative aspect-[4/3] -scale-x-100 sm:aspect-[16/9]">
          <StoneImage image={image} sizes="50vw" showTag={false} />
        </div>
      </RevealImage>

      {/* Centre seam */}
      <div aria-hidden className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-paper/20" />
      <div aria-hidden className="absolute inset-0 bg-stone-900/25" />
      <div className="grain" />

      {(eyebrow || title) && (
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-md text-paper">
              {eyebrow ? <p className="eyebrow text-brass">{eyebrow}</p> : null}
              {title ? (
                <p className="mt-4 font-display text-display-md font-normal leading-tight">
                  {title}
                </p>
              ) : null}
            </div>
          </Container>
        </div>
      )}
    </section>
  );
}
