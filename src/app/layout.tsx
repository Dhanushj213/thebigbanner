import type { Metadata, Viewport } from 'next';
import './globals.css';
import { BannerProvider } from '@/context/BannerContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';
import { JsonLd } from '@/components/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thebigbanner.com';

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'THE BIG BANNER — One Banner. One Owner. Global Attention.',
    template: '%s | THE BIG BANNER',
  },
  description:
    'The world’s exclusive digital advertising marketplace. One primary billboard, one verified brand owner at a time, competing in a transparent, $5 USD minimum hike auction. Operated by AXIOMIS Technologies.',
  applicationName: 'THE BIG BANNER',
  authors: [{ name: 'AXIOMIS Technologies', url: 'https://axiomis.in' }],
  generator: 'Next.js',
  keywords: [
    'THE BIG BANNER',
    'thebigbanner.com',
    'AXIOMIS Technologies',
    'exclusive digital advertising',
    'digital billboard marketplace',
    'one banner one owner',
    'homepage takeover advertising',
    'online advertising auction',
    'canonical USD advertising',
    'verified advertising tenure',
    'digital ownership certificates',
    'sovereign advertising placement',
    'high prestige advertising',
    'scarce digital advertising',
    'global digital advertising marketplace',
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'AXIOMIS Technologies',
  publisher: 'AXIOMIS Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'en-GB': siteUrl,
      'en-IN': siteUrl,
      'x-default': siteUrl,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'THE BIG BANNER',
    title: 'THE BIG BANNER — One Banner. One Owner. Global Attention.',
    description:
      'The world’s exclusive digital advertising marketplace. One primary billboard, one verified owner at a time, competing in a transparent $5 USD minimum hike auction. Operated by AXIOMIS Technologies.',
    images: [
      {
        url: '/thebigbannerlogo1.png',
        width: 1200,
        height: 630,
        alt: 'THE BIG BANNER — Global Exclusive Digital Advertising Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THE BIG BANNER — One Banner. One Owner. Global Attention.',
    description:
      'One primary advertising banner. One owner. Global attention. The world’s exclusive digital advertising marketplace.',
    images: ['/thebigbannerlogo1.png'],
    creator: '@thebigbanner',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/thebigbannerlogo1.png' },
      { url: '/thebigbannerlogo1.png', sizes: '32x32', type: 'image/png' },
      { url: '/thebigbannerlogo1.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/thebigbannerlogo1.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/thebigbannerlogo1.png'],
  },
  manifest: '/manifest.webmanifest',
  category: 'Advertising & Commercial Marketplace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#171717] antialiased selection:bg-[#D50100] selection:text-white">
        <BannerProvider>
          <CurrencyProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CookieBanner />
          </CurrencyProvider>
        </BannerProvider>
      </body>
    </html>
  );
}
