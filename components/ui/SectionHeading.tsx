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
  /** Optional oversized editorial numeral, e.g. "01". */
  index?: string;
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
  index,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn(align === 'center' && 'text-center', className)}>
      {index ? (
        <span className={cn('section-numeral mb-4 block', align === 'center' && 'text-center')}>
          {index}
        </span>
      ) : null}
      {eyebrow ? (
        <p className={cn('eyebrow mb-4', align !== 'center' && 'eyebrow-rule')}>{eyebrow}</p>
      ) : null}
      <Tag className="text-display-md text-stone-900 max-w-prose">{title}</Tag>
      <div className={cn('rule-brass mt-6', align === 'center' && 'mx-auto')} />
      {intro ? (
        <p className="text-fluid-base text-stone-600 mt-6 max-w-prose">{intro}</p>
      ) : null}
    </Reveal>
  );
}
