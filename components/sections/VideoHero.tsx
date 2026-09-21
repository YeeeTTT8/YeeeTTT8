'use client';

import { useEffect, useRef, useState } from 'react';
import { toneFor } from '@/lib/placeholder';
import { StoneImage } from '@/components/ui/StoneImage';
import type { ImageRef } from '@/content/types';

interface VideoHeroProps {
  /** Path to the looping video in /public. */
  src: string;
  /** Poster image path in /public (shown before/without playback). */
  poster?: string;
  /**
   * Whether the real video/poster assets exist. When false (the default until
   * assets are supplied), only the gradient/image base renders so there are no
   * 404s.
   */
  enabled?: boolean;
  /** Static base image shown behind the overlay when the video is not playing. */
  image?: ImageRef;
  children: React.ReactNode;
}

/**
 * Full-bleed muted looping video hero.
 * - No autoplay under prefers-reduced-motion or Save-Data; poster/gradient shows.
 * - Pauses when scrolled off-screen (IntersectionObserver).
 * - Always renders a stone-toned gradient base so it is never blank when the
 *   video/poster assets are not yet supplied. TODO(client): warehouse-tour.mp4.
 */
export function VideoHero({ src, poster, enabled = false, image, children }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const tone = toneFor('warehouse-hero-nero');

  useEffect(() => {
    if (!enabled) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Best-effort data-saver detection.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = Boolean(nav.connection?.saveData);
    setCanPlay(!reduce && !saveData);
  }, [enabled]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || !canPlay) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, [canPlay]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[92vh] items-end overflow-hidden bg-stone-900 text-paper"
    >
      {/* Gradient base — always present as the ultimate fallback. */}
      <div aria-hidden className="absolute inset-0" style={{ background: tone.background }} />

      {/* Static base image (shown behind the overlay when video isn't playing). */}
      {image ? (
        <div aria-hidden className="absolute inset-0">
          <StoneImage image={image} sizes="100vw" priority showTag={false} />
        </div>
      ) : null}

      {enabled && canPlay ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : enabled && poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {/* Layered scrim for guaranteed text legibility over any frame:
          an even darken, a bottom-up gradient, and a left-side gradient
          (the headline sits bottom-left). */}
      <div aria-hidden className="absolute inset-0 bg-stone-900/40" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stone-900/95 via-stone-900/55 to-stone-900/35" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-stone-900/80 via-stone-900/30 to-transparent" />
      <div className="grain" />

      <div className="relative z-10 w-full [text-shadow:0_1px_24px_rgba(0,0,0,0.4)]">{children}</div>
    </section>
  );
}
