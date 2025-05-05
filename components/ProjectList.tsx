"use client";

import React, { useState, useEffect } from 'react';
import { ProjectFrontmatter } from '@/lib/projects'; 
import ProjectCard from '@/components/ProjectCard';
import { buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { cn } from '@/lib/utils'; // Import cn

// Restore interface definition
interface ProjectListProps {
  projects: ProjectFrontmatter[]; 
  initialCount?: number; 
  loadMoreCount?: number; 
}

// Restore constant definition
const ITEMS_PER_PAGE = 3; 
const SESSION_STORAGE_KEY = 'visibleProjectCount'; // Re-add constant

export function ProjectList({ 
  projects, 
  initialCount = ITEMS_PER_PAGE, 
  loadMoreCount = ITEMS_PER_PAGE 
}: ProjectListProps) {
  // Re-add useState initializer with session storage check
  const [visibleCount, setVisibleCount] = useState(() => {
      if (typeof window !== 'undefined') { 
          const storedCount = sessionStorage.getItem(SESSION_STORAGE_KEY);
          if (storedCount) {
              const count = parseInt(storedCount, 10);
              return Math.min(count, projects.length); 
          }
      }
      return initialCount;
  });

  // Re-add useEffect to save state
  useEffect(() => {
      if (typeof window !== 'undefined') {
          sessionStorage.setItem(SESSION_STORAGE_KEY, visibleCount.toString());
      }
  }, [visibleCount]);

  const showMoreItems = () => {
    // Ensure we don't try to show more items than available
    setVisibleCount((prevCount) => Math.min(prevCount + loadMoreCount, projects.length));
  };

  const visibleProjects = projects.slice(0, visibleCount);
  const hasMoreProjects = visibleCount < projects.length;

  return (
    <div className="space-y-8">
      {visibleProjects.length > 0 ? (
        <div className="flex flex-col space-y-6">
          {visibleProjects.map((project) => (
            <ProjectCard 
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
            />
          ))}
        </div>
      ) : (
        <p>No projects published yet.</p>
      )}

      {/* "View More" link - styled as link, aligned right */}
      {hasMoreProjects && (
         // Changed from justify-center to justify-end
         <div className="flex justify-end pt-2"> 
           {/* Replaced Button with button styled as link */}
           <button 
              onClick={showMoreItems}
              className={cn(
                buttonVariants({ variant: "link" }), // Use link variant style
                "text-sm text-muted-foreground hover:text-foreground" // Custom/override styles
              )}
           >
             View More
           </button>
         </div>
      )}
    </div>
  );
}
