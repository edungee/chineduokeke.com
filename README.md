# chineduokeke.com

The source for [chineduokeke.com](https://www.chineduokeke.com), the personal site of Chinedu Okeke, a product manager working on platforms, data and AI products.

It holds my writing, projects and experiments (with a decision history for each), talks, and the *Ramblings of B × C* podcast. Everything is Markdown in `content/`, rendered statically with Next.js. You're welcome to use it as a starting point for your own site.

## What's on the site

| Section | Route | Content |
| --- | --- | --- |
| Home | `/` | Intro, featured projects, latest writing |
| Writing | `/writing`, `/writing/[slug]` | `content/writing/*.md` |
| Work & experiments | `/projects`, `/projects/[slug]` | `content/projects/*.md` |
| Project history | `/projects/[slug]/history` | `milestones` in each project's frontmatter |
| Speaking | `/speaking` | `content/speaking/*.md` |
| Podcast | `/podcast`, `/podcast/[slug]` | `content/podcast/*.md` |

## Stack

Next.js 14 (App Router, statically generated), TypeScript, Tailwind CSS with shadcn/ui, Phosphor icons, Markdown via gray-matter and react-markdown. It's deployed on Vercel, with Vercel Analytics and Speed Insights.

## Run it locally

You'll need Node.js 18.17 or later.

```bash
git clone https://github.com/edungee/chineduokeke.com.git
cd chineduokeke.com
npm install
npm run dev     # http://localhost:3000
npm run build   # production build, the same one Vercel runs
```

## Adding content

Each content type is a Markdown file with frontmatter. The quickest way to start is to copy an existing file in the same folder.

**Writing:** `content/writing/<slug>.md`

```yaml
title: "Don't Bet the Guarantee on the Model"
date: "2026-07-06"
description: "One or two sentences. Used as the search snippet and social preview."
tags: [AI, product management]
published: true
```

**Projects:** `content/projects/<slug>.md`. Required fields are `title`, `date`, `description` and `tldr`. Optional fields include `stage`, `role`, `category`, `featuredOrder`, `repoUrl`, `liveUrl`, `videoEmbedUrl`, `workflow` and `milestones`. Milestones (`id`, `date`, `title`, `kind`, `summary`, `rationale`, `evidence`) power the project's history page.

**Podcast episodes:** `content/podcast/<slug>.md`

```yaml
episode: 4
title: "Stop Building for Scale You Don't Have"
question: "When should a startup build for scale?"
date: "2026-10-11"
duration: 29            # minutes
description: "Used as the search snippet."
tags: [Startups, Scaling]
youtubeId: "1pIKK2XiiBs" # optional: the part after watch?v=, embeds the video
```

The newest episode with a `youtubeId` is embedded on `/podcast`. Show-level links (YouTube, Spotify, Apple) live in `lib/podcast.ts`.

**Speaking:** `content/speaking/<slug>.md` with `date`, `event`, `location`, `title` and optionally `eventLink` and `talkLink`.

Set `published: false` on any entry to hide it.

## SEO

- **`lib/site.ts`** is the single source for identity: name, job title, employer, description and the `sameAs` profile links. It feeds the page metadata and the `Person` schema on every page. **If you fork this, edit this file first.**
- **Structured data:** `Person` and `WebSite` site-wide, `BlogPosting` on essays, `PodcastSeries` / `PodcastEpisode` (plus `VideoObject` when there's a video) on the podcast.
- **`app/sitemap.ts` and `app/robots.ts`** generate `/sitemap.xml` and `/robots.txt` from the content folders, so new posts are included automatically.
- **Open Graph images** are generated per page by the `opengraph-image.tsx` files.
- **Canonical URLs** are set on every page.

## How the site stays up to date

Most project updates are drafted by [Portfolio Editor](https://github.com/edungee/portfolio-editor), an agent skill I built. It reviews the sources I approve (notes, issue trackers, coding sessions), proposes changes to `content/projects/`, and opens a draft PR with a preview link. I review and merge, so nothing is published without a human decision.

## Using this as a template

1. Update `lib/site.ts` with your details.
2. Replace the files in `content/` with your own.
3. Edit the intro and social links in `app/page.tsx` and `components/Header.tsx`.
4. Change colours in `tailwind.config.ts` and `app/globals.css`.
5. Deploy to Vercel, then submit `https://<your-domain>/sitemap.xml` in Google Search Console.

## License

[MIT](LICENSE). Use the code freely, but please don't republish my writing or project write-ups as your own.

## Contact

[Website](https://www.chineduokeke.com) · [LinkedIn](https://www.linkedin.com/in/chinedu-okeke/) · [X](https://x.com/edunge) · [GitHub](https://github.com/edungee)
