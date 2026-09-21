'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Collection } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Horizontal, scroll-snapping collections gallery — a gallery-wall browse.
 * Uses native horizontal scroll (touch/trackpad friendly) with snap points and
 * optional arrow controls; no scroll-jacking, so it never fights the page.
 */
export function CollectionScroller({ collections }: { collections: Collection[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 520) * dir;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {collections.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw]"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-900">
              <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
                <StoneImage image={c.image} sizes="(min-width:1024px) 30vw, (min-width:640px) 46vw, 78vw" showTag={false} />
              </div>
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/30 to-stone-900/5" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-paper">
                <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brass">Collection</p>
                <h3 className="mt-2 font-display text-3xl font-medium">{c.name}</h3>
                <p className="mt-1 text-fluid-sm text-paper/80">{c.story}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Arrow controls (desktop) */}
      <div className="mt-6 hidden gap-3 lg:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Previous collections"
          className="rounded-full border border-stone-300 p-3 text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-2 focus-visible:outline-brass"
        >
          <ArrowLeft className="h-5 w-5" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Next collections"
          className="rounded-full border border-stone-300 p-3 text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-2 focus-visible:outline-brass"
        >
          <ArrowRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
