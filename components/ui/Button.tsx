import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'dark' | 'outline' | 'light' | 'outline-light' | 'link' | 'link-light';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium ' +
  'transition-all duration-300 ease-editorial focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  // Primary — near-black warming to brass on hover. Brand red is reserved for
  // the wordmark and error states; a quiet dark CTA reads as more premium.
  primary:
    'bg-stone-900 text-paper tracking-wide hover:bg-brass focus-visible:outline-brass rounded-sm',
  // Dark — alias kept for existing call sites.
  dark: 'bg-stone-900 text-paper hover:bg-black focus-visible:outline-stone-900 rounded-sm',
  // Outline — for secondary actions and external links (e.g. Live Inventory).
  outline:
    'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-paper ' +
    'focus-visible:outline-stone-900 rounded-sm',
  // Light — solid primary for dark or photographic backgrounds.
  light:
    'bg-paper text-stone-900 tracking-wide [text-shadow:none] hover:bg-brass hover:text-paper ' +
    'focus-visible:outline-paper rounded-sm',
  // Outline on dark or photographic backgrounds.
  'outline-light':
    'border border-paper/70 text-paper hover:border-paper hover:bg-paper hover:text-stone-900 ' +
    'focus-visible:outline-paper rounded-sm',
  // Text link with animated underline.
  link: 'link-underline text-stone-900 px-0 py-0 focus-visible:outline-brass',
  // Text link on dark or photographic backgrounds.
  'link-light': 'link-underline text-paper px-0 py-0 focus-visible:outline-paper',
};

const sizes: Record<Size, string> = {
  md: 'text-fluid-sm px-6 py-3',
  lg: 'text-fluid-base px-8 py-4',
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, keyof CommonProps> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps | 'href'> & {
    href: string;
    /** External links open in a new tab with safe rel. */
    external?: boolean;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Polymorphic button/link. Renders an <a> (via next/link) when `href` is given,
 * otherwise a <button>. The `link` variant drops the size padding.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', children, className } = props;
  const classes = cn(
    base,
    variants[variant],
    !variant.startsWith('link') && sizes[size],
    className,
  );

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <Link href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
