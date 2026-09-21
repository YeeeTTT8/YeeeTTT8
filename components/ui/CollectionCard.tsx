import Link from 'next/link';
import type { Collection } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  collection: Collection;
  className?: string;
  sizes?: string;
}

/**
 * Featured collection card: image with slow hover zoom, poetic name, one-line
 * story and a "View collection" cue with an animated underline.
 */
export function CollectionCard({ collection, className, sizes }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn('group block', className)}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-900">
        <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
          <StoneImage
            image={collection.image}
            sizes={sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            showTag={false}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        />
      </div>
      <p className="mt-5 text-[11px] font-semibold uppercase tracking-eyebrow text-brass">
        Collection
      </p>
      <h3 className="mt-2 font-display text-3xl font-medium text-stone-900">{collection.name}</h3>
      <p className="mt-2 text-fluid-base text-stone-600">{collection.story}</p>
      <span className="link-underline mt-4 inline-block text-fluid-sm font-medium text-stone-900">
        View collection
      </span>
    </Link>
  );
}
