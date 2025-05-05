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
        Hey there! I&apos;m Chinedu (chee-nay-doo), a Product Manager in the UK. I have spent 13+ years in tech across different roles – including customer support, system analyst and software engineering – and 8 years specifically focused on product. 
        </p>
        <p className="text-base text-muted-foreground">
        I&apos;m fascinated by how obsessively caring about people and their problems can shape strategy and vision. That mindset has helped me build impactful digital experiences – like helping data engineers deliver business-ready data faster at <a href="https://matillion.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Matillion</a>, or joining <a href="https://risevest.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Risevest</a> as the first PM to connect users with the best wealth-creating opportunities globally. You can check out more about my work <a href="https://www.linkedin.com/in/chinedu-okeke/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">here</a>.
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
