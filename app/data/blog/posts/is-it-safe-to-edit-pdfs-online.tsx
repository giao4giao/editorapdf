import { siteUrl } from '../../../lib/site';
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const slug = 'is-it-safe-to-edit-pdfs-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog2.png'
const datePublished = '2026-02-01'
const dateModified = '2026-02-01'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'Is It Safe to Edit PDFs Online? Privacy, Security, and What You Should Know',
    metaDesc: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.',
    ogTitle: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
    ogDesc: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for safely editing PDF documents online.',
    twTitle: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
    twDesc: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for safely editing PDF documents online.',
    heroAlt: 'Is It Safe to Edit PDFs Online.',

    bcLeaf: 'Is It Safe to Edit PDFs Online?',
    heroTitle: 'Is It Safe to Edit PDFs Online?',
    heroSubtitle: 'Privacy, Security, and What You Should Know',

    artHeadline: 'Is It Safe to Edit PDFs Online? Privacy & Security Guide',
    artDesc: 'A practical guide explaining how online PDF editors handle files, common privacy risks, and best practices for safe PDF editing.',

    intro1: "Editing PDF files online has become increasingly common. From signing documents to making quick text changes, browser-based PDF editors offer convenience without installing software. But many users understandably ask an important question:",
    intro2: 'Is it actually safe to edit PDFs online?',
    intro3: "In this guide, we'll explain how online PDF editors work, what privacy and security risks exist, and how to use these tools responsibly - especially when working with sensitive documents.",

    s1h: 'How Online PDF Editors Work',
    s1p1: 'Most modern online PDF editors fall into one of two categories:',
    s1l1a: 'Server-based editors',
    s1l1b: ' - Files are uploaded to a remote server, processed there, and then returned to the user.',
    s1l2a: 'Browser-based editors',
    s1l2b: " - Files are processed locally in the user's browser using client-side technologies such as JavaScript.",
    s1p2: 'The difference matters because it directly affects how your documents are handled during editing.',

    s2h: 'What Happens to Your PDF During Editing?',
    s2p1: 'When you open a PDF in a browser-based editor, the file is typically:',
    s2l1: "Loaded into your browser's memory",
    s2l2: 'Rendered visually for editing',
    s2l3: 'Modified locally as you make changes',
    s2l4: 'Saved only when you choose to export or download the edited file',
    s2p2: 'In this setup, the document does not need to be stored on a remote server as part of the editing process.',

    s3h: 'Common Privacy Concerns When Editing PDFs Online',
    s3q1: '1. Are my files uploaded to a server?',
    s3a1: "This depends on the editor. Some tools require uploading files to their servers, while others process files locally in the browser. Users should always check a service's privacy policy to understand how files are handled.",
    s3q2: '2. Can someone access my document?',
    s3a2: 'With browser-based editors, document processing happens locally during the session. However, users should still avoid editing highly sensitive or confidential documents unless they fully trust the service and understand how it works.',
    s3q3: '3. Is personal data collected?',
    s3a3: 'Many online tools collect limited technical data, such as:',
    s3l1: 'Browser type',
    s3l2: 'Device type',
    s3l3: 'Anonymous usage statistics',
    s3a3b: 'This data is generally used to improve performance and reliability, not to access document contents.',

    s4h: 'Best Practices for Editing PDFs Safely Online',
    s4p1: 'To minimize risk when using online PDF editors, follow these practical guidelines:',
    s4l1: 'Review the privacy policy before uploading documents',
    s4l2: 'Avoid editing highly sensitive files (e.g., passports, banking records) unless absolutely necessary',
    s4l3: 'Keep local backups of original documents',
    s4l4: 'Use secure networks, especially when working on public Wi-Fi',
    s4l5: 'Export and review the final document before sharing or submitting it',
    s4p2: 'These steps apply regardless of which PDF editor you use.',

    s5h: 'Are Online PDF Editors Safe for Everyday Use?',
    s5p1: 'For everyday tasks - such as editing forms, adding annotations, or updating documents - browser-based PDF editors are generally safe when used responsibly.',
    s5p2: 'They are especially useful for:',
    s5l1: 'Quick edits',
    s5l2: 'Non-confidential documents',
    s5l3: 'Occasional document adjustments',
    s5p3: 'As with any online tool, understanding how it works and what data is involved is key.',

    s6h: 'How EditoraPDF Approaches Privacy',
    s6p1: 'EditoraPDF is designed to work directly in your browser. Files are processed locally as part of the editing process, and users can edit and export PDFs without creating an account.',
    s6p2: 'Like most websites, EditoraPDF may use limited analytics and technical tools to improve performance, but document contents are not used for analytics or advertising purposes.',
    s6p3a: 'For full details, users should always refer to the official',
    s6p3link: 'Privacy Policy',

    s7h: 'Final Thoughts',
    s7p1: 'Online PDF editors can be a practical and safe option when used correctly. The key is transparency: knowing how a tool processes files, what data is collected, and what limitations exist.',
    s7p2: "If you're editing PDFs online, choose tools that clearly explain their approach to privacy, avoid unnecessary uploads, and give users control over their documents.",

    // Visible FAQ (5)
    fv1q: 'Is it safe to edit PDFs online?',
    fv1a: 'Editing PDFs online can be safe when used responsibly. Users should understand how a tool processes files, review its privacy policy, and avoid uploading highly sensitive documents unless they fully trust the service.',
    fv2q: 'Do online PDF editors upload files to a server?',
    fv2a: "Some online PDF editors upload files to servers for processing, while others process files locally in the browser. This depends on the tool, so it's important to check the editor's documentation and privacy policy before using it.",
    fv3q: 'What is the safest way to edit PDFs online?',
    fv3a: 'The safest approach is to use trusted tools, keep backups of original files, avoid editing confidential documents when possible, use secure internet connections, and carefully review the final document before sharing or submitting it.',
    fv4q: 'Can I edit confidential PDFs online?',
    fv4a: "If a PDF contains sensitive personal or financial information, it's generally best to avoid editing it online unless you clearly understand how the service handles files and are comfortable with its privacy practices.",
    fv5q: 'Does analytics include the contents of my PDF?',
    fv5a: "Analytics data is typically limited to technical and usage information such as browser type, device type, or page views. Document contents are not intended to be included in analytics, but users should verify this by reviewing the service's privacy policy.",

    // Schema FAQ (5) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'Is it safe to edit PDFs online?',
    fq1a: 'Editing PDFs online can be safe when used responsibly. Users should understand whether files are processed locally in the browser or uploaded to a server, and should review the privacy policy of the tool they use.',
    fq2q: 'Do online PDF editors upload files to a server?',
    fq2a: "Some online PDF editors upload files to servers for processing, while others process files locally in the browser. This depends on the tool, so it is important to check the tool's documentation and privacy policy.",
    fq3q: 'What is the safest way to edit PDFs online?',
    fq3a: 'Best practices include avoiding highly sensitive documents, keeping backups of the original file, using a trusted tool, reviewing the privacy policy, and verifying the final PDF before sharing or submitting it.',
    fq4q: 'Can I edit confidential PDFs online?',
    fq4a: 'If a document contains highly sensitive personal or financial information, it is best to avoid editing it online unless you fully trust the service and understand how it handles files during processing.',
    fq5q: 'Does analytics include the contents of my PDF?',
    fq5a: 'Analytics is typically limited to technical and usage information such as page views, device type, or browser type. Document contents should not be included in analytics, but users should verify this in the privacy policy of the service.',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {}, zh: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Per-key fallback to English so a missing translation never blanks the page.
  return new Proxy(base, { get: (_t, k: string) => (over[k] && over[k].length ? over[k] : base[k]) }) as Content
}

