import type { Service } from '@/content/types';

/** SAMPLE DATA — six services. Confirm scope with client (TODO). */
export const services: Service[] = [
  {
    slug: 'slab-selection',
    name: 'Slab Selection & Viewing',
    summary: 'See full slabs in person and reserve the exact one you want.',
    body: 'Natural stone varies slab to slab. We hold full slabs in our warehouses so you — or your fabricator — can view movement and colour in person, tag the specific slabs for your project, and reserve them before they move.',
    icon: 'Eye',
  },
  {
    slug: 'trade-program',
    name: 'Trade Program',
    summary: 'Support and pricing for fabricators, builders and designers.',
    body: 'We work with fabricators, builders, architects and designers as a wholesale source. Trade partners get access to inventory, dependable supply and support through selection and delivery. TODO(client): confirm trade terms.',
    icon: 'Handshake',
  },
  {
    slug: 'fabrication-partners',
    name: 'Fabrication Partners',
    summary: 'Referrals to trusted local fabricators.',
    body: 'We distribute slabs rather than fabricate them. Where helpful, we can point homeowners toward established local fabrication partners to template, cut and install. TODO(client): confirm partner network.',
    icon: 'Wrench',
  },
  {
    slug: 'delivery-logistics',
    name: 'Delivery & Logistics',
    summary: 'Local delivery from warehouse stock.',
    body: 'With warehouses across several cities, we hold depth in stock and deliver locally to fabrication shops and job sites. TODO(client): confirm delivery areas and lead times.',
    icon: 'Truck',
  },
  {
    slug: 'sourcing',
    name: 'Direct Sourcing',
    summary: 'Stone brought in direct from the quarry.',
    body: 'We import natural stone directly, which keeps selection wide and supply consistent. If you are after something specific we do not currently stock, ask — we can often source it.',
    icon: 'Mountain',
  },
  {
    slug: 'prefab-tops',
    name: 'Prefabricated Tops',
    summary: 'Ready-to-install tops for common sizes.',
    body: 'For some materials we carry prefabricated countertops and vanity tops in standard sizes — a faster, budget-friendly route for straightforward layouts. TODO(client): confirm which prefab lines are stocked.',
    icon: 'LayoutTemplate',
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
