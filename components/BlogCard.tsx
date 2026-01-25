import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'

interface BlogCardProps {
  slug: string
  title: string
  description: string
  date: string
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, description, date }) => {
  return (
    <div className="flex flex-col">
      <Link href={`/blogs/${slug}`} className="group">
        <h3
          className={cn(
            'text-base font-semibold group-hover:underline underline-offset-4 decoration-from-font',
            'text-foreground'
          )}
        >
          {title}
        </h3>
      </Link>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      <time
        dateTime={date}
        className="text-xs text-muted-foreground mt-1.5 font-mono tabular-nums"
      >
        {format(parseISO(date), 'MMM d, yyyy')}
      </time>
    </div>
  )
}

export default BlogCard
