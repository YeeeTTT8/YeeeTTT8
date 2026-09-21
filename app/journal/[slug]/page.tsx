import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StoneImage } from '@/components/ui/StoneImage';
import { JournalCard } from '@/components/ui/JournalCard';
import { Prose } from '@/components/ui/Prose';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/seo/JsonLd';
import { articleJsonLd } from '@/lib/seo/jsonld';
import { journal, getJournalPost } from '@/content/journal';

export function generateStaticParams() {
  return journal.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: { type: 'article', title: post.title, description: post.excerpt },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getJournalPost(slug);
  if (!post) notFound();

  const related = (post.relatedSlugs ?? [])
    .map((s) => getJournalPost(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />
      <article>
        <section className="bg-ivory pb-band pt-32 sm:pt-36">
          <Container>
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Journal', href: '/journal' },
                { label: post.title },
              ]}
            />
            <Reveal className="mt-8 max-w-3xl">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-eyebrow text-brass">
                <span>{post.category}</span>
                <span className="h-1 w-1 rounded-full bg-stone-300" aria-hidden />
                <span className="text-stone-600">{post.readingMinutes} min read</span>
              </div>
              <h1 className="mt-4 text-display-lg font-medium leading-tight text-stone-900">
                {post.title}
              </h1>
              <time className="mt-4 block text-fluid-sm text-stone-600" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </Reveal>
          </Container>
        </section>

        <section className="bg-ivory pb-band">
          <Container>
            <RevealImage className="relative aspect-[16/8] w-full rounded-sm bg-stone-900">
              <StoneImage image={post.image} sizes="100vw" priority showTag={false} />
            </RevealImage>
          </Container>
        </section>

        <section className="bg-ivory pb-band-lg">
          <Container>
            <Prose markdown={post.body} />
          </Container>
        </section>
      </article>

      {related.length > 0 ? (
        <section className="bg-paper py-band-lg">
          <Container>
            <SectionHeading eyebrow="Keep reading" title="Related articles" />
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <JournalCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
