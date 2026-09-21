import Link from 'next/link';
import type { Location } from '@/content/types';
import { cn } from '@/lib/utils';
import { MapPin, ArrowUpRight } from 'lucide-react';

interface LocationCardProps {
  location: Location;
  className?: string;
}

/**
 * Compact showroom card: city/state, brand, placeholder hours and a
 * "Get directions" link. Full per-location pages come in a later phase.
 */
export function LocationCard({ location, className }: LocationCardProps) {
  const weekday = location.hours[0];
  return (
    <div className={cn('flex flex-col border-t border-hairline pt-6', className)}>
      <p className="text-[11px] font-semibold uppercase tracking-eyebrow text-brass">
        {location.brand}
      </p>
      <h3 className="mt-2 font-display text-3xl font-medium text-stone-900">
        {location.city}, {location.state}
      </h3>
      <p className="mt-3 flex items-start gap-2 text-fluid-sm text-stone-600">
        <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden strokeWidth={1.5} />
        <span>
          {weekday ? `${weekday.day}: ${weekday.hours}` : 'Hours TODO(client)'}
        </span>
      </p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
        <Link
          href={`/showrooms/${location.slug}`}
          className="link-underline text-fluid-sm font-medium text-stone-900"
        >
          Showroom details
        </Link>
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1 text-fluid-sm font-medium text-stone-900"
        >
          Get directions
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
