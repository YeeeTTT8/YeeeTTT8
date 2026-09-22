'use client';

import { useSelection } from '@/lib/selection';
import { cn } from '@/lib/utils';
import { Heart, Check } from 'lucide-react';

/**
 * Save-to-selection toggle. `variant="icon"` is a compact overlay button for
 * cards; `variant="button"` is a labelled button for detail pages.
 */
export function SelectionToggle({
  slug,
  variant = 'icon',
  className,
}: {
  slug: string;
  variant?: 'icon' | 'button';
  className?: string;
}) {
  const { has, toggle, full } = useSelection();
  const saved = has(slug);
  const disabled = !saved && full;

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(slug);
  };

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={saved}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-4 text-fluid-base font-medium transition-colors disabled:opacity-50',
          saved
            ? 'border-stone-900 bg-stone-900 text-paper'
            : 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-paper',
          className,
        )}
      >
        {saved ? <Check className="h-5 w-5" aria-hidden /> : <Heart className="h-5 w-5" aria-hidden />}
        {saved ? 'Saved to selection' : disabled ? 'Selection full' : 'Save to selection'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from selection' : 'Save to selection'}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-colors',
        saved ? 'bg-brand-red text-paper' : 'bg-paper/85 text-stone-900 hover:bg-paper',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass disabled:opacity-40',
        className,
      )}
    >
      <Heart className={cn('h-4 w-4', saved && 'fill-current')} aria-hidden />
    </button>
  );
}
