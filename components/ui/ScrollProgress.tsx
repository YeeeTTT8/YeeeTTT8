'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin brass reading-progress line pinned to the very top of the viewport.
 * Scales with document scroll. Purely decorative (aria-hidden).
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-brass"
    />
  );
}
