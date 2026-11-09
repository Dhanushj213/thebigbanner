'use client';

import React from 'react';
import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function DashboardCertificatesPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-sans text-[#171717]">
          Digital Ownership Certificates
        </h2>
        <p className="text-xs text-[#707070] mt-0.5">
          Verifiable cryptographic credentials certifying your brand&apos;s exclusive ownership tenures.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#D50100]">TBB-CERT-2026-0006</span>
              <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#F0FDF4] text-[#15803D] font-bold">
                VERIFIED IMMUTABLE
              </span>
            </div>
            <h3 className="text-base font-bold text-[#171717] font-sans mt-0.5">
              Tenure Slot #6 — Hyperion Motors / Solaris Aerospace
            </h3>
            <p className="text-xs text-[#707070] font-mono">
              Purchase Amount: <strong className="text-[#171717]">{formatUSDOnly(220000)}</strong>
              {selectedCurrency !== 'USD' && <span> (≈ {formatAmount(220000)})</span>}
              {' '}• Germany • Oct 02 — Oct 16, 2026
            </p>
          </div>

          <Link
            href="/ownership/own_6"
            className="px-4 py-2 bg-[#171717] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded flex items-center gap-1.5 shadow-sm"
          >
            <span>Inspect Full Certificate</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <p className="text-xs text-[#707070] font-sans">
          Each certificate is protected by a unique cryptographic hash and published on the permanent public ledger.
        </p>
      </div>
    </div>
  );
}
