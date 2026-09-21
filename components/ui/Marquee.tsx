import { Fragment } from 'react';

/**
 * Slow full-bleed marquee of words separated by brass dots. Content is
 * duplicated so the -50% translate loops seamlessly. Animation pauses under
 * prefers-reduced-motion (handled in globals.css).
 */
export function Marquee({ items }: { items: string[] }) {
  const sequence = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-hairline py-8" aria-hidden>
      <div className="marquee">
        {sequence.map((item, i) => (
          <Fragment key={i}>
            <span className="whitespace-nowrap px-8 font-display text-3xl font-normal text-stone-900 sm:text-4xl">
              {item}
            </span>
            <span className="self-center text-brass" aria-hidden>
              ✦
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
