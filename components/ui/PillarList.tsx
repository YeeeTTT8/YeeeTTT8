import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/components/ui/Icon';

export interface Pillar {
  icon: string;
  title: string;
  body: string;
}

interface PillarListProps {
  pillars: Pillar[];
}

/** "Why us" pillars: icon + title + short body, staggered reveal. */
export function PillarList({ pillars }: PillarListProps) {
  return (
    <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {pillars.map((pillar, i) => (
        <Reveal as="li" key={pillar.title} delay={i * 0.08} className="border-t border-hairline pt-6">
          <Icon name={pillar.icon} className="h-7 w-7 text-brass" />
          <h3 className="mt-4 font-display text-2xl font-medium text-stone-900">{pillar.title}</h3>
          <p className="mt-2 text-fluid-base text-stone-600">{pillar.body}</p>
        </Reveal>
      ))}
    </ul>
  );
}
