import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import next/image
import { notFound } from 'next/navigation';
import { getProjectData, getAllProjectSlugs } from '@/lib/projects'; // Import data fetching functions
import { GithubLogo, ArrowSquareOut, Wrench, ArrowBendUpLeft } from "@phosphor-icons/react/dist/ssr"; // Icons
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from '@/components/MarkdownRenderer'; // Import the renderer

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
export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProjectData(params.slug);
  } catch (error) {
    console.error("Error fetching project data:", error);
    notFound(); // Render the 404 page if project fetch fails
  }

  return (
    // Revert to single centered column layout like home page
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
      {/* Back Link - Moved to top, new icon, simplified style */}
      <Link 
        href="/#projects" 
        className={cn(
          // Removed button variant styling
          "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        )}
      >
        <ArrowBendUpLeft size={18} /> {/* New icon */}
        Projects
      </Link>

      {/* Main Content Area - Now directly inside the centered div */}
      <article className="w-full">
        {/* Header */}
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{project.title}</h1>
          <p className="text-base text-muted-foreground mt-2">{project.tldr}</p>
        </header>

        {/* Links & Tools Section */}
        <section className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm border-b pb-6 mb-10">
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              <ArrowSquareOut size={16} />
              Live Site
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

        {/* Video Embed */}
        {project.videoEmbedUrl && (
          <section className="mb-10">
            <div className="aspect-video w-full overflow-hidden rounded-lg border bg-muted">
              <iframe 
                src={project.videoEmbedUrl}
                title={`${project.title} Video Demo`}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </section>
        )}

        {/* Main Content - Rendered from Markdown */}
        <section className="mb-10 prose-headings:mt-8 prose-headings:scroll-mt-20">
           <MarkdownRenderer>{project.content}</MarkdownRenderer>
        </section>

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