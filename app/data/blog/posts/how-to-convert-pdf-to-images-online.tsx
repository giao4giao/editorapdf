import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-convert-pdf-to-images-online'
const postPath = `/blog/${slug}`
const heroImage = '/og/og-image.png'
const datePublished = '2026-06-19'
const dateModified = '2026-06-19'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is the canonical source; other locales are translations
// injected below (see TRANSLATIONS). Inline <strong>/<Link> markup stays in the JSX —
// only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Convert PDF to Images (JPG, PNG, WebP) | EditoraPDF',
    metaDesc: 'Convert PDF to JPG, PNG or WebP online for free. Export every PDF page as a separate image right in your browser — no upload, no signup, fully private.',
    ogTitle: 'How to Convert PDF to Images (JPG, PNG, WebP) Online',
    ogDesc: 'Turn each page of a PDF into a separate JPG, PNG, or WebP image — privately, in your browser. Step-by-step guide plus tips on which format to pick.',
    ogAlt: 'Guide on how to convert a PDF to JPG, PNG, and WebP images online',
    twTitle: 'How to Convert PDF to Images (JPG, PNG, WebP) Online',
    twDesc: 'Export PDF pages as JPG, PNG, or WebP images — free, private, in your browser.',
    heroAlt: 'Step-by-step guide on how to convert a PDF to JPG, PNG, and WebP images',

    bcLeaf: 'How to Convert PDF to Images',
    heroTitle: 'How to Convert PDF to Images (JPG, PNG, WebP) Online',
    heroSubtitle: 'Turn each page of a PDF into a separate image — privately, right in your browser, with no upload and no signup',

    artHeadline: 'How to Convert PDF to Images (JPG, PNG, WebP) Online',
    artDesc: 'Step-by-step guide on how to convert a PDF to JPG, PNG, and WebP images online without installing software',

    intro1: 'A PDF is great for keeping a document intact, but it is the wrong format the moment you want to post a page to Instagram, drop a chart into a slide deck, or pull a layout into Photoshop. Those places want an image — a JPG, PNG, or WebP — not a PDF.',
    intro2: 'Converting a PDF to images sounds simple, yet the usual routes are clumsy: screenshots look blurry, desktop apps are overkill, and most "free" online converters quietly upload your file to a server first. This guide shows a cleaner way — exporting each PDF page as a crisp image directly in your browser — and explains which format to choose for the best result.',

    s1h: 'Why Converting a PDF to Images Is Trickier Than It Looks',
    s1p1: 'On the surface, "PDF to image" feels like a one-click job. In practice, a few things get in the way:',
    s1l1: 'A PDF can hold dozens of pages, but an image holds exactly one — so the file has to be split page by page.',
    s1l2: 'Screenshots are tempting, but they capture your screen, not the page, so the result is low-resolution and cropped.',
    s1l3: 'Each page needs to render at full resolution to stay sharp when zoomed, printed, or projected.',
    s1l4: 'Picking the wrong format (JPG for a crisp diagram, for example) softens text and adds visible compression artifacts.',
    s1p2: 'A proper PDF-to-images converter solves all of this: it reads the document, renders every page at its native resolution, and lets you export each one as a separate image in the format that suits your content.',

    s2h: 'When and Why You Would Convert a PDF to Images',
    s2p1: 'Turning PDF pages into images is one of those small tasks that comes up constantly. A few real situations where it helps:',
    s2l1: 'A social media manager needs to post a single page of a brochure as a JPG to Instagram or LinkedIn, where PDFs simply will not display.',
    s2l2: 'A teacher pulls one page of a worksheet into a slide deck or printed handout as a clean PNG.',
    s2l3: 'A designer drops a page into Photoshop or Canva to retouch it, add branding, or use it as a background.',
    s2l4: 'A developer or writer embeds a page preview into a doc, a wiki, or an email where an inline image renders but an attachment would not.',
    s2l5: 'Anyone archiving documents wants lightweight page thumbnails or previews instead of opening the full PDF every time.',
    s2p2: 'In all of these cases the goal is the same: get the visual content of a page out of the PDF wrapper and into a portable image you can drop anywhere.',

    s3h: 'The Private, In-Browser Way to Convert',
    s3p1: 'Most online converters work by uploading your PDF to a remote server, processing it there, and sending images back. That is fine for a public flyer, but it is a real concern for anything containing personal details, client work, contracts, or unpublished material.',
    s3p2a: 'EditoraPDF takes a different approach. The ',
    s3p2link: 'PDF to Images tool',
    s3p2b: ' runs entirely in your browser using your device’s own processing power. Your PDF is read locally, every page is rendered locally, and the images are generated locally. Nothing is uploaded, nothing is stored on a server, and nothing leaves your computer.',
    s3p3: 'That means it is private by design, it works on slow or metered connections, and there is no account, no watermark, and no waiting in a queue.',

    s4h: 'How to Convert a PDF to Images, Step by Step',
    s4p1: 'Here is the full process using our free tool. The whole thing takes well under a minute for a typical document:',
    s4o1a: 'Open the ',
    s4o1b: 'PDF to Images',
    s4o1c: ' tool and either drag your PDF onto the page or click to select it from your device.',
    s4o2: 'Wait a moment while every page renders as a preview thumbnail — this happens locally, so larger files take a little longer.',
    s4o3: 'Choose your output format: PNG, JPG, or WebP (see the format guide below to pick the right one).',
    s4o4: 'Select which pages to export — keep all pages, or pick only the specific pages you need.',
    s4o5: 'Click convert. Each selected page becomes its own image at the page’s original resolution.',
    s4o6: 'Download the results — grab images individually, or download everything at once as a single ZIP file.',
    s4p2: 'Because each page exports as a separate file, a 10-page PDF gives you 10 images, named in page order so they stay easy to organize.',

    s5h: 'Which Format Should You Choose: JPG, PNG, or WebP?',
    s5p1: 'The format you pick has the biggest effect on quality and file size. Each one is built for a different kind of page:',
    s5l1a: 'JPG / JPEG',
    s5l1b: ' — the smallest files and the best choice for photo-heavy pages, scanned documents, or anything you are uploading to social media. It uses lossy compression, so it is not ideal for sharp text or fine lines.',
    s5l2a: 'PNG',
    s5l2b: ' — lossless quality with support for transparency. This is the right pick for pages with crisp text, diagrams, charts, logos, or screenshots, where you want every edge to stay perfectly clean.',
    s5l3a: 'WebP',
    s5l3b: ' — a modern format that offers the best balance of quality and size, often producing files noticeably smaller than PNG at similar quality. Ideal for the web, as long as the destination supports it.',
    s5p2: 'A simple rule of thumb: choose JPG for photos and smaller files, PNG for text and diagrams or when you need transparency, and WebP when you want the best quality-to-size ratio and you know it will display correctly.',

    s6h: 'Tips for the Best Results',
    s6p1: 'A few small choices make the difference between an image that looks great everywhere and one that looks soft:',
    s6l1: 'Each page exports at its original resolution, so a print-quality PDF produces print-quality images — no need to upscale afterward.',
    s6l2: 'If you only need a few pages, select them specifically instead of exporting all of them; you will get a smaller, tidier download.',
    s6l3: 'Use the ZIP download when you are exporting many pages — it keeps everything in one file and preserves the page order.',
    s6l4: 'For pages mixing photos and text, PNG is the safest default; switch to JPG only when file size matters more than razor-sharp text.',

    s7h: 'A Few Limitations to Keep in Mind',
    s7p1: 'Converting a PDF to images is a one-way transformation, and that comes with a couple of trade-offs worth knowing:',
    s7l1: 'Images are not searchable or selectable. Once a page is an image, the text inside it becomes pixels — you cannot copy or edit that text anymore.',
    s7l2: 'Output quality is capped by the source. A blurry or low-resolution scan will produce a blurry image; converting cannot add detail that was not there.',
    s7l3: 'Very large or very high-page-count PDFs take longer to render because all the work happens on your own device rather than a server.',
    s7p2: 'If you need the text to stay editable, keep the original PDF as well — the image export is best thought of as a portable copy of how each page looks, not a replacement for the document itself.',

    fth: 'Final Thoughts',
    ftp1a: 'Converting a PDF into images removes the friction between a finished document and everywhere you actually want to use it — social posts, slides, design tools, and previews. With the right format and a tool that works locally, you get sharp results without sacrificing privacy or waiting on an upload.',
    ftp1b: 'When you are ready, you can ',
    ftp1link: 'open your PDF and start exporting pages as images directly in your browser',

    // Visible FAQ (6) — these are the SAME Q&A used in the FAQPage schema.
    fv1q: 'Is converting a PDF to images free?',
    fv1a: 'Yes. EditoraPDF’s PDF to Images tool is completely free with no signup, no watermark, and no page limit. You can convert as many PDFs as you like and export every page as a JPG, PNG, or WebP image at no cost.',
    fv2q: 'Are my files uploaded or kept private?',
    fv2a: 'Your files stay private. The entire conversion runs locally in your browser, so your PDF is never uploaded to a server. Each page is read and turned into an image on your own device, and nothing is stored or sent anywhere.',
    fv3q: 'What image formats can I export to?',
    fv3a: 'You can export to PNG, JPG (JPEG), or WebP. PNG is lossless and supports transparency, JPG produces the smallest files for photos, and WebP offers an excellent balance of quality and size for modern web use.',
    fv4q: 'Will the image quality be good?',
    fv4a: 'Yes. Each page is rendered at its original resolution, so the images stay sharp when zoomed, printed, or projected. Final quality depends on the source PDF and the format you choose — PNG keeps text crispest, while JPG trades some sharpness for smaller files.',
    fv5q: 'Can I convert only specific pages instead of the whole PDF?',
    fv5a: 'Absolutely. You can convert every page at once or pick only the specific pages you need. Each selected page becomes its own separate image, and you can download them individually or together as a single ZIP file.',
    fv6q: 'Does it work on mobile and all browsers?',
    fv6a: 'Yes. Because the tool runs in the browser, it works on any modern browser on desktop, tablet, or phone — no app to install. Larger PDFs may render a little slower on mobile since the conversion uses your device’s own processing power.',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
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
    author: { '@type': 'Organization', name: 'EditoraPDF Team' },
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
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1l1}</li>
                <li>{c.s1l2}</li>
                <li>{c.s1l3}</li>
                <li>{c.s1l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s1p2}</p>
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
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s3p2a}
                <Link href={L('/tools/pdf-to-images')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.s3p2link}
                </Link>
                {c.s3p2b}
              </p>
              <p className="text-surface-300 leading-relaxed">{c.s3p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s4p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>
                  {c.s4o1a}
                  <Link href={L('/tools/pdf-to-images')} className="text-primary-400 hover:text-primary-300 underline">
                    <strong className="text-white">{c.s4o1b}</strong>
                  </Link>
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
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li><strong className="text-white">{c.s5l1a}</strong>{c.s5l1b}</li>
                <li><strong className="text-white">{c.s5l2a}</strong>{c.s5l2b}</li>
                <li><strong className="text-white">{c.s5l3a}</strong>{c.s5l3b}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s5p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s6p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s6l1}</li>
                <li>{c.s6l2}</li>
                <li>{c.s6l3}</li>
                <li>{c.s6l4}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s7p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s7l1}</li>
                <li>{c.s7l2}</li>
                <li>{c.s7l3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s7p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.fth}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.ftp1a}
                <br />
                <br />
                {c.ftp1b}
                <Link href={L('/tools/pdf-to-images')} className="text-primary-400 hover:text-primary-300 underline">
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

            <div className="flex items-center gap-4">
              <span className="text-sm text-surface-500">{t('blog.followUs', 'Follow us:')}</span>
              <div className="flex items-center gap-3">
                <a href="https://www.facebook.com/people/Editorapdf/61587362633003/" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followFacebook', 'Follow us on Facebook')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/editora_pdf" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followInstagram', 'Follow us on Instagram')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"/>
                  </svg>
                </a>
                <a href="https://www.threads.com/@editora_pdf" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.followThreads', 'Follow us on Threads')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142l-.126 1.974c-.94-.15-1.96-.185-2.935-.103-1.118.094-1.983.388-2.508.851-.473.418-.7.942-.664 1.521.033.563.331 1.035.859 1.368.549.347 1.293.479 2.093.372 1.031-.139 1.863-.567 2.476-1.275.576-.665.94-1.582 1.084-2.73l.09-.664c-1.205-.63-2.046-1.613-2.502-2.923-.414-1.189-.444-2.589-.088-4.162l1.967.381c-.272 1.145-.269 2.182.01 3.083.259.839.82 1.55 1.67 2.113.18-.194.358-.397.532-.61.827-1.008 1.487-2.415 1.96-4.19l1.973.426c-.52 1.957-1.273 3.612-2.24 4.917-.3.405-.624.791-.97 1.153.518.36.952.79 1.287 1.278.616.896 1.008 2.01 1.165 3.314.232 1.938-.006 3.98-1.928 5.96-1.72 1.766-3.977 2.633-6.85 2.653z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@EditoraPDF" target="_blank" rel="noopener noreferrer nofollow" className="text-surface-400 hover:text-primary-400 transition-colors" aria-label={t('blog.subscribeYouTube', 'Subscribe on YouTube')}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
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
import { TRANSLATIONS } from './how-to-convert-pdf-to-images-online.i18n'
Object.assign(C, TRANSLATIONS)
