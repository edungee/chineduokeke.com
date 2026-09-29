import { ogImage, ogSize, ogContentType } from '@/components/OgCard'
import { siteConfig } from '@/lib/site'

export const alt = `${siteConfig.name} — Product Manager, Platforms, Data & AI`
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogImage({
    eyebrow: 'Product Manager',
    title: siteConfig.name,
    subtitle: 'Platforms, data and enterprise software — and writing about building trustworthy AI products.',
  })
}
