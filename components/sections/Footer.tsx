import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { footerNav, site } from '@/lib/site';
import { env } from '@/lib/env';
import { ArrowUpRight } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-stone-900 text-paper">
      <Container className="py-band">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          {/* Brand block */}
          <div>
            <p className="font-display text-3xl font-semibold tracking-tight">
              in<span className="text-brand-red">style</span>
            </p>
            <p className="mt-4 max-w-xs text-fluid-sm leading-relaxed text-paper/70">
              {site.description}
            </p>
            <p className="mt-6 text-eyebrow uppercase tracking-eyebrow text-brass">
              Established {site.established}
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-sans text-xs font-semibold uppercase tracking-eyebrow text-paper/50">
                {group.heading}
              </h2>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={`${group.heading}-${link.href}`}>
                    <Link
                      href={link.href}
                      {...(link.external
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="link-underline inline-flex items-center gap-1 text-fluid-sm text-paper/80 hover:text-paper"
                    >
                      {link.label}
                      {link.external ? <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-fluid-sm text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Sister brand Avani Granite &amp; Marble.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {env.contactEmail ? (
              <a href={`mailto:${env.contactEmail}`} className="link-underline hover:text-paper">
                {env.contactEmail}
              </a>
            ) : (
              <span className="text-paper/40">TODO(client): email</span>
            )}
            <Link href="/privacy" className="link-underline hover:text-paper">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline hover:text-paper">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
