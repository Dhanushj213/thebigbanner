'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function AuctionHistoryPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await fetch('/api/ownerships');
        if (res.ok) {
          const data = await res.json();
          setRecords(data.records || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadHistory();
  }, []);

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#707070] mb-1">
              <Link href="/" className="hover:text-[#171717]">Home</Link>
              <span>/</span>
              <Link href="/auction" className="hover:text-[#171717]">Live Auction</Link>
              <span>/</span>
              <span className="text-[#D50100] font-semibold">Concluded Auctions</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
              Auction History Register
            </h1>
            <p className="text-xs sm:text-sm text-[#707070] mt-1">
              Official public registry of all concluded auctions, clearing prices, and victorious brands.
            </p>
          </div>

          <Link
            href="/auction"
            className="px-4 py-2 bg-[#D50100] text-white text-xs font-bold font-mono uppercase tracking-wider rounded shadow-sm"
          >
            Go To Live Auction Arena
          </Link>
        </div>

        {/* Concluded Table */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden shadow-subtle">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
              <tr>
                <th className="py-3 px-4">Auction #</th>
                <th className="py-3 px-4">Victorious Brand</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4">Winning Bid</th>
                <th className="py-3 px-4">Tenure Dates</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Certificate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] text-[#171717]">
              {records.length > 0 ? (
                records.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F8F8F8] transition-colors">
                    <td className="py-3.5 px-4 font-bold">AUC-00{r.ownership_number}</td>
                    <td className="py-3.5 px-4 font-sans font-bold">{r.brand_name}</td>
                    <td className="py-3.5 px-4 text-[#707070]">{r.country}</td>
                    <td className="py-3.5 px-4 font-bold text-[#15803D]">
                      <div>{formatUSDOnly(r.purchase_price)}</div>
                      {selectedCurrency !== 'USD' && (
                        <div className="text-[10px] text-[#707070] font-normal">
                          ≈ {formatAmount(r.purchase_price)}
                        </div>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-[#707070] text-[11px]">{formatDate(r.start_date)} — {formatDate(r.end_date)}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#F0FDF4] text-[#15803D] font-bold">
                        SETTLED
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/ownership/${r.id}`} className="text-[#D50100] hover:underline font-sans font-bold text-xs">
                        View Certificate →
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#707070]">
                    No concluded auctions yet. Genesis Auction #1 is currently live.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
