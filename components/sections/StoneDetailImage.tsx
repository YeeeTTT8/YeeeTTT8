'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { Expand } from 'lucide-react';

// Lightbox is interaction-only — keep it out of the initial bundle.
const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox));

/**
 * Large stone image that opens a zoomable lightbox on click/Enter. Accepts one
 * or more images (sample data has one per stone; a real gallery plugs in here).
 */
export function StoneDetailImage({ images }: { images: ImageRef[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const first = images[0];
  if (!first) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIndex(0)}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-900"
        aria-label={`View ${first.alt} larger`}
      >
        <StoneImage image={first} sizes="(min-width: 1024px) 55vw, 100vw" priority showTag={false} />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-stone-900/70 px-3 py-1.5 text-fluid-sm text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden />
          Zoom
        </span>
      </button>

      <Lightbox
        images={images}
        index={index}
        onClose={() => setIndex(null)}
        onIndexChange={setIndex}
      />
    </>
  );
}
