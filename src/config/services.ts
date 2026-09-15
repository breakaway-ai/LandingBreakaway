export const SERVICES = [
  {
    slug: "ai-agents",
    detailKey: "aiAgents",
    titleKey: "services.agentsTitle",
    descKey: "services.agentsDesc",
    menuDescKey: "services.agentsMenuDesc",
    footerKey: "services.agentsFooter",
    svg: "/svgs/service-automation.svg",
  },
  {
    slug: "automations",
    detailKey: "automations",
    titleKey: "services.automationsTitle",
    descKey: "services.automationsDesc",
    menuDescKey: "services.automationsMenuDesc",
    footerKey: "services.automationsFooter",
    svg: "/svgs/service-devops.svg",
  },
  {
    slug: "integrations",
    detailKey: "integrations",
    titleKey: "services.integrationsTitle",
    descKey: "services.integrationsDesc",
    menuDescKey: "services.integrationsMenuDesc",
    footerKey: "services.integrationsFooter",
    svg: "/svgs/service-integration.svg",
  },
  {
    slug: "web-pages",
    detailKey: "webPages",
    titleKey: "services.webTitle",
    descKey: "services.webDesc",
    menuDescKey: "services.webMenuDesc",
    footerKey: "services.webFooter",
    svg: "/svgs/service-web.svg",
  },
  {
    slug: "apps",
    detailKey: "apps",
    titleKey: "services.appsTitle",
    descKey: "services.appsDesc",
    menuDescKey: "services.appsMenuDesc",
    footerKey: "services.appsFooter",
    svg: "/svgs/service-mobile.svg",
  },
  {
    slug: "consulting",
    detailKey: "consulting",
    titleKey: "services.consultingTitle",
    descKey: "services.consultingDesc",
    menuDescKey: "services.consultingMenuDesc",
    footerKey: "services.consultingFooter",
    svg: "/svgs/service-consulting.svg",
  },
  {
    slug: "training",
    detailKey: "training",
    titleKey: "services.trainingTitle",
    descKey: "services.trainingDesc",
    menuDescKey: "services.trainingMenuDesc",
    footerKey: "services.trainingFooter",
    svg: "/svgs/service-training.svg",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type Service = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
