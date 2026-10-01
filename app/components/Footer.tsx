import ForkInfo from './ForkInfo';
import Link from 'next/link';
import { PenSquare } from 'lucide-react';
import type { AppLocale } from '../../i18n/config';
import { getMessages } from '../i18n/messages';

export default function Footer({ locale = 'en' as AppLocale }: { locale?: AppLocale }) {
  // Load messages on the server; Footer doesn't need client context
  const messages = getMessages(locale);
  const t = (k: string) => (messages[k] as string) ?? k;
  const withLocale = (path: string) => `/${locale}${path}`;
  return (
    <footer className="mt-auto py-6 px-6 border-t border-surface-800/50" role="contentinfo">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center">
          <Link href={withLocale('/')} className="site-brand" aria-label={t('brand.logoAlt')}>
            <span className="site-brand-symbol" aria-hidden="true"><PenSquare size={19} strokeWidth={1.7} /></span>
            <span>Editora<span className="text-primary-400">PDF</span></span>
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="p-3 rounded-lg bg-surface-800/30 border border-surface-700/50">
          <p className="text-xs text-surface-400 leading-relaxed">
            <strong className="text-surface-300">{t('footer.disclaimer.title')}</strong> {t('footer.disclaimer.text')}{' '}
            <Link href={withLocale('/terms')} className="text-primary-400 hover:text-primary-300 underline">
              {t('footer.terms')}
            </Link>
            {' '}{t('footer.and')}{' '}
            <Link href={withLocale('/privacy-policy')} className="text-primary-400 hover:text-primary-300 underline">
              {t('footer.privacy')}
            </Link>.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2" aria-label={t('footer.navAria')}>
          <Link href={withLocale('/')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.home')}
          </Link>
          <Link href={withLocale('/how-it-works')} className="text-sm font-semibold text-primary-400 hover:text-primary-300 transition-colors">
            {t('footer.how')}
          </Link>
          <Link href={withLocale('/your-files-stay-private')} className="text-sm text-success-400 hover:text-success-300 transition-colors font-medium">
            {t('features.private.title')}
          </Link>
          <Link href={withLocale('/about')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.about')}
          </Link>
          <Link href={withLocale('/privacy-policy')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.privacyLink')}
          </Link>
          <Link href={withLocale('/terms')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.termsLink')}
          </Link>
          <Link href={withLocale('/contact')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.contact')}
          </Link>
          <Link href={withLocale('/blog')} className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            {t('footer.blog')}
          </Link>
          <Link href="/site-index" className="text-sm text-surface-400 hover:text-primary-400 transition-colors">
            Site Index
          </Link>
        </nav>

        <div className="text-center"><ForkInfo locale={locale} /></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-surface-500">
            © 2026 giao4giao · EditoraPDF. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
