import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../../components/Header';
import {
  WifiOff, ShieldCheck, Plane, Building2, ArrowRight, Cpu, HardDrive,
  AlertTriangle, CheckCircle2, MemoryStick,
} from 'lucide-react';

const siteUrl = 'https://editorapdf.com';
const postUrl = `${siteUrl}/blog/how-to-edit-pdfs-offline-in-browser`;
const publishDate = '2026-05-13';

export const metadata: Metadata = {
  title: 'How to Edit PDFs Offline in Your Browser — No Installation, No Upload',
  description:
    'Edit PDF files offline without installing software. Learn how browser-based PDF editors keep working after the page loads — even without internet — and why that matters for privacy.',
  openGraph: {
    type: 'article',
    url: postUrl,
    title: 'How to Edit PDFs Offline in Your Browser',
    description:
      'Edit PDFs without installing software and without uploading them anywhere. Works even after you disconnect from the internet.',
    siteName: 'EditoraPDF',
    images: [
      {
        url: `${siteUrl}/og/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'EditoraPDF — Edit PDF offline in your browser',
      },
    ],
    publishedTime: publishDate,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Edit PDFs Offline in Your Browser',
    description:
      'Edit PDFs without installing software and without uploading them anywhere — even with no internet.',
    images: [`${siteUrl}/og/og-image.png`],
  },
  alternates: {
    canonical: postUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${postUrl}#article`,
  headline: 'How to Edit PDFs Offline in Your Browser — No Installation, No Upload',
  description:
    'Edit PDF files offline without installing software. Learn how browser-based PDF editors keep working after the page loads — even without internet — and why that matters for privacy.',
  url: postUrl,
  datePublished: publishDate,
  dateModified: publishDate,
  author: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    url: siteUrl,
  },
  publisher: {
    '@type': 'Organization',
    name: 'EditoraPDF',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.svg`,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': postUrl,
  },
  image: `${siteUrl}/og/og-image.png`,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  '@id': `${postUrl}#howto`,
  name: 'How to edit a PDF offline in your browser',
  description: 'Step-by-step instructions to edit PDFs without internet using a browser-based editor.',
  totalTime: 'PT2M',
  estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Open the editor while online',
      text: 'Visit EditoraPDF while you have an internet connection so the application code is cached by your browser.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Disconnect from the internet',
      text: 'Turn off Wi-Fi or enable airplane mode. The page stays loaded and the tools remain available.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Pick a tool and your PDF',
      text: 'Choose any PDF tool — merge, compress, redact, sign, convert — and select a file from your device.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Process and download',
      text: 'The browser processes the PDF locally and offers it as a download. No network is required.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${postUrl}#faq`,
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I really edit a PDF without an internet connection?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Once the application loads in your browser, the JavaScript and WebAssembly that power the editor live in memory. As long as you keep the tab open, you can disconnect from the internet and continue working with PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the offline editor as good as a desktop app like Acrobat?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For common tasks — merge, split, rotate, compress, sign, watermark, redact, convert — a modern browser-based editor matches desktop apps for most users. Very heavy workloads (large batch jobs over many gigabytes) still benefit from native software.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is offline editing better for privacy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When processing happens entirely in your browser, the PDF never travels to a server. There is no upload, no temporary copy, no log entry. This is the strongest privacy guarantee for sensitive documents.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does it work on phones and tablets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, modern mobile browsers (Safari, Chrome, Edge on iOS/Android) support WebAssembly and run the same code. Very large PDFs may be slow on low-end phones because of limited RAM.',
      },
    },
  ],
};

const cta = (label: string, href: string) => (
  <Link
    href={href}
    className="inline-flex items-center gap-2 text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors"
  >
    {label}
    <ArrowRight size={14} strokeWidth={2.25} />
  </Link>
);

