'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ImageRef } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';

interface LightboxProps {
  images: ImageRef[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

/**
 * Accessible image lightbox: focus-trapped dialog, ESC to close, arrow-key and
 * on-screen prev/next navigation, backdrop click to dismiss. Dynamically
 * imported by consumers so its JS is not in the initial bundle.
 */
export function Lightbox({ images, index, onClose, onIndexChange }: LightboxProps) {
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const current = open ? images[index] : undefined;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = (index + dir + images.length) % images.length;
      onIndexChange(next);
    },
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab') {
        // Simple focus trap within the dialog.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0]!;
        const last = focusables[focusables.length - 1]!;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    // Move focus into the dialog.
    requestAnimationFrame(() => dialogRef.current?.focus());

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose, go]);

  return (
    <AnimatePresence>
      {open && current ? (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-stone-900/90 p-4 backdrop-blur-sm"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={current.alt}
            tabIndex={-1}
            className="relative max-h-[85vh] w-full max-w-5xl outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm bg-stone-900">
              <StoneImage image={current} sizes="90vw" showTag={false} />
            </div>
            <p className="mt-3 text-center text-fluid-sm text-paper/80">{current.alt}</p>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute -top-3 right-0 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20 focus-visible:outline-2 focus-visible:outline-brass"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20 focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-paper/10 p-2 text-paper hover:bg-paper/20 focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              </>
            ) : null}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
