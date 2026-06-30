import React from 'react';
import Link from 'next/link';
import { getSortedProjectsData } from '@/lib/projects';
import { getSortedBlogPostsData } from '@/lib/blogs';
import { ProjectList } from '@/components/ProjectList';
import BlogCard from '@/components/BlogCard';
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
  const allPosts = getSortedBlogPostsData();
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
        I enjoy solving complex product problems, particularly those involving platforms, enterprise software and the systems that help teams build better products – whether that&apos;s helping data engineers deliver business-ready data faster at <a href="https://matillion.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Matillion</a>, joining <a href="https://risevest.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Risevest</a> Risevest as its first Product Manager to help scale a digital investment platform or designing application frameworks at <a href="https://anaplan.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Anaplan</a>. You can check out more about my work <a href="https://www.linkedin.com/in/chinedu-okeke/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">here</a>.
        </p>
        <p className="text-base text-muted-foreground">
        On a lighter note, I often tell anyone who will listen that if I had stuck with football – the one Americans call soccer – I would have easily cracked the Ballon d&apos;Or top 10 list back in 2011. So, it&apos;s only right I spend my Friday and Saturday evenings playing the beautiful game. Whether that&apos;s to stay fit or fondly remember missed glory... well, that remains a mystery.
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

      {/* Blog Section */}
      <div id="blog" className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Blog</h2>
        {topPosts.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {topPosts.map((post) => (
              <BlogCard
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
                  href="/blogs"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
                >
                  View more
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>

      {/* Projects Section */}
      <div id="projects" className="space-y-4 sm:space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
        {/* Optional: Removed the sub-description paragraph for closer match */}
        {/* <p className="text-muted-foreground">
          A selection of things I&apos;ve built or contributed to.
        </p> */}
        
        <ProjectList projects={allProjects} />
      </div>
    </section>
  );
}
