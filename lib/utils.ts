/**
 * Small, dependency-free class-name merge. Filters falsy values and joins.
 * (Intentionally not pulling in clsx/tailwind-merge for v1 — this covers our
 * conditional-class needs without conflict-resolution complexity.)
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}
