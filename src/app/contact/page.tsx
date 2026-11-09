import React from 'react';
import type { Metadata } from 'next';
import { ContactClient } from '@/components/ContactClient';

export const metadata: Metadata = {
  title: 'Contact Concierge Desk — Advertiser Relations & Inquiries',
  description:
    'Direct institutional inquiries, high-value wire agreements, and white-glove onboarding for THE BIG BANNER. Contact our executive concierge and compliance desks.',
  alternates: {
    canonical: 'https://thebigbanner.com/contact',
  },
  openGraph: {
    title: 'Contact Concierge Desk — Advertiser Relations | THE BIG BANNER',
    description:
      'Direct executive channels, institutional escrow wire inquiries, and white-glove onboarding for THE BIG BANNER.',
    url: 'https://thebigbanner.com/contact',
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'THE BIG BANNER Concierge Desk',
  description: 'Direct institutional inquiries, high-value wire agreements, and white-glove onboarding.',
  url: 'https://thebigbanner.com/contact',
  mainEntity: {
    '@type': 'Organization',
    name: 'THE BIG BANNER',
    legalName: 'AXIOMIS Technologies',
    url: 'https://thebigbanner.com',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'Concierge Desk & Advertiser Relations',
        email: 'concierge@thebigbanner.com',
        url: 'https://thebigbanner.com/contact',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'Compliance & Approvals',
        email: 'compliance@thebigbanner.com',
        url: 'https://thebigbanner.com/contact',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            CONCIERGE & ADVERTISER RELATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Contact Concierge Desk
          </h1>
          <p className="text-sm text-[#707070] max-w-lg mx-auto">
            Direct institutional inquiries, high-value wire agreements, and white-glove onboarding.
          </p>
        </div>

        <ContactClient />
      </div>
    </div>
  );
}
