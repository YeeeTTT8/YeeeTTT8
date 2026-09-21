import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo/jsonld';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Inner-page breadcrumb trail. The last crumb is the current page (no link).
 * Also emits BreadcrumbList JSON-LD so every page using it gets structured data.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={breadcrumbJsonLd(items)} />
      <ol className="flex flex-wrap items-center gap-1 text-fluid-sm text-stone-600">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link href={item.href} className="link-underline hover:text-stone-900">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-stone-900' : ''}>
                  {item.label}
                </span>
              )}
              {!last ? <ChevronRight className="h-3.5 w-3.5 text-stone-300" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
