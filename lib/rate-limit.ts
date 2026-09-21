/**
 * Minimal in-memory sliding-window rate limiter. Best-effort only: in a
 * serverless deployment each instance has its own memory, so this stops casual
 * abuse but is not a hard guarantee. For production hardening, back it with a
 * shared store (e.g. Upstash Redis) behind the same interface. TODO(client).
 */
const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): { ok: boolean; retryAfterMs: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);

  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    return { ok: false, retryAfterMs: Math.max(0, oldest + windowMs - now) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Opportunistic cleanup so the map doesn't grow unbounded.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => t <= windowStart)) hits.delete(k);
    }
  }

  return { ok: true, retryAfterMs: 0 };
}
