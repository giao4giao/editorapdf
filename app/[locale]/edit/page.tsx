import type { Metadata } from 'next';
import { localeAlternates } from '../../lib/seo';

// The editor page inherits its title/description from the [locale] layout; add the
// locale-aware canonical + hreflang here (was supplied by the layout's headers() logic).
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return { alternates: localeAlternates(params.locale, '/edit') };
}

export { default } from '../../edit/page';
