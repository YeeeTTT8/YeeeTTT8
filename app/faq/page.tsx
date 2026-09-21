import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Accordion, type AccordionItem } from '@/components/ui/Accordion';
import { PageIntro } from '@/components/sections/PageIntro';
import { CTABand } from '@/components/sections/CTABand';
import { faqs } from '@/content/faqs';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers on buying, materials, care, trade and delivery for natural stone slabs.',
};

export default function FaqPage() {
  const items: AccordionItem[] = faqs.map((f) => ({
    question: f.question,
    answer: f.answer,
    eyebrow: f.category,
  }));

  return (
    <>
      <PageIntro
        eyebrow="FAQ"
        title="Questions, answered"
        intro="The things people most often ask about selecting, buying and caring for natural stone."
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
      />

      <section className="bg-ivory pb-band-lg">
        <Container>
          <div className="max-w-3xl">
            <Accordion items={items} />
          </div>
        </Container>
      </section>

      <CTABand
        eyebrow="Still have a question?"
        title="Ask us directly"
        primary={{ label: 'Contact us', href: '/contact' }}
        secondary={{ label: 'Request a Quote', href: '/contact?intent=quote' }}
      />
    </>
  );
}
