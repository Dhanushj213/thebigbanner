import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statutory Compliance Matrix — Indian & Global Regulatory Framework',
  description:
    'Comprehensive statutory compliance matrix for THE BIG BANNER across Indian and international jurisdictions: IT Act 2000, IT Rules 2021, DPDP Act 2023, Consumer Protection Act 2019, GDPR, CCPA.',
  alternates: {
    canonical: 'https://thebigbanner.com/legal/compliance',
  },
  openGraph: {
    title: 'Statutory Compliance Matrix — Indian & Global Regulatory Framework | THE BIG BANNER',
    description:
      'Detailed legal mapping of statutory provisions, regulatory triggers, and compliance implementations for THE BIG BANNER (AXIOMIS Technologies).',
    url: 'https://thebigbanner.com/legal/compliance',
  },
};

export default function ComplianceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
