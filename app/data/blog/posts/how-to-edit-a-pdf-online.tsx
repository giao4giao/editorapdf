import { siteUrl } from '../../../lib/site';
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const slug = 'how-to-edit-a-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/blog1.png'
const datePublished = '2026-01-15'
const dateModified = '2026-01-15'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is copied verbatim from the legacy page so `/en/...` renders
// unchanged; other locales are translations. Inline <strong>/<Link> markup stays in the
// JSX below — only the text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Edit a PDF Online - Step-by-Step Guide | EditoraPDF Blog',
    metaDesc: 'Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.',
    ogTitle: 'How to Edit a PDF Online - Step-by-Step Guide',
    ogDesc: 'Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.',
    twTitle: 'How to Edit a PDF Online - Step-by-Step Guide',
    twDesc: 'Learn how to edit PDF files online without installing software.',
    heroAlt: 'Step-by-step guide on how to edit a PDF file online',

    bcLeaf: 'How to Edit a PDF Online',
    heroTitle: 'How to Edit a PDF Online',
    heroSubtitle: 'Step-by-step guide to editing PDFs directly in your browser — no software required',

    artHeadline: 'How to Edit a PDF Online',
    artDesc: 'Step-by-step guide on how to edit a PDF file online without installing software',

    intro1: 'Editing a PDF used to mean installing heavy software or paying for expensive licenses. Today, many common PDF edits can be done directly in your browser — quickly, safely, and without installing anything.',
    intro2: 'This guide explains how to edit a PDF online step by step, what types of edits are supported, and what you should keep in mind before exporting your final document.',

    s1h: 'What Does "Editing a PDF Online" Actually Mean?',
    s1p1: 'Online PDF editing usually refers to making visual and structural changes to an existing PDF file, such as:',
    s1l1: 'Adding new text',
    s1l2: 'Placing images (for example, logos or signatures)',
    s1l3: 'Highlighting or covering parts of a document',
    s1l4: 'Drawing shapes or annotations',
    s1l5: 'Reordering, rotating, or deleting pages',
    s1p2: 'Unlike word processors, PDFs are not designed to be rewritten line by line. Most online editors work by adding editable layers on top of the original document, which is ideal for corrections, notes, and updates.',

    st1h: 'Step 1: Open Your PDF in the Editor',
    st1p1: 'To start editing a PDF online:',
    st1o1a: 'Click ',
    st1o1b: 'Edit PDF',
    st1o2: 'Select a PDF file from your device or drag and drop it into the editor',
    st1o3: 'The document opens directly in your browser',
    st1p2a: 'EditoraPDF supports PDF files up to 25 MB and works best with documents under 50 pages.',
    st1p2b: 'No account is required, and no installation is needed.',

    st2h: 'Step 2: Navigate Between Pages',
    st2p1: 'Once your file is open, you can:',
    st2l1: 'See all pages in the left sidebar',
    st2l2: 'Click any page to jump to it',
    st2l3: 'Use navigation arrows to move page by page',
    st2p2: 'If needed, pages can be reordered by dragging them into a new position, helping you restructure documents like contracts or reports.',

    st3h: 'Step 3: Add or Edit Text',
    st3p1: 'To insert text into a PDF:',
    st3o1a: 'Select the ',
    st3o1b: 'Text tool',
    st3o2: 'Click anywhere on the page',
    st3o3: 'Type your text',
    st3p2: 'You can adjust:',
    st3l1: 'Font (for example, Helvetica)',
    st3l2: 'Font size',
    st3l3: 'Bold or italic style',
    st3l4: 'Text color',
    st3l5: 'Background color (optional)',
    st3p3: 'This is useful for:',
    st3m1: 'Fixing typos',
    st3m2: 'Adding missing information',
    st3m3: 'Filling in prepared document templates',

    st4h: 'Step 4: Insert Images',
    st4p1: 'You can also add images to a PDF, such as:',
    st4l1: 'Company logos',
    st4l2: 'Stamps',
    st4l3: 'Scanned signatures',
    st4l4: 'Illustrations or icons',
    st4p2: 'After inserting an image, you can:',
    st4m1: 'Resize it using percentage controls',
    st4m2: 'Adjust height and width',
    st4m3: 'Rotate it by 90° increments',
    st4m4: 'Remove it if needed',
    st4p3: 'Images are placed exactly where you position them on the page.',

    st5h: 'Step 5: Use Shapes and Highlights',
    st5p1: 'The Shape tool allows you to draw simple elements on the page, such as:',
    st5l1: 'Rectangles',
    st5l2: 'Circles',
    st5l3: 'Lines',
    st5l4: 'Arrows',
    st5p2: 'Shapes can be used to:',
    st5m1: 'Highlight important sections',
    st5m2: 'Cover sensitive information',
    st5m3: 'Add visual emphasis',
    st5p3: 'You can customize:',
    st5n1: 'Color',
    st5n2: 'Opacity (for example, semi-transparent highlights)',
    st5n3: 'Outline or filled styles',

    st6h: 'Step 6: Rotate or Delete Pages',
    st6p1: 'If a page is scanned sideways or included by mistake, you can:',
    st6l1: 'Rotate pages',
    st6l2: 'Delete individual pages',
    st6p2: 'This is especially useful when cleaning up scanned documents or merging content from different sources.',

    st7h: 'Step 7: Export and Download Your PDF',
    st7p1: "When you're finished editing:",
    st7o1a: 'Click ',
    st7o1b: 'Download PDF',
    st7o2: 'Your updated file is saved to your device',
    st7p2: 'The editing process happens locally in your browser. Once you download the file, it remains on your device.',

    limh: 'Important Limitations to Keep in Mind',
    limp1a: 'Online PDF editors are powerful, but not unlimited.',
    limp1b: "Before editing, it's good to know that:",
    liml1: 'Very complex PDFs (especially interactive forms) may have limited editing support',
    liml2: 'Scanned PDFs are treated as images unless OCR is applied',
    liml3: 'Online editors are best for visual edits, not full document rewriting',
    liml4: 'Always review the final document before using it for legal, financial, or professional purposes',

    wrh: 'When Is Online PDF Editing the Right Choice?',
    wrp1: 'Editing a PDF online is ideal when you need to:',
    wrl1: 'Make quick corrections',
    wrl2: 'Add notes or annotations',
    wrl3: 'Insert images or signatures',
    wrl4: 'Reorder or remove pages',
    wrl5: 'Avoid installing software on your device',
    wrp2: 'For simple, everyday document updates, browser-based editing is often the fastest and most practical option.',

    fth: 'Final Thoughts',
    ftp1a: 'Online PDF editing makes it easier to work with documents without unnecessary tools or setup. By understanding what edits are supported and how to apply them correctly, you can save time while keeping your documents accurate and organized.',
    ftp1b: "If you're ready to make changes, you can ",
    ftp1link: 'open your file and start editing directly in your browser',

    // Visible FAQ (6)
    fv1q: 'Can I edit a PDF online without installing software?',
    fv1a: 'Yes. Many PDF edits can be done directly in your web browser without installing any software. Online PDF editors allow you to add text, insert images, draw shapes, reorder pages, and make other visual edits without downloading additional programs.',
    fv2q: 'What types of edits can I make to a PDF online?',
    fv2a: 'Online PDF editors typically support visual and structural edits, such as adding text boxes, inserting images, drawing shapes or highlights, rotating pages, deleting pages, and reordering pages within a document.',
    fv3q: 'Is editing a PDF online safe?',
    fv3a: 'Browser-based PDF editors process files locally during editing. However, users should always review edited documents carefully and keep backups of important files, especially before using them for official or professional purposes.',
    fv4q: 'Can I edit scanned PDF documents online?',
    fv4a: 'Scanned PDF files are treated as images. Text inside scanned documents cannot be edited unless optical character recognition (OCR) is applied. Without OCR, you can still add text, images, or highlights on top of scanned pages.',
    fv5q: 'Are there file size limits for editing PDFs online?',
    fv5a: 'Most online PDF editors support files up to a certain size. For best performance, documents under 25 MB and fewer than 50 pages are recommended.',
    fv6q: 'Do I need to create an account to edit a PDF online?',
    fv6a: 'Many online PDF editors allow users to edit documents without creating an account. This makes it easier to make quick edits without registration or sign-up.',

    // Schema FAQ (5) — kept distinct from the visible FAQ to preserve the legacy markup
    fq1q: 'Can I edit a PDF online without installing software?',
    fq1a: 'Yes. Many PDF edits can be done directly in your browser without installing any software, including adding text, images, shapes, and reordering pages.',
    fq2q: 'What types of edits can I make to a PDF online?',
    fq2a: 'Online PDF editors typically support visual edits such as adding text, inserting images, drawing shapes, highlighting content, rotating pages, and deleting pages.',
    fq3q: 'Is editing a PDF online safe?',
    fq3a: 'Browser-based PDF editors process files locally during editing. Users should always review edited documents carefully and keep backups of important files.',
    fq4q: 'Can I edit scanned PDF documents online?',
    fq4a: 'Scanned PDFs are treated as images. Text inside scanned documents cannot be edited unless optical character recognition (OCR) is applied.',
    fq5q: 'Are there file size limits for editing PDFs online?',
    fq5a: 'Most online PDF editors support files up to a certain size. For best performance, documents under 25 MB and fewer than 50 pages are recommended.',
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
      locale: getOgLocale(locale),
      title: c.ogTitle,
      description: c.ogDesc,
      url,
      images: [{ url: `${siteUrl}${heroImage}`, width: 1200, height: 630, alt: c.heroAlt }],
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
    '@id': `${url}#article`,
    headline: c.artHeadline,
    description: c.artDesc,
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
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1l1}</li>
                <li>{c.s1l2}</li>
                <li>{c.s1l3}</li>
                <li>{c.s1l4}</li>
                <li>{c.s1l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s1p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st1p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st1o1a}<strong className="text-white">{c.st1o1b}</strong></li>
                <li>{c.st1o2}</li>
                <li>{c.st1o3}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed">
                {c.st1p2a}
                <br />
                {c.st1p2b}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st2p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st2l1}</li>
                <li>{c.st2l2}</li>
                <li>{c.st2l3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.st2p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st3h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st3p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st3o1a}<strong className="text-white">{c.st3o1b}</strong></li>
                <li>{c.st3o2}</li>
                <li>{c.st3o3}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st3p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st3l1}</li>
                <li>{c.st3l2}</li>
                <li>{c.st3l3}</li>
                <li>{c.st3l4}</li>
                <li>{c.st3l5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.st3p3}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st3m1}</li>
                <li>{c.st3m2}</li>
                <li>{c.st3m3}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st4p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st4l1}</li>
                <li>{c.st4l2}</li>
                <li>{c.st4l3}</li>
                <li>{c.st4l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st4p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st4m1}</li>
                <li>{c.st4m2}</li>
                <li>{c.st4m3}</li>
                <li>{c.st4m4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.st4p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st5p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st5l1}</li>
                <li>{c.st5l2}</li>
                <li>{c.st5l3}</li>
                <li>{c.st5l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st5p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st5m1}</li>
                <li>{c.st5m2}</li>
                <li>{c.st5m3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st5p3}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st5n1}</li>
                <li>{c.st5n2}</li>
                <li>{c.st5n3}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st6h}</h2>
              <p className="text-surface-300 leading-relaxed">{c.st6p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st6l1}</li>
                <li>{c.st6l2}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.st6p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.st7h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.st7p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.st7o1a}<strong className="text-white">{c.st7o1b}</strong></li>
                <li>{c.st7o2}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed">{c.st7p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.limh}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.limp1a}
                <br />
                {c.limp1b}
              </p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.liml1}</li>
                <li>{c.liml2}</li>
                <li>{c.liml3}</li>
                <li>{c.liml4}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.wrh}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.wrp1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.wrl1}</li>
                <li>{c.wrl2}</li>
                <li>{c.wrl3}</li>
                <li>{c.wrl4}</li>
                <li>{c.wrl5}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.wrp2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.fth}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.ftp1a}
                <br />
                <br />
                {c.ftp1b}
                <Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">
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
import { TRANSLATIONS } from './how-to-edit-a-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
