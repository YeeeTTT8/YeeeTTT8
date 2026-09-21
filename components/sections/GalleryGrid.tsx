'use client';

import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import type { GalleryItem, GalleryCategory } from '@/content/gallery';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';

const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox));

const CATEGORIES: GalleryCategory[] = ['Kitchen', 'Bathroom', 'Living', 'Commercial'];

/**
 * Filterable masonry gallery with a shared lightbox. Filtering by category
 * rebuilds the visible list; the lightbox indexes into the filtered set so
 * prev/next stay within the current filter.
 */
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<GalleryCategory | 'all'>('all');
  const [index, setIndex] = useState<number | null>(null);

  const present = useMemo(
    () => CATEGORIES.filter((c) => items.some((it) => it.category === c)),
    [items],
  );
  const filtered = useMemo(
    () => (category === 'all' ? items : items.filter((it) => it.category === category)),
    [items, category],
  );
  const images = useMemo(() => filtered.map((it) => it.image), [filtered]);

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-1.5 text-fluid-sm transition-colors',
      active
        ? 'border-stone-900 bg-stone-900 text-paper'
        : 'border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900',
    );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          className={chip(category === 'all')}
          onClick={() => {
            setCategory('all');
          }}
        >
          All
        </button>
        {present.map((c) => (
          <button key={c} className={chip(category === c)} onClick={() => setCategory(c)}>
            {c}
          </button>
        ))}
      </div>

      {/* CSS masonry via columns */}
      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {filtered.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`View ${item.image.alt} larger`}
            className="group relative block w-full break-inside-avoid overflow-hidden rounded-sm bg-stone-900"
            style={{ aspectRatio: i % 3 === 0 ? '3 / 4' : i % 3 === 1 ? '1 / 1' : '4 / 3' }}
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.04]">
              <StoneImage image={item.image} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" showTag={false} />
            </div>
            <span className="absolute bottom-2 left-2 rounded-sm bg-stone-900/70 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-paper">
              {item.category}
            </span>
          </button>
        ))}
      </div>

      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </div>
  );
}
