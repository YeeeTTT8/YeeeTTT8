import Link from 'next/link';
import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

interface ImageTileProps {
  href: string;
  image: ImageRef;
  eyebrow?: string;
  title: string;
  caption?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Aspect ratio utility class, e.g. 'aspect-[4/5]'. */
  ratio?: string;
}

/**
 * Editorial image tile: full-bleed image with a slow hover zoom and a thin
 * inset border reveal, label overlaid at the base. Used for materials and
 * room scenes.
 */
export function ImageTile({
  href,
  image,
  eyebrow,
  title,
  caption,
  className,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  priority = false,
  ratio = 'aspect-[4/5]',
}: ImageTileProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block overflow-hidden rounded-sm bg-stone-900',
        ratio,
        className,
      )}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
        <StoneImage image={image} sizes={sizes} priority={priority} showTag={false} />
      </div>

      {/* Legibility gradient */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/35 to-stone-900/5"
      />

      {/* Thin border reveal on hover */}
      <div
        aria-hidden
        className="absolute inset-3 rounded-sm border border-paper/0 transition-colors duration-700 ease-editorial group-hover:border-paper/40"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 text-paper [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brass">{eyebrow}</p>
        ) : null}
        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-medium">{title}</h3>
          <ArrowUpRight
            className="h-5 w-5 shrink-0 -translate-x-1 opacity-0 transition-all duration-500 ease-editorial group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden
          />
        </div>
        {caption ? <p className="mt-1 text-fluid-sm text-paper/80">{caption}</p> : null}
      </div>
    </Link>
  );
}
