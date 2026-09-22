'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Collection } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';

/**
 * (#1) Material visualizer — a large surface that crossfades between collection
 * textures as you pick a swatch. A lightweight, image-based stand-in for a full
 * room visualizer; works with the imagery we have.
 */
export function MaterialVisualizer({ collections }: { collections: Collection[] }) {
  const [active, setActive] = useState(0);
  const current = collections[active]!;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
      {/* Surface */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-900">
        {collections.map((c, i) => (
          <div
            key={c.slug}
            className={cn(
              'absolute inset-0 transition-opacity duration-700 ease-editorial',
              i === active ? 'opacity-100' : 'opacity-0',
            )}
          >
            <StoneImage image={c.image} sizes="(min-width:1024px) 60vw, 100vw" showTag={false} priority={i === 0} />
          </div>
        ))}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-paper [text-shadow:0_1px_16px_rgba(0,0,0,0.5)]">
          <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brass">Now showing</p>
          <h3 className="mt-1 font-display text-3xl font-medium">{current.name}</h3>
          <p className="mt-1 max-w-md text-fluid-sm text-paper/85">{current.story}</p>
        </div>
      </div>

      {/* Swatches */}
      <div className="flex flex-col justify-center">
        <p className="eyebrow eyebrow-rule mb-5">Choose a surface</p>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              aria-label={c.name}
              className={cn(
                'relative aspect-square overflow-hidden rounded-sm ring-offset-2 ring-offset-ivory transition-all',
                i === active ? 'ring-2 ring-brass' : 'ring-1 ring-hairline hover:ring-stone-600',
              )}
            >
              <StoneImage image={c.image} sizes="120px" showTag={false} />
            </button>
          ))}
        </div>
        <Link
          href={`/collections/${current.slug}`}
          className="link-underline mt-6 inline-flex items-center gap-1 text-fluid-sm font-medium text-stone-900"
        >
          View {current.name}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
