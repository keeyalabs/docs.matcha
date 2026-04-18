import type { MetadataRoute } from 'next'

const SITE_URL = 'https://usematcha.dev'

const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/docs', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/docs/overview', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/docs/installation', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/docs/quick-start', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/docs/per-step-energy', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/docs/multi-gpu', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/docs/observability', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/docs/cli', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/docs/examples', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/data-privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/contact', priority: 0.3, changeFrequency: 'yearly' }
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority
  }))
}
