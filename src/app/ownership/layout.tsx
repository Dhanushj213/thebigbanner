import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ownership Archive & Ledger — Permanent Public Register',
  description:
    'The immutable public ledger of organizations, brands, and creators that have held sovereign dominion over THE BIG BANNER. Cryptographic certificate verification and tenure history.',
  alternates: {
    canonical: 'https://thebigbanner.com/ownership',
  },
  openGraph: {
    title: 'Ownership Archive & Ledger — Permanent Public Register | THE BIG BANNER',
    description:
      'Search and verify past brand owners of THE BIG BANNER. Permanent cryptographic certificates, clearing prices in canonical USD, and global reach statistics.',
    url: 'https://thebigbanner.com/ownership',
  },
};

export default function OwnershipLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
