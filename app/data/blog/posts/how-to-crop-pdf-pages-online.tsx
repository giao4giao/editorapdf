import { siteUrl } from '../../../lib/site';
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const slug = 'how-to-crop-pdf-pages-online'
const postPath = `/blog/${slug}`
const heroImage = '/og/og-image.png'
const datePublished = '2026-06-19'
const dateModified = '2026-06-19'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is the source of truth; other locales are translations injected
// below via TRANSLATIONS. Inline <strong>/<Link> markup stays in the JSX — only the text
// segments are keyed here. Missing keys fall back to `en` per-key at render time.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Crop PDF Pages Online: Trim Margins',
    metaDesc: 'Learn how to crop PDF pages online for free. Trim margins, remove white space, and cut scanner borders right in your browser — no upload, no install, no quality loss.',
    ogTitle: 'How to Crop PDF Pages Online: Trim Margins and White Space',
    ogDesc: 'A simple guide to cropping PDF pages in your browser. Trim margins, remove white space, and cut off scanner edges without losing text quality or uploading files.',
    ogAlt: 'Cropping a PDF page online to trim margins and white space',
    twTitle: 'How to Crop PDF Pages Online: Trim Margins and White Space',
    twDesc: 'Trim margins, remove white space, and cut scanner edges from PDF pages — free, private, and right in your browser.',
    heroAlt: 'How to crop PDF pages online to trim margins and remove white space',

    bcLeaf: 'How to Crop PDF Pages',
    heroTitle: 'How to Crop PDF Pages Online: Trim Margins and White Space',
    heroSubtitle: 'Cut away unwanted margins, borders, and white space so your content fills the page — directly in your browser, no upload required',

    artHeadline: 'How to Crop PDF Pages Online: Trim Margins and White Space',
    artDesc: 'A step-by-step guide to cropping PDF pages online to trim margins, remove white space, and cut off scanner borders without losing quality',

    intro1: 'A PDF that looks fine on a big monitor can be frustrating on a phone, a tablet, or an e-reader. Wide margins shrink the actual text to a tiny strip in the middle of the screen, and scanned books often carry thick black edges or crooked borders that distract from every page. The fix is not to redesign the document — it is simply to crop it.',
    intro2: 'Cropping a PDF trims away the parts of each page you do not need, so the content you care about fills more of the view. This guide explains what cropping does (and what it does not), when it is the right tool, and how to crop PDF pages online for free in just a few clicks — with every file staying private on your own device.',

    s1h: 'What "Cropping a PDF" Actually Does',
    s1p1: 'Cropping a PDF means trimming the visible area of each page — pulling the edges inward to cut off margins, borders, or white space you do not want. You set a crop boundary, and everything outside that boundary is hidden from view, leaving a tighter page that focuses on the content.',
    s1p2: 'Cropping is non-destructive to the part you keep. It changes the visible page box (the area the PDF displays), not the underlying content, so:',
    s1l1: 'Text inside the kept area stays fully selectable and searchable',
    s1l2: 'Images keep their original resolution — nothing is re-rasterized or blurred',
    s1l3: 'Fonts, links, and layout within the crop are untouched',
    s1l4: 'You are only changing where the page edges sit, not redrawing the page',
    s1p3: 'This is different from a resize. Cropping removes area from a page; resizing rescales the whole page to fit a new dimension. If you want a page to physically become smaller or larger, you resize it. If you want to cut off the unwanted parts, you crop it.',

    s2h: 'When and Why You Would Crop a PDF',
    s2p1: 'Cropping solves a handful of very common, very practical problems. You might reach for it when you need to:',
    s2l1: 'Remove wide white margins so a document reads comfortably on a phone or tablet',
    s2l2: 'Reflow a paper for an e-reader, where every wasted millimeter of margin shrinks the text',
    s2l3: 'Cut off the black scanner edges or skewed borders left behind when scanning a book',
    s2l4: 'Focus a page on a single chart, table, or figure to drop into a presentation',
    s2l5: 'Tighten pages before printing so more content fits and you waste less paper',
    s2p2: 'Picture a student who scanned a textbook chapter and ended up with dark borders around every page, a commuter trying to read a wide academic PDF on a phone screen, or an analyst who only needs one table from a 40-page report for a slide. In each case, cropping turns an awkward, hard-to-read file into something clean and purpose-built.',

    s3h: 'Crop in Your Browser — Private by Design',
    s3p1: 'The fastest way to crop a PDF is online, with no software to install and no account to create. EditoraPDF runs the entire crop in your browser, which means it works on Windows, macOS, Linux, Chromebooks, and most phones and tablets — anything with a modern browser.',
    s3p2: 'Just as importantly, your file never leaves your device. The crop is processed locally in the browser rather than being uploaded to a server, so the PDF you are working on — whether it is a contract, a scanned ID, or a private report — stays on your own machine from start to finish. There is nothing to clean up afterward and no copy sitting on someone else’s computer.',

    s4h: 'How to Crop PDF Pages Online: Step by Step',
    s4p1: 'Here is the full process from start to finish using the Crop tool:',
    s4o1a: 'Open the ',
    s4o1b: 'Crop PDF tool',
    s4o1c: ' and select your PDF, or drag and drop the file onto the page',
    s4o2: 'The first page appears with a crop frame overlaid on top of it',
    s4o3: 'Drag the edges or corners of the frame inward to set your crop boundary — trim away the margins, white space, or scanner borders you want gone',
    s4o4: 'Choose whether to apply the same crop to every page, or adjust pages individually when they are not all framed the same way',
    s4o5: 'Preview the result to confirm the content sits where you want it',
    s4o6: 'Download your cropped PDF — it saves straight to your device',
    s4p2: 'The whole thing takes well under a minute for a typical document, and because the crop is non-destructive to the kept area, the text in your trimmed pages is still searchable and the images are still sharp.',

    s5h: 'Same Crop for Every Page, or Page by Page?',
    s5p1: 'The right approach depends on how consistent your pages are.',
    s5p2: 'Apply one crop to every page when the document is uniform — for example, a born-digital report or e-book where every page has the same margins. One frame trims the whole file in a single step, which is the fastest option.',
    s5p3: 'Adjust pages individually when the framing varies from page to page. Scanned books are the classic case: pages can be slightly skewed, shifted, or scanned at different positions, so a crop that looks perfect on page one may clip text on page five. Tuning the crop per page takes a little longer but gives you a clean result across the whole document.',
    s5p4: 'A good habit is to start with one crop applied to all pages, then flip through and fine-tune only the pages that need it.',

    s6h: 'Things to Keep in Mind',
    s6p1: 'Cropping is simple, but a few notes will help you get the result you expect:',
    s6l1: 'Cropping hides the area outside the frame — it does not delete embedded content, so keep an original copy if you might need the full page later',
    s6l2: 'It does not add resolution: cropping a low-quality scan gives you a tighter low-quality scan, not a sharper one',
    s6l3: 'For scanned documents that vary page to page, plan to adjust some pages individually rather than relying on a single crop',
    s6l4: 'If you actually want the page to change physical size rather than lose its edges, use a resize tool instead of crop',
    s6l5: 'Always preview before downloading to make sure no real content was trimmed away by accident',

    fth: 'Final Thoughts',
    ftp1a: 'Cropping is one of those small edits that makes a disproportionate difference: trim the margins and a cramped PDF suddenly reads cleanly on any screen, cut the scanner edges and a messy scan looks professional. Because it is non-destructive to the content you keep and runs entirely in your browser, there is no quality trade-off and no privacy trade-off either.',
    ftp1b: 'When you are ready to tidy up a document, you can ',
    ftp1link: 'open the Crop tool and trim your PDF directly in your browser',

    // Visible FAQ (6) — these SAME keys are read by the FAQPage schema
    fv1q: 'Is cropping a PDF free?',
    fv1a: 'Yes. You can crop PDF pages online for free with EditoraPDF. There is no account to create, no software to install, and no watermark added to your file. You simply open the tool, set your crop, and download the trimmed PDF.',
    fv2q: 'Are my files uploaded or kept private?',
    fv2a: 'Your files stay private. The crop is processed locally in your browser and the PDF is never uploaded to a server. Whether you are trimming a contract or a scanned document, the file stays on your own device from start to finish.',
    fv3q: 'Does cropping reduce the quality of my PDF?',
    fv3a: 'No. Cropping changes the visible page box rather than re-rasterizing the page, so the area you keep is untouched. Text stays selectable and searchable, and images keep their original resolution. Cropping a low-quality scan will not improve it, but it will not degrade it either.',
    fv4q: 'Can I apply one crop to all pages or crop each page separately?',
    fv4a: 'Both. You can apply the same crop boundary to every page in one step, which is ideal for uniform documents. You can also adjust pages individually when the framing differs, which is common with scanned books where pages are slightly shifted or skewed.',
    fv5q: 'What is the difference between cropping and resizing a PDF?',
    fv5a: 'Cropping removes area from a page by trimming its edges, so you cut off margins, borders, or white space. Resizing rescales the whole page to a new dimension. Use crop to cut away unwanted parts and resize to make the page physically larger or smaller.',
    fv6q: 'Does cropping work on a phone or tablet?',
    fv6a: 'Yes. Because the tool runs entirely in your browser, you can crop PDF pages on a phone, tablet, Chromebook, or computer. Any device with a modern browser works, with no app to download. This makes it easy to remove margins so a PDF reads better on a small screen.',
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
      siteName: 'EditoraPDF',
      images: [{ url: `${siteUrl}${heroImage}`, width: 1200, height: 630, alt: c.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: c.twTitle,
      description: c.twDesc,
      images: [`${siteUrl}${heroImage}`],
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
    mainEntity: [1, 2, 3, 4, 5, 6].map((n) => ({
      '@type': 'Question',
      name: c[`fv${n}q`],
      acceptedAnswer: { '@type': 'Answer', text: c[`fv${n}a`] },
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
    '@id': `${url}#article`,
    headline: c.heroTitle,
    description: c.metaDesc,
    image: `${siteUrl}${heroImage}`,
    inLanguage: locale,
    author: { '@type': 'Organization', name: 'EditoraPDF Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'EditoraPDF',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.svg` },
    },
    datePublished,
    dateModified,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
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
          style={{ boxShadow: 'inset 0 0 200px 100px rgba(0,0,0,0.8), 0 0 100px 50px rgba(0,0,0,0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-900/90 via-surface-900/50 to-surface-900/30" />
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
          <div className="mb-8">
            <p className="text-xl text-surface-300 leading-relaxed mb-4">{c.intro1}</p>
            <p className="text-lg text-surface-400">{c.intro2}</p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1l1}</li>
                <li>{c.s1l2}</li>
                <li>{c.s1l3}</li>
                <li>{c.s1l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s1p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s2p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s2l1}</li>
                <li>{c.s2l2}</li>
                <li>{c.s2l3}</li>
                <li>{c.s2l4}</li>
                <li>{c.s2l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s2p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s3h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p1}</p>
              <p className="text-surface-300 leading-relaxed">{c.s3p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s4p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>
                  {c.s4o1a}
                  <Link href={L('/tools/crop')} className="text-primary-400 hover:text-primary-300 underline">{c.s4o1b}</Link>
                  {c.s4o1c}
                </li>
                <li>{c.s4o2}</li>
                <li>{c.s4o3}</li>
                <li>{c.s4o4}</li>
                <li>{c.s4o5}</li>
                <li>{c.s4o6}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed">{c.s4p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p2}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p3}</p>
              <p className="text-surface-300 leading-relaxed">{c.s5p4}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s6p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s6l1}</li>
                <li>{c.s6l2}</li>
                <li>{c.s6l3}</li>
                <li>{c.s6l4}</li>
                <li>{c.s6l5}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.fth}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.ftp1a}
                <br />
                <br />
                {c.ftp1b}
                <Link href={L('/tools/crop')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.ftp1link}
                </Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{t('blog.faqTitle', 'Frequently Asked Questions')}</h2>
              <div className="space-y-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n}>
                    <h3 className="text-xl font-semibold text-white mb-2">{c[`fv${n}q`]}</h3>
                    <p className="text-surface-300 leading-relaxed">{c[`fv${n}a`]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Back to Blog Link */}
          <div className="mt-12 pt-8 border-t border-surface-700/50">
            <Link href={L('/blog')} className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
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
          <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
            <p className="text-xs text-surface-400 leading-relaxed">
              <strong className="text-surface-300">{t('blog.disclaimerLabel', 'Disclaimer:')}</strong> {t('blog.disclaimerBody', 'EditoraPDF provides online PDF editing tools for general use only. We make no guarantees regarding accuracy, completeness, or suitability for any specific purpose. Users are responsible for reviewing all documents before use. By using this website, you agree to our')}{' '}
              <Link href={L('/terms')} className="text-primary-400 hover:text-primary-300 underline">{t('blog.terms', 'Terms')}</Link>
              {' '}{t('blog.and', 'and')}{' '}
              <Link href={L('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">{t('blog.privacyPolicy', 'Privacy Policy')}</Link>.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-surface-500">
              © {new Date().getFullYear()} EditoraPDF. {t('blog.rights', 'All rights reserved.')}
            </p>

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
import { TRANSLATIONS } from './how-to-crop-pdf-pages-online.i18n'
Object.assign(C, TRANSLATIONS)
