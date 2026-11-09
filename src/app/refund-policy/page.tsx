'use client';

import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-[#171717] leading-relaxed font-sans">
        <div className="pb-4 border-b border-[#EAEAEA] space-y-1">
          <h1 className="text-3xl font-black text-[#171717] uppercase tracking-tight font-sans">Refund & Escrow Policy</h1>
          <p className="text-xs text-[#707070] font-mono">Last updated: November 2026</p>
        </div>

        <div className="space-y-6 text-[#707070]">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">1. Escrow Protocol</h2>
            <p>
              When an advertiser completes payment upon auction victory, funds are placed into segregated escrow. The transaction is not considered fully settled until your creative assets pass editorial compliance and the scheduled tenure begins.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">2. Creative Non-Approval & Resubmission</h2>
            <p>
              If a submitted creative asset violates our guidelines, our verification desk provides actionable feedback and grants up to 48 hours for revisions. If compliance cannot be achieved prior to the scheduled start date:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs font-mono">
              <li>The advertiser may elect a full refund of the winning bid amount minus merchant gateway processing fees (2.0%).</li>
              <li>Alternatively, the advertiser may roll the credit into a future auction credit.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#171717]">3. Broadcast Finality</h2>
            <p>
              Once your advertisement has commenced its live broadcast on the global homepage, the transaction is definitive and irreversible. No refunds or retroactive cancellations are permitted once impressions have begun.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
