'use client';

import Link from 'next/link';
import { useSelection } from '@/lib/selection';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

/**
 * Header link to the selection board with a live count badge. Hidden until a
 * stone is saved, so it never adds noise for first-time visitors.
 */
export function SelectionIndicator({ solid }: { solid: boolean }) {
  const { count, ready } = useSelection();
  if (!ready || count === 0) return null;

  return (
    <Link
      href="/selection"
      className={cn(
        'relative inline-flex items-center gap-1.5 rounded-sm px-2 py-2 text-fluid-sm font-medium transition-colors',
        solid ? 'text-stone-900 hover:text-brand-red' : 'text-paper hover:text-paper/80',
      )}
      aria-label={`My selection, ${count} saved`}
    >
      <Heart className="h-4 w-4 fill-current text-brand-red" aria-hidden />
      <span className="tabular-nums">{count}</span>
    </Link>
  );
}
