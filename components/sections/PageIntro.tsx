import type { ReactNode } from 'react';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';

interface PageIntroProps {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
}

/**
 * Standard inner-page header. Includes the top padding needed to clear the
 * fixed site header (inner pages have no hero to sit under it), the breadcrumb
 * trail, an eyebrow, an H1 and an optional intro.
 */
export function PageIntro({ eyebrow, title, intro, crumbs, children }: PageIntroProps) {
  return (
    <section className="bg-ivory pb-band pt-32 sm:pt-36">
      <Container>
        <Breadcrumbs items={crumbs} />
        <Reveal className="mt-8">
          {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
          <h1 className="max-w-4xl text-display-lg font-medium text-stone-900">{title}</h1>
          <div className="rule-brass mt-6" />
          {intro ? (
            <p className="mt-6 max-w-prose text-fluid-lg text-stone-600">{intro}</p>
          ) : null}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
