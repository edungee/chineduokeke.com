import type { ProjectFrontmatter } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export function ProjectList({ projects }: { projects: ProjectFrontmatter[] }) {
  return <div className="flex flex-col space-y-6">
    {projects.map(project => <ProjectCard key={project.slug} slug={project.slug} title={project.title} description={project.description} stage={project.stage} category={project.category} />)}
  </div>;
}
