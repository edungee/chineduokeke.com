import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { JsonLd } from '@/components/JsonLd'
import { getEpisodes, getLatestVideoEpisode, podcast, seriesJsonLd } from '@/lib/podcast'
import { YouTubeEmbed } from '@/components/YouTubeEmbed'
import { ListenLinks } from '@/components/ListenLinks'

export const metadata = {
  title: `${podcast.name} — a product and engineering podcast`,
  description: podcast.description,
  alternates: { canonical: podcast.path },
  openGraph: { type: 'website', url: podcast.path, title: podcast.name, description: podcast.description },
}

export default function PodcastPage() {
  const episodes = getEpisodes()
  const latest = getLatestVideoEpisode()

  return (
    <section className="max-w-2xl mx-auto space-y-10 md:space-y-12">
      <JsonLd data={seriesJsonLd()} />

      <header className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Podcast</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{podcast.name}</h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          One idea about building technology products, two perspectives, about 30 minutes. Chinedu brings the
          product view and Bosun the engineering one. We often start out agreeing and find we mean different things.
        </p>
        <ListenLinks />
      </header>

      {latest?.youtubeId && (
        <section aria-labelledby="latest-heading" className="space-y-3">
          <h2 id="latest-heading" className="text-sm font-medium text-muted-foreground">
            Latest episode:{' '}
            <Link href={`${podcast.path}/${latest.slug}`} className="text-foreground underline underline-offset-4 hover:text-muted-foreground">
              {latest.title}
            </Link>
          </h2>
          <YouTubeEmbed id={latest.youtubeId} title={`${podcast.name}: ${latest.title}`} />
        </section>
      )}

      <ol className="space-y-8">
        {episodes.map((e) => (
          <li key={e.slug} className="space-y-2">
            <p className="font-mono text-sm text-muted-foreground tabular-nums">
              EP. {String(e.episode).padStart(2, '0')} · {format(parseISO(e.date), 'd MMM yyyy')} · {e.duration} min
            </p>
            <h2 className="text-xl font-semibold tracking-tight">
              <Link href={`${podcast.path}/${e.slug}`} className="hover:text-muted-foreground transition-colors">
                {e.title}
              </Link>
            </h2>
            <p className="text-base text-muted-foreground">{e.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
