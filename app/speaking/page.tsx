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
  title: "Speaking & conversations",
  description: "Conversations on product and engineering decisions, alongside talks, meetups and mentorship sessions.",
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
          Speaking &amp; conversations
        </h1>
        <p className="text-base text-muted-foreground">
          Exploring product and engineering decisions through conversation, alongside talks and sessions with the product management community.
        </p>
      </header>

      <section aria-labelledby="ramblings-heading" className="space-y-4 rounded-xl border border-border bg-muted/30 p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Recurring series</p>
        <h2 id="ramblings-heading" className="text-2xl font-semibold tracking-tight">Ramblings of B × C</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          Conversations with Bosun about product and engineering decisions, the trade-offs behind what we build, and where our perspectives meet or differ.
        </p>
        <a href="https://www.youtube.com/@ramblingsofbxc" target="_blank" rel="noopener noreferrer" className="inline-flex text-sm font-medium underline underline-offset-4 hover:text-muted-foreground transition-colors">
          Watch Ramblings of B × C <span aria-hidden="true" className="ml-1">↗</span>
        </a>
      </section>

      <h2 className="text-2xl font-semibold tracking-tight">Talks &amp; guest appearances</h2>
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