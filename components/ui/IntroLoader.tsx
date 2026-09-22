'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * (#7) Brand intro loader — a brief wordmark reveal on first load, once per
 * browser session. Kept under ~1.1s so it never annoys. Skipped entirely under
 * prefers-reduced-motion or when already shown this session.
 */
export function IntroLoader() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (reduce) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem('instyle-intro') === '1';
    } catch {
      seen = false;
    }
    if (seen) return;
    setShow(true);
    try {
      sessionStorage.setItem('instyle-intro', '1');
    } catch {
      /* ignore */
    }
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ivory"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.p
            className="font-display text-5xl font-semibold tracking-tight text-stone-900"
            initial={{ opacity: 0, y: 12, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            in<span className="text-brand-red">style</span>
          </motion.p>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
