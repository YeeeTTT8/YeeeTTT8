'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Stone, MaterialSlug } from '@/content/types';
import { CompareSlider } from '@/components/ui/CompareSlider';
import { cn } from '@/lib/utils';
import { ArrowLeftRight } from 'lucide-react';

const MATERIAL_ORDER: MaterialSlug[] = ['granite', 'marble', 'quartz', 'quartzite'];

/**
 * Interactive slab comparison: pick any two stones and drag to compare, with a
 * spec row and quote links. Selects are grouped by material.
 */
export function SlabComparer({
  stones,
  initialA,
  initialB,
}: {
  stones: Stone[];
  initialA?: string;
  initialB?: string;
}) {
  const bySlug = useMemo(() => new Map(stones.map((s) => [s.slug, s])), [stones]);
  const [aSlug, setA] = useState(initialA ?? stones[0]?.slug ?? '');
  const [bSlug, setB] = useState(initialB ?? stones[1]?.slug ?? '');

  const a = bySlug.get(aSlug) ?? stones[0]!;
  const b = bySlug.get(bSlug) ?? stones[1]!;

  const grouped = useMemo(
    () =>
      MATERIAL_ORDER.map((m) => ({
        material: m,
        items: stones.filter((s) => s.material === m),
      })).filter((g) => g.items.length > 0),
    [stones],
  );

  const swap = () => {
    setA(bSlug);
    setB(aSlug);
  };

  const selectCls =
    'w-full rounded-sm border border-stone-300 bg-paper px-4 py-3 text-fluid-base text-stone-900 ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brass';

  return (
    <div>
      {/* Pickers */}
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
            Left slab
          </span>
          <select
            className={cn(selectCls, 'mt-2')}
            value={aSlug}
            onChange={(e) => setA(e.target.value)}
          >
            {grouped.map((g) => (
              <optgroup key={g.material} label={g.material[0]!.toUpperCase() + g.material.slice(1)}>
                {g.items.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <button
          type="button"
          onClick={swap}
          aria-label="Swap slabs"
          className="mb-1 hidden items-center justify-center rounded-full border border-stone-300 p-3 text-stone-900 transition-colors hover:border-stone-900 focus-visible:outline-2 focus-visible:outline-brass sm:inline-flex"
        >
          <ArrowLeftRight className="h-5 w-5" aria-hidden />
        </button>

        <label className="block">
          <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
            Right slab
          </span>
          <select
            className={cn(selectCls, 'mt-2')}
            value={bSlug}
            onChange={(e) => setB(e.target.value)}
          >
            {grouped.map((g) => (
              <optgroup key={g.material} label={g.material[0]!.toUpperCase() + g.material.slice(1)}>
                {g.items.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      {/* Slider — keyed so it resets cleanly when selections change */}
      <div className="mt-8">
        <CompareSlider
          key={`${a.slug}-${b.slug}`}
          before={a.image}
          after={b.image}
          beforeLabel={a.name}
          afterLabel={b.name}
        />
      </div>

      {/* Spec comparison */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {[a, b].map((s, i) => (
          <div key={i} className="border-t border-hairline pt-5">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="font-display text-2xl font-medium text-stone-900">{s.name}</h3>
              <span className="text-[11px] uppercase tracking-eyebrow text-brass">
                {i === 0 ? 'Left' : 'Right'}
              </span>
            </div>
            <dl className="mt-3 space-y-1.5 text-fluid-sm text-stone-600">
              <Row label="Material" value={s.material[0]!.toUpperCase() + s.material.slice(1)} />
              <Row label="Colour" value={s.colourFamily} />
              <Row label="Finish" value={s.finish} />
              <Row label="Thickness" value={s.thicknessCm.map((t) => `${t} cm`).join(' · ')} />
            </dl>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
              <Link href={`/stones/${s.slug}`} className="link-underline text-fluid-sm font-medium text-stone-900">
                View stone
              </Link>
              <Link
                href={`/contact?intent=quote&stone=${encodeURIComponent(s.name)}`}
                className="link-underline text-fluid-sm font-medium text-stone-900"
              >
                Request a quote
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="uppercase tracking-eyebrow text-stone-600/80">{label}</dt>
      <dd className="text-stone-900">{value}</dd>
    </div>
  );
}
