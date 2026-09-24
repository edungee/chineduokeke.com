import Link from 'next/link';
import { ArrowBendUpLeft } from '@phosphor-icons/react/dist/ssr';
import { notFound } from 'next/navigation';
import { getAllProjectSlugs, getProjectData } from '@/lib/projects';
import { ProjectHistory } from '@/components/ProjectHistory';

export async function generateStaticParams() {
  const projects = await Promise.all(getAllProjectSlugs().map(getProjectData));
  return projects.filter(p => p.published !== false && p.milestones?.length).map(p => ({ slug: p.slug }));
}

async function getHistory(slug: string) {
  const project = await getProjectData(slug).catch(() => null);
  if (!project || project.published === false || !project.milestones?.length) notFound();
  return project;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getHistory(params.slug);
  return { title: `${project.title} — Project history`, description: `Decisions, releases and learning behind ${project.title}.` };
}

export default async function HistoryPage({ params }: { params: { slug: string } }) {
  const project = await getHistory(params.slug);
  const milestones = [...project.milestones!].sort((a, b) => a.date.localeCompare(b.date)).reverse();
  return <article className="mx-auto max-w-2xl space-y-8 py-8">
    <Link
      href={`/projects/${project.slug}#project-evolution`}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      <ArrowBendUpLeft size={18} aria-hidden="true" />
      {project.title}
    </Link>
    <header>
      <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">{project.title}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Project history</h1>
      <p className="mt-3 text-muted-foreground">The decisions, releases and learning that shape this project. Expand a milestone to see the rationale and evidence.</p>
      <p className="mt-3 text-xs text-muted-foreground">{milestones.length} milestones · Newest first</p>
    </header>
    <ProjectHistory milestones={milestones} />
  </article>;
}
