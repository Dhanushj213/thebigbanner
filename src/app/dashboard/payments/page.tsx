'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Download, ShieldCheck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function DashboardPaymentsPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownloadInvoice = (inv: string) => {
    setDownloading(inv);
    setTimeout(() => {
      alert(`Official Tax Invoice ${inv} generated and downloaded.`);
      setDownloading(null);
    }, 600);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#171717]">
            Payments, Escrow & Invoices
          </h2>
          <p className="text-xs text-[#707070] mt-0.5">
            Settlement accounting records, Cashfree gateway checkout, and downloadable official receipts.
          </p>
        </div>

        <Link
          href="/checkout?tenure=9&amount=365000"
          className="px-4 py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-mono font-bold uppercase rounded flex items-center gap-2 shadow-sm transition-all"
        >
          <CreditCard className="w-4 h-4" />
          <span>Pay Tenure #9 via Cashfree</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Pending Settlement Alert Card */}
      <div className="bg-[#FFF5F5] border-2 border-[#FECACA] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#D50100]">
            <Clock className="w-4 h-4" />
            <span>PENDING ESCROW SETTLEMENT — ACTION REQUIRED</span>
          </div>
          <h3 className="text-base font-bold font-sans text-[#171717]">
            Tenure Slot #9 — $365,000 USD
          </h3>
          <p className="text-xs text-[#707070] font-sans">
            You hold the winning commitment for Auction #9. Complete your escrow settlement via Cashfree to unlock creative submission.
          </p>
        </div>

        <Link
          href="/checkout?tenure=9&amount=365000"
          className="px-5 py-2.5 bg-[#171717] hover:bg-black text-white text-xs font-mono font-bold uppercase rounded flex items-center justify-center gap-2 shadow-sm flex-shrink-0"
        >
          <span>Open Cashfree Checkout</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Payment Security Protocol Card */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#15803D]">
            <ShieldCheck className="w-4 h-4" />
            <span>Escrow Settlement Protocol</span>
          </div>
          <h3 className="text-sm font-bold font-sans text-[#171717]">
            Official Gateway: Cashfree Payments (UPI, Cards, NetBanking, International Wire)
          </h3>
          <p className="text-xs text-[#707070]">
            All winning funds are held in secure escrow until creative assets pass editorial compliance.
          </p>
        </div>

        <span className="px-3 py-1 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-mono font-bold rounded">
          ACCOUNT GOOD STANDING
        </span>
      </div>

      {/* Settled Invoices Table */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden shadow-subtle">
        <div className="px-5 py-4 border-b border-[#EAEAEA]">
          <h3 className="text-xs font-bold font-mono uppercase text-[#171717]">
            Settled Transaction Records
          </h3>
        </div>

        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
            <tr>
              <th className="py-3 px-4">Invoice #</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">Amount</th>
              <th className="py-3 px-4">Method</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            <tr className="hover:bg-[#F8F8F8]">
              <td className="py-3.5 px-4 font-bold text-[#171717]">INV-2026-006</td>
              <td className="py-3.5 px-4 font-sans">
                <span className="font-bold text-[#171717] block">Tenure #6 Placement</span>
                <span className="text-[11px] text-[#707070] font-mono">Solaris Aerospace AG / Hyperion</span>
              </td>
              <td className="py-3.5 px-4 text-[#707070]">Oct 02, 2026</td>
              <td className="py-3.5 px-4 font-bold text-[#15803D]">
                <div>{formatUSDOnly(220000)}</div>
                {selectedCurrency !== 'USD' && (
                  <div className="text-[10px] text-[#707070] font-normal">
                    ≈ {formatAmount(220000)}
                  </div>
                )}
              </td>
              <td className="py-3.5 px-4 text-[#707070]">SWIFT Wire / Escrow</td>
              <td className="py-3.5 px-4">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F0FDF4] text-[#15803D]">
                  SETTLED
                </span>
              </td>
              <td className="py-3.5 px-4 text-right">
                <button
                  onClick={() => handleDownloadInvoice('INV-2026-006')}
                  className="text-[#D50100] hover:underline font-sans text-xs font-bold"
                >
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
