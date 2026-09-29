import type { MetadataRoute } from 'next'
import { getSortedWritingPostsData } from '@/lib/writing'
import { getSortedProjectsData } from '@/lib/projects'
import { absoluteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getSortedWritingPostsData().map((post) => ({
    url: absoluteUrl(`/writing/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  const projects = getSortedProjectsData().map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: new Date(project.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const latest = [...posts, ...projects]
    .map((e) => e.lastModified.getTime())
    .reduce((a, b) => Math.max(a, b), 0)
  const lastModified = latest ? new Date(latest) : new Date()

  return [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/writing'), lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/projects'), lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/speaking'), lastModified, changeFrequency: 'monthly', priority: 0.6 },
    ...posts,
    ...projects,
  ]
}
