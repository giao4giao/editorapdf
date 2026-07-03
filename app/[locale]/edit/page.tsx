import type { Metadata } from 'next';
import { localeAlternates } from '../../lib/seo';

// The editor is an interactive app shell (no article content, no <h1>), so search engines
// read it as a soft 404 (GSC coverage). Keep it OUT of the index — the content-rich
// homepage is the "edit PDF online" landing — while still following links out of it. It is
// also removed from the sitemap (app/sitemap.ts) so the two signals stay consistent.
export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  return {
    robots: { index: false, follow: true },
    alternates: localeAlternates(params.locale, '/edit'),
  };
}

export { default } from '../../edit/page';
