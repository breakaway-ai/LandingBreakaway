import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/nosotros',
        destination: '/es/about',
        permanent: true,
      },
      {
        source: '/privacidad',
        destination: '/es/privacy',
        permanent: true,
      },
      {
        source: '/gracias',
        destination: '/es/thank-you',
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
