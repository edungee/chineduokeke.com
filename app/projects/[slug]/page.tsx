import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { notFound } from 'next/navigation';
import { getProjectData, getAllProjectSlugs } from '@/lib/projects'; // Import data fetching functions
import { GithubLogo, ArrowSquareOut, Wrench, ArrowBendUpLeft } from "@phosphor-icons/react/dist/ssr"; // Icons
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/MarkdownRenderer'; // Import the renderer
import { ProjectStatus } from '@/components/ProjectStatus';
import { format, parseISO } from 'date-fns';

// Define params type
interface ProjectPageParams {
  slug: string;
}

// Generate static paths for all projects at build time
export async function generateStaticParams(): Promise<ProjectPageParams[]> {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Define metadata generation function (optional but good practice)
export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const project = await getProjectData(params.slug);
    return {
      title: `${project.title} - Project Details`,
      description: project.tldr || project.description,
    };
  } catch (error) {
    // Log the error
    console.error(`Error generating metadata for slug ${params.slug}:`, error);
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
}

// The main page component
export default async function ProjectPage({ params }: { params: { slug: string } }) { // Reverted to simpler inline type
  let project;
  try {
    project = await getProjectData(params.slug);
  } catch (error) {
    console.error("Error fetching project data:", error);
    notFound(); // Render the 404 page if project fetch fails
  }

  // Stable date ordering preserves authored sequence for same-day decisions.
  const milestones = [...(project.milestones || [])].sort((a, b) => a.date.localeCompare(b.date));
  const latestMilestone = milestones[milestones.length - 1];
  const nextHeading = project.content.indexOf('\n## What’s next');
  const mainContent = nextHeading >= 0 ? project.content.slice(0, nextHeading) : project.content;
  const nextContent = nextHeading >= 0 ? project.content.slice(nextHeading) : '';

  return (
    // Revert to single centered column layout like home page
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
      {/* Back Link - Moved to top, new icon, simplified style */}
      <Link
        href="/projects"
        className={cn(
          // Removed button variant styling
          "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        )}
      >
        <ArrowBendUpLeft size={18} /> {/* New icon */}
        Work & experiments
      </Link>

      {/* Main Content Area - Now directly inside the centered div */}
      <article className="w-full">
        {/* Header */}
        <header className="mb-4">
          {(project.category || project.stage) && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {project.category && <span className="text-xs uppercase tracking-widest text-muted-foreground">{project.category}</span>}
              {project.category && project.stage && <span aria-hidden="true" className="text-muted-foreground">·</span>}
              {project.stage && <ProjectStatus stage={project.stage} />}
            </div>
          )}
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{project.title}</h1>
          <p className="text-base text-muted-foreground mt-2">{project.tldr}</p>
          {project.stage?.includes(' — ') && (
            <p className="mt-3 text-sm text-muted-foreground">Currently: {project.stage.split(' — ').slice(1).join(' — ')}.</p>
          )}
        </header>

        {latestMilestone && (
          <a href="#project-evolution" className="mt-5 flex flex-col gap-1 border-l-2 border-border pl-4 text-sm hover:border-foreground/50">
            <span className="text-xs text-muted-foreground">Latest update · <time dateTime={latestMilestone.date}>{format(parseISO(latestMilestone.date), 'd MMM yyyy')}</time></span>
            <span>{latestMilestone.title} <span aria-hidden="true">↓</span></span>
          </a>
        )}

        {(project.role || project.format) && (
          <dl className="my-6 grid gap-4 text-sm sm:grid-cols-2">
            {project.role && <div><dt className="text-muted-foreground">My focus</dt><dd className="mt-1 font-medium">{project.role}</dd></div>}
            {project.format && <div><dt className="text-muted-foreground">Format</dt><dd className="mt-1 font-medium">{project.format}</dd></div>}
          </dl>
        )}

        {/* Links & Tools Section */}
        {(project.liveUrl || project.repoUrl || project.videoUrl || project.tools?.length > 0) && (
        <section className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-b pb-6 mb-10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowSquareOut size={16} />
              {project.liveLabel || 'View project'}
            </a>
          )}
          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-muted-foreground hover:text-foreground">
              <ArrowSquareOut size={16} /> Watch walkthrough
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <GithubLogo size={16} />
              GitHub
            </a>
          )}
          {project.tools && project.tools.length > 0 && (
            <div className="inline-flex items-center gap-2">
              <Wrench size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground font-medium">Tools:</span>
              <span className="text-muted-foreground">
                {project.tools.join(", ")}
              </span>
            </div>
          )}
        </section>
        )}

        {/* Video Embed */}
        {project.videoEmbedUrl && (
          <section className="mb-10">
            <h2 className="mb-3 text-lg font-semibold">Project walkthrough</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <iframe
                src={project.videoEmbedUrl}
                title={`${project.title} Video Demo`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
        )}

        {project.workflow && project.workflow.length > 0 && (
          <figure className="my-8 rounded-lg border bg-muted/30 p-5">
            <ol className="grid gap-4 sm:grid-cols-2">
              {project.workflow.map((step, index) => <li key={step} className="text-sm"><span className="block mb-1 font-mono text-xs text-muted-foreground">0{index + 1}</span>{step}</li>)}
            </ol>
            <figcaption className="mt-5 text-xs text-muted-foreground">{project.workflowCaption || 'Conceptual workflow'}</figcaption>
          </figure>
        )}

        {/* Main Content - Rendered from Markdown */}
        <section className="mb-10 prose-headings:mt-8 prose-headings:scroll-mt-20">
           <MarkdownRenderer>{mainContent}</MarkdownRenderer>
        </section>

        {milestones.length > 0 && (
          <section id="project-evolution" aria-labelledby="evolution-heading" className="mb-10 scroll-mt-24">
            <h2 id="evolution-heading" className="text-2xl font-semibold">Project evolution</h2>
            <p className="mt-2 mb-7 text-sm text-muted-foreground">Recent decisions and releases, newest first.</p>
            <ol className="ml-1 border-l border-border">
              {milestones.slice(-3).reverse().map((milestone, index) => (
                <li key={`${milestone.date}-${milestone.title}`} className="relative pb-8 pl-6 last:pb-0">
                  <span aria-hidden="true" className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border border-background ${index === 0 ? 'bg-foreground' : 'bg-muted-foreground'}`} />
                  <div className="flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                    <time dateTime={milestone.date}>{format(parseISO(milestone.date), 'd MMM yyyy')}</time>
                    <span aria-hidden="true">·</span><span>{milestone.kind}</span>
                  </div>
                  <h3 className="mt-2 text-base font-semibold"><Link className="hover:underline underline-offset-4" href={`/projects/${project.slug}/history#${milestone.id}`}>{milestone.title}</Link></h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{milestone.summary}</p>
                </li>
              ))}
            </ol>
            <Link href={`/projects/${project.slug}/history`} className="mt-6 inline-block text-sm font-medium underline underline-offset-4">View full project history ({milestones.length}) →</Link>
          </section>
        )}

        {nextContent && <section className="mb-10"><MarkdownRenderer>{nextContent}</MarkdownRenderer></section>}

        {/* Design Images Section */}
        {project.designImages && project.designImages.length > 0 && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4 mt-8 scroll-mt-20" id="design">Design</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {project.designImages.map((imgSrc, index) => (
                <div key={index} className="overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={imgSrc}
                    alt={`${project.title} Design Image ${index + 1}`}
                    width={800} // Provide appropriate width
                    height={600} // Provide appropriate height
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
