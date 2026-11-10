'use client';

import React, { useState } from 'react';
import { TrendingUp, Award } from 'lucide-react';
import { useBanner } from '@/context/BannerContext';
import { useCurrency } from '@/context/CurrencyContext';
import { formatDate } from '@/utils/formatters';

export const FinancialChart: React.FC = () => {
  const { owners, auction } = useBanner();
  const { formatAmount } = useCurrency();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Combine chronological owners + current live auction bid
  const dataPoints = [
    ...[...owners].reverse().map((o) => ({
      label: `#${o.ownershipNumber}`,
      brand: o.brandName,
      price: o.purchasePrice,
      date: formatDate(o.transactionDate),
      isAuction: false,
    })),
    {
      label: `#${auction.targetOwnershipNumber} (Live)`,
      brand: `${auction.highestBidderCompany} (Lead Bid)`,
      price: auction.currentHighestBid,
      date: 'Live Auction',
      isAuction: true,
    },
  ];

  const maxPrice = Math.max(...dataPoints.map((d) => d.price)) * 1.15;
  const minPrice = 80000;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>VALUE ACCRETION ENGINE (+$5 MINIMUM HIKE PER BID)</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Historical Ownership Price Progression
          </h3>
          <p className="text-xs text-zinc-400 mt-0.5">
            Demonstrating uninterrupted value appreciation across consecutive banner tenures.
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-mono text-zinc-500 uppercase block">Total Appreciation</span>
          <span className="text-xl font-mono font-black text-emerald-400">
            +{Math.round(((auction.currentHighestBid - 100000) / 100000) * 100)}%
          </span>
          <span className="text-[10px] text-zinc-500 block">Genesis ($100k) → Current ($365k)</span>
        </div>
      </div>

      {/* Interactive Bar Chart Visualization */}
      <div className="relative pt-8 pb-4">
        {/* Hover info tooltip */}
        {hoveredIndex !== null && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/90 border border-white/20 px-3 py-1.5 rounded-lg text-xs font-mono text-white shadow-xl flex items-center gap-2 z-20">
            <span className="text-banner-red font-bold">{dataPoints[hoveredIndex].brand}</span>
            <span className="text-zinc-400">|</span>
            <span className="text-emerald-400 font-bold">{formatAmount(dataPoints[hoveredIndex].price, { showCode: true })}</span>
            <span className="text-zinc-500 text-[10px]">({dataPoints[hoveredIndex].date})</span>
          </div>
        )}

        <div className="h-64 flex items-end justify-between gap-2 sm:gap-4 pt-4 border-b border-white/10 px-2">
          {dataPoints.map((item, idx) => {
            const heightPercent = Math.round(((item.price - minPrice) / (maxPrice - minPrice)) * 100);
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Bar Value Header */}
                <div
                  className={`text-[10px] font-mono mb-1 transition-all text-center whitespace-nowrap ${
                    isHovered ? 'text-white font-bold scale-110' : 'text-zinc-500 group-hover:text-zinc-300'
                  }`}
                >
                  {formatAmount(item.price, { showCode: true })}
                </div>

                {/* The Bar */}
                <div
                  style={{ height: `${Math.max(12, heightPercent)}%` }}
                  className={`w-full max-w-[48px] rounded-t-lg transition-all duration-300 ${
                    item.isAuction
                      ? 'bg-gradient-to-t from-banner-red/80 to-amber-400 animate-pulse'
                      : isHovered
                      ? 'bg-gradient-to-t from-banner-red to-rose-400 shadow-lg shadow-banner-red/30'
                      : 'bg-white/15 group-hover:bg-white/30'
                  }`}
                />

                {/* Bottom X-axis label */}
                <div className="mt-3 text-center">
                  <span
                    className={`text-[11px] font-mono block ${
                      item.isAuction ? 'text-banner-red font-bold' : 'text-zinc-400'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-white/20" />
            <span>Completed Purchase</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-gradient-to-r from-banner-red to-amber-400" />
            <span>Active Live Auction Bid</span>
          </div>
        </div>
        <span>Rule: Min next sale ≥ Previous sale × 1.10</span>
      </div>
    </div>
  );
};
