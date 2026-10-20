import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { JsonLd } from '@/components/JsonLd'
import { getEpisodes, podcast, seriesJsonLd } from '@/lib/podcast'
import { ListenLinks } from '@/components/ListenLinks'

export const metadata = {
  title: `${podcast.name} — a product and engineering podcast`,
  description: podcast.description,
  alternates: { canonical: podcast.path },
  openGraph: { type: 'website', url: podcast.path, title: podcast.name, description: podcast.description },
}

export default function PodcastPage() {
  const episodes = getEpisodes()

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
