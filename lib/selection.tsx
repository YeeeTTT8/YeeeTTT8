'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Client-side "My Selection" store — a list of stone slugs the visitor saved,
 * persisted to localStorage. Powers the save toggle, the header counter and the
 * /selection board (which submits as a sample or quote request). SSR-safe:
 * starts empty and hydrates from storage after mount.
 */

const KEY = 'instyle-selection';
const MAX = 12;

interface SelectionValue {
  slugs: string[];
  count: number;
  ready: boolean;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  full: boolean;
}

const SelectionContext = createContext<SelectionValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(slugs));
    } catch {
      /* ignore */
    }
  }, [slugs, ready]);

  // Sync across tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && e.newValue) {
        try {
          setSlugs(JSON.parse(e.newValue));
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const toggle = useCallback(
    (slug: string) =>
      setSlugs((prev) =>
        prev.includes(slug)
          ? prev.filter((s) => s !== slug)
          : prev.length >= MAX
            ? prev
            : [...prev, slug],
      ),
    [],
  );
  const remove = useCallback((slug: string) => setSlugs((prev) => prev.filter((s) => s !== slug)), []);
  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo<SelectionValue>(
    () => ({ slugs, count: slugs.length, ready, has, toggle, remove, clear, full: slugs.length >= MAX }),
    [slugs, ready, has, toggle, remove, clear],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection(): SelectionValue {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error('useSelection must be used within SelectionProvider');
  return ctx;
}

export const SELECTION_MAX = MAX;
