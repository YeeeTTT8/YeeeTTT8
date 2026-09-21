import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Render as a different element (e.g. 'section', 'header'). */
  as?: ElementType;
  /** Remove the max-width for full-bleed bands. */
  bleed?: boolean;
}

/**
 * Centres content to the 1320px editorial max-width with responsive gutters
 * (16px min on phones). `bleed` opts out for full-width image bands.
 */
export function Container({ children, className, as: Tag = 'div', bleed = false }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-10',
        !bleed && 'max-w-content',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
