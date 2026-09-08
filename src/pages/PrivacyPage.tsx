import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const sections = [
  'who',
  'scope',
  'data',
  'purpose',
  'whatsapp',
  'ai',
  'sharing',
  'retention',
  'rights',
  'children',
  'changes',
] as const;

export default function PrivacyPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = t('privacyPage.metaTitle');
    return () => {
      document.title = previousTitle;
    };
  }, [t]);

  return (
    <>
      <Navbar />
      <main className="px-5 pb-20 pt-28 sm:px-6 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-3xl">
          <span className="label text-primary">{t('privacyPage.label')}</span>
          <h1 className="mt-5 text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t('privacyPage.title')}
          </h1>
          <p className="mt-4 font-mono text-[11px] text-ink-dim">{t('privacyPage.updated')}</p>
          <p className="prose-mono mt-8 max-w-2xl">{t('privacyPage.intro')}</p>

          <div className="mt-12 border-t border-ink/10">
            {sections.map((id) => (
              <section key={id} className="border-b border-ink/10 py-8 sm:py-9">
                <h2 className="font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                  {t(`privacyPage.${id}Title`)}
                </h2>
                <p className="prose-mono mt-4 whitespace-pre-line">{t(`privacyPage.${id}Body`)}</p>
              </section>
            ))}
          </div>

          <p className="mt-10 font-mono text-xs text-ink-dim">
            {t('privacyPage.contact')}{' '}
            <a
              href="mailto:general@breakaway.work"
              className="font-medium text-primary transition-colors hover:text-primary-bright"
            >
              general@breakaway.work
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
