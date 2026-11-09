import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Transparency & Public Ledger — Real-Time FX & Settlement Audit',
  description:
    'Public financial transparency register, real-time foreign exchange rate audits, cryptographic certificate hash verification, and escrow settlement reports. Operated by AXIOMIS Technologies.',
  alternates: {
    canonical: 'https://thebigbanner.com/transparency',
  },
  openGraph: {
    title: 'Financial Transparency & Public Ledger | THE BIG BANNER',
    description:
      'Complete institutional transparency: gross transaction values, payment processor fee deductions, net receipts, and cryptographic SHA-256 certificate verification.',
    url: 'https://thebigbanner.com/transparency',
  },
};

export default function TransparencyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
