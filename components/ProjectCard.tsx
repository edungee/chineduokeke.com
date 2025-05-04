import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
// Import specific icons later, e.g., from lucide-react or a custom set

// Updated props interface
interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ slug, title, description }) => {
  return (
    // Removed Link wrapper, card styling (bg, border, shadow, padding)
    <div className={cn(
      "flex flex-col" // Basic layout
      // Removed padding, border, bg-card, etc.
    )}>
       {/* Link only the title */}
      <Link href={`/projects/${slug}`} className="group">
        <h3 className={cn(
          "text-base font-semibold group-hover:underline underline-offset-4 decoration-from-font",
          "text-foreground" // Use foreground color
        )}>
          {title}
        </h3>
      </Link>
      {/* Description below the title */}
      <p className="text-sm text-muted-foreground mt-1"> {/* Add small top margin */}
        {description} {/* Removed line-clamp */}
      </p>
    </div>
  );
};

export default ProjectCard; 