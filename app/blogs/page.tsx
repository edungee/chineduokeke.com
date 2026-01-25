import React from 'react'
import Link from 'next/link'
import { getSortedBlogPostsData } from '@/lib/blogs'
import BlogCard from '@/components/BlogCard'

export const metadata = {
  title: 'Blog',
  description: 'Thoughts on product management, building in public, and lessons from shipping.',
}

export default async function BlogsPage() {
  const allPosts = getSortedBlogPostsData()

  return (
    <section className="max-w-2xl mx-auto space-y-10 md:space-y-12 lg:space-y-14">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="text-base text-muted-foreground">
          Thoughts on product management, building in public, and lessons from shipping.
        </p>
      </header>

      <div className="space-y-8">
        {allPosts.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {allPosts.map((post) => (
              <BlogCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                description={post.description}
                date={post.date}
                tags={post.tags}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </section>
  )
}