export function meta(locale: AppLocale): Metadata {
  const c = content(locale)
  const url = postUrl(locale)
  return {
    title: c.metaTitle,
    description: c.metaDesc,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      images: [{ url: `${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`, width: 1200, height: 630, alt: c.heroAlt }],
      siteName: 'EditoraPDF',
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`],
    },
    alternates: localeAlternates(locale, postPath),
  }
}

export function schemas(locale: AppLocale): Record<string, unknown>[] {
  const c = content(locale)
  const url = postUrl(locale)
  const m = getMessages(locale)
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: [1, 2, 3, 4, 5].map((n) => ({
      '@type': 'Question',
      name: c[`fq${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fq${n}a`] },
    })),
  }
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${url}#breadcrumbs`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m['blog.bcHome'] || 'Home', item: `${siteUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: m['blog.bcBlog'] || 'Blog', item: `${siteUrl}/${locale}/blog` },
      { '@type': 'ListItem', position: 3, name: c.bcLeaf, item: url },
    ],
  }
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#blogpost`,
    headline: c.artHeadline,
    description: c.artDesc,
    image: `${siteUrl}/og/is-it-safe-to-edit-pdfs-online.png`,
    author: {
      '@type': 'Organization',
      name: 'EditoraPDF Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: locale,
    keywords: [
      'is it safe to edit pdf online',
      'safe pdf editor',
      'pdf privacy',
      'edit pdf securely',
      'browser pdf editor',
    ],
    articleSection: 'Privacy & Security',
    isAccessibleForFree: true,
  }
  return [faqSchema, breadcrumbSchema, articleSchema]
}

export function Article({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const m = getMessages(locale)
  const t = (k: string, fb: string) => (m[k] && m[k].trim() ? m[k] : fb)
  const L = (p: string) => `/${locale}${p}`

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-surface-800/30 border-b border-surface-700/30" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <ol className="flex items-center gap-2 text-sm text-surface-400">
            <li>
              <Link href={L('')} className="hover:text-primary-400 transition-colors">{t('blog.bcHome', 'Home')}</Link>
            </li>
            <li>/</li>
            <li>
              <Link href={L('/blog')} className="hover:text-primary-400 transition-colors">{t('blog.bcBlog', 'Blog')}</Link>
            </li>
            <li>/</li>
            <li className="text-surface-300">{c.bcLeaf}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Image with Title Overlay */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-surface-800">
        <Image fill priority sizes="100vw"
          src={heroImage}
          alt={c.heroAlt}
          className="w-full h-full object-cover shadow-[inset_0_0_200px_100px_rgba(0,0,0,0.8),0_0_100px_50px_rgba(0,0,0,0.6)]"
          style={{
            boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />

        {/* Title Overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full max-w-4xl mx-auto px-6 pb-8 md:pb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {c.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-surface-200 leading-relaxed max-w-3xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {c.heroSubtitle}
            </p>
            <BlogByline locale={locale} datePublished={datePublished} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <article className="flex-1 py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Article Intro */}
          <div className="mb-8">
            <p className="text-xl text-surface-300 leading-relaxed mb-4">
              {c.intro1}
            </p>
            <p className="text-xl text-primary-400 font-semibold mb-4">
              {c.intro2}
            </p>
            <p className="text-lg text-surface-400">
              {c.intro3}
            </p>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s1p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s1l1a}</strong>{c.s1l1b}</li>
                <li><strong className="text-white">{c.s1l2a}</strong>{c.s1l2b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s1p2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s2p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s2l1}</li>
                <li>{c.s2l2}</li>
                <li>{c.s2l3}</li>
                <li>{c.s2l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s2p2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s3h}</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.s3q1}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s3a1}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.s3q2}</h3>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s3a2}
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{c.s3q3}</h3>
                  <p className="text-surface-300 leading-relaxed mb-2">
                    {c.s3a3}
                  </p>
                  <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                    <li>{c.s3l1}</li>
                    <li>{c.s3l2}</li>
                    <li>{c.s3l3}</li>
                  </ul>
                  <p className="text-surface-300 leading-relaxed">
                    {c.s3a3b}
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s4p1}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s4l1}</li>
                <li>{c.s4l2}</li>
                <li>{c.s4l3}</li>
                <li>{c.s4l4}</li>
                <li>{c.s4l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s4p2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s5p2}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s5l1}</li>
                <li>{c.s5l2}</li>
                <li>{c.s5l3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">
                {c.s5p3}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p1}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s6p2}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s6p3a}{' '}
                <Link href={L('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.s6p3link}
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.s7p1}
              </p>
              <p className="text-surface-300 leading-relaxed mt-4">
                {c.s7p2}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>

              <div className="space-y-6">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n}>
                    <h3 className="text-xl font-semibold text-white mb-2">{c[`fv${n}q`]}</h3>
                    <p className="text-surface-300 leading-relaxed">
                      {c[`fv${n}a`]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link
              href={L('/blog')}
              className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              {t('blog.backToBlog', 'Back to Blog')}
            </Link>
          </div>
        </div>
      </article>

      {/* Footer with Social Links */}
      <footer className="mt-auto py-4 px-6 border-t border-surface-800/50" role="contentinfo">
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Disclaimer */}
          <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
            <p className="text-xs text-surface-400 leading-relaxed">
              <strong className="text-surface-300">{t('blog.disclaimerLabel', 'Disclaimer:')}</strong> {t('blog.disclaimerBody', 'EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our')}{' '}
              <Link href={L('/terms')} className="text-primary-400 hover:text-primary-300 underline">
                {t('blog.terms', 'Terms')}
              </Link>
              {' '}{t('blog.and', 'and')}{' '}
              <Link href={L('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">
                {t('blog.privacyPolicy', 'Privacy Policy')}
              </Link>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-surface-500">
              © {new Date().getFullYear()} EditoraPDF. {t('blog.rights', 'All rights reserved.')}
            </p>

            {/* Social Links */}
            <a href="https://github.com/giao4giao/editorapdf" className="text-sm text-surface-400 hover:text-primary-400">GitHub · giao4giao</a>
          </div>
        </div>
      </footer>

      {/* Background */}
      <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
      <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
    </main>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate generated file out of this template).
import { TRANSLATIONS } from './is-it-safe-to-edit-pdfs-online.i18n'
Object.assign(C, TRANSLATIONS)
