'use client';

import { useEffect, useRef, useState } from 'react';

interface StatCounterProps {
  /** Final numeric value. */
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Count-up statistic that animates from 0 to `value` when scrolled into view.
 * Respects prefers-reduced-motion by showing the final value immediately.
 */
export function StatCounter({ value, label, prefix = '', suffix = '' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || started.current) return;
        started.current = true;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setDisplay(Math.round(eased * value));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <p className="font-display text-display-lg font-medium text-stone-900">
        {prefix}
        {display}
        {suffix}
      </p>
      <p className="mt-2 text-fluid-sm uppercase tracking-eyebrow text-stone-600">{label}</p>
    </div>
  );
}
