import ContactContent from '../components/ContactContent';
import { siteUrl } from '../lib/site';
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Contact Us — EditoraPDF Support',
  description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
  openGraph: {
    type: 'website',
    url: `${siteUrl}/en/contact`,
    title: 'Contact Us — EditoraPDF Support',
    description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
    siteName: 'EditoraPDF',
    images: [{ url: `${siteUrl}/og/og-image.png`, width: 1200, height: 630, alt: 'EditoraPDF — Contact Us' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us — EditoraPDF Support',
    description: 'Get in touch with the EditoraPDF team. We\'re here to help with any questions about our free online PDF editor.',
    images: [`${siteUrl}/og/og-image.png`],
  },
}

export default function ContactPage() {
  return (
    <ContactContent locale="en" />
  )
}
