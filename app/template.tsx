'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Route-transition wrapper. Next.js re-mounts template.tsx on every
 * navigation, so this gives each page a slow fade + slight rise on entry.
 * Reduced-motion users get an instant render.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
