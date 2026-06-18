import Link from 'next/link'
import Image from 'next/image'
import Header from './Header'
import {
  Github, ShieldCheck, Lock, BarChart3, ArrowRight, Code, FileX, Database, WifiOff,
} from 'lucide-react'
import type { AppLocale } from '../../i18n/config'

// Per-locale content. `en` is copied verbatim from the legacy blog index so `/en/blog`
// renders unchanged; other locales are translations. Category-pill labels that repeat
// across cards share one key (catGuide, catPrivacy, …). Only visible text is keyed here;
// all classNames, icons, <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"> src/alt, and card order stay in the JSX below.
type Content = Record<string, string>

const C: Record<AppLocale, Content> = {
  en: {
    // Page chrome
    pageTitle: 'Blog & Resources',
    pageSubtitle: 'Tips, tutorials, and guides to help you master PDF editing',
    readMore: 'Read more',
    badgeNew: 'New',

    // Category pills (deduplicated)
    catGuide: 'Guide',
    catPrivacy: 'Privacy',
    catSecurity: 'Security',
    catPdfTools: 'PDF Tools',
    catConverter: 'Converter',
    catOpenSource: 'Open Source',
    catTechnical: 'Technical',
    catPhilosophy: 'Philosophy',
    catTechnology: 'Technology',
    catComparison: 'Comparison',
    catAnalysis: 'Analysis',
    catCompliance: 'Compliance',

    // Card: How to Edit PDFs Offline in Browser
    offlineTitle: 'How to Edit PDFs Offline in Your Browser',
    offlineDesc: 'Edit PDF files offline without installing software. Learn how browser-based PDF editors keep working even after you disconnect from the internet — and why that matters for privacy.',

    // Card: How to Redact PDF for Legal Compliance
    redactLegalTitle: 'How to Redact a PDF for Legal Compliance: GDPR, HIPAA & FOIA Guide',
    redactLegalDesc: 'Learn how to permanently redact sensitive information to meet GDPR, HIPAA, FOIA, and court filing requirements. Avoid the mistakes that have leaked classified data.',

    // Card: PDF Metadata
    metadataTitle: 'PDF Metadata: What It Is, What It Reveals, and How to Remove It',
    metadataDesc: 'Every PDF contains hidden metadata — author name, creation date, GPS coordinates, revision history. Learn what your files might be leaking and how to strip it all.',

    // Card: How to Merge PDF Files Online
    mergeTitle: 'How to Merge PDF Files Online: Complete Guide to Combining PDF Documents',
    mergeDesc: 'Learn how to combine multiple PDF files into one document using free online tools. Step-by-step guide with tips, best practices, and FAQs.',

    // Card: How to Split PDF Files Online
    splitTitle: 'How to Split PDF Files Online: Complete Guide to Dividing PDF Documents',
    splitDesc: 'Learn how to divide large PDF files into smaller documents using free online tools. Step-by-step guide covering page ranges, file size, and bookmarks.',

    // Card: How to Insert Duplicate Pages in PDF
    duplicateTitle: 'How to Insert Duplicate Pages in PDF: Complete Guide to Copying PDF Pages',
    duplicateDesc: 'Learn how to duplicate and copy pages in PDF files using free online tools. Step-by-step guide covering individual pages, page ranges, and insertion positioning.',

    // Card: How We Built Open-Source PDF Editor
    builtTitle: 'How We Built a Free Open-Source PDF Editor with Next.js',
    builtDesc: 'Technical deep dive into building EditoraPDF - learn about our tech stack, architecture decisions, and open-source development process.',

    // Card: Why We Made EditoraPDF Open Source
    whyOpenTitle: 'Why We Made EditoraPDF Open Source',
    whyOpenDesc: 'The principles, philosophy, and vision behind making EditoraPDF free and open source forever.',

    // Card: Technology Behind Privacy-First PDF Editing
    privacyTechTitle: 'The Technology Behind Privacy-First PDF Editing',
    privacyTechDesc: 'Explore how client-side processing, PDF.js, and modern web technologies enable truly private PDF editing without server uploads.',

    // Card: Contributing to Open Source Guide
    contributingTitle: "Contributing to Open Source: A Beginner's Guide with EditoraPDF",
    contributingDesc: 'Learn how to contribute to open-source projects using EditoraPDF as an example. Step-by-step guide for first-time contributors.',

    // Card: Open-Source vs Closed-Source PDF Editors
    compareTitle: 'Comparing Open-Source vs. Closed-Source PDF Editors',
    compareDesc: 'A comprehensive comparison of open-source and proprietary PDF editors. Learn the pros, cons, and which is right for you.',

    // Card: PDF to Markdown Converter
    markdownTitle: 'PDF to Markdown Converter: Complete Guide to Transforming PDF Documents',
    markdownDesc: 'Learn how to convert PDF documents into Markdown format using free online tools. Perfect for documentation, blogs, and version control.',

    // Card: How to Edit a PDF Online
    editTitle: 'How to Edit a PDF Online',
    editDesc: 'Learn how to edit PDF files online without installing software. Step-by-step guide covering text editing, images, shapes, page management, and more.',

    // Card: Is It Safe to Edit PDFs Online?
    safeTitle: 'Is It Safe to Edit PDFs Online?',
    safeDesc: 'Learn how online PDF editors handle files, what privacy risks exist, and best practices for secure PDF editing.',

    // Card: PDF to HTML Converter
    htmlTitle: 'How to Convert PDF to HTML Online',
    htmlDesc: 'Learn how to convert PDF files to HTML format online. Free, secure PDF to HTML converter. Transform PDF documents into web pages without software installation.',

    // Card: PDF to Text Converter
    textTitle: 'PDF to Text Converter - Extract Text from PDF Online',
    textDesc: 'Convert PDF to text online for free. Extract text from PDF files instantly with our secure PDF to text converter. No software installation required.',

    // Card: Digital Signature
    signatureTitle: 'How to Add Digital Signatures to PDFs Online',
    signatureDesc: 'Learn how to add digital signatures to PDF documents online. Free, secure, and easy-to-use e-signature tool. Sign PDFs electronically without software installation.',

    // Card: How to Add Headers and Footers to PDF
    headersTitle: 'How to Add Headers and Footers to PDF',
    headersDesc: 'Learn how to add headers and footers to PDF documents online. Free, secure, and easy-to-use PDF header footer tool. Add page numbers, dates, text, and custom content.',

    // Card: How to Add Page Numbers to PDF
    pageNumbersTitle: 'How to Add Page Numbers to PDF Online',
    pageNumbersDesc: 'Learn how to add page numbers to PDF documents online. Free, secure, and easy-to-use PDF page numbering tool. Number PDF pages without software installation.',

    // Card: How to Add Watermark to PDF
    watermarkTitle: 'How to Add Watermark to PDF Online',
    watermarkDesc: 'Learn how to add watermarks to PDF documents online. Free, secure, and easy-to-use PDF watermark tool. Add text or image watermarks without software installation.',

    // Card: How to Compress PDF Online
    compressTitle: 'How to Compress PDF Files Online',
    compressDesc: 'Learn how to compress PDF files to reduce file size online. Free, secure, and easy-to-use PDF compression tool. Shrink PDFs without losing quality.',

    // Card: How to Convert Images to PDF
    imagesTitle: 'How to Convert Images to PDF Online',
    imagesDesc: 'Learn how to convert images to PDF format online. Free, secure, and easy-to-use image to PDF converter. Combine multiple images into one PDF document.',

    // Card: How to Convert PDF to CSV
    csvTitle: 'How to Convert PDF to CSV Online',
    csvDesc: 'Learn how to convert PDF files to CSV format online. Free, secure, and easy-to-use PDF to CSV converter. Extract tables and data from PDFs to spreadsheets.',

    // Card: How to Convert PDF to Excel
    excelTitle: 'How to Convert PDF to Excel Online',
    excelDesc: 'Learn how to convert PDF files to Excel format online. Free, secure, and easy-to-use PDF to Excel converter. Extract tables and data from PDFs to spreadsheets.',

    // Card: How to Convert PDF to Word
    wordTitle: 'How to Convert PDF to Word Online',
    wordDesc: 'Learn how to convert PDF files to Word format online. Free, secure, and easy-to-use PDF to Word converter. Edit PDF content in Microsoft Word.',

    // Card: How to Delete Pages from PDF
    deleteTitle: 'How to Delete Pages from PDF Online',
    deleteDesc: 'Learn how to delete pages from PDF documents online. Free, secure, and easy-to-use PDF page deletion tool. Remove unwanted pages without software installation.',

    // Card: How to Extract Pages from PDF
    extractTitle: 'How to Extract Pages from PDF Online',
    extractDesc: 'Learn how to extract pages from PDF documents online. Free, secure, and easy-to-use PDF page extraction tool. Save specific pages as separate PDF files.',

    // Card: How to Insert Blank Pages in PDF
    blankTitle: 'How to Insert Blank Pages in PDF',
    blankDesc: 'Learn how to insert blank pages into PDF documents online. Free, secure, and easy-to-use PDF page insertion tool. Add empty pages anywhere in your document.',

    // Card: How to Redact PDF Online
    redactTitle: 'How to Redact PDF Online',
    redactDesc: 'Learn how to redact sensitive information from PDF documents online. Free, secure, and easy-to-use PDF redaction tool. Permanently remove text and images.',

    // Card: How to Reorder PDF Pages
    reorderTitle: 'How to Reorder PDF Pages Online',
    reorderDesc: 'Learn how to reorder pages in PDF documents online. Free, secure, and easy-to-use PDF page reordering tool. Rearrange pages with drag and drop.',

    // Card: How to Reverse PDF Page Order
    reverseTitle: 'How to Reverse PDF Page Order Online',
    reverseDesc: 'Learn how to reverse the page order of PDF documents online. Free, secure, and easy-to-use PDF page reversal tool. Flip your document pages.',

    // Card: How to Rotate PDF Pages
    rotateTitle: 'How to Rotate PDF Pages Online',
    rotateDesc: 'Learn how to rotate pages in PDF documents online. Free, secure, and easy-to-use PDF page rotation tool. Rotate pages 90, 180, or 270 degrees.',

    // Card: How to Sanitize PDF
    sanitizeTitle: 'How to Sanitize PDF Files Online',
    sanitizeDesc: 'Learn how to sanitize PDF files to remove hidden metadata and sensitive information. Free, secure, and easy-to-use PDF sanitization tool.',

    // Card: Split PDF by Bookmarks
    splitBookmarksTitle: 'How to Split PDF by Bookmarks',
    splitBookmarksDesc: 'Learn how to split PDF files by bookmarks automatically. Free, secure online tool that divides PDFs using bookmark structure. No software installation required.',

    // Card: Split PDF by Size
    splitSizeTitle: 'How to Split PDF by Size',
    splitSizeDesc: 'Learn how to split PDF files by file size automatically. Free, secure online tool that divides large PDFs into smaller files based on size limits.',
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

export default function BlogIndex({ locale }: { locale: AppLocale }) {
  const c = content(locale)
  const L = (slug: string) => `/${locale}/blog/${slug}`

  return (
    <>
      <main className="min-h-screen flex flex-col">
        <Header />

        {/* Main Content */}
        <div className="flex-1 p-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{c.pageTitle}</h1>
              <p className="text-lg text-surface-400 max-w-2xl mx-auto">
                {c.pageSubtitle}
              </p>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Blog Post: How to Edit PDFs Offline in Browser */}
            <Link href={L('how-to-edit-pdfs-offline-in-browser')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-info-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <WifiOff className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-primary-500/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg">
                  {c.badgeNew}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catPrivacy}</span>
                  <span className="px-2 py-0.5 rounded bg-info-500/20 text-info-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.offlineTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.offlineDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Redact PDF for Legal Compliance */}
            <Link href={L('how-to-redact-pdf-for-legal-compliance')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-error-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <FileX className="w-24 h-24 text-error-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-error-500/20 text-error-300 text-xs font-medium">{c.catSecurity}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catCompliance}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.redactLegalTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.redactLegalDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF Metadata */}
            <Link href={L('pdf-metadata-what-is-it-and-how-to-remove')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Database className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catPrivacy}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catSecurity}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.metadataTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.metadataDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Merge PDF Files Online */}
            <Link href={L('how-to-merge-pdf-files-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Merge PDF Files Online_ Complete Guide to Combining PDF Documents.png"
                  alt="How to Merge PDF Files Online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.mergeTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.mergeDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Split PDF Files Online */}
            <Link href={L('how-to-split-pdf-files-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Split PDF Files Online_ Complete Guide to Dividing PDF Documents.png"
                  alt="How to Split PDF Files Online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.splitTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.splitDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Duplicate Pages in PDF */}
            <Link href={L('how-to-insert-duplicate-pages-in-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Insert Duplicate Pages in PDF_ Complete Guide to Copying PDF Pages.png"
                  alt="How to Insert Duplicate Pages in PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.duplicateTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.duplicateDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How We Built Open-Source PDF Editor */}
            <Link href={L('how-we-built-open-source-pdf-editor')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Github className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catOpenSource}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catTechnical}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.builtTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.builtDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Why We Made EditoraPDF Open Source */}
            <Link href={L('why-we-made-editorapdf-open-source')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-success-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="w-24 h-24 text-success-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catOpenSource}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPhilosophy}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.whyOpenTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.whyOpenDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Technology Behind Privacy-First PDF Editing */}
            <Link href={L('technology-behind-privacy-first-pdf-editing')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-accent-500/20 to-primary-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="w-24 h-24 text-accent-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catPrivacy}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catTechnology}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.privacyTechTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.privacyTechDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Contributing to Open Source Guide */}
            <Link href={L('contributing-to-open-source-beginners-guide')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-warning-500/20 to-success-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Code className="w-24 h-24 text-warning-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catOpenSource}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.contributingTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.contributingDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Open-Source vs Closed-Source PDF Editors */}
            <Link href={L('open-source-vs-closed-source-pdf-editors')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary-500/20 to-warning-500/20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="w-24 h-24 text-primary-400/50" strokeWidth={1.5} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catComparison}</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catAnalysis}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.compareTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.compareDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Markdown Converter */}
            <Link href={L('pdf-to-markdown')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/PDF to Markdown Converter_ Complete Guide to Transforming PDF Documents into Markdown Format.png"
                  alt="PDF to Markdown Converter"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.markdownTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.markdownDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Edit a PDF Online */}
            <Link href={L('how-to-edit-a-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog1.png"
                  alt="Step-by-step guide on how to edit a PDF file online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.editTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.editDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Is It Safe to Edit PDFs Online? */}
            <Link href={L('is-it-safe-to-edit-pdfs-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog2.png"
                  alt="Is It Safe to Edit PDFs Online."
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.safeTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.safeDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to HTML Converter */}
            <Link href={L('pdf-to-html')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Convert PDF to HTML Online_ Complete Guide to PDF to HTML Conversion.png"
                  alt="PDF to HTML Converter"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.htmlTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.htmlDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: PDF to Text Converter */}
            <Link href={L('pdf-to-text')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/PDF to Text Converter_ Complete Guide to Extracting Text from PDF Files.png"
                  alt="PDF to Text Converter"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.textTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.textDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Digital Signature */}
            <Link href={L('digital-signature')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Add Digital Signatures to PDFs Online_ Complete Guide to E-Signing Documents.png"
                  alt="Digital Signature"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catSecurity}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.signatureTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.signatureDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Headers and Footers to PDF */}
            <Link href={L('how-to-add-headers-and-footers-to-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Add Headers and Footers to PDF_ Complete Guide to Customizing PDF Documents.png"
                  alt="How to Add Headers and Footers to PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.headersTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.headersDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Page Numbers to PDF */}
            <Link href={L('how-to-add-page-numbers-to-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Add Page Numbers to PDF Online_ Complete Guide to PDF Page Numbering.png"
                  alt="How to Add Page Numbers to PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.pageNumbersTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.pageNumbersDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Add Watermark to PDF */}
            <Link href={L('how-to-add-watermark-to-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Add Watermark to PDF Online_ Complete Guide to Watermarking PDF Documents.png"
                  alt="How to Add Watermark to PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.watermarkTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.watermarkDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Compress PDF Online */}
            <Link href={L('how-to-compress-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Compress PDF Files Online_ Complete Guide to Reducing PDF File Size.png"
                  alt="How to Compress PDF Online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.compressTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.compressDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert Images to PDF */}
            <Link href={L('how-to-convert-images-to-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Convert Images to PDF Online_ Complete Guide to Image to PDF Conversion.png"
                  alt="How to Convert Images to PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.imagesTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.imagesDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to CSV */}
            <Link href={L('how-to-convert-pdf-to-csv-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Convert PDF to Excel Online_ Complete Guide to PDF to Spreadsheet Conversion.png"
                  alt="How to Convert PDF to CSV"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.csvTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.csvDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Excel */}
            <Link href={L('how-to-convert-pdf-to-excel-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Convert PDF to Excel Online_ Complete Guide to PDF to Spreadsheet Conversion.png"
                  alt="How to Convert PDF to Excel"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.excelTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.excelDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Convert PDF to Word */}
            <Link href={L('how-to-convert-pdf-to-word-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Convert PDF to Word Online_ Complete Guide to PDF to DOCX Conversion.png"
                  alt="How to Convert PDF to Word"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catConverter}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.wordTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.wordDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Delete Pages from PDF */}
            <Link href={L('how-to-delete-pages-from-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Delete Pages from PDF Online_ Complete Guide to Removing Unwanted Pages.png"
                  alt="How to Delete Pages from PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-error-500/20 text-error-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.deleteTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.deleteDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Extract Pages from PDF */}
            <Link href={L('how-to-extract-pages-from-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Extract Pages from PDF Online_ Complete Guide to PDF Page Extraction.png"
                  alt="How to Extract Pages from PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.extractTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.extractDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Insert Blank Pages in PDF */}
            <Link href={L('how-to-insert-blank-pages-in-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Insert Blank Pages in PDF_ Complete Guide to Adding Empty Pages.png"
                  alt="How to Insert Blank Pages in PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.blankTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.blankDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Redact PDF Online */}
            <Link href={L('how-to-redact-pdf-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Redact PDF Online_ Complete Guide to Removing Sensitive Information.png"
                  alt="How to Redact PDF Online"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-error-500/20 text-error-300 text-xs font-medium">{c.catSecurity}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.redactTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.redactDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reorder PDF Pages */}
            <Link href={L('how-to-reorder-pdf-pages')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Reorder PDF Pages Online_ Complete Guide to Rearranging PDF Documents.png"
                  alt="How to Reorder PDF Pages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.reorderTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.reorderDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Reverse PDF Page Order */}
            <Link href={L('how-to-reverse-pdf-page-order')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Reverse PDF Page Order Online_ Complete Guide to Flipping PDF Pages.png"
                  alt="How to Reverse PDF Page Order"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.reverseTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.reverseDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Rotate PDF Pages */}
            <Link href={L('how-to-rotate-pdf-pages-online')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Rotate PDF Pages Online_ Complete Guide to Fixing PDF Orientation.png"
                  alt="How to Rotate PDF Pages"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-warning-500/20 text-warning-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.rotateTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.rotateDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: How to Sanitize PDF */}
            <Link href={L('how-to-sanitize-pdf')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Sanitize PDF Files Online_ Complete Guide to Removing Hidden Data and Metadata.png"
                  alt="How to Sanitize PDF"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catSecurity}</span>
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.sanitizeTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.sanitizeDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Bookmarks */}
            <Link href={L('split-by-bookmarks')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/How to Split PDF by Bookmarks_ Complete Guide to Dividing PDFs Using Bookmark Structure.png"
                  alt="Split PDF by Bookmarks"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-primary-500/20 text-primary-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.splitBookmarksTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.splitBookmarksDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>

            {/* Blog Post: Split PDF by Size */}
            <Link href={L('split-by-size')} className="card overflow-hidden hover:scale-105 transition-transform duration-300 group">
              <div className="relative w-full h-48 overflow-hidden bg-surface-800">
                <Image fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 384px"
                  src="/blog/Split PDF by Size_ Complete Guide to Dividing Large PDFs by File Size.png"
                  alt="Split PDF by Size"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-accent-500/20 text-accent-300 text-xs font-medium">{c.catGuide}</span>
                  <span className="px-2 py-0.5 rounded bg-success-500/20 text-success-300 text-xs font-medium">{c.catPdfTools}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
                  {c.splitSizeTitle}
                </h3>
                <p className="text-surface-400 mb-4 line-clamp-3">
                  {c.splitSizeDesc}
                </p>
                <span className="text-primary-400 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  {c.readMore}
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </span>
              </div>
            </Link>
            </div>
          </div>
        </div>

        {/* Background */}
        <div className="fixed inset-0 bg-mesh -z-10" aria-hidden="true" />
        <div className="fixed inset-0 bg-grid opacity-30 -z-10" aria-hidden="true" />
      </main>
    </>
  )
}

// Translations are merged in at module load (keeps the big translated string maps in a
// separate file out of this template).
import { TRANSLATIONS } from '../data/blog/indexContent'
Object.assign(C, TRANSLATIONS)
