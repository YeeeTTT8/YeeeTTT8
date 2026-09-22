import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { locations } from '@/content/locations';
import { site } from '@/lib/site';
import { ArrowUpRight } from 'lucide-react';

/**
 * "We are Global"-style network band (adapted from Henge's network section).
 * A dark, cinematic map projecting the showroom cities from their real
 * coordinates, with hub-and-spoke lines from Houston, plus a technical index
 * (numeral · serif city · mono coordinates · directions). Pure inline SVG —
 * no map library, no network dependency.
 */

const VW = 720;
const VH = 420;
// Equirectangular projection across the continental US.
const LNG_MIN = -125;
const LNG_SPAN = 59; // -66 - (-125)
const LAT_MAX = 49;
const LAT_SPAN = 25; // 49 - 24

function project(lat: number, lng: number) {
  return {
    x: ((lng - LNG_MIN) / LNG_SPAN) * VW,
    y: ((LAT_MAX - lat) / LAT_SPAN) * VH,
  };
}

function fmtCoord(lat: number, lng: number) {
  const ns = lat >= 0 ? 'N' : 'S';
  const ew = lng >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${ns}  ${Math.abs(lng).toFixed(2)}°${ew}`;
}

export function ShowroomsNetwork() {
  const points = locations.map((l) => ({ ...l, ...project(l.geo!.lat, l.geo!.lng) }));
  const hub = points.find((p) => p.slug === 'houston') ?? points[0]!;

  return (
    <section className="relative overflow-hidden bg-stone-900 text-paper">
      <div className="grain" />
      <Container className="relative py-band-lg">
        <Reveal>
          <p className="eyebrow text-brass">We are global</p>
          <h2 className="mt-4 max-w-2xl text-display-md font-normal text-paper">
            Six cities, two brands, one network.
          </h2>
          <p className="mt-4 max-w-xl text-fluid-base text-paper/70">
            Warehouses and showrooms across the United States under {site.shortName} and its sister
            brand Avani — stone held close to where you build.
          </p>
        </Reveal>

        {/* Map */}
        <Reveal delay={0.1} className="mt-14">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="h-auto w-full"
            role="img"
            aria-label="Map of showroom cities across the United States"
          >
            {/* faint coordinate grid */}
            {Array.from({ length: 9 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={(VW / 8) * i}
                y1={0}
                x2={(VW / 8) * i}
                y2={VH}
                stroke="currentColor"
                strokeOpacity={0.06}
                className="text-paper"
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={(VH / 5) * i}
                x2={VW}
                y2={(VH / 5) * i}
                stroke="currentColor"
                strokeOpacity={0.06}
                className="text-paper"
              />
            ))}

            {/* hub-and-spoke lines from Houston */}
            {points.map((p) =>
              p.slug === hub.slug ? null : (
                <line
                  key={`line-${p.slug}`}
                  x1={hub.x}
                  y1={hub.y}
                  x2={p.x}
                  y2={p.y}
                  stroke="var(--brass)"
                  strokeOpacity={0.4}
                  strokeWidth={1}
                />
              ),
            )}

            {/* city markers */}
            {points.map((p) => {
              const labelLeft = p.x > VW * 0.62;
              return (
                <g key={p.slug}>
                  <circle cx={p.x} cy={p.y} r={11} fill="var(--brass)" fillOpacity={0.18} />
                  <circle cx={p.x} cy={p.y} r={4} fill="var(--brass)" />
                  <text
                    x={labelLeft ? p.x - 14 : p.x + 14}
                    y={p.y + 4}
                    textAnchor={labelLeft ? 'end' : 'start'}
                    className="fill-paper font-sans text-[15px] font-medium"
                  >
                    {p.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>

        {/* Technical index */}
        <div className="mt-16 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.05}
              className="border-t border-white/15 pt-5"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-display text-xl text-brass">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-medium text-paper">
                    {p.city}
                  </h3>
                  <p className="mt-0.5 text-fluid-sm text-paper/60">
                    {p.state} · {p.brand}
                  </p>
                  <p className="mt-2 font-mono text-[11px] tracking-wide text-paper/45">
                    {fmtCoord(p.geo!.lat, p.geo!.lng)}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                    <Link
                      href={`/showrooms/${p.slug}`}
                      className="link-underline text-fluid-sm text-paper/80 hover:text-paper"
                    >
                      Showroom
                    </Link>
                    <a
                      href={p.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-fluid-sm text-paper/80 hover:text-paper"
                    >
                      Directions
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
