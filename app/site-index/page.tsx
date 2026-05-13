import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import Header from '../components/Header';
import {
  Map as MapIcon, GripVertical, Lock, ArrowDownUp, PenLine, Image as ImageIcon,
  Compass, FileText,
} from 'lucide-react';
import { toolsMeta } from '../data/toolsMeta';
import { BLOG_POSTS } from '../data/searchIndex';

const siteUrl = 'https://editorapdf.com';
const pageUrl = `${siteUrl}/site-index`;
const defaultLocale = 'en';

export const metadata: Metadata = {
  title: 'Site Index — All Pages, Tools and Articles | EditoraPDF',
  description:
    'Complete index of EditoraPDF: every PDF tool, blog article and main page in one place. A simple, browsable map of the site.',
  alternates: {
    canonical: pageUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: pageUrl,
    title: 'Site Index — All Pages, Tools and Articles',
    description:
      'Complete index of EditoraPDF: every PDF tool, blog article and main page in one place.',
    siteName: 'EditoraPDF',
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF site index' }],
  },
};

interface ToolCategoryRow {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  toolIds: string[];
}

const TOOL_CATEGORIES: ToolCategoryRow[] = [
  {
    id: 'organize',
    title: 'Organize & Pages',
    description: 'Merge, split, reorder, rotate and manage PDF pages.',
    icon: <GripVertical size={18} strokeWidth={1.75} />,
    toolIds: [
      'merge', 'split', 'delete-pages', 'extract-pages', 'reorder', 'rotate',
      'insert-blank', 'duplicate-pages', 'reverse-order', 'split-by-size', 'split-by-bookmarks',
    ],
  },
  {
    id: 'security',
    title: 'Security & Protection',
    description: 'Sign, redact, and sanitize PDFs for safe sharing.',
    icon: <Lock size={18} strokeWidth={1.75} />,
    toolIds: ['sign', 'redact', 'remove-hidden-data', 'certificate'],
  },
  {
    id: 'convert',
    title: 'Convert',
    description: 'Convert PDF to and from images, Word, Excel, text, and more.',
    icon: <ArrowDownUp size={18} strokeWidth={1.75} />,
    toolIds: [
      'pdf-to-images', 'images-to-pdf', 'pdf-to-word', 'pdf-to-excel',
      'pdf-to-text', 'pdf-to-csv', 'pdf-to-html', 'pdf-to-markdown',
    ],
  },
  {
    id: 'edit',
    title: 'Edit & Enhance',
    description: 'Compress, watermark, crop, resize and recolour PDF pages.',
    icon: <PenLine size={18} strokeWidth={1.75} />,
    toolIds: [
      'compress', 'add-watermark', 'page-numbers', 'crop', 'resize',
      'grayscale', 'invert-colors', 'flatten', 'remove-annotations',
    ],
  },
  {
    id: 'content',
    title: 'Content & Media',
    description: 'Embed QR codes, barcodes, bookmarks, hyperlinks, attachments.',
    icon: <ImageIcon size={18} strokeWidth={1.75} />,
    toolIds: [
      'extract-images', 'remove-images', 'optimize-images',
      'add-qr-code', 'add-barcode', 'add-bookmarks', 'add-hyperlinks', 'add-attachments',
    ],
  },
];

