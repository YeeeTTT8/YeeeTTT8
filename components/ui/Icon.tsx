import {
  Eye,
  Handshake,
  Wrench,
  Truck,
  Mountain,
  LayoutTemplate,
  Layers,
  MapPin,
  Package,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';

/**
 * Whitelisted Lucide icon lookup so content data can reference icons by name
 * (string) without importing the whole icon set into content files.
 */
const ICONS: Record<string, LucideIcon> = {
  Eye,
  Handshake,
  Wrench,
  Truck,
  Mountain,
  LayoutTemplate,
  Layers,
  MapPin,
  Package,
  ShieldCheck,
};

interface IconProps {
  name: string;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Cmp = ICONS[name] ?? Layers;
  return <Cmp className={className} aria-hidden strokeWidth={1.5} />;
}
