'use client';

import { useMemo, useState } from 'react';
import type { Stone, MaterialSlug, ColourFamily, Finish } from '@/content/types';
import { StoneCard } from '@/components/ui/StoneCard';
import { cn } from '@/lib/utils';

interface StoneGridProps {
  stones: Stone[];
  /** Which filter controls to show. */
  filters?: Array<'material' | 'colour' | 'finish'>;
}

const MATERIALS: MaterialSlug[] = ['granite', 'marble', 'quartz', 'quartzite'];

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values));
}

/**
 * Client-side filterable stone grid. Filters by material, colour family and
 * finish. Filter state is local (no URL sync in v1); options are derived from
 * the provided stones so empty categories never appear.
 */
export function StoneGrid({ stones, filters = ['material', 'colour', 'finish'] }: StoneGridProps) {
  const [material, setMaterial] = useState<MaterialSlug | 'all'>('all');
  const [colour, setColour] = useState<ColourFamily | 'all'>('all');
  const [finish, setFinish] = useState<Finish | 'all'>('all');

  const colours = useMemo(
    () => unique(stones.map((s) => s.colourFamily)).sort(),
    [stones],
  );
  const finishes = useMemo(() => unique(stones.map((s) => s.finish)).sort(), [stones]);
  const materialsPresent = useMemo(
    () => MATERIALS.filter((m) => stones.some((s) => s.material === m)),
    [stones],
  );

  const filtered = useMemo(
    () =>
      stones.filter(
        (s) =>
          (material === 'all' || s.material === material) &&
          (colour === 'all' || s.colourFamily === colour) &&
          (finish === 'all' || s.finish === finish),
      ),
    [stones, material, colour, finish],
  );

  const chip = (active: boolean) =>
    cn(
      'rounded-full border px-4 py-1.5 text-fluid-sm transition-colors',
      active
        ? 'border-stone-900 bg-stone-900 text-paper'
        : 'border-stone-300 text-stone-600 hover:border-stone-900 hover:text-stone-900',
    );

  return (
    <div>
      <div className="flex flex-col gap-5">
        {filters.includes('material') && materialsPresent.length > 1 ? (
          <FilterRow label="Material">
            <button className={chip(material === 'all')} onClick={() => setMaterial('all')}>
              All
            </button>
            {materialsPresent.map((m) => (
              <button key={m} className={chip(material === m)} onClick={() => setMaterial(m)}>
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </button>
            ))}
          </FilterRow>
        ) : null}

        {filters.includes('colour') && colours.length > 1 ? (
          <FilterRow label="Colour">
            <button className={chip(colour === 'all')} onClick={() => setColour('all')}>
              All
            </button>
            {colours.map((c) => (
              <button key={c} className={chip(colour === c)} onClick={() => setColour(c)}>
                {c}
              </button>
            ))}
          </FilterRow>
        ) : null}

        {filters.includes('finish') && finishes.length > 1 ? (
          <FilterRow label="Finish">
            <button className={chip(finish === 'all')} onClick={() => setFinish('all')}>
              All
            </button>
            {finishes.map((f) => (
              <button key={f} className={chip(finish === f)} onClick={() => setFinish(f)}>
                {f}
              </button>
            ))}
          </FilterRow>
        ) : null}
      </div>

      <p className="mt-6 text-fluid-sm text-stone-600" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? 'stone' : 'stones'}
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {filtered.map((stone) => (
            <StoneCard key={stone.slug} stone={stone} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-fluid-base text-stone-600">
          No stones match those filters. Try clearing one.
        </p>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[11px] font-semibold uppercase tracking-eyebrow text-stone-600">
        {label}
      </span>
      {children}
    </div>
  );
}
