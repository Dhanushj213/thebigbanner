'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, ShieldCheck, Flame, Info, CheckCircle2 } from 'lucide-react';
import { AuthoritativeAuction } from '@/lib/services';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

interface AuctionOverviewSectionProps {
  initialAuction: AuthoritativeAuction | null;
}

export const AuctionOverviewSection: React.FC<AuctionOverviewSectionProps> = ({ initialAuction }) => {
  const [auction, setAuction] = useState<AuthoritativeAuction | null>(initialAuction);
  const [remainingSecs, setRemainingSecs] = useState<number>(initialAuction?.remainingSeconds || 0);
  const { selectedCurrency, getDualPrice, formatUSDOnly } = useCurrency();

  // Authoritative countdown derived from backend closingTimestampMs
  useEffect(() => {
    if (!auction) return;
    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((auction.closingTimestampMs - now) / 1000));
      setRemainingSecs(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [auction?.closingTimestampMs]);

  // Periodic poll to ensure live bid sync from backend
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/auction');
        if (res.ok) {
          const data = await res.json();
          if (data.auction) {
            setAuction(data.auction);
          }
        }
      } catch {
        // network poll error ignore
      }
    }, 4000);

    return () => clearInterval(pollInterval);
  }, []);

  if (!auction) return null;

  const days = Math.floor(remainingSecs / (3600 * 24));
  const hours = Math.floor((remainingSecs % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingSecs % 3600) / 60);
  const seconds = remainingSecs % 60;

  return (
    <section className="bg-[#F8F8F8] py-16 border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D50100] uppercase font-bold tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-[#D50100] animate-ping" />
              <span>LIVE AUCTION OVERVIEW</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight font-sans">
              Auction #{auction.auctionNumber} • Ownership Slot #{auction.targetOwnershipNumber}
            </h2>
            <p className="text-xs sm:text-sm text-[#707070] mt-1">
              Participate in the live bidding round to claim the next exclusive 14-day tenure.
            </p>
          </div>

          <Link
            href="/auction"
            className="inline-flex items-center gap-2 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-md transition-all shadow-sm flex-shrink-0"
          >
            <span>ENTER AUCTION ARENA</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* The Auction Data Grid */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 sm:p-8 shadow-subtle grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Metric 1: Current Highest Valid Bid */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase text-[#707070] block">
              Current Highest Bid
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#171717] font-mono">
              {formatUSDOnly(auction.currentHighestBid, { showCode: true })}
            </div>
            {selectedCurrency !== 'USD' && (
              <div className="text-[11px] font-mono text-[#D50100] font-semibold">
                {getDualPrice(auction.currentHighestBid).localEstimate}
              </div>
            )}
            <p className="text-xs text-[#707070] font-sans">
              {auction.highestBidderCompany ? (
                <>Leading: <strong className="text-[#171717]">{auction.highestBidderCompany}</strong> ({auction.highestBidderCountry})</>
              ) : (
                'Opening Reserve Price'
              )}
            </p>
          </div>

          {/* Metric 2: Minimum Qualifying Next Bid */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#707070] block">
                Minimum Next Bid
              </span>
              <span className="text-[9px] font-mono bg-[#F5F5F5] text-[#15803D] border border-[#EAEAEA] px-1.5 py-0.2 rounded font-bold">
                +10% ESCALATOR
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-[#15803D] font-mono">
              {formatUSDOnly(auction.minimumNextBid, { showCode: true })}
            </div>
            {selectedCurrency !== 'USD' && (
              <div className="text-[11px] font-mono text-[#15803D] font-semibold">
                {getDualPrice(auction.minimumNextBid).localEstimate}
              </div>
            )}
            <p className="text-xs text-[#707070] font-sans">
              Previous Sale: {formatUSDOnly(auction.previousWinningPrice, { showCode: true })}
            </p>
          </div>

          {/* Metric 3: Time Remaining */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase text-[#707070] block">
                Time Remaining
              </span>
              {auction.extensionsCount > 0 && (
                <span className="text-[9px] font-mono text-[#D97706] font-bold">
                  +{auction.extensionsCount * 2}m Anti-Sniping
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-black text-[#171717] flex items-center gap-1">
              <span>{String(days).padStart(2, '0')}d</span>
              <span className="text-[#EAEAEA]">:</span>
              <span>{String(hours).padStart(2, '0')}h</span>
              <span className="text-[#EAEAEA]">:</span>
              <span>{String(minutes).padStart(2, '0')}m</span>
              <span className="text-[#EAEAEA]">:</span>
              <span className="text-[#D50100]">{String(seconds).padStart(2, '0')}s</span>
            </div>
            <p className="text-xs text-[#707070] font-mono">
              Closing: {new Date(auction.closingTimestampMs).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </p>
          </div>

          {/* Metric 4: Total Valid Bids & Status */}
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase text-[#707070] block">
              Auction Activity
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#171717] font-mono">
              {auction.totalBidsCount} Valid Bids
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#15803D]" />
              <span className="text-xs text-[#171717] font-mono capitalize">
                Status: {auction.status}
              </span>
            </div>
          </div>

        </div>

        {/* Clear Explanation of Auction Rules */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 text-xs text-[#707070] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <strong className="text-[#171717] font-sans block">1. Authoritative +10% Rule</strong>
            <p className="leading-relaxed">
              Every ownership increases value. The opening qualification floor is always at least 10% higher than the preceding sale.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#171717] font-sans block">2. Anti-Sniping Protection</strong>
            <p className="leading-relaxed">
              Bids submitted with under 2 minutes remaining extend the timer by +2:00 minutes. Fair competition is always preserved.
            </p>
          </div>
          <div className="space-y-1">
            <strong className="text-[#171717] font-sans block">3. 24-Hour Settlement</strong>
            <p className="leading-relaxed">
              The winning bidder completes escrow settlement within 24 hours, submits creative, and commences their global tenure.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
