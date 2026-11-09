'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function DashboardBidsPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const [bids, setBids] = useState<any[]>([]);

  useEffect(() => {
    async function fetchBids() {
      try {
        const res = await fetch('/api/auction');
        if (res.ok) {
          const data = await res.json();
          // Filter to user bids
          const userBids = (data.bids || []).filter((b: any) => b.bidder_id === 'usr_alex');
          setBids(userBids);
        }
      } catch {
        // ignore
      }
    }
    fetchBids();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-sans text-[#171717]">Your Auction Bids</h2>
          <p className="text-xs text-[#707070] mt-0.5">Authoritative status of your bids.</p>
        </div>
        <Link
          href="/auction"
          className="px-4 py-2 bg-[#D50100] text-white text-xs font-bold font-mono uppercase tracking-wider rounded shadow-sm"
        >
          Go To Live Auction
        </Link>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
            <tr>
              <th className="py-3 px-4">Bid Amount</th>
              <th className="py-3 px-4">Auction</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EAEAEA]">
            {bids.length > 0 ? (
              bids.map((b) => (
                <tr key={b.id} className="hover:bg-[#F8F8F8]">
                  <td className="py-3.5 px-4 font-bold text-[#171717]">
                    <div>{formatUSDOnly(b.amount)}</div>
                    {selectedCurrency !== 'USD' && (
                      <div className="text-[10px] text-[#707070] font-normal">
                        ≈ {formatAmount(b.amount)}
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">Auction #9</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        b.status === 'valid' ? 'bg-[#F0FDF4] text-[#15803D]' : 'bg-[#FEF2F2] text-[#DC2626]'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[#707070]">
                    {new Date(b.timestamp_ms || b.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    {b.status === 'outbid' && (
                      <Link href="/auction" className="text-xs text-[#D50100] hover:underline font-bold font-sans">
                        Outbid — Counter
                      </Link>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#707070]">
                  No bids recorded for your account yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
