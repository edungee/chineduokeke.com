// Single source for the site navigation, shared by the desktop header and the mobile menu.
export interface NavItem {
  href: string
  title: string
  external?: boolean
}

export const navItems: NavItem[] = [
  { href: '/', title: 'Home' },
  { href: '/projects', title: 'Work & experiments' },
  { href: '/writing', title: 'Writing' },
  { href: '/conversations', title: 'Podcast & talks' },
]
