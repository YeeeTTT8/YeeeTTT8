import Link from 'next/link';
import type { JournalPost } from '@/content/types';
import { StoneImage } from '@/components/ui/StoneImage';
import { cn } from '@/lib/utils';

interface JournalCardProps {
  post: JournalPost;
  className?: string;
  sizes?: string;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Journal preview card: image, category + reading time meta, title, excerpt. */
export function JournalCard({ post, className, sizes }: JournalCardProps) {
  return (
    <Link href={`/journal/${post.slug}`} className={cn('group block', className)}>
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-stone-900">
        <div className="absolute inset-0 transition-transform duration-700 ease-editorial group-hover:scale-[1.03]">
          <StoneImage
            image={post.image}
            sizes={sizes ?? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'}
            showTag={false}
          />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-eyebrow text-brass">
        <span>{post.category}</span>
        <span className="h-1 w-1 rounded-full bg-stone-300" aria-hidden />
        <span className="text-stone-600">{post.readingMinutes} min read</span>
      </div>
      <h3 className="mt-2 font-display text-2xl font-medium leading-tight text-stone-900">
        {post.title}
      </h3>
      <p className="mt-2 text-fluid-base text-stone-600">{post.excerpt}</p>
      <time className="mt-3 block text-fluid-sm text-stone-600" dateTime={post.date}>
        {formatDate(post.date)}
      </time>
    </Link>
  );
}
