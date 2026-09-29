import { ogImage, ogSize, ogContentType } from '@/components/OgCard'
import { getProjectData, getAllProjectSlugs } from '@/lib/projects'

export const alt = 'Project by Chinedu Okeke'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getProjectData(params.slug)
  return ogImage({
    eyebrow: project.category || 'Work & experiments',
    title: project.title,
    subtitle: project.tldr || project.description,
  })
}
