'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * Back-to-top control. Appears after scrolling down; scrolls smoothly to top
 * (or instantly under prefers-reduced-motion). Positioned above the mobile
 * bottom bar so it never overlaps it.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  const toTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      className="fixed bottom-24 right-4 z-40 rounded-full border border-hairline bg-paper/95 p-3 text-stone-900 shadow-md backdrop-blur-sm transition-colors hover:bg-stone-900 hover:text-paper focus-visible:outline-2 focus-visible:outline-brass lg:bottom-6"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