export default function HowToEditPdfsOfflinePost() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="howto-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        <article className="flex-1 p-6 py-12">
          <div className="max-w-3xl mx-auto">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="text-xs text-surface-500 mb-6">
              <ol className="flex items-center gap-1.5 flex-wrap">
                <li><Link href="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link></li>
                <li aria-hidden="true">/</li>
                <li className="text-surface-300">Edit PDFs offline</li>
              </ol>
            </nav>

            {/* Hero */}
            <header className="mb-10 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success-500/15 border border-success-500/30 text-success-300 text-xs font-semibold mb-5">
                <WifiOff size={12} strokeWidth={2} />
                Offline & Privacy
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5 leading-tight">
                How to Edit PDFs Offline in Your Browser
              </h1>
              <p className="text-base md:text-lg text-surface-300 leading-relaxed">
                You don&apos;t need Acrobat. You don&apos;t even need internet — once the page is loaded.
                Modern browsers can read, modify and save PDF files entirely on your device. Here is how that works,
                why it matters, and how to use it on EditoraPDF.
              </p>
              <p className="text-xs text-surface-500 mt-4">
                <time dateTime={publishDate}>Published {publishDate}</time> · 6 min read
              </p>
            </header>

            {/* TL;DR */}
            <aside className="card p-5 mb-10 border-primary-500/20 bg-primary-500/5">
              <p className="text-sm font-semibold text-white mb-2">TL;DR</p>
              <ul className="space-y-1.5 text-sm text-surface-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  Open the tool while online once — the code is cached in the browser.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  Disconnect from the internet. Drag in a PDF. Edit it.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={14} strokeWidth={2.25} className="text-success-400 flex-shrink-0 mt-0.5" />
                  Your file stays on your device. Nothing is uploaded.
                </li>
              </ul>
            </aside>

            {/* Section: Why offline */}
            <section className="prose-section mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Why &ldquo;offline&rdquo; is the real privacy win</h2>
              <p className="text-surface-300 leading-relaxed mb-4">
                Most &ldquo;free online PDF editors&rdquo; advertise themselves as private, but they
                still upload your file to a server, process it there, and send it back. That is the
                opposite of private. Even if the company promises to delete the file in 15 minutes,
                the file <em>was</em> on their disk, in their logs, and crossed at least one network.
              </p>
              <p className="text-surface-300 leading-relaxed">
                A browser-based PDF editor works differently. The browser downloads the application
                code (JavaScript, WebAssembly, fonts) once, then performs every edit using your
                device&apos;s CPU and RAM. Your PDF never travels anywhere. The strongest proof of
                this is that it keeps working after you turn off the internet.
              </p>
            </section>

            {/* Section: How it works */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">How a browser-based editor stays available offline</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Cpu size={22} strokeWidth={1.5} className="text-primary-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">JavaScript engine</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Every modern browser ships a fast JavaScript runtime that runs the editor&apos;s code.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <HardDrive size={22} strokeWidth={1.5} className="text-accent-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">PDF.js + pdf-lib</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Open-source libraries read, render and rewrite the PDF byte format directly in memory.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <MemoryStick size={22} strokeWidth={1.5} className="text-success-400 mb-2" />
                  <h3 className="text-sm font-semibold text-white mb-1">RAM, not bandwidth</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Files load into RAM and are processed locally. No upload, no server, no waiting.
                  </p>
                </div>
              </div>
              <p className="text-surface-300 leading-relaxed">
                Once the browser has cached the static assets — the JavaScript bundles, the fonts,
                the WebAssembly modules — there is nothing else to download. The tab becomes a
                self-contained PDF editor for as long as you keep it open.
              </p>
            </section>

            {/* Section: Step-by-step */}
            <section className="mb-10" aria-labelledby="steps-heading">
              <h2 id="steps-heading" className="text-2xl font-bold text-white mb-4">
                Step-by-step: edit a PDF without internet
              </h2>
              <ol className="space-y-3">
                {[
                  { n: 1, title: 'Open the tool online once', text: 'While you have internet, visit any PDF tool on EditoraPDF — the browser caches everything it needs.' },
                  { n: 2, title: 'Disconnect', text: 'Turn off Wi-Fi, unplug Ethernet, or enable airplane mode. Do not close or refresh the tab.' },
                  { n: 3, title: 'Add your PDF', text: 'Click the upload area or drag and drop a file. The browser reads it from your disk into memory.' },
                  { n: 4, title: 'Edit', text: 'Merge, split, sign, redact, compress, convert — the entire editor runs locally.' },
                  { n: 5, title: 'Download', text: 'Save the result back to your device. The download is generated entirely in your browser.' },
                ].map((s) => (
                  <li key={s.n} className="flex items-start gap-4 p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/20 text-primary-300 text-sm font-bold flex items-center justify-center">
                      {s.n}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-white mb-1">{s.title}</p>
                      <p className="text-sm text-surface-400 leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Section: When this matters */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">When this matters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <ShieldCheck size={22} strokeWidth={1.5} className="text-success-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">Sensitive documents</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Contracts, medical records, legal filings, payroll. There is no acceptable
                    &ldquo;we kept it for 15 minutes&rdquo; — the file should never leave your machine.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Plane size={22} strokeWidth={1.5} className="text-info-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">Travel and weak Wi-Fi</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Airplanes, trains, hotel networks, conferences. Once the editor is loaded,
                    a flaky connection no longer blocks the work.
                  </p>
                </div>
                <div className="p-5 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <Building2 size={22} strokeWidth={1.5} className="text-primary-400 mb-3" />
                  <h3 className="text-sm font-semibold text-white mb-2">Restricted corporate networks</h3>
                  <p className="text-xs text-surface-400 leading-relaxed">
                    Many companies block document-upload services. A tool that runs locally and
                    sends no file data is much easier to use within strict policies.
                  </p>
                </div>
              </div>
            </section>

            {/* Section: Limitations */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold text-white mb-4">Honest limitations</h2>
              <div className="card p-5 border-warning-500/20 bg-warning-500/5">
                <div className="flex items-start gap-3 mb-3">
                  <AlertTriangle size={18} strokeWidth={2} className="text-warning-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-surface-300">
                    Browser-based editing is fantastic, but it lives within the browser&apos;s sandbox.
                    Keep these constraints in mind:
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-surface-300 ml-7 list-disc">
                  <li>Very large PDFs (above ~500 MB) can exhaust RAM on low-end devices.</li>
                  <li>Closing or refreshing the tab while offline ends the session — your cached assets stay, but unsaved work is gone.</li>
                  <li>Operations that genuinely require external services (e.g. font lookups for some non-Latin scripts) won&apos;t work fully offline.</li>
                </ul>
                <p className="text-xs text-surface-500 mt-4">
                  See <Link href="/your-files-stay-private" className="text-primary-400 hover:text-primary-300 underline">how privacy works on EditoraPDF</Link> for the detailed limits per tool.
                </p>
              </div>
            </section>

            {/* Try it CTAs */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">Try it now</h2>
              <p className="text-surface-300 leading-relaxed mb-5">
                Open any of these in a new tab, then disconnect from the internet and watch it keep working:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">Merge PDFs</p>
                  <p className="text-xs text-surface-500 mb-3">Combine files into one</p>
                  {cta('Open tool', '/en/tools/merge')}
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">Compress PDF</p>
                  <p className="text-xs text-surface-500 mb-3">Shrink file size</p>
                  {cta('Open tool', '/en/tools/compress')}
                </div>
                <div className="p-4 rounded-xl bg-surface-800/40 border border-surface-700/50">
                  <p className="text-sm font-semibold text-white mb-1">Sanitize PDF</p>
                  <p className="text-xs text-surface-500 mb-3">Strip hidden metadata</p>
                  {cta('Open tool', '/en/tools/remove-hidden-data')}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="mb-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold text-white mb-5">Frequently asked questions</h2>
              <div className="space-y-3">
                {[
                  { q: 'Can I really edit a PDF without an internet connection?', a: 'Yes. Once the application has loaded in your browser tab, the editor is running locally. Disconnect from Wi-Fi and it keeps working as long as you don\'t refresh.' },
                  { q: 'Is the offline editor as good as a desktop app like Acrobat?', a: 'For everyday operations — merge, split, rotate, compress, sign, watermark, redact, convert — yes. Heavy batch workloads on very large files are still faster on native desktop software.' },
                  { q: 'Why is offline editing better for privacy?', a: 'Because the PDF never leaves your device. No upload, no temporary server copy, no log entry. It is the strongest privacy guarantee for sensitive documents.' },
                  { q: 'Does it work on phones and tablets?', a: 'Yes. Modern mobile browsers run the same code. Performance depends on available RAM; very large PDFs may be slow on entry-level phones.' },
                ].map((item) => (
                  <details key={item.q} className="group card p-4 bg-surface-800/40 border border-surface-700/50 hover:border-primary-500/25 transition-all cursor-pointer">
                    <summary className="flex items-center justify-between gap-3 font-semibold text-white text-sm list-none">
                      {item.q}
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface-700 flex items-center justify-center text-surface-400 group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-surface-400 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </section>

            {/* CTA */}
            <div className="text-center card p-8 bg-gradient-to-br from-success-500/10 via-surface-800/60 to-primary-500/10 border-success-500/20">
              <WifiOff size={28} strokeWidth={1.5} className="text-success-400 mx-auto mb-3" />
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Edit PDFs without uploading anything</h2>
              <p className="text-surface-300 mb-5 text-sm max-w-lg mx-auto">
                Open any tool. Drag in a PDF. Done. Your file never reaches a server — even if you stay
                online — and the editor keeps working when you don&apos;t.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/en/tools" className="btn-primary btn-lg inline-flex items-center gap-2">
                  Browse PDF Tools
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link href="/your-files-stay-private" className="btn-secondary btn-lg inline-flex items-center gap-2">
                  Privacy details
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
