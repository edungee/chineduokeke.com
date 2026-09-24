import React from 'react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Badge } from '@/components/ui/badge';
import { ProjectStatus } from '@/components/ProjectStatus';
// Import specific icons later, e.g., from lucide-react or a custom set

// Updated props interface
interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  stage?: string;
  category?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ slug, title, description, stage, category }) => {
  return (
    // Removed Link wrapper, card styling (bg, border, shadow, padding)
    <div className={cn(
      "flex flex-col" // Basic layout
      // Removed padding, border, bg-card, etc.
    )}>
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
      {(stage || category) && <div className="mt-2 flex flex-wrap gap-1.5">
        {category && <Badge variant="secondary" className="font-normal">{category}</Badge>}
        {stage && <ProjectStatus stage={stage} />}
      </div>}
    </div>
  );
};

export default ProjectCard;
