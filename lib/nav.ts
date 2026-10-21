// Single source for the site navigation, shared by the desktop header and the mobile menu.
export interface NavItem {
  href: string
  title: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { href: '/', title: 'Home' },
  { href: '/projects', title: 'Work & experiments' },
  { href: '/speaking', title: 'Speaking' },
  { href: '/podcast', title: 'Podcast' },
  { href: 'https://www.youtube.com/@edunge', title: 'YouTube', external: true },
  { href: '/writing', title: 'Writing' },
]
