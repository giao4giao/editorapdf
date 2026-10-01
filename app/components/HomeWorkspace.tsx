import Link from 'next/link';
import { ArrowRight, FilePlus2, Scissors, RotateCw, PenTool, Image as ImageIcon, FileText, Table, Minimize2, Lock, GripVertical, EyeOff, Droplets } from 'lucide-react';
import type { AppLocale } from '../../i18n/config';
import { getMessages } from '../i18n/messages';
import LazyFAQ from './LazyFAQ';

const groups = [
  { title: 'section.organize', tools: [
    { id: 'merge', key: 'merge', icon: FilePlus2 },
    { id: 'split', key: 'split', icon: Scissors },
    { id: 'reorder', key: 'reorder', icon: GripVertical },
    { id: 'rotate', key: 'rotate', icon: RotateCw },
  ] },
  { title: 'section.convert', tools: [
    { id: 'pdf-to-word', key: 'pdfToWord', icon: FileText },
    { id: 'pdf-to-images', key: 'pdfToImages', icon: ImageIcon },
    { id: 'pdf-to-excel', key: 'pdfToExcel', icon: Table },
    { id: 'compress', key: 'compress', icon: Minimize2 },
  ] },
  { title: 'section.security', tools: [
    { id: 'sign', key: 'sign', icon: PenTool },
    { id: 'redact', key: 'redact', icon: EyeOff },
    { id: 'add-watermark', key: 'watermark', icon: Droplets },
    { id: 'delete-pages', key: 'delete', icon: FileText },
  ] },
];

export default function HomeWorkspace({ locale }: { locale: AppLocale }) {
  const messages = getMessages(locale);
  const t = (key: string) => messages[key] ?? key;
  const href = (path: string) => `/${locale}${path}`;

  return (
    <div className="home-workspace">
      <section className="workspace-hero" aria-labelledby="hero-heading">
        <div className="workspace-intro">
          <p className="workspace-eyebrow">EditoraPDF <span aria-hidden="true">/</span> {t('nav.tools')}</p>
          <h1 id="hero-heading">{t('hero.title.leading')}<br /><span>{t('hero.title.trailing')}</span></h1>
          <p className="workspace-description">{t('hero.desc')}</p>
          <div className="workspace-actions">
            <Link href={href('/edit')} className="btn-primary btn-lg">{t('cta.edit')}<ArrowRight size={18} /></Link>
            <Link href={href('/tools')} className="workspace-text-link">{t('tools.all')}<ArrowRight size={16} /></Link>
          </div>
          <p className="workspace-note"><Lock size={14} aria-hidden="true" />{t('cta.subline')}</p>
        </div>

        <div className="workspace-start">
          <div className="workspace-start-heading"><span>{t('hiw.step1.title')}</span><span className="workspace-format">PDF</span></div>
          <Link href={href('/edit')} className="workspace-open">
            <span className="document-mark" aria-hidden="true"><FileText size={34} strokeWidth={1.25} /></span>
            <span className="workspace-open-title">{t('cta.edit')}</span>
            <span className="workspace-open-description">{t('hero.noSoftware')}</span>
            <span className="workspace-open-button">{t('cta.edit')}<ArrowRight size={16} /></span>
          </Link>
          <div className="workspace-start-footer"><Lock size={13} aria-hidden="true" /><span>{t('edit.upload.privacy')}</span></div>
        </div>
      </section>

      <section className="workspace-tools" aria-labelledby="pdftools-heading">
        <div className="workspace-section-heading">
          <div><p className="workspace-eyebrow">{t('badge.tools')}</p><h2 id="pdftools-heading">{t('section.completeToolkit')}</h2></div>
          <Link href={href('/tools')} className="workspace-text-link">{t('tools.all')}<ArrowRight size={16} /></Link>
        </div>
        <div className="workspace-tool-groups">
          {groups.map(group => (
            <div key={group.title} className="workspace-tool-group">
              <h3>{t(group.title)}</h3>
              {group.tools.map(tool => (
                <Link key={tool.id} href={href(`/tools/${tool.id}`)} className="workspace-tool-row">
                  <tool.icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  <span><strong>{t(`tools.${tool.key}.title`)}</strong><small>{t(`tools.${tool.key}.desc`)}</small></span>
                  <ArrowRight size={15} className="workspace-row-arrow" aria-hidden="true" />
                </Link>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="workspace-principles" aria-labelledby="principles-heading">
        <h2 id="principles-heading">{t('features.why')}</h2>
        <div className="workspace-principle-grid">
          {['instant', 'full', 'private'].map((key, index) => (
            <div key={key}><span className="workspace-number">0{index + 1}</span><h3>{t(`features.${key}.title`)}</h3><p>{t(`features.${key}.desc`)}</p></div>
          ))}
        </div>
      </section>

      <section className="workspace-source" aria-labelledby="opensource-heading">
        <div><h2 id="opensource-heading">{t('oss.title')}</h2><p>{t('oss.desc')}</p></div>
        <a href="https://github.com/affsquadDevs/editorapdf" target="_blank" rel="noopener noreferrer" className="btn-secondary btn-md">{t('oss.view')}<ArrowRight size={16} /></a>
      </section>
      <aside className="workspace-limits" aria-labelledby="limitations-heading">
        <h2 id="limitations-heading">{t('limits.title')}</h2>
        <ul>{['size', 'pages', 'forms', 'encrypted'].map(key => <li key={key}>{t(`limits.${key}`)}</li>)}</ul>
      </aside>
      <div className="workspace-faq"><LazyFAQ /></div>
    </div>
  );
}
