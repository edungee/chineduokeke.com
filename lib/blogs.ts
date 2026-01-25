import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'

export interface BlogPostFrontmatter {
  title: string
  slug: string
  date: string
  description: string
  published?: boolean
}

export interface BlogPostData extends BlogPostFrontmatter {
  slug: string
  content: string
}

const blogsDirectory = path.join(process.cwd(), 'content/blogs')

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogsDirectory)) return []
  const fileNames = fs.readdirSync(blogsDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}

export function getSortedBlogPostsData(): BlogPostFrontmatter[] {
  if (!fs.existsSync(blogsDirectory)) return []
  const fileNames = fs.readdirSync(blogsDirectory)
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, '')
    const fullPath = path.join(blogsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const data = matterResult.data as Omit<BlogPostFrontmatter, 'slug'>
    return { ...data, slug } as BlogPostFrontmatter
  })

  const published = allPosts.filter((p) => p.published !== false)
  return published.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
}

export function getBlogPostData(slug: string): BlogPostData {
  let fullPath = path.join(blogsDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(blogsDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Blog post not found for slug: ${slug}`)
    }
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as Omit<BlogPostFrontmatter, 'slug'>),
  } as BlogPostData
}
