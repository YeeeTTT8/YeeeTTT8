'use client';

import { useCallback, useRef, useState } from 'react';
import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';

/**
 * (#3) Before/after compare slider — press anywhere on the image and drag to
 * reveal one stone over the other. Uses pointer capture so the drag never drops
 * if the cursor leaves the box. Keyboard operable via the handle (arrow keys).
 */
export function CompareSlider({
  before,
  after,
  beforeLabel = 'Honed',
  afterLabel = 'Polished',
}: {
  before: ImageRef;
  after: ImageRef;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const stop = (e: React.PointerEvent) => {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[16/10] w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-sm bg-stone-900"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      {/* After (full) */}
      <div className="pointer-events-none absolute inset-0">
        <StoneImage image={after} sizes="(min-width:1024px) 60vw, 100vw" showTag={false} />
        <span className="absolute bottom-3 right-3 rounded-sm bg-stone-900/70 px-2 py-0.5 text-[11px] uppercase tracking-wider text-paper">
          {afterLabel}
        </span>
      </div>

      {/* Before (clipped) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <StoneImage image={before} sizes="(min-width:1024px) 60vw, 100vw" showTag={false} />
        <span className="absolute bottom-3 left-3 rounded-sm bg-stone-900/70 px-2 py-0.5 text-[11px] uppercase tracking-wider text-paper">
          {beforeLabel}
        </span>
      </div>

      {/* Handle (visual + keyboard) */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-paper/80" />
        <button
          type="button"
          role="slider"
          aria-label="Compare slider — drag or use arrow keys"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
          }}
          className="pointer-events-auto absolute top-1/2 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-stone-900/10 bg-paper text-stone-900 shadow-md focus-visible:outline-2 focus-visible:outline-brass"
        >
          <span aria-hidden className="text-sm">
            ‹ ›
          </span>
        </button>
      </div>
    </div>
  );
}
