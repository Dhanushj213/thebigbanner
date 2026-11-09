import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Advertiser Sign In — Secure Portal',
  description: 'Sign in to access your verified advertiser dashboard, place active auction bids, upload creative assets, and download ownership certificates.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
