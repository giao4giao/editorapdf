import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-edit-text-in-a-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/og/og-image.png'
const datePublished = '2026-06-26'
const dateModified = '2026-06-26'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is authoritative; other locales are translations injected via
// TRANSLATIONS at the bottom. Inline <strong>/<Link> markup lives in the JSX below — only the
// text segments are keyed here so the same component renders every locale.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Edit Text in a PDF Online: The Complete Guide',
    metaDesc:
      'Learn how to edit text in a PDF online, in your browser, with no upload. We explain how PDF text really works, the step-by-step, best practices, and honest limits.',
    ogTitle: 'How to Edit Text in a PDF Online: The Complete Guide',
    ogDesc:
      'A deep, expert guide to editing the actual text inside a PDF online — how it works under the hood, the step-by-step, best practices, common mistakes, and honest limitations.',
    ogAlt: 'Editing the text inside a PDF document directly in a web browser',
    twTitle: 'How to Edit Text in a PDF Online: The Complete Guide',
    twDesc:
      'How PDF text really works, the step-by-step to change it in your browser, plus best practices and the honest limits of online editing.',
    heroAlt: 'A PDF document open in a browser editor with text being changed',
    heroTitle: 'How to Edit Text in a PDF Online: The Complete Guide',
    heroSubtitle:
      'A deep dive into changing the actual text inside a PDF — how it works, when it works, and when another tool is the smarter choice.',

    bcLeaf: 'How to Edit Text in a PDF',

    intro1:
      'Editing text in a PDF sounds like it should be as simple as editing a paragraph in a document — click, type, done. In practice, PDFs are built on a completely different model, and understanding that model is the difference between a clean edit and a mangled page. This guide goes well beyond "click the text tool": it explains how text is actually stored inside a PDF, what that means for editing, and how to change words in your browser without uploading anything.',
    intro2:
      'This is the in-depth companion to step three of our pillar guide. If you want the full tour of adding images, shapes, and reordering pages, start with how to edit a PDF online. Here, we focus entirely on the trickiest part — the words themselves — and we are honest about the cases where a browser editor is the wrong tool for the job.',

    // 1. What editing PDF text really means + how it works
    s1h: 'What "Editing PDF Text" Really Means (and How a PDF Stores Text)',
    s1p1:
      'A word processor like Word stores your document as a flowing stream of paragraphs. Delete a sentence and everything after it slides up to fill the gap; the software re-runs the layout for you. A PDF works nothing like this. The format was designed to look identical on every screen and printer, so it freezes the page. Instead of paragraphs, a PDF stores a list of text "runs" — short bursts of characters — each one pinned to an exact x/y coordinate with its own font, size, and color.',
    s1p2:
      'In other words, there is no concept of a paragraph that reflows. The sentence you see is often a dozen separate positioned fragments that happen to line up. When you edit one of those runs, the PDF does not automatically push the rest of the line over or rewrap the paragraph below. This single fact explains almost every surprise people hit when editing PDF text:',
    s1l1: 'Replacing a short word with a long one can make text overlap whatever sits to its right.',
    s1l2: 'Deleting words leaves a gap, because nothing reflows to close it.',
    s1l3: 'A "paragraph" may be many independent lines, so each line is edited on its own.',
    s1p3:
      'A good online editor manages this for you at the run level: you click a piece of text, the editor isolates that run, and you retype it in place. That is why PDF text editing is best thought of as surgical correction — swapping or fixing specific words — rather than rewriting the document like a fresh draft.',

    // 2. Text-based vs scanned (the critical accuracy point)
    s2h: 'The Most Important Distinction: Text-Based vs. Scanned PDFs',
    s2p1:
      'Before you try to change a single word, you need to know which of two very different kinds of PDF you are holding. This distinction decides whether editing the text is even possible.',
    s2p2a: 'Text-based (digitally created) PDFs',
    s2p2b:
      ' are exported from software — Word, Google Docs, an invoicing system, a design tool. They contain a real, machine-readable text layer. You can select words with your cursor, copy them, and search them with Ctrl+F. Because the characters exist as actual text, an editor can find a run, remove it, and write a new one. This is the kind of PDF where genuine text editing works.',
    s2p3a: 'Scanned PDFs',
    s2p3b:
      ' are photographs of paper. When you scan a contract or snap a document with your phone, every letter becomes a cluster of pixels in an image. There is no text layer — the words are picture, not text. You cannot click a word and retype it, because to the file there is no "word" there at all, only colored dots. A quick test: open the PDF and try to select a line with your mouse. If a highlight sweeps across the letters, it is text-based. If nothing selects, you are looking at a scan.',
    s2p4:
      'Turning a scan into editable text requires OCR (optical character recognition), which analyzes the image and reconstructs the letters as a text layer. Be aware that EditoraPDF does not perform OCR. For a scanned document you have two honest options: cover the old text with a filled shape and type fresh text on top (an overlay, not a true edit), or run the file through a dedicated OCR tool elsewhere first and then edit the resulting text-based PDF.',

    // 3. Why it matters / who needs it (personas)
    s3h: 'Why This Matters: Who Actually Needs to Edit PDF Text',
    s3p1:
      'Most people do not want to rebuild a document — they need to fix one thing in a file they cannot easily regenerate. A few situations where editing the text directly is the right call:',
    s3l1:
      'The freelancer who exported an invoice as a PDF, then spotted a wrong date or a typo in the client name — and no longer has the original editable file open.',
    s3l2:
      'The HR coordinator updating a job title or a salary figure on an offer letter template that only exists as a PDF.',
    s3l3:
      'The small-business owner correcting a misspelled product name across a one-page price list before sending it to a customer.',
    s3l4:
      'The student or researcher fixing a stray typo on a finished paper without re-rendering the whole document from source.',
    s3p2:
      'The common thread: a small, specific change where firing up the original software, finding the source file, and re-exporting would cost far more time than the fix is worth. That is exactly the sweet spot for editing PDF text online.',

    // 4. The private, in-browser approach
    s4h: 'The Private, In-Browser Approach (Nothing Leaves Your Device)',
    s4p1:
      'Many "free PDF editor" sites work by uploading your file to a server, processing it there, and sending it back. For a financial statement, a signed contract, or anything with personal data, that is a real consideration — your document sits on someone else\'s machine, however briefly.',
    s4p2:
      'EditoraPDF takes a different route. The editor runs entirely in your browser using your own device\'s processing power. Your PDF is opened, parsed, edited, and re-saved locally; it is never transmitted to a server. That has two practical upshots: your content stays on your computer, and the tool keeps working even with an unreliable connection or no connection at all once the page has loaded. The trade-off is that very large or very complex files lean on your device\'s memory, so a heavyweight 200-page report will feel slower than a tidy two-page letter.',

    // 5. Step-by-step using the editor
    s5h: 'How to Edit Text in a PDF Online, Step by Step',
    s5p1: 'Here is the practical workflow for changing existing words in a text-based PDF:',
    s5o1a: 'Open the ',
    s5o1b: 'editor',
    s5o1c: ' and load your PDF by dragging it in or choosing it from your device. It opens directly in the browser.',
    s5o2:
      'Find the text you want to change and click directly on it. The editor isolates that text run so you can work on it in place.',
    s5o3:
      'Edit the characters — fix the typo, swap the wrong figure, or retype the line. Keep an eye on the right edge: if your new text is longer than the old, watch that it does not collide with neighboring content.',
    s5o4:
      'Adjust the formatting if needed. You can change the font, size, and color so the corrected text blends with the surrounding page rather than standing out.',
    s5o5:
      'Review the whole line and the lines around it. Because nothing reflows automatically, a single edit can nudge spacing — confirm the page still reads correctly.',
    s5o6a: 'Export your file with ',
    s5o6b: 'Download',
    s5o6c: '. The edited PDF is saved straight to your device, no upload involved.',
    s5p2:
      'For adding a brand-new note, a date, or a label somewhere the original has no text, you do not need to touch an existing run at all — just place a new text box on an empty part of the page and type.',

    // 6. Deeper guidance: fonts & substitution
    s6h: 'Fonts, Matching, and Why Edited Text Sometimes Looks Different',
    s6p1:
      'Here is a nuance that catches people out. A PDF can either embed its fonts (carrying the actual typeface inside the file) or merely reference them by name and rely on whatever font is available where it is opened. When you edit an embedded font, an editor can often reuse the embedded glyphs and your new characters match perfectly.',
    s6p2:
      'But if a font is not embedded — or uses a subset that only includes the specific characters the document originally needed — the editor may not have the exact typeface to render the letters you just typed. In that case it performs font substitution: it picks the closest available font (commonly a standard one like Helvetica) and uses that instead. The result is text that is correct in content but slightly off in shape, weight, or width. Knowing this in advance lets you plan: for high-visibility edits, choosing a clean standard font for the whole edited line often looks more deliberate than a near-miss match against the original.',
    s6p3:
      'A subset-embedding gotcha worth flagging: if the original embedded only the glyphs it used, typing a character the document never contained (say, an accented letter or a symbol) may show a blank or a fallback glyph. If you see that, switch the edited text to a standard font and the character will render.',

    // 7. Best practices
    s7h: 'Best Practices for Clean PDF Text Edits',
    s7l1:
      'Keep a copy of the original. Always edit a duplicate so you can fall back if a substitution or layout shift goes wrong. PDFs do not have unlimited undo across sessions.',
    s7l2:
      'Match length where you can. If you are replacing a word, an edit close to the original character count avoids the overlap and gap problems that come from no reflow.',
    s7l3:
      'Edit line by line, not paragraph by paragraph. Treat each visible line as its own unit; that mirrors how the PDF actually stores the text and prevents surprises.',
    s7l4:
      'Zoom in before you commit. Small misalignments and color mismatches are far easier to catch at 150–200% than at fit-to-width.',
    s7l5:
      'Confirm the font renders your characters. Type the trickiest character first (an accent, an em dash, a currency symbol) so a missing glyph surfaces immediately, not after you have finished.',
    s7l6:
      'Proofread the exported file, not just the editor. Open the downloaded PDF in a separate viewer and read the edited section once more before you send or print it.',

    // 8. Common mistakes
    s8h: 'Common Mistakes to Avoid',
    s8l1:
      'Assuming a scan is editable. If you cannot select the text with your cursor, there is no text to edit. Trying to "click and type" on a scanned word will only add an overlapping new text box, not change the underlying image.',
    s8l2:
      'Treating it like a word processor. Hitting Enter expecting the paragraph to rewrap, or deleting a word and expecting the rest to slide over, leads to broken spacing. PDF text does not reflow.',
    s8l3:
      'Ignoring overlap after a longer edit. A replacement that is even a few characters longer can silently run into the next column or the page margin. Always check the right side of the line.',
    s8l4:
      'Forgetting that covering is not the same as removing. Painting a box over sensitive text hides it visually but, in a true PDF, the underlying characters can remain in the file. To genuinely remove confidential text, use a proper redaction tool rather than an overlay.',
    s8l5:
      'Over-editing online. If you find yourself rewriting whole paragraphs and restructuring the page, you have left the comfort zone of a browser editor — see the next section.',

    // 9. Honest limitations + right tool for the job
    s9h: 'Honest Limitations: When an Online Editor Is the Wrong Tool',
    s9p1:
      'A browser-based editor is excellent for targeted corrections, but it is not a substitute for the software that created the document. Be realistic about these boundaries:',
    s9l1a: 'Heavy reformatting. ',
    s9l1b:
      'If you need to rewrite multiple paragraphs, change margins, or restructure a layout so text reflows naturally, converting the file is usually the better path. Use our ',
    s9l1c: 'PDF-to-Word converter',
    s9l1d:
      ' to get an editable document, make your changes there where paragraphs flow normally, then export back to PDF. You trade perfect visual fidelity for genuine editability — often a worthwhile deal for big rewrites.',
    s9l2a: 'Removing sensitive text. ',
    s9l2b:
      'Editing or covering is not secure deletion. To permanently strip names, numbers, or confidential lines so they cannot be recovered, use a dedicated ',
    s9l2c: 'redaction tool',
    s9l2d: ' designed to erase the content, not just hide it.',
    s9l3a: 'Scanned documents. ',
    s9l3b:
      'As covered above, without OCR the words are pixels. Your only in-browser option is to overlay new text on top; for true editing, run the scan through OCR elsewhere first.',
    s9l4a: 'Complex interactive forms and tagged PDFs. ',
    s9l4b:
      'Fillable form fields, accessibility tags, and scripted documents have structure a visual editor may not fully preserve. For those, the originating application is the safer choice.',
    s9p2:
      'None of this makes online editing weak — it makes it focused. Knowing exactly where the line sits is what lets you reach for the right tool every time.',

    // 10. Final thoughts
    s10h: 'Final Thoughts',
    s10p1:
      'Editing text in a PDF is entirely doable in your browser, as long as you understand what you are working with: a frozen page of positioned text runs, not a flowing document. Check whether your file is text-based or scanned, match your edits to the existing layout, mind the fonts, and keep a backup. For surgical fixes — a typo, a date, a wrong figure — it is the fastest, most private way to get the job done.',
    s10p2a: 'Ready to make a change? ',
    s10p2b: 'Open your PDF in the editor',
    s10p2c: ' and start editing directly in your browser. For the wider picture of everything you can do — images, shapes, and page management — head back to the ',
    s10p2d: 'complete guide to editing a PDF online',
    s10p2e: '.',

    // FAQ — visible AND schema share these keys
    fv1q: 'Can I really edit the existing text in a PDF, or only add new text on top?',
    fv1a:
      'If the PDF is text-based, you can edit the real text: click a word and retype it in place. If it is a scan, there is no text layer to edit, so you can only overlay new text on top of the image. Selecting the words with your cursor tells you which kind you have.',
    fv2q: 'Why does my edited text overlap or leave a gap?',
    fv2a:
      'PDFs do not reflow like word processors. Each line is positioned at fixed coordinates, so a longer replacement collides with what follows and a shorter one leaves space. Keep edits close to the original length, and check the right edge of the line before exporting.',
    fv3q: 'Can I edit text in a scanned PDF online?',
    fv3a:
      'Not as true text. A scan is an image, so the words are pixels with no editable text layer, and EditoraPDF does not perform OCR. You can cover old text with a shape and type fresh text over it, or run the file through OCR elsewhere first, then edit the resulting text-based PDF.',
    fv4q: 'Why does my new text look slightly different from the original?',
    fv4a:
      'The original font may not be embedded or may include only the characters the document first used. When the exact typeface is unavailable, the editor substitutes the closest font, so shape or width can shift. Setting the edited line to a clean standard font usually looks more intentional.',
    fv5q: 'Is editing PDF text online private?',
    fv5a:
      'With EditoraPDF, yes — the editor runs entirely in your browser. Your PDF is opened, edited, and saved on your own device and is never uploaded to a server. That keeps sensitive documents off third-party machines and lets the tool work even on a poor connection.',
    fv6q: 'When should I convert to Word instead of editing the PDF directly?',
    fv6a:
      'When you need heavy reformatting — rewriting paragraphs, changing margins, or restructuring a layout so text reflows. Convert with our PDF-to-Word tool, edit in a real document where paragraphs flow, then export back to PDF. For small fixes, editing the PDF directly is faster.',
  },
  // Translations are injected below (see TRANSLATIONS). Empty objects keep the type happy;
  // each missing key falls back to English at render time.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Per-key fallback to English so a missing translation never blanks the page. Using the
  // `k in over` form means an intentionally empty translation is still respected.
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
            <p className="text-lg text-surface-400">
              {c.intro2.split('how to edit a PDF online')[0]}
              <Link href={L('/blog/how-to-edit-a-pdf-online')} className="text-primary-400 hover:text-primary-300 underline">
                how to edit a PDF online
              </Link>
              {c.intro2.split('how to edit a PDF online')[1]}
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            {/* 1 */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s1h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s1p2}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s1l1}</li>
                <li>{c.s1l2}</li>
                <li>{c.s1l3}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s1p3}</p>
            </section>

            {/* 2 */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s2h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s2p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s2p2a}</strong>{c.s2p2b}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                <strong className="text-white">{c.s2p3a}</strong>{c.s2p3b}
              </p>
              <p className="text-surface-300 leading-relaxed">{c.s2p4}</p>
            </section>

            {/* 3 */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s3h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s3l1}</li>
                <li>{c.s3l2}</li>
                <li>{c.s3l3}</li>
                <li>{c.s3l4}</li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s3p2}</p>
            </section>

            {/* 4 */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s4p1}</p>
              <p className="text-surface-300 leading-relaxed">{c.s4p2}</p>
            </section>

            {/* 5 — step by step */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s5h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s5p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>
                  {c.s5o1a}
                  <Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s5o1b}</Link>
                  {c.s5o1c}
                </li>
                <li>{c.s5o2}</li>
                <li>{c.s5o3}</li>
                <li>{c.s5o4}</li>
                <li>{c.s5o5}</li>
                <li>{c.s5o6a}<strong className="text-white">{c.s5o6b}</strong>{c.s5o6c}</li>
              </ol>
              <p className="text-surface-300 leading-relaxed">{c.s5p2}</p>
            </section>

            {/* 6 — fonts */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s6h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s6p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s6p2}</p>
              <p className="text-surface-300 leading-relaxed">{c.s6p3}</p>
            </section>

            {/* 7 — best practices */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s7l1}</li>
                <li>{c.s7l2}</li>
                <li>{c.s7l3}</li>
                <li>{c.s7l4}</li>
                <li>{c.s7l5}</li>
                <li>{c.s7l6}</li>
              </ul>
            </section>

            {/* 8 — common mistakes */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s8h}</h2>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s8l1}</li>
                <li>{c.s8l2}</li>
                <li>{c.s8l3}</li>
                <li>{c.s8l4}</li>
                <li>{c.s8l5}</li>
              </ul>
            </section>

            {/* 9 — limitations + right tool */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s9h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s9p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>
                  <strong className="text-white">{c.s9l1a}</strong>{c.s9l1b}
                  <Link href={L('/tools/pdf-to-word')} className="text-primary-400 hover:text-primary-300 underline">{c.s9l1c}</Link>
                  {c.s9l1d}
                </li>
                <li>
                  <strong className="text-white">{c.s9l2a}</strong>{c.s9l2b}
                  <Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.s9l2c}</Link>
                  {c.s9l2d}
                </li>
                <li>
                  <strong className="text-white">{c.s9l3a}</strong>{c.s9l3b}
                </li>
                <li>
                  <strong className="text-white">{c.s9l4a}</strong>{c.s9l4b}
                </li>
              </ul>
              <p className="text-surface-300 leading-relaxed">{c.s9p2}</p>
            </section>

            {/* 10 — final thoughts */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s10h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s10p1}</p>
              <p className="text-surface-300 leading-relaxed">
                {c.s10p2a}
                <Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">{c.s10p2b}</Link>
                {c.s10p2c}
                <Link href={L('/blog/how-to-edit-a-pdf-online')} className="text-primary-400 hover:text-primary-300 underline">{c.s10p2d}</Link>
                {c.s10p2e}
              </p>
            </section>

            {/* FAQ */}
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
import { TRANSLATIONS } from './how-to-edit-text-in-a-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
