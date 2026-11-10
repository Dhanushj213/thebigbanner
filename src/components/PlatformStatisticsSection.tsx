'use client';

import React from 'react';
import { AuthoritativeStats } from '@/lib/services';
import { formatCurrency } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

interface PlatformStatisticsSectionProps {
  stats: AuthoritativeStats;
}

export const PlatformStatisticsSection: React.FC<PlatformStatisticsSectionProps> = ({ stats }) => {
  const { selectedCurrency, formatUSDOnly, formatAmount, getDualPrice } = useCurrency();

  const statItems = [
    {
      label: 'Total Successful Ownerships',
      value: stats.totalSuccessfulOwnerships > 0 ? stats.totalSuccessfulOwnerships.toString() : '0',
      estimate: null,
      subtext: stats.totalSuccessfulOwnerships > 0 ? 'Verified historical tenures' : 'Awaiting first auction closure',
    },
    {
      label: 'Gross Transaction Value',
      value: stats.grossTransactionValue > 0 ? formatUSDOnly(stats.grossTransactionValue, { showCode: true }) : '$0 USD',
      estimate: stats.grossTransactionValue > 0 && selectedCurrency !== 'USD' ? getDualPrice(stats.grossTransactionValue).localEstimate : null,
      subtext: '100% verified collections (USD)',
    },
    {
      label: 'Highest Successful Purchase',
      value: stats.highestSuccessfulPurchase > 0 ? formatUSDOnly(stats.highestSuccessfulPurchase, { showCode: true }) : 'N/A (Genesis)',
      estimate: stats.highestSuccessfulPurchase > 0 && selectedCurrency !== 'USD' ? getDualPrice(stats.highestSuccessfulPurchase).localEstimate : null,
      subtext: 'Single highest clearing price (USD)',
    },
    {
      label: 'Represented Countries',
      value: stats.representedCountriesCount > 0 ? `${stats.representedCountriesCount} Nations` : 'Global Reach',
      estimate: null,
      subtext: 'Geographic distribution',
    },
    {
      label: 'Registered Advertisers',
      value: stats.totalAdvertisersCount.toString(),
      estimate: null,
      subtext: 'Verified business profiles',
    },
  ];

  return (
    <section className="bg-[#F8F8F8] py-10 sm:py-20 border-b border-[#EAEAEA]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 space-y-6 sm:space-y-8">
        
        <div className="max-w-2xl">
          <div className="text-[11px] sm:text-xs font-mono uppercase text-[#707070] font-bold tracking-wider mb-1">
            VERIFIED PLATFORM METRICS
          </div>
          <h2 className="text-xl sm:text-3xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Authoritative Ledger Statistics
          </h2>
          <p className="text-xs text-[#707070] mt-1">
            Computed strictly from verified transactions and authenticated accounts on record.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className={`bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-3.5 sm:p-5 shadow-subtle space-y-1 ${
                idx === 4 ? 'col-span-2 lg:col-span-1' : ''
              }`}
            >
              <span className="text-[10px] font-mono uppercase text-[#707070] block tracking-wider">
                {item.label}
              </span>
              <div className="text-lg xs:text-xl sm:text-2xl font-black text-[#171717] font-mono">
                {item.value}
              </div>
              {item.estimate && (
                <div className="text-[10px] font-mono text-[#D50100] font-semibold">
                  {item.estimate}
                </div>
              )}
              <p className="text-[10px] sm:text-[11px] text-[#707070] font-sans">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
