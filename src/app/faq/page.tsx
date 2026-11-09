'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'General',
      q: 'What is THE BIG BANNER and how does it differ from traditional ad networks?',
      a: 'THE BIG BANNER is an exclusive digital advertising marketplace. Unlike programmatic networks that serve thousands of banners simultaneously, we feature exactly ONE primary advertising space and ONE owner at a time. The platform turns advertising into an exclusive, highly scarce, and competitive digital asset.',
    },
    {
      category: 'Auction',
      q: 'How does the +10% minimum price escalation formula work?',
      a: 'By rule, the minimum qualifying purchase price for the next tenure is at least 10% higher than the previous successful purchase price, calculated strictly in canonical USD. For example, if the previous winner paid $100,000 USD, the next minimum purchase price is calculated at $110,000 USD. Once bidding starts, each subsequent bid must increment beyond the highest bid by a minimum qualifying threshold.',
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

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
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
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden shadow-subtle"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F8F8F8] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono bg-[#F5F5F5] text-[#707070] px-2 py-0.5 rounded uppercase font-bold">
                      {item.category}
                    </span>
                    <span className="text-sm font-bold text-[#171717] font-sans">{item.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#D50100] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#707070] flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#707070] leading-relaxed border-t border-[#EAEAEA] font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
