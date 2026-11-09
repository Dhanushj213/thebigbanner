import type { Metadata } from 'next';
import './globals.css';
import { BannerProvider } from '@/context/BannerContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'THE BIG BANNER — One Banner. One Owner. Global Attention.',
  description:
    'The world’s most exclusive digital advertising marketplace. One primary banner, one verified owner at a time, competing in a transparent, $5 minimum hike auction.',
  icons: {
    icon: '/thebigbannerlogo1.png',
    apple: '/thebigbannerlogo1.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFFFFF] text-[#171717] antialiased selection:bg-[#D50100] selection:text-white">
        <BannerProvider>
          <CurrencyProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </CurrencyProvider>
        </BannerProvider>
      </body>
    </html>
  );
}