const MAIN_PAGES = [
  { path: '/',                          label: 'Home' },
  { path: '/edit',                      label: 'PDF Editor' },
  { path: '/tools',                     label: 'All PDF Tools' },
  { path: '/how-it-works',              label: 'How It Works' },
  { path: '/your-files-stay-private',   label: 'Your Files Stay Private' },
  { path: '/about',                     label: 'About' },
  { path: '/blog',                      label: 'Blog & Resources' },
  { path: '/faq',                       label: 'FAQ' },
  { path: '/contact',                   label: 'Contact' },
  { path: '/privacy-policy',            label: 'Privacy Policy' },
  { path: '/terms',                     label: 'Terms of Service' },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/${defaultLocale}` },
    { '@type': 'ListItem', position: 2, name: 'Site Index', item: pageUrl },
  ],
};

export default function SiteIndexPage() {
  return (
    <>
      <Script
        id="site-index-breadcrumbs"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen flex flex-col">
        <Header />

        <div className="flex-1 p-6 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Hero */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/15 border border-primary-500/30 text-primary-300 text-sm font-medium mb-5">
                <MapIcon size={14} strokeWidth={2} />
                Site Index
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Every page, tool and article — in one place
              </h1>
              <p className="text-base md:text-lg text-surface-400 max-w-2xl mx-auto leading-relaxed">
                Browse the full structure of EditoraPDF. All {Object.keys(toolsMeta).length} PDF tools,
                {' '}{BLOG_POSTS.length} blog posts, and every key page — no search required.
              </p>
            </div>

            {/* Main pages */}
            <section aria-labelledby="main-pages-heading" className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Compass size={16} strokeWidth={2} className="text-surface-400" />
                <h2 id="main-pages-heading" className="text-sm font-semibold uppercase tracking-wider text-surface-300">
                  Main pages
                </h2>
              </div>
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {MAIN_PAGES.map((page) => (
                  <li key={page.path}>
                    <Link
                      href={page.path === '/' ? `/${defaultLocale}` : `/${defaultLocale}${page.path}`}
                      className="block px-3 py-2 rounded-lg text-sm text-surface-300 bg-surface-800/40 border border-surface-700/40 hover:border-primary-500/40 hover:text-white hover:bg-surface-800/70 transition-all"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Tools by category */}
            <section aria-labelledby="tools-heading" className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <GripVertical size={16} strokeWidth={2} className="text-surface-400" />
                  <h2 id="tools-heading" className="text-sm font-semibold uppercase tracking-wider text-surface-300">
                    PDF tools ({Object.keys(toolsMeta).length})
                  </h2>
                </div>
                <Link href={`/${defaultLocale}/tools`} className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Open tools page →
                </Link>
              </div>

              <div className="space-y-5">
                {TOOL_CATEGORIES.map((cat) => {
                  const tools = cat.toolIds
                    .map((id) => toolsMeta[id])
                    .filter((t): t is NonNullable<typeof t> => Boolean(t));
                  if (tools.length === 0) return null;
                  return (
                    <div key={cat.id} className="card p-5 md:p-6 bg-surface-800/40 border-surface-700/50">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-400">
                          {cat.icon}
                        </div>
                        <div>
                          <h3 className="text-base font-semibold text-white">{cat.title}</h3>
                          <p className="text-xs text-surface-500">{cat.description}</p>
                        </div>
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                        {tools.map((tool) => (
                          <li key={tool.id}>
                            <Link
                              href={`/${defaultLocale}/tools/${tool.id}`}
                              className="group flex items-baseline justify-between gap-2 px-3 py-2 rounded-md hover:bg-surface-700/40 transition-colors"
                              title={tool.description}
                            >
                              <span className="text-sm text-surface-200 group-hover:text-white truncate">
                                {tool.title}
                              </span>
                              <span className="text-[10px] text-surface-600 group-hover:text-primary-400 transition-colors flex-shrink-0">
                                →
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Blog posts */}
            <section aria-labelledby="blog-heading" className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <FileText size={16} strokeWidth={2} className="text-surface-400" />
                  <h2 id="blog-heading" className="text-sm font-semibold uppercase tracking-wider text-surface-300">
                    Blog & guides ({BLOG_POSTS.length})
                  </h2>
                </div>
                <Link href="/blog" className="text-xs text-primary-400 hover:text-primary-300 transition-colors">
                  Visit the blog →
                </Link>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {BLOG_POSTS.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block group p-3 rounded-lg bg-surface-800/30 border border-surface-700/40 hover:border-primary-500/40 hover:bg-surface-800/60 transition-all"
                    >
                      <p className="text-sm font-medium text-surface-200 group-hover:text-white line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-surface-500 line-clamp-1 mt-0.5">
                        {post.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {/* Footer note */}
            <div className="text-center text-xs text-surface-500 mt-12">
              Looking for a machine-readable version? See the{' '}
              <a href="/sitemap.xml" className="text-primary-400 hover:text-primary-300 underline">XML sitemap</a>.
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
