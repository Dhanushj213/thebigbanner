'use client';

import React from 'react';
import { Trophy, TrendingUp, Globe2, ShieldCheck, Flame, CreditCard } from 'lucide-react';
import { useBanner } from '@/context/BannerContext';
import { formatCurrency } from '@/utils/formatters';

export const StatsCounter: React.FC = () => {
  const { financialMetrics, currency } = useBanner();

  const stats = [
    {
      label: 'Total Owners in History',
      value: financialMetrics.totalOwnersCount.toString(),
      subtext: 'Exclusive verified tenures',
      icon: Trophy,
      highlight: false,
    },
    {
      label: 'Gross Transaction Value',
      value: formatCurrency(financialMetrics.grossTransactionValue, currency),
      subtext: '100% transparently reported',
      icon: CreditCard,
      highlight: false,
    },
    {
      label: 'Highest-Ever Sale',
      value: financialMetrics.highestSaleValue > 0 ? formatCurrency(financialMetrics.highestSaleValue, currency) : '$10,000 USD (Reserve)',
      subtext: financialMetrics.totalOwnersCount > 0 ? 'Verified Sovereign Tenure' : 'Awaiting Genesis Victory',
      icon: Flame,
      highlight: true,
    },
    {
      label: 'Countries Represented',
      value: `${financialMetrics.totalCountriesCount} Nations`,
      subtext: financialMetrics.totalCountriesCount > 0 ? 'Global distribution' : 'Worldwide eligible',
      icon: Globe2,
      highlight: false,
    },
  ];

  return (
    <section className="py-8 border-y border-white/10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-zinc-400 text-xs font-mono uppercase tracking-wider">
                  <Icon className={`w-4 h-4 ${s.highlight ? 'text-banner-red' : 'text-zinc-500'}`} />
                  <span>{s.label}</span>
                </div>
                <div className={`text-2xl sm:text-3xl font-black font-mono ${s.highlight ? 'text-banner-red' : 'text-white'}`}>
                  {s.value}
                </div>
                <div className="text-[11px] text-zinc-500 font-sans">
                  {s.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
