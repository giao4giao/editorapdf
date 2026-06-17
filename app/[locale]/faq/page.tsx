import type { Metadata } from 'next';
import { metadata as baseMetadata } from '../../faq/page';
import { localeAlternates } from '../../lib/seo';

// Preserve the FAQ page's title/description/OG, add locale-aware canonical + hreflang
// (previously supplied by the [locale] layout's headers()-based metadata).
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return { ...baseMetadata, alternates: localeAlternates(params.locale, '/faq') };
}

export { default } from '../../faq/page';
