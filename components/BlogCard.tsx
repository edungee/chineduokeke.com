import React from 'react'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface BlogCardProps {
  slug: string
  title: string
  description: string
  date: string
  tags?: string[]
}

const BlogCard: React.FC<BlogCardProps> = ({ slug, title, description, date, tags }) => {
  const hasTags = tags && tags.length > 0

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
      {hasTags && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <time
        dateTime={date}
        className={cn(
          'text-xs text-muted-foreground font-mono tabular-nums',
          hasTags ? 'mt-2' : 'mt-1.5'
        )}
      >
        {format(parseISO(date), 'MMM d, yyyy')}
      </time>
    </div>
  )
}

export default BlogCard
