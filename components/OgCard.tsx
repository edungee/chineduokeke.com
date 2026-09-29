import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

// Shared layout for generated Open Graph images (app/**/opengraph-image.tsx).
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

const domain = new URL(siteConfig.url).hostname.replace(/^www\./, '')

export function ogImage({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#fafafa',
          color: '#0a0a0a',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow && (
            <div style={{ fontSize: 26, letterSpacing: 3, textTransform: 'uppercase', color: '#737373', marginBottom: 28 }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontSize: title.length > 60 ? 56 : 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1.5 }}>
            {title}
          </div>
          {subtitle && (
            <div style={{ fontSize: 30, lineHeight: 1.4, color: '#525252', marginTop: 28 }}>
              {subtitle.length > 160 ? `${subtitle.slice(0, 157)}…` : subtitle}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#737373', borderTop: '2px solid #e5e5e5', paddingTop: 28 }}>
          <span style={{ color: '#0a0a0a', fontWeight: 600 }}>{siteConfig.name}</span>
          <span>{domain}</span>
        </div>
      </div>
    ),
    ogSize
  )
}
