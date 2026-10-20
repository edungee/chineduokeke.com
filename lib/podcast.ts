import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'
import { absoluteUrl, personId, siteConfig } from '@/lib/site'

// Show-level details. Add Spotify / Apple links here once they exist.
export const podcast = {
  name: 'Ramblings of B × C',
  path: '/podcast',
  description:
    'A podcast where Chinedu Okeke (product) and Bosun (engineering) take one idea about building technology products and argue it out from two perspectives, in about 30 minutes.',
  hosts: ['Chinedu Okeke', 'Bosun'],
  links: {
    youtube: 'https://www.youtube.com/@ramblingsofbxc',
    iheart: 'https://www.iheart.com/podcast/1333-ramblings-of-b-x-c-343015579/',
    spotify: '',
    apple: '',
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
  youtube?: string
  spotify?: string
  iheart?: string
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

export function listenLinks(e?: Pick<Episode, 'youtube' | 'spotify' | 'iheart'>) {
  return [
    { label: 'YouTube', href: e?.youtube || podcast.links.youtube },
    { label: 'Spotify', href: e?.spotify || podcast.links.spotify },
    { label: 'Apple Podcasts', href: podcast.links.apple },
    { label: 'iHeart', href: e?.iheart || podcast.links.iheart },
  ].filter((l) => l.href)
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
    sameAs: [e.youtube, e.spotify, e.iheart].filter(Boolean),
  }
}
