import Link from 'next/link';
import { env } from '@/lib/env';
import { inventoryLink } from '@/lib/site';
import { Phone, FileText, Boxes } from 'lucide-react';

/**
 * Sticky mobile-only action bar: Call · Quote · Inventory. Hidden on lg+ where
 * the header actions are visible. If no phone is configured, the Call action
 * routes to the contact page instead of a dead tel: link.
 */
export function MobileBottomBar() {
  const hasPhone = env.phone && !env.phone.startsWith('+1000');
  const callHref = hasPhone ? `tel:${env.phone.replace(/[^\d]/g, '')}` : '/contact';

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-hairline bg-paper lg:hidden"
    >
      <Link href={callHref} className="flex flex-col items-center gap-1 py-3 text-stone-900">
        <Phone className="h-5 w-5" aria-hidden strokeWidth={1.5} />
        <span className="text-[11px] font-medium uppercase tracking-wider">Call</span>
      </Link>
      <Link
        href="/contact?intent=quote"
        className="flex flex-col items-center gap-1 border-x border-hairline py-3 text-brand-red"
      >
        <FileText className="h-5 w-5" aria-hidden strokeWidth={1.5} />
        <span className="text-[11px] font-medium uppercase tracking-wider">Quote</span>
      </Link>
      <a
        href={inventoryLink.href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 py-3 text-stone-900"
      >
        <Boxes className="h-5 w-5" aria-hidden strokeWidth={1.5} />
        <span className="text-[11px] font-medium uppercase tracking-wider">Inventory</span>
      </a>
    </nav>
  );
}
