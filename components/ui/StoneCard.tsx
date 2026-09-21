import Link from 'next/link';
import type { Stone } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';

interface StoneCardProps {
  stone: Stone;
  className?: string;
  sizes?: string;
}

/**
 * Stone tile for collection/material grids: image with slow hover zoom, name,
 * material · colour · finish meta, and a "View stone" cue. Availability and
 * quote actions live on the stone detail page.
 */
export function StoneCard({ stone, className, sizes }: StoneCardProps) {
  return (
    <Link href={`/stones/${stone.slug}`} className={cn('group block', className)}>
      <div className="relative aspect-square overflow-hidden rounded-sm bg-stone-900">
        <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
          <StoneImage
            image={stone.image}
            sizes={sizes ?? '(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw'}
            showTag={false}
          />
        </div>
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium text-stone-900">{stone.name}</h3>
      <p className="mt-1 text-fluid-sm text-stone-600">
        {stone.material.charAt(0).toUpperCase() + stone.material.slice(1)} · {stone.colourFamily} ·{' '}
        {stone.finish}
      </p>
    </Link>
  );
}
