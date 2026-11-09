'use client';

import React from 'react';

export default function AdvertisingPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-[#171717] leading-relaxed font-sans">
        <div className="pb-4 border-b border-[#EAEAEA] space-y-1">
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight font-sans">Advertising & Content Policy</h1>
          <p className="text-xs text-[#707070] font-mono">Last updated: November 2026</p>
        </div>

        <div className="space-y-6 text-[#707070]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">1. Editorial Philosophy</h2>
            <p>
              THE BIG BANNER represents the single most prestigious digital advertising asset in the world. To maintain this prestige for past, present, and future banner owners, all creative submissions must meet strict aesthetic and institutional standards.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-base font-bold text-[#171717]">2. Strictly Prohibited Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Online gambling, sports betting, and casino gaming
              </div>
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Adult content, explicit media, and escort services
              </div>
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Unregistered pharmaceuticals, miracle cures, and supplements
              </div>
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Deceptive financial schemes, MLM, and guaranteed returns
              </div>
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Hate speech, political attack ads, and defamatory material
              </div>
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded">
                • Counterfeit goods and unverified trademark infringement
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">3. Asset Validation Standards</h2>
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li>Desktop Canvas: 1920 × 600 px (ultra-wide 16:5 or 16:6). Max 5MB.</li>
              <li>Mobile Canvas: 900 × 1200 px (3:4 ratio). Max 5MB.</li>
              <li>Destination Landing Page: Must resolve via secure HTTPS with a valid SSL certificate.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
