import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Service {
  titleKey: string;
  descKey: string;
  tags: string[];
  tagKeys?: string[];
  span: string;
  lifted?: boolean;
}

const services: Service[] = [
  {
    titleKey: 'services.aiAgentsTitle',
    descKey: 'services.aiAgentsDesc',
    tags: ['NLP', 'RAG', 'Multi-Agent', 'LLM'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    titleKey: 'services.apiTitle',
    descKey: 'services.apiDesc',
    tags: ['REST', 'Webhooks', 'ERP'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    titleKey: 'services.webTitle',
    descKey: 'services.webDesc',
    tags: [],
    tagKeys: ['services.tagWeb'],
    span: 'lg:col-span-2',
  },
  {
    titleKey: 'services.mobileTitle',
    descKey: 'services.mobileDesc',
    tags: ['iOS', 'Android'],
    span: 'lg:col-span-2',
    lifted: true,
  },
  {
    titleKey: 'services.backendTitle',
    descKey: 'services.backendDesc',
    tags: ['APIs', 'Cloud'],
    span: 'sm:col-span-2 lg:col-span-2',
  },
  {
    titleKey: 'services.devopsTitle',
    descKey: 'services.devopsDesc',
    tags: ['CI/CD'],
    tagKeys: ['services.tagMonitoring'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
  {
    titleKey: 'services.securityTitle',
    descKey: 'services.securityDesc',
    tags: [],
    tagKeys: ['services.tagPermissions', 'services.tagAudit', 'services.tagIsolation'],
    span: 'sm:col-span-2 lg:col-span-3',
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="relative bg-background-alt/60 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label text-primary">{t('services.label')}</span>
          <h2 className="mx-auto mt-5 max-w-2xl text-[1.75rem] leading-[1.15] text-ink sm:text-4xl lg:text-[2.6rem]">
            {t('services.headline')}
          </h2>
          <p className="prose-mono mx-auto mt-5 max-w-xl">{t('services.sectionSubtitle')}</p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-6">
          {services.map((service, i) => {
            const tags = [...service.tags, ...(service.tagKeys ?? []).map((key) => t(key))];

            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0, transition: { delay: (i % 3) * 0.08 } }}
                whileHover={{ y: -8, transition: { duration: 0.28, ease: 'easeOut' } }}
                viewport={{ once: true }}
                className={`card card-float flex flex-col p-6 sm:p-7 ${service.span} ${
                  service.lifted ? 'lg:-my-4 lg:shadow-card-lift' : ''
                }`}
              >
                <span className="font-mono text-[11px] text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 text-[17px] text-ink">{t(service.titleKey)}</h3>
                <p className="prose-mono mt-3 flex-1">{t(service.descKey)}</p>

                {tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
