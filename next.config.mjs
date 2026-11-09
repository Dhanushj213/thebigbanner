/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'assets.coingecko.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
  async redirects() {
    return [
      {
        source: '/terms',
        destination: '/legal/terms-and-conditions',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/legal/privacy-policy',
        permanent: true,
      },
      {
        source: '/refund-policy',
        destination: '/legal/refund-policy',
        permanent: true,
      },
      {
        source: '/advertising-policy',
        destination: '/legal/advertising-policy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
