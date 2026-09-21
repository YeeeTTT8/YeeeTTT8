import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Design Tokens',
  description: 'Internal design-system reference for InStyle Granite & Marble.',
  robots: { index: false, follow: false },
};

const colours: { name: string; token: string; hex: string; note: string }[] = [
  { name: 'Ivory', token: 'bg-ivory', hex: '#F6F2EA', note: 'Page background' },
  { name: 'Paper', token: 'bg-paper', hex: '#FBF9F4', note: 'Raised surfaces' },
  { name: 'Stone 900', token: 'bg-stone-900', hex: '#1A1816', note: 'Primary text / dark bands' },
  { name: 'Stone 600', token: 'bg-stone-600', hex: '#5A554D', note: 'Secondary text' },
  { name: 'Stone 300', token: 'bg-stone-300', hex: '#D9D2C5', note: 'Hairlines / borders' },
  { name: 'Brass', token: 'bg-brass', hex: '#A8865A', note: 'Accent — large/decorative only' },
  { name: 'Brand Red', token: 'bg-brand-red', hex: '#C8102E', note: 'Primary CTA — sparingly' },
];

const typeScale: { label: string; cls: string }[] = [
  { label: 'display-xl', cls: 'text-display-xl' },
  { label: 'display-lg', cls: 'text-display-lg' },
  { label: 'display-md', cls: 'text-display-md' },
  { label: 'display-sm', cls: 'text-display-sm' },
  { label: 'fluid-lg', cls: 'text-fluid-lg' },
  { label: 'fluid-base', cls: 'text-fluid-base' },
  { label: 'fluid-sm', cls: 'text-fluid-sm' },
];

export default function DesignPage() {
  return (
    <div className="bg-ivory pb-band-lg pt-32">
      <Container>
        <SectionHeading
          as="h1"
          eyebrow="Internal reference"
          title="Design tokens"
          intro="The single source of truth for colour, type, spacing and motion. Not indexed; not linked in navigation."
        />

        {/* Colours */}
        <section className="mt-16" aria-labelledby="colours-h">
          <h2 id="colours-h" className="font-display text-display-sm text-stone-900">
            Colour
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {colours.map((c) => (
              <Reveal key={c.token} className="overflow-hidden rounded-sm border border-hairline bg-paper">
                <div className={`${c.token} h-24 w-full`} />
                <div className="p-4">
                  <p className="font-medium text-stone-900">{c.name}</p>
                  <p className="mt-1 font-mono text-fluid-sm text-stone-600">{c.hex}</p>
                  <p className="mt-1 text-fluid-sm text-stone-600">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 max-w-prose text-fluid-sm text-stone-600">
            Contrast note: brass on ivory is ~2.9:1 and fails AA for small body text.
            Brass is used only for large eyebrows (via the darker <code>--brass-ink</code>),
            decorative rules and numerals — never small text on light backgrounds.
          </p>
        </section>

        {/* Type */}
        <section className="mt-20" aria-labelledby="type-h">
          <h2 id="type-h" className="font-display text-display-sm text-stone-900">
            Type scale
          </h2>
          <div className="mt-8 space-y-6 border-t border-hairline pt-8">
            {typeScale.map((t) => (
              <div key={t.label} className="flex flex-col gap-1 border-b border-hairline pb-6">
                <span className="eyebrow">{t.label}</span>
                <span className={`${t.cls} font-display text-stone-900`}>
                  Veining, movement, honed &amp; polished.
                </span>
              </div>
            ))}
            <div>
              <span className="eyebrow">Body — Inter</span>
              <p className="mt-2 max-w-prose font-sans text-fluid-base text-stone-600">
                Body copy is set in Inter at a fluid 17–18px with 1.7 line height for
                comfortable reading. Display headings use Cormorant Garamond, a
                high-contrast serif, at tight tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mt-20" aria-labelledby="btn-h">
          <h2 id="btn-h" className="font-display text-display-sm text-stone-900">
            Buttons
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Primary red</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="link">Text link →</Button>
          </div>
        </section>

        {/* Eyebrow + rule */}
        <section className="mt-20" aria-labelledby="misc-h">
          <h2 id="misc-h" className="font-display text-display-sm text-stone-900">
            Eyebrow &amp; rule
          </h2>
          <div className="mt-8">
            <p className="eyebrow">Granite · Marble · Quartz · Quartzite</p>
            <div className="rule-brass mt-4" />
          </div>
        </section>
      </Container>
    </div>
  );
}
