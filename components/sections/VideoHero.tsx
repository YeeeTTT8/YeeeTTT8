'use client';

import { useEffect, useRef, useState } from 'react';
import { toneFor } from '@/lib/placeholder';

interface VideoHeroProps {
  /** Path to the looping video in /public. */
  src: string;
  /** Poster image path in /public (shown before/without playback). */
  poster?: string;
  children: React.ReactNode;
}

/**
 * Full-bleed muted looping video hero.
 * - No autoplay under prefers-reduced-motion or Save-Data; poster/gradient shows.
 * - Pauses when scrolled off-screen (IntersectionObserver).
 * - Always renders a stone-toned gradient base so it is never blank when the
 *   video/poster assets are not yet supplied. TODO(client): warehouse-tour.mp4.
 */
export function VideoHero({ src, poster, children }: VideoHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const tone = toneFor('warehouse-hero-nero');

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Best-effort data-saver detection.
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const saveData = Boolean(nav.connection?.saveData);
    setCanPlay(!reduce && !saveData);
  }, []);

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
      {/* Gradient base — always present. */}
      <div aria-hidden className="absolute inset-0" style={{ background: tone.background }} />

      {canPlay ? (
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
      ) : (
        poster && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      )}

      {/* Dark overlay for text legibility. */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-stone-900/85 via-stone-900/40 to-stone-900/30" />

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
