export const SERVICES = [
  {
    slug: "ai-agents",
    titleKey: "services.agentsTitle",
    descKey: "services.agentsDesc",
    footerKey: "services.agentsFooter",
    svg: "/svgs/service-automation.svg",
  },
  {
    slug: "automations",
    titleKey: "services.automationsTitle",
    descKey: "services.automationsDesc",
    footerKey: "services.automationsFooter",
    svg: "/svgs/service-devops.svg",
  },
  {
    slug: "integrations",
    titleKey: "services.integrationsTitle",
    descKey: "services.integrationsDesc",
    footerKey: "services.integrationsFooter",
    svg: "/svgs/service-integration.svg",
  },
  {
    slug: "web-pages",
    titleKey: "services.webTitle",
    descKey: "services.webDesc",
    footerKey: "services.webFooter",
    svg: "/svgs/service-web.svg",
  },
  {
    slug: "apps",
    titleKey: "services.appsTitle",
    descKey: "services.appsDesc",
    footerKey: "services.appsFooter",
    svg: "/svgs/service-mobile.svg",
  },
  {
    slug: "consulting",
    titleKey: "services.consultingTitle",
    descKey: "services.consultingDesc",
    footerKey: "services.consultingFooter",
    svg: "/svgs/service-consulting.svg",
  },
  {
    slug: "training",
    titleKey: "services.trainingTitle",
    descKey: "services.trainingDesc",
    footerKey: "services.trainingFooter",
    svg: "/svgs/service-training.svg",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];
export type Service = (typeof SERVICES)[number];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
