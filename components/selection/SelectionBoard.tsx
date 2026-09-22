'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import type { Stone } from '@/content/types';
import { useSelection } from '@/lib/selection';
import { StoneImage } from '@/components/ui/StoneImage';
import { SampleRequestForm } from '@/components/forms/SampleRequestForm';
import { X } from 'lucide-react';

/**
 * The /selection board: shows saved stones with remove controls and the
 * sample/quote request form. Reads the live selection from the store; the full
 * stone list is passed from the server page for resolution.
 */
export function SelectionBoard({ stones }: { stones: Stone[] }) {
  const { slugs, remove, clear, ready } = useSelection();
  const bySlug = useMemo(() => new Map(stones.map((s) => [s.slug, s])), [stones]);
  const nameBySlug = useMemo(
    () => Object.fromEntries(stones.map((s) => [s.slug, s.name])),
    [stones],
  );
  const saved = slugs.map((s) => bySlug.get(s)).filter((s): s is Stone => Boolean(s));

  if (!ready) {
    return <p className="text-fluid-base text-stone-600">Loading your selection…</p>;
  }

  if (saved.length === 0) {
    return (
      <div className="max-w-prose">
        <p className="text-fluid-lg text-stone-600">
          Your selection is empty. Browse the collections and tap the heart on any stone to save
          it here — then request samples or a quote for the whole set at once.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/collections" className="link-underline text-fluid-base font-medium text-stone-900">
            Browse collections →
          </Link>
          <Link href="/compare" className="link-underline text-fluid-base font-medium text-stone-900">
            Compare slabs →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
      {/* Board */}
      <div>
        <div className="flex items-center justify-between">
          <p className="eyebrow">
            {saved.length} {saved.length === 1 ? 'stone' : 'stones'} saved
          </p>
          <button type="button" onClick={clear} className="link-underline text-fluid-sm text-stone-600 hover:text-stone-900">
            Clear all
          </button>
        </div>
        <ul className="mt-6 grid grid-cols-2 gap-5">
          {saved.map((s) => (
            <li key={s.slug} className="group">
              <div className="relative aspect-square overflow-hidden rounded-sm bg-stone-900">
                <StoneImage image={s.image} sizes="(min-width:1024px) 20vw, 40vw" showTag={false} />
                <button
                  type="button"
                  onClick={() => remove(s.slug)}
                  aria-label={`Remove ${s.name}`}
                  className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-stone-900/70 text-paper backdrop-blur-sm transition-colors hover:bg-brand-red focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
              <Link href={`/stones/${s.slug}`} className="mt-2 block font-display text-xl font-medium text-stone-900">
                {s.name}
              </Link>
              <p className="text-fluid-sm text-stone-600">
                {s.material[0]!.toUpperCase() + s.material.slice(1)} · {s.finish}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Request form */}
      <div className="lg:border-l lg:border-hairline lg:pl-16">
        <h2 className="font-display text-display-sm font-medium text-stone-900">
          Request samples or a quote
        </h2>
        <p className="mt-3 max-w-prose text-fluid-base text-stone-600">
          Send your whole selection at once. We&rsquo;ll arrange samples or put together a quote.
          <span className="mt-1 block text-fluid-sm text-stone-600/80">
            TODO(client): confirm whether samples are mailed or viewed at the showroom.
          </span>
        </p>
        <div className="mt-8">
          <SampleRequestForm nameBySlug={nameBySlug} />
        </div>
      </div>
    </div>
  );
}
