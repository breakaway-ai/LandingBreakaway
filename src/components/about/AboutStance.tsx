import { motion } from 'framer-motion';
import { Trans, useTranslation } from 'react-i18next';

export default function AboutStance() {
  const { t } = useTranslation();

  return (
    <section className="relative py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="label text-primary">{t('aboutPage.stanceLabel')}</span>
          <h2 className="mt-5 max-w-sm text-[1.75rem] leading-[1.15] text-ink sm:text-4xl">
            {t('aboutPage.stanceHeadline')}
          </h2>
        </motion.div>

        <div className="mt-12 border-t border-ink/10 sm:mt-14">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">01</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('aboutPage.stance1Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                <Trans i18nKey="aboutPage.stance1Desc">
                  Un proceso mal entendido
                  <span className="mark"> no mejora porque le pongas un modelo encima</span>.
                  Empezamos por mapear cómo trabaja tu equipo hoy.
                </Trans>
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">02</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('aboutPage.stance2Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                <Trans i18nKey="aboutPage.stance2Desc">
                  Cada agente declara a qué sistemas entra y qué puede escribir, y deja
                  <span className="mark"> registro auditable</span> de cada acción que ejecuta.
                </Trans>
              </p>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid gap-3 border-b border-ink/10 py-9 sm:gap-4 sm:py-10 lg:grid-cols-[64px_1fr] lg:gap-8"
          >
            <span className="label text-primary">03</span>
            <div>
              <h3 className="max-w-xs font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
                {t('aboutPage.stance3Title')}
              </h3>
              <p className="prose-mono mt-4 max-w-md">
                <Trans i18nKey="aboutPage.stance3Desc">
                  Hay procesos que
                  <span className="mark"> no conviene automatizar todavía</span>. Preferimos
                  decirlo en el diagnóstico que descubrirlo a mitad del proyecto.
                </Trans>
              </p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
