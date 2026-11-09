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
    <section className="bg-[#F8F8F8] py-16 sm:py-20 border-b border-[#EAEAEA]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 space-y-8">
        
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

        {/* The Auction Data Grid (4 Modular Distinct Cards with Zero Overlaps) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
          
          {/* Card 1: Current Highest Valid Bid */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-5 sm:p-6 shadow-subtle hover:border-[#171717] transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAEAEA]">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#707070] font-bold tracking-wider">
                Current Highest Bid
              </span>
              <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#171717] font-mono tracking-tight truncate">
                {formatUSDOnly(auction.currentHighestBid, { showCode: true })}
              </div>
              {selectedCurrency !== 'USD' && (
                <div className="text-[11px] font-mono text-[#D50100] font-semibold truncate">
                  {getDualPrice(auction.currentHighestBid).localEstimate}
                </div>
              )}
            </div>

            <div className="text-xs text-[#707070] font-sans truncate pt-1 border-t border-[#F5F5F5]">
              {auction.highestBidderCompany ? (
                <>Leading: <strong className="text-[#171717]">{auction.highestBidderCompany}</strong> ({auction.highestBidderCountry})</>
              ) : (
                'Opening Reserve Price'
              )}
            </div>
          </div>

          {/* Card 2: Minimum Qualifying Next Bid */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-5 sm:p-6 shadow-subtle hover:border-[#171717] transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAEAEA]">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#707070] font-bold tracking-wider">
                Minimum Next Bid
              </span>
              <span className="text-[9px] font-mono bg-[#ECFDF5] text-[#15803D] border border-[#A7F3D0] px-2 py-0.5 rounded font-bold">
                +$5 HIKE RULE
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#15803D] font-mono tracking-tight truncate">
                {formatUSDOnly(auction.minimumNextBid, { showCode: true })}
              </div>
              {selectedCurrency !== 'USD' && (
                <div className="text-[11px] font-mono text-[#15803D] font-semibold truncate">
                  {getDualPrice(auction.minimumNextBid).localEstimate}
                </div>
              )}
            </div>

            <div className="text-xs text-[#707070] font-sans truncate pt-1 border-t border-[#F5F5F5]">
              Previous Winning Bid: {formatUSDOnly(auction.previousWinningPrice, { showCode: true })}
            </div>
          </div>

          {/* Card 3: Time Remaining (4-Cell Structured Urgency Timer) */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-5 sm:p-6 shadow-subtle hover:border-[#171717] transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAEAEA]">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#707070] font-bold tracking-wider">
                Time Remaining
              </span>
              {auction.extensionsCount > 0 ? (
                <span className="text-[9px] font-mono text-[#D97706] font-bold">
                  +{auction.extensionsCount * 2}m Anti-Sniping
                </span>
              ) : (
                <span className="text-[9px] font-mono text-[#707070]">
                  Anti-Sniping Active
                </span>
              )}
            </div>

            {/* 4-Cell Precision Countdown Display */}
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-md py-2 px-1 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-[#171717] leading-none">
                  {String(days).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-mono uppercase text-[#707070] mt-1">Days</div>
              </div>
              <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-md py-2 px-1 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-[#171717] leading-none">
                  {String(hours).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-mono uppercase text-[#707070] mt-1">Hours</div>
              </div>
              <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-md py-2 px-1 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-[#171717] leading-none">
                  {String(minutes).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-mono uppercase text-[#707070] mt-1">Mins</div>
              </div>
              <div className="bg-[#FFF5F5] border border-[#FECACA] rounded-md py-2 px-1 text-center">
                <div className="text-base sm:text-lg font-black font-mono text-[#D50100] leading-none animate-pulse">
                  {String(seconds).padStart(2, '0')}
                </div>
                <div className="text-[9px] font-mono uppercase text-[#D50100] font-bold mt-1">Secs</div>
              </div>
            </div>

            <div className="text-xs text-[#707070] font-mono truncate pt-1 border-t border-[#F5F5F5]">
              Closing: {new Date(auction.closingTimestampMs).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
            </div>
          </div>

          {/* Card 4: Total Valid Bids & Status */}
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-5 sm:p-6 shadow-subtle hover:border-[#171717] transition-all flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-[#EAEAEA]">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase text-[#707070] font-bold tracking-wider">
                Auction Activity
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#15803D] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                Live
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-black text-[#171717] font-mono tracking-tight truncate">
                {auction.totalBidsCount} Valid Bids
              </div>
              <div className="text-[11px] font-mono text-[#707070]">
                Anti-Sniping Engine Guarded
              </div>
            </div>

            <div className="text-xs text-[#707070] font-mono truncate pt-1 border-t border-[#F5F5F5]">
              Authoritative Consensus State
            </div>
          </div>

        </div>

        {/* Clear Explanation of Auction Rules */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl p-6 sm:p-7 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 shadow-subtle">
          <div className="space-y-1.5 border-l-2 border-[#D50100] pl-4">
            <div className="text-[10px] font-mono uppercase text-[#D50100] font-bold tracking-wider">
              Rule 01
            </div>
            <strong className="text-sm font-bold text-[#171717] font-sans block">
              Authoritative $5 Hike Rule
            </strong>
            <p className="text-xs text-[#707070] leading-relaxed">
              Every qualifying bid must advance the price by at least $5 USD. Each new qualifying bid establishes the new minimum qualification floor.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-[#171717] pl-4">
            <div className="text-[10px] font-mono uppercase text-[#707070] font-bold tracking-wider">
              Rule 02
            </div>
            <strong className="text-sm font-bold text-[#171717] font-sans block">
              Anti-Sniping Dynamic Clock
            </strong>
            <p className="text-xs text-[#707070] leading-relaxed">
              Bids submitted with under 120 seconds remaining automatically extend the closing countdown by +120 seconds. Fair competition is preserved.
            </p>
          </div>

          <div className="space-y-1.5 border-l-2 border-[#15803D] pl-4">
            <div className="text-[10px] font-mono uppercase text-[#15803D] font-bold tracking-wider">
              Rule 03
            </div>
            <strong className="text-sm font-bold text-[#171717] font-sans block">
              24-Hour Settlement
            </strong>
            <p className="text-xs text-[#707070] leading-relaxed">
              The winning bidder completes escrow settlement within 24 hours, submits creative assets for compliance, and commences their global tenure.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
