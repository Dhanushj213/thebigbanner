import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal Centre & Regulatory Compliance Hub — All Policies & Standards',
  description:
    'Official legal documentation, platform terms, privacy policy, refund policy, advertising standards, and Indian & global statutory compliance for THE BIG BANNER, operated by AXIOMIS Technologies.',
  alternates: {
    canonical: 'https://thebigbanner.com/legal',
  },
  openGraph: {
    title: 'Legal Centre & Regulatory Compliance Hub | THE BIG BANNER',
    description:
      'Explore 15 binding legal policies, dispute mechanisms, IT Rules 2021 declarations, and DPDP Act 2023 compliance for THE BIG BANNER.',
    url: 'https://thebigbanner.com/legal',
  },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
