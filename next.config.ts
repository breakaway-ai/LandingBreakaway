import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const obsoleteMarketingPaths = [
  { segment: "blog", localizedSuffix: "" },
  { segment: "pricing", localizedSuffix: "" },
  { segment: "precios", localizedSuffix: "" },
  { segment: "casos", localizedSuffix: "/about" },
  { segment: "contact", localizedSuffix: "" },
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/nosotros",
        destination: "/es/about",
        permanent: true,
      },
      {
        source: "/privacidad",
        destination: "/es/privacy",
        permanent: true,
      },
      {
        source: "/gracias",
        destination: "/es/thank-you",
        permanent: true,
      },
      {
        source: "/:locale(es|en)/products/reintegra",
        destination: "/:locale/products/escritos-sat",
        permanent: true,
      },
      ...obsoleteMarketingPaths.flatMap(({ segment, localizedSuffix }) => [
        {
          source: `/${segment}`,
          destination: `/es${localizedSuffix}`,
          permanent: true,
        },
        {
          source: `/:locale(es|en)/${segment}`,
          destination: `/:locale${localizedSuffix}`,
          permanent: true,
        },
      ]),
    ];
  },
};

export default withNextIntl(nextConfig);
