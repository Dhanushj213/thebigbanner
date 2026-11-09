'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-[#171717] leading-relaxed font-sans">
        <div className="pb-4 border-b border-[#EAEAEA] space-y-1">
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight font-sans">Terms & Conditions</h1>
          <p className="text-xs text-[#707070] font-mono">Last updated: November 2026</p>
        </div>

        <div className="space-y-6 text-[#707070]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">1. Sovereign Nature of Service</h2>
            <p>
              THE BIG BANNER provides exclusive digital advertising tenure rights via competitive online auctions. By participating in any auction, you agree to these Terms. You acknowledge that you are purchasing exclusive display rights for a designated tenure period, not programmatic clicks or impressions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">2. Binding Nature of Bids</h2>
            <p>
              All bids submitted in THE BIG BANNER auction engine are legally binding commitments. If your bid is declared the winning qualifying bid upon auction closure, you are obligated to complete settlement within 24 hours. Bids cannot be canceled or modified after placement.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">3. Anti-Sniping & Clock Governance</h2>
            <p>
              The auction engine algorithm enforces an anti-sniping rule. Any qualifying bid received in the final 120 seconds automatically extends the closing time by 120 seconds. Platform server timestamps represent the sole source of truth for bid validity.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">4. Separation of Victory and Editorial Clearance</h2>
            <p>
              An auction victory does not grant permission to broadcast unlawful, defamatory, deceptive, or infringing content. All submitted banner assets must undergo editorial clearance and comply with our Advertising Guidelines.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">5. Permanent Public Archive</h2>
            <p>
              You grant THE BIG BANNER an irrevocable, perpetual, worldwide license to display your brand name, purchase price, transaction hash, and banner preview in our public historical archive and digital ownership certificates.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
