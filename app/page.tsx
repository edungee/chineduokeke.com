import React from 'react';
import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/projects';
import { getSortedWritingPostsData } from '@/lib/writing';
import { ProjectList } from '@/components/ProjectList';
import WritingCard from '@/components/WritingCard';
// Import Phosphor Icons
import {
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr"; // Use ssr import for server components

// The main page remains a Server Component
export default async function HomePage() {
  const allProjects = getSortedProjectsData();
  const allPosts = getSortedWritingPostsData();
  const topPosts = allPosts.slice(0, 3);

  return (
    // Apply max-width and center the main content area
    <section className="max-w-2xl mx-auto space-y-10 md:space-y-12 lg:space-y-14">
      {/* Introduction Section */}
      <div className="space-y-4">
        {/* Updated h1: Slightly smaller, semibold */}
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Chinedu Okeke
        </h1>
        {/* Ensured intro p is text-base */}
        <p className="text-base text-muted-foreground">
        Hey there! I&apos;m Chinedu (chee-nay-doo), a Product Manager based in the UK.
        </p>
        <p className="text-base text-muted-foreground">
        I work on platforms, data and enterprise software, with experience at <a href="https://matillion.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Matillion</a>, <a href="https://risevest.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Risevest</a> and <a href="https://anaplan.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Anaplan</a>. I enjoy making complex products easier to understand and use.
        </p>
        <p className="text-base text-muted-foreground">
        Outside work, I follow my curiosity by building—from Datangle and data infrastructure agents to football storytelling and tools that help people launch a brand. This is where I share what I make and what I learn along the way.
        </p>
        {/* Add Social Links Section */}
        <div className="flex items-center space-x-4 pt-2">
          <span className="text-sm text-muted-foreground">Find me on</span>
          <div className="flex items-center space-x-3">
            <a href="https://x.com/edunge" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <TwitterLogo size={20} />
            </a>
            <a href="https://github.com/edungee" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <GithubLogo size={20} />
            </a>
            <a href="https://www.linkedin.com/in/chinedu-okeke/" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedinLogo size={20} />
            </a>
            <a href="mailto:okekechinedu@yahoo.com" title="Email" className="text-muted-foreground hover:text-foreground transition-colors">
              <EnvelopeSimple size={20} />
            </a>
          </div>
        </div>
      </div>

      <section id="projects" className="space-y-6 scroll-mt-24">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Work & experiments</h2>
          <p className="text-sm text-muted-foreground">Things I’m building, questions I’m testing, and the decisions along the way.</p>
        </div>
        <ProjectList projects={allProjects.slice(0, 4)} />
        <div className="flex justify-end pt-2">
          <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline">View all projects & experiments →</Link>
        </div>
      </section>

      {/* Writing Section */}
      <div id="writing" className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Writing</h2>
        {topPosts.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {topPosts.map((post) => (
              <WritingCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            ))}
            {allPosts.length > 3 && (
              <div className="flex justify-end pt-2">
                <Link
                  href="/writing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  View all writing →
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Speaking & conversations</h2>
        <p className="text-sm text-muted-foreground">Conversations about product management, career decisions and building useful things.</p>
        <Link href="/speaking" className="text-sm underline underline-offset-4">Explore talks and interviews →</Link>
      </section>
      <section className="space-y-4 border-t pt-8">
        <h2 className="text-xl font-semibold tracking-tight">Away from the keyboard</h2>
        <p className="text-sm text-muted-foreground">Usually playing football, or convincing myself I could have made the Ballon d&apos;Or top 10 back in 2011 if I&apos;d stuck with it. Friday and Saturday evenings are my chance to test that theory.</p>
      </section>
    </section>
  );
}
