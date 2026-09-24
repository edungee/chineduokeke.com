import { getSortedProjectsData } from '@/lib/projects';
import { ProjectList } from '@/components/ProjectList';

export const metadata = {
  title: 'Work & experiments',
  description: 'Products, creative projects and experiments by Chinedu Okeke.',
};

export default function ProjectsPage() {
  return <section className="mx-auto max-w-2xl space-y-10 md:space-y-12">
    <header className="space-y-3">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Work & experiments</h1>
      <p className="text-base text-muted-foreground">Things I’m building, questions I’m testing, and the decisions along the way.</p>
    </header>
    <ProjectList projects={getSortedProjectsData()} />
  </section>;
}
