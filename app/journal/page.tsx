import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { JournalCard } from '@/components/ui/JournalCard';
import { PageIntro } from '@/components/sections/PageIntro';
import { journal, getRecentJournal } from '@/content/journal';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Practical, honest guidance on choosing and caring for natural stone.',
};

export default function JournalPage() {
  const posts = getRecentJournal(journal.length);

  return (
    <>
      <PageIntro
        eyebrow="Journal"
        title="Reading the stone"
        intro="Guides on choosing between materials, reading a slab before you buy, and keeping stone surfaces at their best."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Journal' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
