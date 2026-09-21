import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'dark' | 'outline' | 'link';
type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-sans font-medium ' +
  'transition-all duration-300 ease-editorial focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<Variant, string> = {
  // Primary red — used sparingly for the main conversion action.
  primary:
    'bg-brand-red text-paper hover:bg-[#a50d26] focus-visible:outline-brand-red rounded-sm',
  // Dark — for use on light bands where red would be too loud.
  dark: 'bg-stone-900 text-paper hover:bg-black focus-visible:outline-stone-900 rounded-sm',
  // Outline — for secondary actions and external links (e.g. Live Inventory).
  outline:
    'border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-paper ' +
    'focus-visible:outline-stone-900 rounded-sm',
  // Text link with animated underline.
  link: 'link-underline text-stone-900 px-0 py-0 focus-visible:outline-brass',
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
  const classes = cn(base, variants[variant], variant !== 'link' && sizes[size], className);

  if ('href' in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    const externalProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
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
