import type { Metadata } from 'next'
import BlogIndex from '../components/BlogIndex'

export const metadata: Metadata = {
  title: 'Blog - Tips & Guides',
  description: 'Learn PDF editing tips, tricks, and best practices. Stay updated with the latest features and tutorials for EditoraPDF.',
  alternates: {
    // Blog content is English-only; consolidate all locale variants to the /en URL
    // (non-redirecting) instead of the locale-less /blog (which 307-redirects).
    canonical: 'https://editorapdf.com/en/blog',
  },
}

export default function BlogPage() {
  return <BlogIndex locale="en" />
}
