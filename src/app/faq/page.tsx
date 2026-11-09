import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { FAQClient, FAQItem } from '@/components/FAQClient';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) — Bidding, Rules & Guidelines',
  description:
    'Answers to all key questions regarding THE BIG BANNER: $5 USD minimum bid hike formula, 14-day exclusive tenure, canonical USD currency, anti-sniping protection, and creative asset specifications.',
  alternates: {
    canonical: 'https://thebigbanner.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) — Bidding, Rules & Guidelines | THE BIG BANNER',
    description:
      'Everything you need to know about bidding, auctions, creative guidelines, and financial transparency on THE BIG BANNER.',
    url: 'https://thebigbanner.com/faq',
  },
};

const faqs: FAQItem[] = [
  {
    category: 'General',
    q: 'What is THE BIG BANNER and how does it differ from traditional ad networks?',
    a: 'THE BIG BANNER is an exclusive digital advertising marketplace. Unlike programmatic networks that serve thousands of banners simultaneously, we feature exactly ONE primary advertising space and ONE owner at a time. The platform turns advertising into an exclusive, highly scarce, and competitive digital asset.',
  },
  {
    category: 'Auction',
    q: 'How does the $5 minimum bid hike formula work?',
    a: 'By rule, every qualifying bid must increment by at least $5 USD above the current highest bid, calculated strictly in canonical USD. For example, if the current highest bid is $365,000 USD, the next minimum acceptable bid is $365,005 USD. Advertisers may place larger bids at any time (e.g. +$25, +$100, or custom jumps), but no bid increment below $5 USD is accepted.',
  },
  {
    category: 'Currency',
    q: 'What is the platform’s official currency, and can I bid or settle in my local currency?',
    a: 'United States Dollar (USD) is the canonical platform and auction currency. All bids, reserves, clearing prices, and historical ownership records are authoritatively governed in USD. However, visitors may use the global currency selector to inspect approximate converted values in EUR, GBP, INR, CAD, AUD, AED, SGD, JPY, and CHF. During escrow checkout, winners can settle in supported local currencies via real-time foreign exchange conversion.',
  },
  {
    category: 'Auction',
    q: 'How does anti-sniping protection work?',
    a: 'To prevent bots and last-second sniping from undermining fair bidding competition, any qualifying bid placed within the final 2 minutes (120 seconds) of an auction automatically extends the countdown clock by +2:00 minutes. The auction only closes when no bids arrive for a full 2 minutes.',
  },
  {
    category: 'Creatives',
    q: 'Does winning an auction guarantee my advertisement goes live immediately?',
    a: 'No. The system strictly separates auction victory from creative approval. Winning the auction grants you the exclusive right to submit your creative for the target tenure. Your assets must pass automated malware checks, destination URL SSL checks, and editorial review before broadcast.',
  },
  {
    category: 'Creatives',
    q: 'What are the required dimensions and formats for banner creatives?',
    a: 'We require a desktop creative (1920×600 px, 16:5 or 16:6 aspect ratio) and an accompanying mobile companion (900×1200 px or 1080×1080 px). Formats accepted include PNG, JPG, and WebP (up to 5MB). The destination link must be a secure HTTPS URL.',
  },
  {
    category: 'Payments',
    q: 'How are payments handled and what is the settlement window?',
    a: 'Upon winning an auction, the winner receives an invoice and has 24 hours to complete settlement via SWIFT wire transfer or approved payment gateway. Funds are held in escrow until creative approval.',
  },
];

const faqPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

export default function FAQPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            QUESTIONS & ANSWERS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Frequently Asked Questions
          </h1>
          <p className="text-sm text-[#707070] max-w-lg mx-auto">
            Everything you need to know about bidding, auctions, creative guidelines, and financial transparency.
          </p>
        </div>

        {/* Accordions */}
        <FAQClient faqs={faqs} />

        <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg p-6 text-center space-y-2">
          <p className="text-xs text-[#707070] font-mono">Need personalized concierge support?</p>
          <Link href="/contact" className="text-xs font-bold text-[#D50100] hover:underline uppercase font-sans">
            Contact Concierge Desk →
          </Link>
        </div>
      </div>
    </div>
  );
}
