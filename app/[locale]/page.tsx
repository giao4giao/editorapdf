import { siteUrl } from '../lib/site';
import Script from 'next/script';
import { generateFAQSchema } from '../data/faq';
import Header from '../components/Header';
import HomeWorkspace from '../components/HomeWorkspace';

import type { Metadata } from 'next';
import type { AppLocale } from '../../i18n/config';
import { getMessages } from '../i18n/messages';
import { localeAlternates, pageOpenGraph } from '../lib/seo';


// Canonical + hreflang for the locale home (was provided by the [locale] layout's
// headers()-based metadata; now per-page so the route can be statically rendered).
export function generateMetadata({ params }: { params: { locale: AppLocale } }): Metadata {
  const m = getMessages(params.locale) as Record<string, string>;
  const t = (k: string) => m[k] ?? k;
  const title = `${t('hero.title.leading')} ${t('hero.title.trailing')}`.trim();
  return {
    openGraph: pageOpenGraph(params.locale, '', title, t('hero.desc')),
    alternates: localeAlternates(params.locale, ''),
  };
}

export default function Home({ params }: { params: { locale: AppLocale } }) {
  const locale = params.locale;
  const messages = getMessages(locale) as Record<string, string>;
  const t = (k: string) => messages[k] ?? k;

  // FAQ Schema for SEO - Generated from reusable per-locale data
  const faqSchema = generateFAQSchema(siteUrl, locale);

  // NOTE: HowTo structured data intentionally removed. Google deprecated HowTo rich
  // results in 2023 (no SERP feature on desktop or mobile), so it added payload with
  // zero rich-result benefit. The page's WebApplication + FAQ schema remain.

  // NOTE: Product/Review structured data intentionally removed.
  // Hardcoded aggregateRating + fabricated reviews violate Google's review-snippet
  // policy (self-serving markup with no real, on-page user reviews) and risk a
  // "Spammy structured markup" manual action. Only re-add rating/Review markup when
  // genuine, user-generated reviews are visibly rendered on the page.

  // WebApplication Schema - ONLY on actual tool page
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${siteUrl}/#webapp`,
    name: 'EditoraPDF',
    alternateName: t('schema.app.altName'),
    url: siteUrl,
    description: t('schema.app.desc'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: t('schema.app.subCategory'),
    operatingSystem: 'Any',
    browserRequirements: t('schema.app.browserReq'),
    softwareVersion: '1.0.0',
    releaseNotes: t('schema.app.releaseNotes'),
    isAccessibleForFree: true,
    offers: [
      {
        '@type': 'Offer',
        '@id': `${siteUrl}/#free-offer`,
        name: t('schema.app.offerName'),
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        category: t('schema.app.offerCategory'),
        url: siteUrl,
      },
    ],
    featureList: Array.from({ length: 10 }, (_, i) => t(`schema.app.feat${i + 1}`)),
    permissions: t('schema.app.permissions'),
    inLanguage: [locale],
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    creator: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      url: siteUrl,
    },
    image: [
      `${siteUrl}/og/og-image.png`,
    ],
    screenshot: [
      {
        '@type': 'ImageObject',
        url: `${siteUrl}/screenshots/editor.png`,
      },
    ],
    softwareHelp: {
      '@type': 'CreativeWork',
      name: t('nav.contact'),
      url: `${siteUrl}/${locale}/contact`,
    },
    privacyPolicy: `${siteUrl}/${locale}/privacy-policy`,
    termsOfService: `${siteUrl}/${locale}/terms`,
    audience: {
      '@type': 'Audience',
      audienceType: Array.from({ length: 4 }, (_, i) => t(`schema.app.aud${i + 1}`)),
    },
    potentialAction: [
      {
        '@type': 'UseAction',
        name: t('schema.app.actionName'),
        target: `${siteUrl}/${locale}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data Scripts - Load after page is interactive to improve TBT */}
      <Script
        id="jsonld-webapp"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        strategy="lazyOnload"
      />
      <Script
        id="jsonld-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="lazyOnload"
      />

      {/* AdSense is loaded once globally in the root layout — the duplicate loader that
          used to live here was removed to avoid fetching adsbygoogle.js twice on the home page. */}

      <main className="min-h-screen flex flex-col" role="main">
      <Header />

      <HomeWorkspace locale={locale} />
    </main>
    </>
  );
}
