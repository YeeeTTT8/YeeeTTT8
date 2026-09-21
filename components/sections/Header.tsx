'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { primaryNav, inventoryLink, quoteLink, site } from '@/lib/site';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from '@/components/sections/MobileMenu';
import { ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  /**
   * Force transparent-over-hero behaviour. When omitted, the header floats
   * transparent only on routes that render a dark full-bleed hero (the home
   * page in v1) and is solid everywhere else.
   */
  transparentOverHero?: boolean;
}

/** Routes that render a dark hero the header should float over. */
const HERO_ROUTES = new Set<string>(['/']);

export function Header({ transparentOverHero }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const floatsOverHero = transparentOverHero ?? HERO_ROUTES.has(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Solid whenever scrolled, on inner pages, or while the mobile menu is open.
  const solid = scrolled || !floatsOverHero || menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-editorial',
        solid
          ? 'bg-ivory/95 border-b border-hairline backdrop-blur-sm'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      {/* Top-down scrim so nav stays legible over a bright hero. */}
      {!solid ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-stone-900/75 via-stone-900/30 to-transparent"
        />
      ) : null}
      <div
        className={cn(
          'mx-auto flex max-w-content items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10',
          !solid && '[text-shadow:0_1px_10px_rgba(0,0,0,0.55)]',
        )}
      >
        {/* Wordmark. TODO(client): replace with supplied logo SVG. */}
        <Link
          href="/"
          className={cn(
            'font-display text-2xl font-semibold tracking-tight transition-colors',
            solid ? 'text-stone-900' : 'text-paper',
          )}
          aria-label={`${site.name} — home`}
        >
          in<span className="text-brand-red">style</span>
        </Link>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Primary"
        >
          {primaryNav.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'link-underline text-fluid-sm font-medium transition-colors',
                  solid ? 'text-stone-600 hover:text-stone-900' : 'text-paper hover:text-paper',
                  active && (solid ? 'text-stone-900' : 'text-paper'),
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href={inventoryLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-1 rounded-sm border px-4 py-2 text-fluid-sm font-medium transition-colors',
              solid
                ? 'border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-paper'
                : 'border-paper/70 text-paper hover:bg-paper hover:text-stone-900',
            )}
          >
            {inventoryLink.label}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
          <Button href={quoteLink.href} variant="primary" size="md">
            {quoteLink.label}
          </Button>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          className={cn(
            'lg:hidden inline-flex flex-col items-center justify-center gap-1.5 p-2',
            solid ? 'text-stone-900' : 'text-paper',
          )}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            className={cn(
              'block h-px w-6 bg-current transition-transform',
              menuOpen && 'translate-y-[7px] rotate-45',
            )}
          />
          <span className={cn('block h-px w-6 bg-current transition-opacity', menuOpen && 'opacity-0')} />
          <span
            className={cn(
              'block h-px w-6 bg-current transition-transform',
              menuOpen && '-translate-y-[7px] -rotate-45',
            )}
          />
        </button>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
