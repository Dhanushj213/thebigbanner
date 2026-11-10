'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, Award, Image as ImageIcon, CreditCard, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { AuthoritativeAuction } from '@/lib/services';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function DashboardOverviewPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const [auction, setAuction] = useState<AuthoritativeAuction | null>(null);
  const [myBids, setMyBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch('/api/auction');
        if (res.ok) {
          const data = await res.json();
          setAuction(data.auction);
          let savedBidderId = null;
          try {
            const p = localStorage.getItem('tbb_bidder_profile');
            if (p) savedBidderId = JSON.parse(p).bidderId;
          } catch {}
          const userBids = savedBidderId
            ? (data.bids || []).filter((b: any) => b.bidder_id === savedBidderId)
            : (data.bids || []);
          setMyBids(userBids);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const hasLeadingBid = myBids.some((b) => b.status === 'valid');

  return (
    <div className="space-y-6">
      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#707070] block">Active Bids</span>
          <div className="text-2xl font-black font-mono text-[#171717]">
            {myBids.length} Bids
          </div>
          <p className="text-[11px] text-[#707070] font-sans">
            {hasLeadingBid ? (
              <span className="text-[#15803D] font-bold">Leading Active Auction</span>
            ) : myBids.length > 0 ? (
              <span className="text-[#D97706] font-bold">Currently Outbid</span>
            ) : (
              'No active bids placed'
            )}
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#707070] block">Won Historic Tenures</span>
          <div className="text-2xl font-black font-mono text-[#171717]">
            1 Tenure
          </div>
          <p className="text-[11px] text-[#707070] font-sans">
            Tenure #6 (Hyperion Motors)
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#707070] block">Creative Clearance</span>
          <div className="text-2xl font-black font-mono text-[#15803D]">
            Approved
          </div>
          <p className="text-[11px] text-[#707070] font-sans">
            All submitted assets verified
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
          <span className="text-[10px] font-mono uppercase text-[#707070] block">Escrow Account Standing</span>
          <div className="text-2xl font-black font-mono text-[#171717]">
            Level 2 Tier
          </div>
          <p className="text-[11px] text-[#707070] font-sans">
            Pre-cleared wire limit $1,000,000 USD
          </p>
        </div>
      </div>

      {/* Active Auction Participation Panel */}
      {auction && (
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D50100] animate-ping" />
              <span className="text-xs font-mono font-bold text-[#D50100] uppercase">
                AUCTION #{auction.auctionNumber} IN PROGRESS
              </span>
            </div>
            <h3 className="text-lg font-bold font-sans text-[#171717]">
              Current Highest Bid: {formatAmount(auction.currentHighestBid, { showCode: true })}
              {selectedCurrency !== 'USD' && (
                <span className="text-xs font-mono font-normal text-[#707070] ml-2">
                  (≈ ${auction.currentHighestBid.toLocaleString('en-US')} USD)
                </span>
              )}
            </h3>
            <p className="text-xs text-[#707070] font-sans">
              Min next qualifying bid: {formatAmount(auction.minimumNextBid, { showCode: true })} • Ends {new Date(auction.closingTimestampMs).toLocaleTimeString()}
            </p>
          </div>

          <Link
            href="/auction"
            className="px-5 py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider rounded font-mono shadow-sm flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Participate in Live Auction</span>
          </Link>
        </div>
      )}

      {/* Recent Bids Table */}
      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold font-sans text-[#171717] uppercase tracking-wider">
            Your Bids in Active Auction
          </h3>
          <Link href="/dashboard/bids" className="text-xs text-[#D50100] hover:underline font-mono">
            View All Bids →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
              <tr>
                <th className="py-2.5 px-4">Bid Amount</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4">Timestamp</th>
                <th className="py-2.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA]">
              {myBids.length > 0 ? (
                myBids.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F8F8F8]">
                    <td className="py-3 px-4 font-bold text-[#171717]">
                      <div>{formatAmount(b.amount, { showCode: true })}</div>
                      {selectedCurrency !== 'USD' && (
                        <div className="text-[10px] text-[#707070] font-normal">
                          ≈ ${b.amount.toLocaleString('en-US')} USD
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === 'valid'
                            ? 'bg-[#F0FDF4] text-[#15803D]'
                            : 'bg-[#FEF2F2] text-[#DC2626]'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#707070]">
                      {new Date(b.timestamp_ms || b.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {b.status === 'outbid' && (
                        <Link href="/auction" className="text-xs text-[#D50100] hover:underline font-sans font-bold">
                          Counter-Bid
                        </Link>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-[#707070]">
                    You have not placed any bids in the current auction.
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
