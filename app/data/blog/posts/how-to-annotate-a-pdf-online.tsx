import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../../../components/Header'
import BlogByline from '../../../components/BlogByline'
import { getMessages } from '../../../i18n/messages'
import { localeAlternates, getOgLocale } from '../../../lib/seo'
import type { AppLocale } from '../../../../i18n/config'

const siteUrl = 'https://editorapdf.com'
const slug = 'how-to-annotate-a-pdf-online'
const postPath = `/blog/${slug}`
const heroImage = '/og/og-image.png'
const datePublished = '2026-06-26'
const dateModified = '2026-06-26'

const postUrl = (locale: AppLocale) => `${siteUrl}/${locale}${postPath}`

// Per-locale content. `en` is the source of truth; other locales are injected via
// TRANSLATIONS below and fall back to `en` per-key at render time.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    metaTitle: 'How to Annotate a PDF Online: Highlight & Mark Up',
    metaDesc: 'Annotate a PDF online in your browser: highlight, add comments, draw shapes, and mark up documents privately. A deep guide to PDF markup, with limits explained.',
    ogTitle: 'How to Annotate a PDF Online: Highlight, Comment, and Mark Up',
    ogDesc: 'A deep, practical guide to annotating PDFs in your browser: highlights, shapes, freehand drawing, and notes — plus when to flatten, sanitize, or redact instead.',
    ogAlt: 'Annotating a PDF online with highlights, shapes, and comment notes',
    twTitle: 'How to Annotate a PDF Online: Highlight, Comment & Mark Up',
    twDesc: 'Highlight, comment, draw, and mark up PDFs privately in your browser — and learn exactly when to flatten or redact instead.',
    heroAlt: 'A PDF page marked up with highlights, arrows, and comment notes',

    bcLeaf: 'How to Annotate a PDF',
    heroTitle: 'How to Annotate a PDF Online: Highlight, Comment, and Mark Up',
    heroSubtitle: 'A practical, in-depth guide to marking up PDFs in your browser — highlights, shapes, drawing, and notes — without uploading a single file',

    artHeadline: 'How to Annotate a PDF Online: Highlight, Comment, and Mark Up',
    artDesc: 'A deep guide to annotating PDFs in the browser — highlights, shapes, freehand drawing, and notes — with honest limits and when to flatten or redact instead',

    intro1: 'Annotating a PDF is one of the most common things people do with a document they did not create: a contract that needs questions raised, a draft that needs feedback, a manual someone wants to highlight as they read. You are not rewriting the file — you are reacting to it, on top of it.',
    intro2a: 'This guide goes deeper than a quick how-to. It explains what an annotation actually is under the hood, how to add highlights, shapes, drawings, and comments in your browser, and — just as importantly — where annotation ends and editing, redaction, or flattening begins. It is a companion to our pillar guide on ',
    intro2link: 'how to edit a PDF online',
    intro2b: ', expanding on the markup step in real depth.',

    s1h: 'What "Annotating a PDF" Really Means (and How It Works)',
    s1p1: 'When you annotate a PDF, you are not changing the page itself. The original text, images, and layout stay exactly as the author saved them. Instead, the editor draws your highlights, shapes, drawings, and notes on a separate annotation layer that floats above the page content.',
    s1p2: 'This layered model is the single most important thing to understand about annotation, because it explains almost every behavior you will run into:',
    s1l1: 'Your markup is additive — nothing underneath is deleted or rewritten, so the document remains a faithful record of the original.',
    s1l2: 'Each annotation is its own object with a position, size, color, and opacity, which is why you can select it again later, move it, recolor it, or delete it.',
    s1l3: 'Because the layer sits on top, a highlight will cover whatever is beneath it visually — selectable text or a scanned image makes no difference to the markup itself.',
    s1l4: 'And because annotations stay as discrete objects, a recipient opening the file in a capable reader can, in principle, select and remove them — unless you deliberately flatten them first.',
    s1p3: 'In short: annotation is commentary, not surgery. That distinction is a feature when you want a reviewable, reversible markup, and a limitation when you need something permanent — a difference we return to throughout this guide.',

    s2h: 'Why It Matters and Who Actually Needs It',
    s2p1: 'Annotation sits in the gap between "read-only" and "rewrite." A surprising range of everyday work lives in that gap:',
    s2l1: 'A reviewer marking up a contract — circling a payment term, drawing an arrow to a clause, and leaving a note like "confirm this date" without altering the agreement text.',
    s2l2: 'A teacher or editor giving feedback on a submitted draft, highlighting passages and adding margin comments the author can act on.',
    s2l3: 'A reader or researcher studying a long report or paper, highlighting key findings so they can scan back to them later.',
    s2l4: 'A team lead doing a visual review of a design proof or layout, using shapes and freehand circles to point at exactly what needs to change.',
    s2l5: 'Anyone filling the gaps in a printed-then-scanned form, where the "fields" are just pixels and a quick note or checkmark on top is the fastest fix.',
    s2p2: 'The common thread is intent: the annotator wants to communicate about the document, not silently change it. Keeping the original intact is precisely the point — it preserves trust between whoever wrote the file and whoever is reviewing it.',

    s3h: 'The Private, In-Browser Approach',
    s3p1: 'Documents that get annotated are often the sensitive ones: contracts under negotiation, unreleased drafts, internal reviews, medical or financial paperwork. That makes where the markup happens a real concern, not a footnote.',
    s3p2: 'EditoraPDF runs the entire annotation process locally in your browser. When you open a file, it is loaded into the page in memory and rendered on your own machine — it is never uploaded to a server, queued for processing, or stored in the cloud. Your comments, highlights, and the document they sit on stay on your device from the moment you open the file to the moment you download it.',
    s3p3: 'For confidential material under review, this matters in a concrete way: there is no copy of your half-finished markup sitting on someone else\'s infrastructure, and nothing to delete afterward. It also means annotation works offline once the page has loaded, and there is no account, sign-up, or upload step standing between you and the document.',

    s4h: 'Step-by-Step: Annotate a PDF in the Editor',
    s4p1: 'Here is the full markup workflow using the in-browser editor.',
    s4o1a: 'Open the editor at ',
    s4o1b: 'Edit PDF',
    s4o1c: ' and load your file by dragging it in or selecting it from your device. It opens directly in the browser with no upload.',
    s4o2: 'Use the page sidebar to navigate to the page you want to mark up, so your annotations land where you intend.',
    s4o3: 'To highlight, pick the highlight tool, choose a color, and drag across the area you want to emphasize — the color is applied as a semi-transparent band over the page.',
    s4o4: 'To draw attention to a region, switch to shapes and add a rectangle to box a section, or a line or arrow to point from your note to the exact spot it refers to.',
    s4o5: 'For looser markup — circling a figure, ticking a box, sketching a correction — use the freehand drawing tool and draw directly on the page.',
    s4o6: 'To leave a written comment, add a text note or label, click where it should sit, and type. Place it in a margin or near the thing it describes so the context is obvious.',
    s4o7: 'Adjust as you go: reselect any annotation to reposition it, change its color, tune its opacity, or delete it if you change your mind.',
    s4o8a: 'When the markup is complete, download the file. If you want the annotations to be permanent and non-editable, flatten it first — see ',
    s4o8b: 'the flatten step below',
    s4o8c: '.',
    s4p2: 'Every one of these actions happens on the annotation layer. The underlying page is untouched, which is why you can rework your markup freely before exporting.',

    s5h: 'Choosing the Right Markup for the Job',
    s5p1: 'The tools overlap, but each has a job it does best. Matching the tool to your intent makes your markup clearer for whoever reads it next:',
    s5l1: 'Highlights are for emphasis within text or a region — the visual equivalent of a marker pen. Reach for them when you want to say "pay attention to this," not "change this."',
    s5l2: 'Rectangles frame a block — a paragraph, a table, a figure — and are useful when you need to scope a comment to a specific area rather than a single line.',
    s5l3: 'Lines and arrows connect a remark to its target. An arrow from a margin note to a clause removes any ambiguity about what the note is about, which is invaluable in dense documents.',
    s5l4: 'Freehand drawing is the most flexible and the least precise: great for a quick circle, a checkmark, or a struck-through correction, but harder to keep tidy across a long review.',
    s5l5: 'Text notes and labels carry the actual words. Use them for questions, instructions, and approvals — the parts of a review that a shape alone cannot express.',
    s5p2: 'Color and opacity are part of the message, not decoration. A consistent scheme — say, one color for questions and another for required changes — turns a page of scattered marks into something a reader can parse at a glance.',

    s6h: 'Best Practices for Clear, Useful Annotations',
    s6p1: 'Good annotation is a communication skill as much as a tool skill. A few habits make the difference between markup that helps and markup that adds noise:',
    s6l1: 'Be deliberate with color. Pick a small palette and assign meaning to each color rather than reaching for whatever is selected. Consistency is what makes markup scannable.',
    s6l2: 'Anchor comments to their target. Place a note next to the thing it discusses, or draw an arrow to it. A comment floating in white space forces the reader to guess.',
    s6l3: 'Keep highlights honest. Highlighting half a page signals nothing; highlighting one sentence signals "this is the point." Less markup usually communicates more.',
    s6l4: 'Mind opacity over content. A highlight or filled shape that is too opaque can obscure the very text you are pointing at. Keep it translucent enough to read through.',
    s6l5: 'Decide early whether the result needs to be permanent. If the recipient should not be able to move or delete your marks — or if you are converting a shape into a permanent visual block — plan to flatten before you share.',
    s6l6: 'Keep your own clean original. Because annotation is non-destructive, the unmarked file still exists. Save the annotated copy under a new name so you never lose the source.',

    s7h: 'Common Mistakes to Avoid',
    s7p1: 'Most annotation problems trace back to a handful of misunderstandings about the layer model:',
    s7l1: 'Treating a shape as redaction. Drawing a black rectangle over a name hides it on screen, but the text underneath is still there in the file. Anyone can move the box or copy the text beneath it. To genuinely remove content, use a redaction tool, not a shape.',
    s7l2: 'Assuming annotations are locked. By default they are editable objects. If you send an annotated file expecting your marks to be final, a recipient may rearrange or delete them. Flatten first when permanence matters.',
    s7l3: 'Forgetting to strip markup before sharing a clean copy. Review comments are rarely meant for the final audience. Sending a document with internal notes still attached is a classic and avoidable leak.',
    s7l4: 'Over-marking the page. A document covered edge to edge in highlights and arrows is harder to act on than a sparse one. Each mark should earn its place.',
    s7l5: 'Confusing annotation with editing the text. If a sentence is wrong, an annotation only comments on it — it does not fix it. Correcting the actual words is a different task with a different tool.',

    s8h: 'Honest Limitations and When to Use a Different Tool',
    s8p1: 'Browser-based annotation is excellent for review and markup, but it is not the right tool for every job near it. Being clear about the edges keeps you from shipping a document that does not do what you think it does.',
    s8p2a: 'Annotations are an overlay, not part of the page. They do not change the underlying content, which is ideal for review — but it also means a recipient could, in a capable reader, move or remove them. When you need your marks to be permanent and non-editable, ',
    s8p2link: 'flatten the PDF',
    s8p2b: ' so the annotation layer is merged into the page and can no longer be selected or deleted.',
    s8p3a: 'Highlighting works visually over the page whether or not the text is selectable, so it behaves the same on a scanned, image-only document as on a digital one. But the markup is positional, not semantic: on a scanned file there is no underlying text for it to attach to, so it is purely a visual band. ',
    s8p3b: 'When you instead need to remove all comments and markup — for example, to share a clean version — use the dedicated ',
    s8p3link1: 'Remove Annotations',
    s8p3c: ' or ',
    s8p3link2: 'Sanitize',
    s8p3d: ' tools rather than deleting each mark by hand.',
    s8p4a: 'Finally, remember what annotation is not. It is review and markup — different from ',
    s8p4link1: 'editing the actual text',
    s8p4b: ' of the document, and different again from ',
    s8p4link2: 'redaction',
    s8p4c: ', which permanently removes content rather than drawing over it. If your goal is to change words, edit. If your goal is to make information unrecoverable, redact. Annotation is for everything in between.',

    s9h: 'Final Thoughts',
    s9p1a: 'Annotation is the lightest possible way to work with a document: you add your thinking on top without disturbing the original. Used well — deliberate colors, anchored comments, the right tool for each remark — it turns a static PDF into a clear, reviewable conversation. The key is knowing where it stops: flatten when marks must be permanent, sanitize when they must disappear, and redact when content must truly be gone.',
    s9p1b: 'When you are ready, you can ',
    s9p1link: 'open your file and start marking it up directly in your browser',
    s9p1c: '. For the broader workflow this fits into, see our pillar guide on ',
    s9p1pillar: 'how to edit a PDF online',
    s9p1d: '.',

    // FAQ (6) — visible and schema use the SAME keys
    fv1q: 'What is the difference between annotating and editing a PDF?',
    fv1a: 'Annotating adds highlights, shapes, drawings, and notes on a layer above the page without changing the original content. Editing changes the underlying text or images themselves. Use annotation for review and feedback; use text editing when you actually need to correct the words.',
    fv2q: 'Can I annotate a scanned PDF that has no selectable text?',
    fv2a: 'Yes. Highlights, shapes, drawing, and notes are placed visually on top of the page, so they work the same on a scanned, image-only PDF as on a digital one. The markup is positional rather than tied to text, so it does not require selectable content underneath.',
    fv3q: 'Will the person I send the file to be able to remove my annotations?',
    fv3a: 'Potentially, yes. By default annotations are separate, editable objects, so a recipient using a capable reader could move or delete them. If you need your markup to be permanent and non-editable, flatten the PDF before sharing so the layer is merged into the page.',
    fv4q: 'How do I remove all annotations to share a clean copy?',
    fv4a: 'Rather than deleting each mark by hand, use the dedicated Remove Annotations or Sanitize tools. They strip the markup layer in one pass, which is the reliable way to produce a clean version before sending a document to its final audience.',
    fv5q: 'Is drawing a black box over text the same as redacting it?',
    fv5a: 'No, and this is a common and risky mistake. A shape only covers content visually — the text underneath remains in the file and can be moved aside or copied. To permanently remove sensitive information, use a redaction tool, which deletes the content itself rather than hiding it.',
    fv6q: 'Are my files uploaded when I annotate them online?',
    fv6a: 'No. EditoraPDF processes everything locally in your browser. Your PDF is loaded and rendered on your own device and is never uploaded to a server or stored in the cloud, which is important when the documents under review are confidential.',
  },
  // Translations are injected below (see TRANSLATIONS). Placeholder objects keep the type
  // happy until the build step fills them; the renderer falls back to `en` per-key.
  uk: {}, de: {}, es: {}, fr: {}, it: {},
} as Record<AppLocale, Content>

