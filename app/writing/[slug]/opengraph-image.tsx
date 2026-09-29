import { format, parseISO } from 'date-fns'
import { ogImage, ogSize, ogContentType } from '@/components/OgCard'
import { getWritingPostData, getAllWritingSlugs } from '@/lib/writing'

export const alt = 'Essay by Chinedu Okeke'
export const size = ogSize
export const contentType = ogContentType

export function generateStaticParams() {
  return getAllWritingSlugs().map((slug) => ({ slug }))
}

export default function Image({ params }: { params: { slug: string } }) {
  const post = getWritingPostData(params.slug)
  return ogImage({
    eyebrow: `Writing · ${format(parseISO(post.date), 'd MMM yyyy')}`,
    title: post.title,
    subtitle: post.description,
  })
}
