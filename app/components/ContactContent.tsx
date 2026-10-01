import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import type { AppLocale } from '../../i18n/config';
import { getMessages } from '../i18n/messages';
import { issuesUrl } from '../lib/site';
import Header from './Header';
import ForkInfo from './ForkInfo';

const labels: Record<AppLocale, [string, string]> = {
  zh: ['问题反馈与功能建议', '请在本分支的 GitHub Issues 提交问题，附上复现步骤、浏览器版本和错误信息。'],
  en: ['Bugs and feature requests', 'Open an issue in this fork with reproduction steps, your browser version, and error details.'],
  uk: ['Помилки та пропозиції', 'Створіть issue у цьому форку з кроками відтворення, версією браузера та описом помилки.'],
  de: ['Fehler und Funktionswünsche', 'Erstelle ein Issue in diesem Fork mit Schritten zur Reproduktion, Browserversion und Fehlerdetails.'],
  es: ['Errores y sugerencias', 'Abre un issue en este fork con los pasos para reproducir el problema, la versión del navegador y los detalles del error.'],
  fr: ['Bugs et suggestions', 'Ouvre une issue dans ce fork avec les étapes de reproduction, la version du navigateur et les détails de l’erreur.'],
  it: ['Bug e suggerimenti', 'Apri una issue in questo fork con i passaggi per riprodurre il problema, la versione del browser e i dettagli dell’errore.'],
};

export default function ContactContent({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);
  const t = (key: string) => messages[key] ?? key;
  const [title, description] = labels[locale];
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-3xl w-full mx-auto px-6 py-16 space-y-8">
        <div><h1 className="text-3xl font-semibold mb-4">{t('contact.h1')}</h1><ForkInfo locale={locale} /></div>
        <section className="card p-6 space-y-4">
          <MessageSquare className="text-primary-400" aria-hidden="true" />
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-surface-300 leading-relaxed">{description}</p>
          <a href={issuesUrl} className="btn-primary btn-md">GitHub Issues</a>
        </section>
        <div className="flex flex-wrap gap-6 text-sm text-surface-400">
          <Link href={`/${locale}/privacy-policy`}>{t('contact.help.privacy')}</Link>
          <Link href={`/${locale}/terms`}>{t('contact.help.terms')}</Link>
        </div>
      </div>
    </main>
  );
}
