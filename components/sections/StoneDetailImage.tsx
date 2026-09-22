'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { resolvePlaceholder } from '@/lib/images';
import { Expand } from 'lucide-react';

const Lightbox = dynamic(() => import('@/components/ui/Lightbox').then((m) => m.Lightbox));

/**
 * Large stone image with (#2) a loupe magnifier that follows the cursor to
 * inspect veining like a real slab, plus a zoomable lightbox on click. Loupe is
 * desktop-only (fine pointer) and off under reduced-motion; it uses the
 * resolved image URL as a CSS background so it can magnify beyond the rendered
 * size.
 */
export function StoneDetailImage({ images }: { images: ImageRef[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const [loupe, setLoupe] = useState<{ x: number; y: number; bx: number; by: number } | null>(null);
  const [canLoupe, setCanLoupe] = useState(false);
  const boxRef = useRef<HTMLButtonElement>(null);
  const first = images[0];

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setCanLoupe(fine && !reduce);
  }, []);

  if (!first) return null;
  const bgUrl = resolvePlaceholder(first.src) ?? first.src;

  const onMove = (e: React.MouseEvent) => {
    if (!canLoupe) return;
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setLoupe({ x, y, bx: (x / r.width) * 100, by: (y / r.height) * 100 });
  };

  return (
    <>
      <button
        ref={boxRef}
        type="button"
        onClick={() => setIndex(0)}
        onMouseMove={onMove}
        onMouseLeave={() => setLoupe(null)}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-sm bg-stone-900"
        aria-label={`View ${first.alt} larger`}
      >
        <StoneImage image={first} sizes="(min-width: 1024px) 55vw, 100vw" priority showTag={false} />

        {loupe ? (
          <span
            aria-hidden
            className="pointer-events-none absolute h-40 w-40 rounded-full border border-paper/70 shadow-2xl"
            style={{
              left: loupe.x - 80,
              top: loupe.y - 80,
              backgroundImage: `url(${bgUrl})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: '260%',
              backgroundPosition: `${loupe.bx}% ${loupe.by}%`,
            }}
          />
        ) : null}

        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-stone-900/70 px-3 py-1.5 text-fluid-sm text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Expand className="h-4 w-4" aria-hidden />
          {canLoupe ? 'Hover to inspect · click to zoom' : 'Tap to zoom'}
        </span>
      </button>

      <Lightbox images={images} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </>
  );
}
