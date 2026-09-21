'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Additive cursor ring — a small brass-outlined circle that trails the pointer
 * and grows over interactive elements. It does NOT hide the native cursor (that
 * hurts usability); it augments it. Renders only on fine-pointer devices and
 * never under prefers-reduced-motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest('a, button, [role="img"], input, select, textarea, label')));
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
      style={{ x: springX, y: springY }}
    >
      <motion.span
        className="block rounded-full border border-brass"
        animate={{
          width: hovering ? 44 : 22,
          height: hovering ? 44 : 22,
          opacity: hovering ? 0.9 : 0.5,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{ x: '-50%', y: '-50%' }}
      />
    </motion.div>
  );
}
