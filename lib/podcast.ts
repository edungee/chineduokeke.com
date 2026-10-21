import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'
import { absoluteUrl, personId, siteConfig } from '@/lib/site'

// Show-level details.
export const podcast = {
  name: 'Ramblings of B × C',
  path: '/podcast',
  description:
    'A podcast where Chinedu Okeke (product) and Bosun (engineering) take one idea about building technology products and argue it out from two perspectives, in about 30 minutes.',
  hosts: ['Chinedu Okeke', 'Bosun'],
  links: {
    youtube: 'https://www.youtube.com/@ramblingsofbxc',
    spotify: 'https://open.spotify.com/show/3GiguKVwUS2T0qJhoZOMbj',
    apple: 'https://podcasts.apple.com/gb/podcast/ramblings-of-b-x-c/id6806932491',
  },
}

export interface Episode {
  slug: string
  episode: number
  title: string
  question: string
  date: string
  duration: number // minutes
  description: string
  tags?: string[]
  youtubeId?: string // the part after watch?v= — enables the embedded video
  spotify?: string // episode URL; falls back to the show
  apple?: string // episode URL; falls back to the show
  published?: boolean
  content: string
}

const dir = path.join(process.cwd(), 'content/podcast')

function readEpisode(fileName: string): Episode {
  const slug = fileName.replace(/\.(md|mdx)$/, '')
  const { data, content } = matter(fs.readFileSync(path.join(dir, fileName), 'utf8'))
  return { ...(data as Omit<Episode, 'slug' | 'content'>), slug, content }
}

export function getEpisodes(): Episode[] {
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(md|mdx)$/.test(f))
    .map(readEpisode)
    .filter((e) => e.published !== false)
    .sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
}

export function getEpisode(slug: string): Episode | undefined {
  return getEpisodes().find((e) => e.slug === slug)
}

export const podcastId = absoluteUrl(`${podcast.path}#series`)

export const youtubeUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`

export function listenLinks(e?: Pick<Episode, 'youtubeId' | 'spotify' | 'apple'>) {
  return [
    { label: 'YouTube', href: e?.youtubeId ? youtubeUrl(e.youtubeId) : podcast.links.youtube },
    { label: 'Spotify', href: e?.spotify || podcast.links.spotify },
    { label: 'Apple Podcasts', href: e?.apple || podcast.links.apple },
  ].filter((l) => l.href)
}

// Newest episode that has a YouTube video, for the series page embed.
export function getLatestVideoEpisode(): Episode | undefined {
  return getEpisodes().find((e) => e.youtubeId)
}

export function seriesJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    '@id': podcastId,
    name: podcast.name,
    url: absoluteUrl(podcast.path),
    description: podcast.description,
    inLanguage: 'en-GB',
    author: [{ '@id': personId }, { '@type': 'Person', name: 'Bosun' }],
    sameAs: Object.values(podcast.links).filter(Boolean),
  }
}

export function episodeJsonLd(e: Episode) {
  const url = absoluteUrl(`${podcast.path}/${e.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    '@id': `${url}#episode`,
    url,
    name: e.title,
    episodeNumber: e.episode,
    datePublished: e.date,
    description: e.description,
    timeRequired: `PT${e.duration}M`,
    keywords: e.tags?.join(', '),
    partOfSeries: { '@id': podcastId, '@type': 'PodcastSeries', name: podcast.name, url: absoluteUrl(podcast.path) },
    actor: [
      { '@type': 'Person', '@id': personId, name: siteConfig.name, url: siteConfig.url },
      { '@type': 'Person', name: 'Bosun' },
    ],
    sameAs: [e.youtubeId && youtubeUrl(e.youtubeId), e.spotify, e.apple].filter(Boolean),
    ...(e.youtubeId && {
      video: {
        '@type': 'VideoObject',
        name: e.title,
        description: e.description,
        uploadDate: e.date,
        duration: `PT${e.duration}M`,
        thumbnailUrl: `https://i.ytimg.com/vi/${e.youtubeId}/hqdefault.jpg`,
        embedUrl: `https://www.youtube-nocookie.com/embed/${e.youtubeId}`,
        contentUrl: youtubeUrl(e.youtubeId),
      },
    }),
  }
}
