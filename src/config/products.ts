export const PRODUCTS = [
  {
    slug: "example",
    titleKey: "products.example.title",
    descKey: "products.example.description",
  },
] as const;

export type ProductSlug = (typeof PRODUCTS)[number]["slug"];
export type Product = (typeof PRODUCTS)[number];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
