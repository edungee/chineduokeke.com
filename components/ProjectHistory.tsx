'use client';

import { useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import type { ProjectFrontmatter } from '@/lib/projects';

export function ProjectHistory({ milestones }: { milestones: NonNullable<ProjectFrontmatter['milestones']> }) {
  useEffect(() => {
    const reveal = () => {
      const target = document.getElementById(window.location.hash.slice(1));
      if (target instanceof HTMLDetailsElement) {
        target.open = true;
        target.scrollIntoView({ block: 'start' });
      }
    };
    reveal();
    window.addEventListener('hashchange', reveal);
    return () => window.removeEventListener('hashchange', reveal);
  }, []);

  const years = Array.from(new Set(milestones.map(m => m.date.slice(0, 4))));
  return <div className="space-y-10">
    {years.map(year => <section key={year} aria-labelledby={`year-${year}`}>
      <h2 id={`year-${year}`} className="mb-4 font-mono text-sm text-muted-foreground">{year}</h2>
      <div className="border-t">
        {milestones.filter(m => m.date.startsWith(year)).map(m => <details key={m.id} id={m.id} className="group scroll-mt-24 border-b py-5">
          <summary className="cursor-pointer rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            <span className="ml-1 text-xs text-muted-foreground"><time dateTime={m.date}>{format(parseISO(m.date), 'd MMM yyyy')}</time> · {m.kind}</span>
            <span className="mt-2 block text-base font-semibold">{m.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{m.summary}</span>
            <span className="mt-3 block text-xs text-muted-foreground group-open:hidden">Expand decision details</span>
          </summary>
          <div className="mt-5 space-y-4 border-l pl-4 text-sm leading-relaxed">
            <div><h3 className="font-medium">Why this changed</h3><p className="mt-1 text-muted-foreground">{m.rationale}</p></div>
            {m.evidence && <div><h3 className="font-medium">Evidence & context</h3><p className="mt-1 text-muted-foreground">{m.evidence}</p></div>}
            <a href={`#${m.id}`} className="inline-block underline underline-offset-4" aria-label={`Permanent link to ${m.title}`}>Link to this milestone</a>
          </div>
        </details>)}
      </div>
    </section>)}
  </div>;
}
