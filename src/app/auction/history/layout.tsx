import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auction History Register — Concluded Auctions & Clearing Prices',
  description:
    'Official public registry of all concluded auctions, historical clearing prices, winning bids, and victorious brands on THE BIG BANNER.',
  alternates: {
    canonical: 'https://thebigbanner.com/auction/history',
  },
  openGraph: {
    title: 'Auction History Register — Concluded Auctions & Clearing Prices | THE BIG BANNER',
    description:
      'Explore official records of previous auction rounds, historic bids, and winning brand tenures on THE BIG BANNER.',
    url: 'https://thebigbanner.com/auction/history',
  },
};

export default function AuctionHistoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
