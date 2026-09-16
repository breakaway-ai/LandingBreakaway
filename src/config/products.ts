export type ProductAnimationId =
  | "escritos-sat"
  | "multicotizador"
  | "avaluos"
  | "ecommerce";

export type FlowAnimationLayout = "mock" | "pipeline";

export const PRODUCTS = [
  {
    slug: "escritos-sat",
    titleKey: "products.escritos-sat.title",
    descKey: "products.escritos-sat.description",
    menuDescKey: "products.escritos-sat.description",
    footerKey: "products.escritos-sat.heroSubtitle",
    svg: "/svgs/product-escritos-sat-hero.svg",
    template: "landing",
    heroSvg: "/svgs/product-escritos-sat-hero.svg",
    featureSvgs: [
      "/svgs/product-sat-requerimiento.svg",
      "/svgs/product-sat-escrito.svg",
      "/svgs/product-sat-onedrive.svg",
      "/svgs/product-sat-ia.svg",
    ],
    stepsSvg: "/svgs/product-sat-flow.svg",
    heroAnimation: "escritos-sat",
    flowAnimation: "escritos-sat",
    featureAnimation: "escritos-sat",
  },
  {
    slug: "multicotizador",
    titleKey: "products.multicotizador.title",
    descKey: "products.multicotizador.description",
    menuDescKey: "products.multicotizador.description",
    footerKey: "products.multicotizador.heroSubtitle",
    svg: "/svgs/product-multicotizador-hero.svg",
    template: "landing",
    heroSvg: "/svgs/product-multicotizador-hero.svg",
    featureSvgs: [
      "/svgs/product-multi-insurers.svg",
      "/svgs/product-multi-compare.svg",
      "/svgs/product-multi-pdf.svg",
      "/svgs/product-multi-whitelabel.svg",
    ],
    stepsSvg: "/svgs/product-multi-flow.svg",
    heroAnimation: "multicotizador",
    flowAnimation: "multicotizador",
    featureAnimation: "multicotizador",
  },
  {
    slug: "avaluos",
    titleKey: "products.avaluos.title",
    descKey: "products.avaluos.description",
    menuDescKey: "products.avaluos.description",
    footerKey: "products.avaluos.heroSubtitle",
    svg: "/svgs/product-avaluos-hero.svg",
    template: "landing",
    heroSvg: "/svgs/product-avaluos-hero.svg",
    featureSvgs: [
      "/svgs/product-avaluos-catastro.svg",
      "/svgs/product-avaluos-comparables.svg",
      "/svgs/product-avaluos-homologacion.svg",
      "/svgs/product-avaluos-docs.svg",
    ],
    stepsSvg: "/svgs/product-avaluos-flow.svg",
    heroAnimation: "avaluos",
    flowAnimation: "avaluos",
    featureAnimation: "avaluos",
  },
  {
    slug: "ecommerce",
    titleKey: "products.ecommerce.title",
    descKey: "products.ecommerce.description",
    menuDescKey: "products.ecommerce.description",
    footerKey: "products.ecommerce.heroSubtitle",
    svg: "/svgs/product-ecommerce-hero.svg",
    template: "landing",
    heroSvg: "/svgs/product-ecommerce-hero.svg",
    featureSvgs: [
      "/svgs/product-ecommerce-modalidades.svg",
      "/svgs/product-ecommerce-stripe.svg",
      "/svgs/product-ecommerce-envios.svg",
      "/svgs/product-ecommerce-admin.svg",
    ],
    stepsSvg: "/svgs/product-ecommerce-flow.svg",
    heroAnimation: "ecommerce",
    flowAnimation: "ecommerce",
    flowAnimationLayout: "pipeline",
    featureAnimation: "ecommerce",
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];
export type Product = (typeof PRODUCTS)[number];
export type ProductTemplate = Product["template"];
export type LandingProduct = Extract<Product, { template: "landing" }>;

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function isLandingProduct(product: Product): product is LandingProduct {
  return product.template === "landing";
}

export function productDetailPath(slug: ProductSlug): `/products/${ProductSlug}` {
  return `/products/${slug}`;
}
