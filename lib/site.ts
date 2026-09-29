// Single source of truth for identity and SEO. Update here, not per page.
export const siteConfig = {
  url: 'https://www.chineduokeke.com',
  name: 'Chinedu Okeke',
  jobTitle: 'Senior Product Manager',
  employer: { name: 'Anaplan', url: 'https://www.anaplan.com' },
  location: 'United Kingdom',
  twitterHandle: '@edunge',
  description:
    'Chinedu Okeke is a Senior Product Manager at Anaplan in the UK, working on platforms, data and enterprise software, and writing about building trustworthy AI products.',
  knowsAbout: [
    'Product management',
    'Platform product strategy',
    'Enterprise software',
    'Data infrastructure',
    'AI product development',
  ],
  sameAs: [
    'https://www.linkedin.com/in/chinedu-okeke/',
    'https://x.com/edunge',
    'https://github.com/edungee',
    'https://www.youtube.com/@edunge',
  ],
}

export const absoluteUrl = (path = '/') => new URL(path, siteConfig.url).toString()

export const personId = `${siteConfig.url}/#person`

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteConfig.name,
    url: siteConfig.url,
    jobTitle: siteConfig.jobTitle,
    worksFor: { '@type': 'Organization', ...siteConfig.employer },
    homeLocation: { '@type': 'Place', name: siteConfig.location },
    description: siteConfig.description,
    knowsAbout: siteConfig.knowsAbout,
    sameAs: siteConfig.sameAs,
  }
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { '@id': personId },
  }
}
