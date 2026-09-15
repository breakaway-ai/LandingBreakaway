export const PRODUCTS = [
  {
    slug: "avaluos-hacendarios",
    detailKey: "avaluosHacendarios",
    titleKey: "products.avaluosHacendariosTitle",
    descKey: "products.avaluosHacendariosDesc",
    menuDescKey: "products.avaluosHacendariosMenuDesc",
    footerKey: "products.avaluosHacendariosFooter",
    svg: "/svgs/products/product-avaluos-hacendarios.svg",
  },
  {
    slug: "devolucion-impuestos",
    detailKey: "devolucionImpuestos",
    titleKey: "products.devolucionImpuestosTitle",
    descKey: "products.devolucionImpuestosDesc",
    menuDescKey: "products.devolucionImpuestosMenuDesc",
    footerKey: "products.devolucionImpuestosFooter",
    svg: "/svgs/products/product-devolucion-impuestos.svg",
  },
  {
    slug: "multicotizador-seguros",
    detailKey: "multicotizadorSeguros",
    titleKey: "products.multicotizadorSegurosTitle",
    descKey: "products.multicotizadorSegurosDesc",
    menuDescKey: "products.multicotizadorSegurosMenuDesc",
    footerKey: "products.multicotizadorSegurosFooter",
    svg: "/svgs/products/product-multicotizador-seguros.svg",
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];
export type Product = (typeof PRODUCTS)[number];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
