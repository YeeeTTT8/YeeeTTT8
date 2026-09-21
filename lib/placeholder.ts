/**
 * Deterministic stone-toned gradients for placeholder imagery. Given a seed
 * string (usually the placeholder src), returns a stable set of warm stone
 * hues so the same tile always renders the same way. Replaced by real
 * photography via next/image — see components/ui/StoneImage.tsx.
 */

const TONES: { base: string; mid: string; vein: string }[] = [
  { base: '#efe9dd', mid: '#d8cfbd', vein: '#b9ad95' }, // ivory
  { base: '#2a2621', mid: '#3a352d', vein: '#5a5040' }, // nero
  { base: '#e7e3da', mid: '#c9c3b4', vein: '#8f8a7c' }, // calacatta
  { base: '#e4d6bd', mid: '#cbb68f', vein: '#a98a5c' }, // terra
  { base: '#cdd8cf', mid: '#a9bdb0', vein: '#7c9384' }, // coastal
  { base: '#eceae4', mid: '#d5d2ca', vein: '#b3afa4' }, // atelier
];

function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function toneFor(seed: string) {
  const h = hash(seed);
  const tone = TONES[h % TONES.length]!;
  const angle = 100 + (h % 80);
  const shift = h % 40;
  return {
    ...tone,
    // Layered gradients approximating stone veining/movement.
    background:
      `linear-gradient(${angle}deg, ${tone.base} 0%, ${tone.mid} 55%, ${tone.base} 100%),` +
      `radial-gradient(120% 90% at ${20 + shift}% ${10 + (h % 30)}%, ${tone.vein}55 0%, transparent 45%),` +
      `radial-gradient(90% 120% at ${70 - (shift % 30)}% ${80 - (h % 20)}%, ${tone.vein}44 0%, transparent 40%)`,
    isDark: tone.base === '#2a2621',
  };
}

/** Whether a src refers to a labelled placeholder rather than a real asset. */
export function isPlaceholder(src: string): boolean {
  return src.length === 0 || src.startsWith('/placeholders');
}
