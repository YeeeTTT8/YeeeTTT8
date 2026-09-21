import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/Reveal';

interface SectionHeadingProps {
  /** Small uppercase brass eyebrow. */
  eyebrow?: string;
  /** Serif display title. */
  title: ReactNode;
  /** Optional supporting line beneath the title. */
  intro?: ReactNode;
  /** Heading level for correct document outline (default h2). */
  as?: 'h1' | 'h2' | 'h3';
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Standard section header: eyebrow + serif title + thin brass rule, with an
 * optional intro line. Wrapped in a Reveal for a slow scroll-in.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  as: Tag = 'h2',
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'text-center', className)}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <Tag className="text-display-md text-stone-900 max-w-prose">{title}</Tag>
      <div className={cn('rule-brass mt-6', align === 'center' && 'mx-auto')} />
      {intro ? (
        <p className="text-fluid-base text-stone-600 mt-6 max-w-prose">{intro}</p>
      ) : null}
    </Reveal>
  );
}
