import type { Metadata } from 'next'
import BlogIndex from '../../components/BlogIndex'
import { localeAlternates } from '../../lib/seo'
import { supportedLocales, normalizeLocale, type AppLocale } from '../../../i18n/config'

export function generateStaticParams() {
  return supportedLocales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return {
    title: 'Blog - Tips & Guides',
    description: 'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.',
    alternates: localeAlternates(normalizeLocale(params.locale), '/blog'),
  }
}

export default function LocaleBlogPage({ params }: { params: { locale: string } }) {
  const locale: AppLocale = normalizeLocale(params.locale)
  return <BlogIndex locale={locale} />
}
