import React from 'react';
import { getSortedProjectsData } from '@/lib/projects'; // Import data fetching function
import { ProjectList } from '@/components/ProjectList'; // Import the new client component
// Import Phosphor Icons
import {
  TwitterLogo,
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr"; // Use ssr import for server components

// The main page remains a Server Component
export default async function HomePage() {
  const allProjects = getSortedProjectsData(); // Fetch ALL sorted project data

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
          Product Leader passionate about building impactful digital experiences. 
          Exploring the intersection of technology, design, and user needs.
          Welcome to my corner of the web.
        </p>
        {/* Add Social Links Section */}
        <div className="flex items-center space-x-4 pt-2">
          <span className="text-sm text-muted-foreground">Find me on</span>
          <div className="flex items-center space-x-3">
            <a href="YOUR_TWITTER_LINK" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-muted-foreground hover:text-foreground transition-colors">
              <TwitterLogo size={20} />
            </a>
            <a href="YOUR_GITHUB_LINK" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-muted-foreground hover:text-foreground transition-colors">
              <GithubLogo size={20} />
            </a>
            <a href="YOUR_LINKEDIN_LINK" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
              <LinkedinLogo size={20} />
            </a>
            <a href="mailto:YOUR_EMAIL_ADDRESS" title="Email" className="text-muted-foreground hover:text-foreground transition-colors">
              <EnvelopeSimple size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="space-y-4 sm:space-y-6">
        {/* Updated h2: Smaller size, semibold */}
        <h2 className="text-xl font-semibold tracking-tight">
          Projects
        </h2>
        {/* Optional: Removed the sub-description paragraph for closer match */}
        {/* <p className="text-muted-foreground">
          A selection of things I&apos;ve built or contributed to.
        </p> */}
        
        <ProjectList projects={allProjects} /> {/* Pass all projects to the client component */}
      </div>

      {/* Other sections (Speaking, Blog summaries?) can be added later */}
    </section>
  );
}
