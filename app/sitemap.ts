import { MetadataRoute } from 'next'
import { MIGRATED_BLOG_SLUGS } from './data/blog/migrated'

const baseUrl = 'https://editorapdf.com'
const defaultLocale = 'en'
const locales = ['en', 'fr', 'de', 'es', 'it', 'uk']

const migratedBlogSet = new Set<string>(MIGRATED_BLOG_SLUGS)

// Build hreflang alternates (xhtml:link) for a locale-varying path. x-default points
// at the default-locale URL (which resolves 200, never a redirect).
const altLanguages = (path: string): Record<string, string> => ({
  'x-default': `${baseUrl}/${defaultLocale}${path}`,
  ...Object.fromEntries(locales.map((locale) => [locale, `${baseUrl}/${locale}${path}`])),
})

const tools = [
  // Organize & Pages
  'merge', 'split', 'delete-pages', 'extract-pages', 'reorder', 'rotate',
  'insert-blank', 'duplicate-pages', 'reverse-order', 'split-by-size', 'split-by-bookmarks',
  // Security & Protection
  'sign', 'redact', 'remove-hidden-data', 'certificate',
  // Convert
  'pdf-to-images', 'images-to-pdf', 'pdf-to-word', 'pdf-to-excel', 'pdf-to-text',
  'pdf-to-csv', 'pdf-to-html', 'pdf-to-markdown',
  // Edit & Enhance
  'compress', 'add-watermark', 'page-numbers', 'crop', 'resize',
  'grayscale', 'invert-colors', 'flatten', 'remove-annotations',
  // Content & Media
  'extract-images', 'remove-images', 'optimize-images', 'add-qr-code',
  'add-barcode', 'add-bookmarks', 'add-hyperlinks', 'add-attachments',
]

// Blog posts. Derived from MIGRATED_BLOG_SLUGS so the sitemap can never drift behind the
// posts again — every post that has a locale-aware route is included automatically. (All
// posts are migrated now, so each gets per-locale URLs + hreflang in blogUrls below.)
const blogPosts: readonly string[] = MIGRATED_BLOG_SLUGS

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // ── Locale-prefixed main pages (fully translated → per-locale + hreflang) ───
  // The blog index and all 35 posts are now fully localized, so /blog gets per-locale
  // + reciprocal hreflang here (its per-locale entries live in blogUrls below).
  const localizedMainPages = [
    { path: '',               priority: 0.95, freq: 'weekly'  as const },
    { path: '/edit',          priority: 0.9,  freq: 'weekly'  as const },
    { path: '/tools',         priority: 0.9,  freq: 'weekly'  as const },
    { path: '/how-it-works',  priority: 0.8,  freq: 'monthly' as const },
    { path: '/about',         priority: 0.75, freq: 'monthly' as const },
    { path: '/faq',           priority: 0.75, freq: 'monthly' as const },
    { path: '/contact',       priority: 0.65, freq: 'monthly' as const },
    { path: '/blog',                    priority: 0.75, freq: 'weekly'  as const },
    { path: '/privacy-policy',          priority: 0.45, freq: 'monthly' as const },
    { path: '/terms',                   priority: 0.45, freq: 'monthly' as const },
    { path: '/your-files-stay-private', priority: 0.80, freq: 'monthly' as const },
  ]

  // English-only pages: English content, canonical to /en. (None remain — kept for
  // structure; the blog index moved to the localized list above.)
  const englishOnlyMainPages: { path: string; priority: number; freq: 'weekly' | 'monthly' }[] = []

  const localizedPages: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    localizedMainPages.map(({ path, priority, freq }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: { languages: altLanguages(path) },
    }))
  )

  // ── Locale-prefixed tool pages ──────────────────────────────────────────────
  const localizedToolUrls: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    tools.map((toolId) => ({
      url: `${baseUrl}/${locale}/tools/${toolId}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: { languages: altLanguages(`/tools/${toolId}`) },
    }))
  )

  // English-only main pages: single /en URL, no hreflang (matches their /en canonical).
  const englishOnlyUrls: MetadataRoute.Sitemap = englishOnlyMainPages.map(({ path, priority, freq }) => ({
    url: `${baseUrl}/${defaultLocale}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }))

  // ── Blog posts ──────────────────────────────────────────────────────────────
  // Migrated posts are fully translated (per-locale route + self canonical), so they get
  // one URL per locale with reciprocal hreflang. Not-yet-migrated posts are still
  // English-only (every /<locale>/blog/<slug> canonicalizes to /en), so they get a single
  // /en entry with no hreflang to match that canonical.
  const blogUrls: MetadataRoute.Sitemap = blogPosts.flatMap((slug) => {
    const path = `/blog/${slug}`
    if (migratedBlogSet.has(slug)) {
      return locales.map((locale) => ({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: { languages: altLanguages(path) },
      }))
    }
    return [{
      url: `${baseUrl}/${defaultLocale}${path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }]
  })

  // ── Single canonical pages (no locale variants) ────────────────────────────
  const canonicalPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/site-index`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    },
  ]

  return [
    ...localizedPages,
    ...localizedToolUrls,
    ...englishOnlyUrls,
    ...blogUrls,
    ...canonicalPages,
  ]
}
