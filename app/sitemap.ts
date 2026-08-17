import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ekss.org'

  const routes = [
    '',
    '/about',
    '/education',
    '/empower-farmers',
    '/youth',
    '/advocacy',
    '/news',
    '/resources',
    '/get-involved',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}