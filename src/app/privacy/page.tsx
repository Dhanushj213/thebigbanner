'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-[#171717] leading-relaxed font-sans">
        <div className="pb-4 border-b border-[#EAEAEA] space-y-1">
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight font-sans">Privacy Policy</h1>
          <p className="text-xs text-[#707070] font-mono">Last updated: November 2026</p>
        </div>

        <div className="space-y-6 text-[#707070]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">1. Privacy First Architecture</h2>
            <p>
              THE BIG BANNER operates on strict data minimization principles. We do not use third-party tracking pixels, cross-site fingerprinting cookies, or sell advertiser behavioral data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">2. Publicly Published Ledger Information</h2>
            <p>
              To maintain radical transparency, the following information is published in the public archive upon completion of a successful purchase:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li>Advertiser or Brand Public Name</li>
              <li>Country of Incorporation</li>
              <li>Ownership Tenure Number and Date Range</li>
              <li>Winning Purchase Price and Settlement Date</li>
              <li>Cryptographic Transaction Hash and Certificate Serial</li>
              <li>Approved Banner Creative and Destination Landing Link</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">3. Protected Confidential Information</h2>
            <p>
              We strictly protect and never expose private advertiser bank accounts, routing details, internal phone numbers, private billing addresses, or KYC identity verification credentials.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
