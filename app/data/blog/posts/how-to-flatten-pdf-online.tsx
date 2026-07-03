import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-flatten-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/og/og-image.png'
const datePublished = '2026-06-19'
const dateModified = '2026-06-19'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is the source map; other locales are translations injected
// from the .i18n file below. Inline <strong>/<Link> markup stays in the JSX — only the
// text segments are keyed here.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Flatten a PDF Online: Lock Form Fields',
    metaDesc: 'Flatten a PDF online to lock form fields, comments, and signatures into the page. Free, private, in-browser — make your PDF non-editable in a few clicks.',
    ogTitle: 'How to Flatten a PDF Online: Lock Form Fields and Annotations',
    ogDesc: 'Merge form fields, comments, and signatures into the page so they cannot be changed. Free, private, browser-based PDF flattening — no uploads, no software.',
    ogAlt: 'How to flatten a PDF online to lock form fields and annotations',
    twTitle: 'How to Flatten a PDF Online: Lock Form Fields and Annotations',
    twDesc: 'Flatten a PDF to lock form fields, comments, and signatures into the page. Free, private, and entirely in your browser.',
    heroAlt: 'Guide on how to flatten a PDF online to lock form fields and annotations',

    bcLeaf: 'How to Flatten a PDF',
    heroTitle: 'How to Flatten a PDF Online: Lock Form Fields and Annotations',
    heroSubtitle: 'Merge fillable fields, comments, and signatures into the page so your finished PDF looks the same everywhere — and nobody can change it',

    artHeadline: 'How to Flatten a PDF Online: Lock Form Fields and Annotations',
    artDesc: 'Step-by-step guide on how to flatten a PDF online to lock form fields, comments, highlights, and signatures into the page content',

    intro1: 'You filled out a PDF form, added a few comments, dropped in a signature — and now you need to send it knowing nobody can quietly edit your answers. The catch is that all of those elements still live on separate interactive layers, so a recipient can click into a field and rewrite it, or a different PDF viewer might render it in a way you never intended.',
    intro2: "Flattening solves this. It permanently merges every interactive layer into the static page so what you see becomes locked-in, identical artwork. This guide explains what flattening a PDF actually does, when you should reach for it, and how to flatten a PDF online for free directly in your browser — without uploading a single file.",

    s1h: 'What Does It Mean to Flatten a PDF?',
    s1p1: 'A typical PDF is more layered than it looks. On top of the printed page content sit separate interactive objects that a viewer keeps "live" so they stay clickable and editable:',
    s1l1: 'Fillable form fields (text boxes, checkboxes, dropdowns)',
    s1l2: 'Comments and sticky-note annotations',
    s1l3: 'Highlights, underlines, and markup',
    s1l4: 'Stamps and shapes',
    s1l5: 'Drawn or typed signatures',
    s1p2: 'To flatten a PDF is to bake all of those layers down into the page itself. After flattening, your filled-in answers, notes, and signatures are no longer editable objects — they become a permanent, painted-on part of the page, exactly like the original text. That is what people mean when they want to make a PDF non-editable or lock PDF annotations in place.',

    s2h: 'Why Would You Flatten a PDF?',
    s2p1: "Flattening is not something you do to every document — it is the final step before a PDF leaves your hands. Here are the situations where it matters most:",
    s2l1: 'Locking in a completed form before sending it, so the recipient cannot change your answers',
    s2l2: 'Guaranteeing the file looks identical in every viewer (some apps hide, reflow, or re-render form fields differently)',
    s2l3: 'Finalizing a signed agreement so the signature and the terms cannot be separated or altered',
    s2l4: 'Preventing comments and markup from being edited or deleted by whoever opens the file next',
    s2l5: 'Avoiding printing and rendering glitches caused by interactive form layers',
    s2p2: 'Picture a freelancer returning a signed contract, an HR manager distributing a completed onboarding form, or a teacher sharing an annotated worksheet that should read the same on every student\'s laptop. In each case, flattening turns a "still editable" draft into a finished, tamper-resistant document.',

    s3h: 'Flatten a PDF Online Without Uploading Your Files',
    s3p1: 'Because flattened documents are often sensitive — signed contracts, filled tax forms, HR paperwork — privacy matters. EditoraPDF runs the entire process locally in your browser. Your PDF is never uploaded to a server, never stored, and never seen by anyone else.',
    s3p2: 'There is no account to create and no software to install. The flatten tool opens your file in the browser, merges every interactive layer into the page, and hands you a finished PDF to download — all on your own device, even if your connection drops mid-task.',

    s4h: 'How to Flatten a PDF Online: Step by Step',
    s4p1: 'You can flatten a PDF in under a minute:',
    s4o1a: 'Open the ',
    s4o1b: 'Flatten PDF',
    s4o1c: ' tool',
    s4o2: 'Select your PDF from your device, or drag and drop it onto the page',
    s4o3: 'The tool reads the document and detects its interactive layers — form fields, comments, highlights, stamps, and signatures',
    s4o4: 'Click Flatten to merge those layers permanently into the static page content',
    s4o5: 'Download your flattened, non-editable PDF',
    s4p2: 'That is it. The downloaded file looks exactly like the on-screen version, but the form answers, annotations, and signatures are now fixed in place and cannot be clicked into or changed.',

    s5h: 'Tips for Getting a Clean Result',
    s5p1: 'A few habits make flattening smoother and safer:',
    s5l1: 'Fill in every form field and add all comments first — flattening is the last step, not the middle',
    s5l2: 'Proofread carefully before you flatten; once fields are merged, you cannot click back in to fix a typo',
    s5l3: 'Keep an unflattened copy of the original if there is any chance you will need to edit the fields again later',
    s5l4: 'If a form looks different in another viewer, flattening usually fixes it by locking the visible rendering you already approved',
    s5p2: 'Think of the flattened file as the "send" version and the original as your editable master.',

    s6h: 'Limitations and Things to Know',
    s6p1: 'Flattening is powerful, but it comes with trade-offs you should understand before you click:',
    s6l1: 'Flattening is intended to be irreversible — there is no built-in "unflatten" to turn the painted text back into editable fields',
    s6l2: 'Flattening a digital-certificate (cryptographic) signature can invalidate its validation, because the file changes after it was signed',
    s6l3: 'A drawn or typed signature is just artwork, so it is perfectly safe to flatten',
    s6l4: 'If you may need to reuse the form, save your unflattened original separately before flattening',
    s6p2: 'In short: flatten when the document is truly final, and keep a backup of anything you might want to edit again.',

    s7h: 'Final Thoughts',
    s7p1a: 'Flattening is the quiet finishing move that turns a fillable, editable PDF into a locked, share-ready document. It keeps your answers from being changed, stops comments from being deleted, and makes sure your form looks the same in every PDF viewer — without uploading anything or installing software.',
    s7p1b: 'When your document is ready to go out, you can ',
    s7p1link: 'flatten your PDF directly in your browser',

    // Visible FAQ (6) — mirrored verbatim in the FAQPage schema
    fv1q: 'Is it free to flatten a PDF online?',
    fv1a: 'Yes. EditoraPDF lets you flatten a PDF online completely free, with no account, no sign-up, and no watermark. You can flatten as many documents as you need to lock form fields, comments, and signatures into the page.',
    fv2q: 'Are my files uploaded or kept private when I flatten a PDF?',
    fv2a: 'Your files stay private. Flattening runs entirely in your browser on your own device, so the PDF is never uploaded to a server, never stored, and never seen by anyone else. This makes it safe for signed contracts and other sensitive documents.',
    fv3q: 'What gets flattened in a PDF?',
    fv3a: 'Flattening merges every interactive layer into the static page: fillable form fields, comments and sticky notes, highlights and markup, stamps, shapes, and drawn or typed signatures. After flattening, all of these become a permanent, non-editable part of the page.',
    fv4q: 'Does flattening reduce the quality of my PDF?',
    fv4a: 'No. Flattening does not degrade your text or images — it simply locks the existing layers into the page exactly as they appear. The flattened PDF looks identical to the on-screen version, just without the editable interactive objects on top.',
    fv5q: 'Can I flatten a PDF on my phone or tablet?',
    fv5a: 'Yes. The flatten tool works in any modern web browser on Windows, macOS, Linux, Android, and iOS. Because everything runs in the browser, you can flatten a PDF on a phone or tablet without installing an app.',
    fv6q: 'Can I undo flattening or edit the form fields afterward?',
    fv6a: 'Flattening is intended to be permanent, so there is no built-in way to undo it and turn the merged content back into editable fields. If you might need to edit the form again, keep an unflattened copy of the original before you flatten.',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Respect an explicitly-present translation (incl. an intentional "" — e.g. an English
  // fragment like " tool" that the target language folds into the preceding word); fall
  // back to English only when the key is absent.
  return new Proxy(base, { get: (_t, k: string) => (k in over ? over[k] : base[k]) }) as Content
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
                  <Link href={L('/tools/flatten')} className="text-primary-400 hover:text-primary-300 underline">
                    <strong className="text-white">{c.s4o1b}</strong>
                  </Link>
                  {c.s4o1c}
                </li>
                <li>{c.s4o2}</li>
                <li>{c.s4o3}</li>
                <li>{c.s4o4}</li>
                <li>{c.s4o5}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed">{c.s4p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s5l1}</li>
                <li>{c.s5l2}</li>
                <li>{c.s5l3}</li>
                <li>{c.s5l4}</li>
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
              <p className="text-surface-300 leading-relaxed">{c.s6p2}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.s7p1a}
                <br />
                <br />
                {c.s7p1b}
                <Link href={L('/tools/flatten')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.s7p1link}
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
import { TRANSLATIONS } from './how-to-flatten-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
