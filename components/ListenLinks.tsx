import { listenLinks } from '@/lib/podcast'

export function ListenLinks({ links = listenLinks() }: { links?: { label: string; href: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
      {links.map((l) => (
        <li key={l.label}>
          <a href={l.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-muted-foreground transition-colors">
            {l.label}
            <span aria-hidden="true" className="ml-1">↗</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
