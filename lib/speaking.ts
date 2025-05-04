import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { format, parseISO } from 'date-fns' // For date formatting

// Define the structure for speaking engagement frontmatter
export interface SpeakingEngagement {
  slug: string; // Generated from filename
  date: string; // Keep as ISO string (YYYY-MM-DD)
  event: string;
  eventLink?: string;
  location: string;
  title: string;
  talkLink?: string;
  published?: boolean;
}

const speakingDirectory = path.join(process.cwd(), 'content/speaking');

// Get sorted speaking engagement data (frontmatter only)
export function getSortedSpeakingEngagements(): SpeakingEngagement[] {
  const fileNames = fs.readdirSync(speakingDirectory);
  const allSpeakingData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, '');
    const fullPath = path.join(speakingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Basic validation/defaults
    const data = matterResult.data as Omit<SpeakingEngagement, 'slug'>;
    if (!data.date || !data.event || !data.location || !data.title) {
        console.warn(`WARN: Skipping speaking engagement file ${fileName} due to missing required frontmatter (date, event, location, title)`);
        return null; // Skip this entry if required fields are missing
    }

    return {
      slug,
      ...data,
    } as SpeakingEngagement;
  });

  // Filter out null entries (from validation) and unpublished items
  const validPublishedEngagements = allSpeakingData.filter(
      (engagement): engagement is SpeakingEngagement => 
        engagement !== null && engagement.published !== false
  );

  // Sort engagements by date (newest first)
  return validPublishedEngagements.sort((a, b) => {
      return parseISO(b.date).getTime() - parseISO(a.date).getTime();
  });
}

// Helper function to format date (can be used in the page component)
export function formatSpeakingDate(dateString: string): { dayMonth: string, year: string } {
    const date = parseISO(dateString);
    // Format like '21/08' and '2024'
    return {
        dayMonth: format(date, 'dd/MM'),
        year: format(date, 'yyyy'),
    }
}

// Helper function to group engagements by year
export function groupEngagementsByYear(engagements: SpeakingEngagement[]): Record<string, SpeakingEngagement[]> {
    return engagements.reduce((acc, engagement) => {
        const year = format(parseISO(engagement.date), 'yyyy');
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(engagement);
        return acc;
    }, {} as Record<string, SpeakingEngagement[]>);
} 