function content(locale: AppLocale): Content {
  const base = C.en
  const over = C[locale] ?? {}
  // Per-key fallback to English so a missing translation never blanks the page; intentional
  // empty translations are respected via the `k in over` check.
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
              {c.intro2a}
              <Link href={L('/blog/how-to-edit-a-pdf-online')} className="text-primary-400 hover:text-primary-300 underline">
                {c.intro2link}
              </Link>
              {c.intro2b}
            </p>
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
              <p className="text-surface-300 leading-relaxed mb-4">{c.s3p2}</p>
              <p className="text-surface-300 leading-relaxed">{c.s3p3}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s4h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s4p1}</p>
              <ol className="list-decimal list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>
                  {c.s4o1a}
                  <Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline"><strong className="text-white">{c.s4o1b}</strong></Link>
                  {c.s4o1c}
                </li>
                <li>{c.s4o2}</li>
                <li>{c.s4o3}</li>
                <li>{c.s4o4}</li>
                <li>{c.s4o5}</li>
                <li>{c.s4o6}</li>
                <li>{c.s4o7}</li>
                <li>
                  {c.s4o8a}
                  <Link href={L('/tools/flatten')} className="text-primary-400 hover:text-primary-300 underline">{c.s4o8b}</Link>
                  {c.s4o8c}
                </li>
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
                <li>{c.s5l5}</li>
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
                <li>{c.s6l5}</li>
                <li>{c.s6l6}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s7h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s7p1}</p>
              <ul className="list-disc list-inside text-surface-300 space-y-2 mb-4 ml-4">
                <li>{c.s7l1}</li>
                <li>{c.s7l2}</li>
                <li>{c.s7l3}</li>
                <li>{c.s7l4}</li>
                <li>{c.s7l5}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s8h}</h2>
              <p className="text-surface-300 leading-relaxed mb-4">{c.s8p1}</p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p2a}
                <Link href={L('/tools/flatten')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p2link}</Link>
                {c.s8p2b}
              </p>
              <p className="text-surface-300 leading-relaxed mb-4">
                {c.s8p3a}
                {c.s8p3b}
                <Link href={L('/tools/remove-annotations')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p3link1}</Link>
                {c.s8p3c}
                <Link href={L('/tools/remove-hidden-data')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p3link2}</Link>
                {c.s8p3d}
              </p>
              <p className="text-surface-300 leading-relaxed">
                {c.s8p4a}
                <Link href={L('/blog/how-to-edit-text-in-a-pdf-online')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link1}</Link>
                {c.s8p4b}
                <Link href={L('/tools/redact')} className="text-primary-400 hover:text-primary-300 underline">{c.s8p4link2}</Link>
                {c.s8p4c}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">{c.s9h}</h2>
              <p className="text-surface-300 leading-relaxed">
                {c.s9p1a}
                <br />
                <br />
                {c.s9p1b}
                <Link href={L('/edit')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.s9p1link}
                </Link>
                {c.s9p1c}
                <Link href={L('/blog/how-to-edit-a-pdf-online')} className="text-primary-400 hover:text-primary-300 underline">
                  {c.s9p1pillar}
                </Link>
                {c.s9p1d}
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
import { TRANSLATIONS } from './how-to-annotate-a-pdf-online.i18n'
Object.assign(C, TRANSLATIONS)
