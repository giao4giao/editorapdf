import type { AppLocale } from '../../i18n/config';
import { maintainer, repositoryUrl, upstreamUrl } from '../lib/site';

const labels: Record<AppLocale, [string, string, string]> = {
  zh: ['本分支由', '维护', '基于原项目'],
  en: ['This fork is maintained by', '', 'Based on the original project'],
  uk: ['Цей форк підтримує', '', 'На основі оригінального проєкту'],
  de: ['Dieser Fork wird gepflegt von', '', 'Basierend auf dem ursprünglichen Projekt'],
  es: ['Este fork es mantenido por', '', 'Basado en el proyecto original'],
  fr: ['Ce fork est maintenu par', '', 'Basé sur le projet original'],
  it: ['Questo fork è mantenuto da', '', 'Basato sul progetto originale'],
};

export default function ForkInfo({ locale = 'en' }: { locale?: AppLocale }) {
  const [before, after, credit] = labels[locale];
  return (
    <p className="text-sm text-surface-400 leading-relaxed">
      {before}{' '}<a href={repositoryUrl} className="text-primary-400 hover:underline">{maintainer}</a>{' '}{after}
      {' · '}<a href={repositoryUrl} className="hover:underline">GitHub</a>
      {' · '}{credit}{' '}<a href={upstreamUrl} className="hover:underline">affsquadDevs/EditoraPDF</a>
      {' · MIT'}
    </p>
  );
}
