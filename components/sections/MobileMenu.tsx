'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { primaryNav, inventoryLink, quoteLink } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen mobile menu with a staggered reveal of links. Closes on ESC and
 * locks body scroll while open. Reduced-motion users get an instant panel.
 */
export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const container = {
    hidden: {},
    show: {
      transition: reduceMotion ? {} : { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          className="fixed inset-0 top-[65px] z-40 bg-ivory lg:hidden"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.nav
            aria-label="Mobile"
            className="flex h-full flex-col gap-2 overflow-y-auto px-6 py-10"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {primaryNav.map((link) => (
              <motion.div key={link.href} variants={item}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="block border-b border-hairline py-4 font-display text-3xl text-stone-900"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div variants={item} className="mt-8 flex flex-col gap-4">
              <Link
                href={inventoryLink.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 rounded-sm border border-stone-900 px-6 py-4 text-fluid-base font-medium text-stone-900"
              >
                {inventoryLink.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                href={quoteLink.href}
                onClick={onClose}
                className="inline-flex items-center justify-center rounded-sm bg-brand-red px-6 py-4 text-fluid-base font-medium text-paper"
              >
                {quoteLink.label}
              </Link>
            </motion.div>
          </motion.nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
