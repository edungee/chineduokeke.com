import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'

// Define the structure of project frontmatter data
export interface ProjectFrontmatter {
  title: string;
  slug: string;
  published?: boolean;
  date: string; // Keep as string for simplicity, parse when needed
  description: string;
  tools: string[];
  tldr: string;
  repoUrl?: string;
  liveUrl?: string;
  videoEmbedUrl?: string;
  designImages?: string[];// Allow other fields
}

// Define the structure for a full project (frontmatter + content)
export interface ProjectData extends ProjectFrontmatter {
  content: string;
  headings: TocHeading[];
}

// Define Heading structure for ToC
export interface TocHeading {
  level: number; // Typically 2 or 3
  text: string;
  slug: string; // ID for linking
}

const projectsDirectory = path.join(process.cwd(), 'content/projects');

// Get all project slugs (filenames)
export function getAllProjectSlugs() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => {
    return fileName.replace(/\.(md|mdx)$/, ''); // Remove .md or .mdx extension
  });
}

// Get sorted project data (frontmatter only) for all projects
export function getSortedProjectsData(): ProjectFrontmatter[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    // Remove file extension to get slug
    const slug = fileName.replace(/\.(md|mdx)$/, '');

    // Read markdown file as string
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as Omit<ProjectFrontmatter, 'slug'>),
    } as ProjectFrontmatter; // Assert the final type
  });

  // Filter out unpublished projects
  const publishedProjects = allProjectsData.filter(
    (project) => project.published !== false // Default to published if field is missing
  );

  // Sort projects by date (newest first)
  return publishedProjects.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Get full project data (frontmatter + content) for a single slug
export async function getProjectData(slugParam: string): Promise<ProjectData> {
  // Try finding .md first, then .mdx
  let fullPath = path.join(projectsDirectory, `${slugParam}.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(projectsDirectory, `${slugParam}.mdx`);
    if (!fs.existsSync(fullPath)) {
        throw new Error(`Project file not found for slug: ${slugParam}`)
    }
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  const content = matterResult.content;

  // --- Extract Headings --- 
  const headings: TocHeading[] = [];
  const tree = unified().use(remarkParse).parse(content);
  
  visit(tree, 'heading', (node) => {
    // We only care about h2 and h3 for the ToC
    if (node.depth === 2 || node.depth === 3) { 
      // Extract text content from heading children
      let text = '';
      visit(node, 'text', (textNode) => {
        text += textNode.value;
      });
      
      if (text) {
        headings.push({
          level: node.depth,
          text: text,
          slug: slug(text) // Generate slug using github-slugger
        });
      }
    }
  });
  // --- End Extract Headings ---

  return {
    slug: slugParam, // Use the passed slugParam
    content: content,
    headings: headings, // Include headings in the result
    ...(matterResult.data as Omit<ProjectFrontmatter, 'slug'>),
  } as ProjectData; 
} 