import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertiser Registration — Verified Corporate Profile',
  description: 'Register as an institutional or verified brand advertiser on THE BIG BANNER to participate in exclusive digital billboard auctions.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
