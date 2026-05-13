import { BLOG_POSTS, type BlogPost } from './searchIndex';

/**
 * Map a tool id to the slugs of blog posts that are relevant for that tool.
 * Slugs must exist in BLOG_POSTS (see searchIndex.ts).
 * Tools without an explicit mapping fall back to FALLBACK_SLUGS below.
 */
const TOOL_BLOG_MAP: Record<string, string[]> = {
  // Organize & Pages
  merge:                ['how-to-merge-pdf-files-online', 'how-to-edit-a-pdf-online'],
  split:                ['how-to-split-pdf-files-online', 'split-by-bookmarks', 'split-by-size'],
  'delete-pages':       ['how-to-delete-pages-from-pdf', 'how-to-edit-a-pdf-online'],
  'extract-pages':      ['how-to-extract-pages-from-pdf-online', 'how-to-split-pdf-files-online'],
  reorder:              ['how-to-reorder-pdf-pages', 'how-to-edit-a-pdf-online'],
  rotate:               ['how-to-rotate-pdf-pages-online', 'how-to-edit-a-pdf-online'],
  'insert-blank':       ['how-to-insert-blank-pages-in-pdf', 'how-to-edit-a-pdf-online'],
  'duplicate-pages':    ['how-to-insert-duplicate-pages-in-pdf'],
  'reverse-order':      ['how-to-reverse-pdf-page-order'],
  'split-by-size':      ['split-by-size', 'how-to-split-pdf-files-online', 'how-to-compress-pdf-online'],
  'split-by-bookmarks': ['split-by-bookmarks', 'how-to-split-pdf-files-online'],

  // Security & Protection
  sign:                 ['digital-signature', 'is-it-safe-to-edit-pdfs-online'],
  redact:               ['how-to-redact-pdf-online', 'how-to-redact-pdf-for-legal-compliance', 'pdf-metadata-what-is-it-and-how-to-remove'],
  'remove-hidden-data': ['how-to-sanitize-pdf', 'pdf-metadata-what-is-it-and-how-to-remove', 'technology-behind-privacy-first-pdf-editing'],
  certificate:          ['digital-signature', 'how-to-redact-pdf-for-legal-compliance', 'is-it-safe-to-edit-pdfs-online'],

  // Convert
  'pdf-to-images':      ['how-to-edit-a-pdf-online', 'how-to-edit-pdfs-offline-in-browser'],
  'images-to-pdf':      ['how-to-convert-images-to-pdf-online', 'how-to-edit-a-pdf-online'],
  'pdf-to-word':        ['how-to-convert-pdf-to-word-online'],
  'pdf-to-excel':       ['how-to-convert-pdf-to-excel-online', 'how-to-convert-pdf-to-csv-online'],
  'pdf-to-text':        ['pdf-to-text'],
  'pdf-to-csv':         ['how-to-convert-pdf-to-csv-online', 'how-to-convert-pdf-to-excel-online'],
  'pdf-to-html':        ['pdf-to-html'],
  'pdf-to-markdown':    ['pdf-to-markdown'],

  // Edit & Enhance
  compress:             ['how-to-compress-pdf-online', 'split-by-size'],
  'add-watermark':      ['how-to-add-watermark-to-pdf-online'],
  'page-numbers':       ['how-to-add-page-numbers-to-pdf', 'how-to-add-headers-and-footers-to-pdf'],
  crop:                 ['how-to-edit-a-pdf-online', 'how-to-edit-pdfs-offline-in-browser'],
  resize:               ['how-to-edit-a-pdf-online', 'how-to-compress-pdf-online'],
  grayscale:            ['how-to-edit-a-pdf-online', 'how-to-compress-pdf-online'],
  'invert-colors':      ['how-to-edit-a-pdf-online'],
  flatten:              ['how-to-edit-a-pdf-online', 'digital-signature'],
  'remove-annotations': ['how-to-sanitize-pdf', 'pdf-metadata-what-is-it-and-how-to-remove'],

  // Content & Media
  'extract-images':     ['how-to-edit-a-pdf-online'],
  'remove-images':      ['how-to-compress-pdf-online', 'how-to-sanitize-pdf'],
  'optimize-images':    ['how-to-compress-pdf-online'],
  'add-qr-code':        ['how-to-edit-a-pdf-online'],
  'add-barcode':        ['how-to-edit-a-pdf-online'],
  'add-bookmarks':      ['split-by-bookmarks', 'how-to-edit-a-pdf-online'],
  'add-hyperlinks':     ['how-to-edit-a-pdf-online'],
  'add-attachments':    ['how-to-edit-a-pdf-online', 'is-it-safe-to-edit-pdfs-online'],
};

const FALLBACK_SLUGS = [
  'how-to-edit-a-pdf-online',
  'is-it-safe-to-edit-pdfs-online',
  'how-to-edit-pdfs-offline-in-browser',
];

const POSTS_BY_SLUG: Record<string, BlogPost> = Object.fromEntries(
  BLOG_POSTS.map((post) => [post.slug, post])
);

export function getRelatedPosts(toolId: string, limit = 3): BlogPost[] {
  const slugs = TOOL_BLOG_MAP[toolId] ?? [];
  const fallbacks = FALLBACK_SLUGS.filter((s) => !slugs.includes(s));
  const ordered = [...slugs, ...fallbacks];

  const seen = new Set<string>();
  const result: BlogPost[] = [];
  for (const slug of ordered) {
    if (seen.has(slug)) continue;
    seen.add(slug);
    const post = POSTS_BY_SLUG[slug];
    if (post) result.push(post);
    if (result.length === limit) break;
  }
  return result;
}
