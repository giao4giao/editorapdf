import { supportedLocales, defaultLocale } from '../../i18n/config'

const siteUrl = 'https://editorapdf.com'

/**
 * Locale-aware canonical + hreflang alternates for a page, computed from the route's
 * locale and its (locale-stripped) sub-path.
 *
 * This replaces the old headers()-based (x-pathname) logic that used to live in the
 * [locale] layout's generateMetadata. Reading headers() forced every page into dynamic
 * rendering; deriving the canonical from the static route params instead lets the pages
 * be statically/edge-rendered while producing the exact same canonical + hreflang tags.
 *
 *   subPath: '' for the locale home, otherwise a leading-slash path with no trailing
 *            slash (e.g. '/about', '/tools', '/how-it-works').
 */
export function localeAlternates(locale: string, subPath: string) {
  const url = (code: string) => `${siteUrl}/${code}${subPath}`
  return {
    canonical: url(locale),
    languages: {
      'x-default': url(defaultLocale),
      ...Object.fromEntries(supportedLocales.map((code) => [code, url(code)])),
    } as Record<string, string>,
  }
}
