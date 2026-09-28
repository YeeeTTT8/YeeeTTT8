'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import type { Stone } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/MagneticButton';
import { cn } from '@/lib/utils';

interface SlabCompareHeroProps {
  stones: Stone[];
  /** Slug shown on the left, revealed as the handle moves right. */
  leftSlug: string;
  /** Slug shown on the right, the full-bleed base layer. */
  rightSlug: string;
}

/**
 * Full-bleed compare band: two real slabs, one dividing handle. When the band
 * scrolls into view the divider sweeps slowly to each edge and back to centre
 * — a quiet demonstration, not a gimmick — then sits ready for the visitor to
 * drag. Sits directly under the room hero: "compare any two real slabs, side
 * by side, before you buy."
 */
export function SlabCompareHero({ stones, leftSlug, rightSlug }: SlabCompareHeroProps) {
  const left = stones.find((s) => s.slug === leftSlug) ?? stones[0]!;
  const right = stones.find((s) => s.slug === rightSlug) ?? stones[1] ?? stones[0]!;

  const [pos, setPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [introRunning, setIntroRunning] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.4 });

  useEffect(() => {
    if (reduceMotion || !inView) return;
    setIntroRunning(true);
    const steps = [
      [500, 18],
      [1750, 84],
      [3000, 50],
    ] as const;
    const timers = steps.map(([delay, value]) => setTimeout(() => setPos(value), delay));
    const done = setTimeout(() => setIntroRunning(false), 4200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [reduceMotion, inView]);

  const setFromClientX = useCallback((clientX: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = ((clientX - r.left) / r.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  const beginDrag = () => {
    dragging.current = true;
    setIsDragging(true);
    setIntroRunning(false);
    setHasInteracted(true);
  };
  const endDrag = () => {
    dragging.current = false;
    setIsDragging(false);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[90svh] min-h-[600px] w-full touch-none select-none overflow-hidden bg-stone-900 text-paper"
      onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
    >
      {/* Right slab — full-bleed base layer. */}
      <div className="absolute inset-0">
        <StoneImage image={right.image} sizes="100vw" priority showTag={false} />
      </div>

      {/* Left slab — clipped, revealed as the handle moves right. */}
      <div
        className={cn(
          'absolute inset-0',
          !isDragging && 'transition-[clip-path] duration-[1250ms] ease-editorial',
        )}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <StoneImage image={left.image} sizes="100vw" showTag={false} />
      </div>

      {/* Persistent scrim — keeps headline and actions legible regardless of
          where the divider sits. Not part of the wipe; it never animates. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-stone-900/85 via-stone-900/40 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-stone-900/25"
      />
      <div className="grain" />

      {/* Gallery placards — bottom corners. */}
      <span className="absolute bottom-7 left-4 z-10 hidden rounded-sm bg-stone-900/70 px-3 py-1.5 text-[11px] uppercase tracking-eyebrow text-paper backdrop-blur-sm sm:left-6 sm:inline lg:left-10">
        {left.name} · {left.finish}
      </span>
      <span className="absolute bottom-7 right-4 z-10 hidden rounded-sm bg-stone-900/70 px-3 py-1.5 text-[11px] uppercase tracking-eyebrow text-paper backdrop-blur-sm sm:right-6 sm:inline lg:right-10">
        {right.name} · {right.finish}
      </span>

      {/* Handle */}
      <div
        className={cn(
          'absolute inset-y-0 z-10',
          !isDragging && 'transition-[left] duration-[1250ms] ease-editorial',
        )}
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -ml-px w-px bg-paper/70" />
        <button
          type="button"
          role="slider"
          aria-label="Drag to compare the two slabs"
          aria-valuenow={Math.round(pos)}
          aria-valuemin={0}
          aria-valuemax={100}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            beginDrag();
          }}
          onKeyDown={(e) => {
            setIntroRunning(false);
            setHasInteracted(true);
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 4));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 4));
          }}
          className="absolute top-[24%] -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-full border border-paper/40 bg-paper text-stone-900 shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-transform duration-300 ease-editorial hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass sm:top-1/2"
        >
          <span aria-hidden className="text-base tracking-widest">
            ‹›
          </span>
        </button>

        {/* Drag hint — fades permanently once the visitor has taken hold of it. */}
        <span
          aria-hidden
          className={cn(
            'absolute left-1/2 top-[calc(24%+2.75rem)] -translate-x-1/2 whitespace-nowrap text-[11px] uppercase tracking-eyebrow text-paper/80 transition-opacity duration-700 sm:top-[calc(50%+2.75rem)]',
            hasInteracted || introRunning ? 'opacity-0' : 'opacity-100',
          )}
        >
          Drag to compare
        </span>
      </div>

      {/* Headline block — bottom-aligned on phones, clear of the handle. */}
      <Container className="relative z-10 flex h-full flex-col justify-end pb-24 pt-32 sm:justify-center">
        <div className="max-w-xl [text-shadow:0_1px_24px_rgba(0,0,0,0.45)]">
          <Reveal>
            <p className="eyebrow eyebrow-rule text-paper/80">Compare before you buy</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 text-display-lg font-normal text-paper">
              Two slabs, <em className="italic text-brass">side by side</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-md text-fluid-lg text-paper/85">
              Hold any two stones from our inventory against each other — colour, veining and
              finish, compared honestly.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10">
              <Magnetic>
                <Button href="/compare" variant="light" size="lg">
                  Compare Slabs
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
