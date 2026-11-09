import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'THE BIG BANNER — Global Exclusive Digital Advertising Marketplace',
    short_name: 'THE BIG BANNER',
    description:
      'The world’s exclusive digital advertising marketplace. One primary banner, one verified owner at a time, competing in a transparent, $5 USD minimum hike auction. Operated by AXIOMIS Technologies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    icons: [
      {
        src: '/thebigbannerlogo1.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/thebigbannerlogo1.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
