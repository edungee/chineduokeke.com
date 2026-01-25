import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format, parseISO } from 'date-fns'
import { ArrowBendUpLeft } from '@phosphor-icons/react/dist/ssr'
import { getBlogPostData, getAllBlogSlugs } from '@/lib/blogs'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { cn } from '@/lib/utils'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const post = await getBlogPostData(params.slug)
    return {
      title: `${post.title} — Blog`,
      description: post.description,
    }
  } catch {
    return { title: 'Post not found', description: 'The requested post could not be found.' }
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post
  try {
    post = await getBlogPostData(params.slug)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-12">
      <Link
        href="/blogs"
        className={cn(
          'inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'
        )}
      >
        <ArrowBendUpLeft size={18} />
        Blog
      </Link>

      <article>
        <header className="mb-4">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{post.title}</h1>
          <time
            dateTime={post.date}
            className="text-sm text-muted-foreground font-mono tabular-nums"
          >
            {format(parseISO(post.date), 'MMMM d, yyyy')}
          </time>
        </header>

        <section className="prose-headings:mt-8 prose-headings:scroll-mt-20">
          <MarkdownRenderer>{post.content}</MarkdownRenderer>
        </section>
      </article>
    </div>
  )
}
