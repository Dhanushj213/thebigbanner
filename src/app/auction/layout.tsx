import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Auction Arena — Sovereign Digital Advertising Placement',
  description:
    'Compete in the live digital advertising auction for THE BIG BANNER. Guaranteed +$5 USD minimum bid progression, anti-sniping dynamic clock extensions, and canonical USD clearing.',
  alternates: {
    canonical: 'https://thebigbanner.com/auction',
  },
  openGraph: {
    title: 'Live Auction Arena — Sovereign Digital Advertising Placement | THE BIG BANNER',
    description:
      'Participate in the world’s exclusive digital advertising auction. One primary billboard, one verified owner at a time. Minimum +$5 USD increments per bid.',
    url: 'https://thebigbanner.com/auction',
  },
};

export default function AuctionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
