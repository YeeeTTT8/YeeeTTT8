import type { ReactNode } from 'react';

/**
 * Wraps section content with a sticky vertical label pinned in the left margin
 * as the section scrolls (desktop only — hidden below lg so mobile layout is
 * untouched).
 */
export function SectionRail({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[3rem_1fr] lg:gap-12">
      <div className="hidden lg:block">
        <div className="sticky top-28 whitespace-nowrap text-[11px] font-semibold uppercase tracking-eyebrow text-brass [writing-mode:vertical-rl] rotate-180">
          {label}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
