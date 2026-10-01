import ContactContent from '../../components/ContactContent';
import { siteUrl } from '../../lib/site';
import type { Metadata } from 'next'
import { defaultLocale, isSupportedLocale, normalizeLocale, type AppLocale } from '../../../i18n/config'
import { getMessages } from '../../i18n/messages'
import { localeAlternates, pageOpenGraph } from '../../lib/seo'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key
  return {
    title: t('contact.h1'),
    description: t('contact.subtitle'),
    openGraph: pageOpenGraph(locale, '/contact', t('contact.h1'), t('contact.subtitle'), 'EditoraPDF — Contact'),
    alternates: localeAlternates(locale, '/contact'),
  }
}


export default function ContactLocalePage({ params }: { params: { locale: string } }) {
  const locale = (isSupportedLocale(params.locale) ? normalizeLocale(params.locale) : defaultLocale) as AppLocale
  const messages = getMessages(locale)
  const t = (key: string) => messages[key] ?? key

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${siteUrl}/${locale}/contact#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('nav.home'), item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: t('nav.contact'), item: `${siteUrl}/${locale}/contact` },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactContent locale={locale} />
    </>
  )
}
