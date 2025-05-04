import React from 'react';
// import Link from 'next/link'; // Removed unused
import {
    getSortedSpeakingEngagements, 
    formatSpeakingDate,
    groupEngagementsByYear,
    // SpeakingEngagement // Removed unused type import
} from '@/lib/speaking'; // Import functions and type
// import { cn } from '@/lib/utils'; // Removed unused

// Optional: Add metadata
export const metadata = {
  title: "Speaking Engagements",
  description: "A list of conferences and meetups where Chinedu Okeke has spoken.",
};

export default async function SpeakingPage() {
  const allEngagements = getSortedSpeakingEngagements();
  const groupedEngagements = groupEngagementsByYear(allEngagements);
  const years = Object.keys(groupedEngagements).sort((a, b) => parseInt(b) - parseInt(a)); // Sort years descending

  const renderLink = (text: string, link?: string) => {
    if (link) {
        return <a href={link} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground transition-colors">{text}</a>;
    }
    return text;
  };

  return (
    <section className="max-w-2xl mx-auto space-y-10 md:space-y-12 lg:space-y-14">
      {/* Page Header */}
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Speaking Engagements
        </h1>
        <p className="text-base text-muted-foreground">
          Here&apos;s a list of my speaking engagements at various venues and conferences.
        </p>
      </header>

      {/* Engagements List */}
      <div className="space-y-12">
        {years.length > 0 ? (
          years.map((year) => (
            <div key={year} className="space-y-6">
              <h2 className="text-2xl font-medium tracking-tight">{year}</h2>
              <ul className="space-y-5">
                {groupedEngagements[year].map((engagement) => {
                  const { dayMonth, year: engagementYear } = formatSpeakingDate(engagement.date);
                  return (
                    <li key={engagement.slug} className="flex flex-col sm:flex-row gap-x-4 gap-y-1">
                      {/* Date Column */}
                      <div className="flex items-baseline gap-2 w-full sm:w-20 flex-shrink-0">
                          <span className="font-mono text-sm text-muted-foreground tabular-nums">{dayMonth}</span>
                          <span className="font-mono text-sm text-muted-foreground tabular-nums hidden sm:inline">{engagementYear}</span>
                      </div>
                      {/* Details Column */}
                      <div className="text-base text-muted-foreground">
                          {renderLink(engagement.event, engagement.eventLink)}, {engagement.location}: {renderLink(engagement.title, engagement.talkLink)}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No speaking engagements listed yet.</p>
        )}
      </div>
    </section>
  );
} 