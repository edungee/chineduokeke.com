import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { parseISO } from 'date-fns'

export interface WritingPostFrontmatter {
  title: string
  slug: string
  date: string
  description: string
  published?: boolean
  tags?: string[]
}

export interface WritingPostData extends WritingPostFrontmatter {
  slug: string
  content: string
}

const writingDirectory = path.join(process.cwd(), 'content/writing')

export function getAllWritingSlugs(): string[] {
  if (!fs.existsSync(writingDirectory)) return []
  const fileNames = fs.readdirSync(writingDirectory)
  return fileNames.map((fileName) => fileName.replace(/\.(md|mdx)$/, ''))
}

export function getSortedWritingPostsData(): WritingPostFrontmatter[] {
  if (!fs.existsSync(writingDirectory)) return []
  const fileNames = fs.readdirSync(writingDirectory)
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(md|mdx)$/, '')
    const fullPath = path.join(writingDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const data = matterResult.data as Omit<WritingPostFrontmatter, 'slug'>
    return { ...data, slug } as WritingPostFrontmatter
  })

  const published = allPosts.filter((p) => p.published !== false)
  return published.sort((a, b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())
}

export function getWritingPostData(slug: string): WritingPostData {
  let fullPath = path.join(writingDirectory, `${slug}.md`)
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(writingDirectory, `${slug}.mdx`)
    if (!fs.existsSync(fullPath)) {
      throw new Error(`Writing post not found for slug: ${slug}`)
    }
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as Omit<WritingPostFrontmatter, 'slug'>),
  } as WritingPostData
}
