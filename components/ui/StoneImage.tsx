import Image from 'next/image';
import type { ImageRef } from '@/content/types';
import { isPlaceholder, toneFor } from '@/lib/placeholder';
import { cn } from '@/lib/utils';

interface StoneImageProps {
  image: ImageRef;
  /** Constrain to a ratio box and cover (default). Set false to size by parent. */
  fill?: boolean;
  className?: string;
  /** next/image sizes attribute for responsive loading. */
  sizes?: string;
  /** Prioritise the LCP image. */
  priority?: boolean;
  /** Show the small "replace" tag on placeholders (default true). */
  showTag?: boolean;
}

/**
 * Renders real photography through next/image (AVIF/WebP, blur, sizes) when a
 * genuine `src` is supplied, and a deterministic stone-toned gradient with a
 * "TODO: replace" tag while the asset is still a labelled placeholder.
 *
 * The two branches share the same box, so swapping placeholders for photos is a
 * data change only — no layout shift, no component edits.
 */
export function StoneImage({
  image,
  fill = true,
  className,
  sizes = '100vw',
  priority = false,
  showTag = true,
}: StoneImageProps) {
  if (isPlaceholder(image.src)) {
    const tone = toneFor(image.src || image.alt);
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={cn('relative h-full w-full overflow-hidden', className)}
        style={{ background: tone.background }}
      >
        {showTag ? (
          <span
            className={cn(
              'absolute bottom-2 right-2 rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider',
              tone.isDark ? 'bg-white/15 text-white/80' : 'bg-black/10 text-black/50',
            )}
          >
            TODO: replace
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      placeholder={image.blurDataURL ? 'blur' : 'empty'}
      blurDataURL={image.blurDataURL}
      className={cn('object-cover', className)}
      {...(!fill && image.width && image.height
        ? { width: image.width, height: image.height }
        : {})}
    />
  );
}
