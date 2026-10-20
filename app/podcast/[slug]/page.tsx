import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { ArrowBendUpLeft } from '@phosphor-icons/react/dist/ssr'
import { JsonLd } from '@/components/JsonLd'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Badge } from '@/components/ui/badge'
import { episodeJsonLd, getEpisode, getEpisodes, listenLinks, podcast } from '@/lib/podcast'
import { ListenLinks } from '@/components/ListenLinks'

export function generateStaticParams() {
  return getEpisodes().map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const e = getEpisode(params.slug)
  if (!e) return { title: 'Episode not found' }
  const path = `${podcast.path}/${e.slug}`
  const title = `${e.title} — ${podcast.name} EP. ${String(e.episode).padStart(2, '0')}`
  return {
    title,
    description: e.description,
    keywords: e.tags,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title, description: e.description, publishedTime: e.date },
    twitter: { card: 'summary_large_image', title, description: e.description },
  }
}

export default function EpisodePage({ params }: { params: { slug: string } }) {
  const e = getEpisode(params.slug)
  if (!e) notFound()

  const all = getEpisodes()
  const i = all.findIndex((x) => x.slug === e.slug)
  const newer = all[i - 1]
  const older = all[i + 1]

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-10">
      <JsonLd data={episodeJsonLd(e)} />
      <Link href={podcast.path} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowBendUpLeft size={18} />
        {podcast.name}
      </Link>

      <article className="space-y-8">
        <header className="space-y-3">
          <p className="font-mono text-sm text-muted-foreground tabular-nums">
            EP. {String(e.episode).padStart(2, '0')} · <time dateTime={e.date}>{format(parseISO(e.date), 'MMMM d, yyyy')}</time> · {e.duration} min
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{e.title}</h1>
          <p className="text-base text-muted-foreground">With Chinedu Okeke and Bosun</p>
          {e.tags && (
            <div className="flex flex-wrap gap-2">
              {e.tags.map((t) => (
                <Badge key={t} variant="secondary" className="text-xs font-normal">{t}</Badge>
              ))}
            </div>
          )}
          <ListenLinks links={listenLinks(e)} />
        </header>

        <section>
          <MarkdownRenderer>{e.content}</MarkdownRenderer>
        </section>
      </article>

      <nav className="flex justify-between gap-6 border-t border-border pt-6 text-sm">
        {older ? (
          <Link href={`${podcast.path}/${older.slug}`} className="hover:text-muted-foreground">← {older.title}</Link>
        ) : <span />}
        {newer ? (
          <Link href={`${podcast.path}/${newer.slug}`} className="text-right hover:text-muted-foreground">{newer.title} →</Link>
        ) : <span />}
      </nav>
    </div>
  )
}
