'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

interface OwnershipHistoryPreviewProps {
  owners: any[];
}

export const OwnershipHistoryPreview: React.FC<OwnershipHistoryPreviewProps> = ({ owners }) => {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  return (
    <section className="bg-[#FFFFFF] py-16 border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D50100] uppercase font-bold tracking-wider mb-1">
              <Award className="w-3.5 h-3.5" />
              <span>PERMANENT PUBLIC RECORD</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#171717] uppercase tracking-tight font-sans">
              Recent Sovereign Banner Owners
            </h2>
            <p className="text-xs sm:text-sm text-[#707070] mt-1">
              Every successful purchase enters the immutable ownership archive.
            </p>
          </div>

          <Link
            href="/ownership"
            className="inline-flex items-center gap-1.5 text-xs font-bold font-sans uppercase tracking-wider text-[#171717] hover:text-[#D50100] flex-shrink-0"
          >
            <span>EXPLORE ALL OWNERS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Dynamic Owners Grid or Genesis Empty State */}
        {owners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {owners.slice(0, 4).map((o) => (
              <Link
                key={o.id}
                href={`/ownership/${o.id}`}
                className="group bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden hover:border-[#171717] transition-all flex flex-col justify-between shadow-subtle"
              >
                <div>
                  {/* Creative Preview */}
                  <div className="relative aspect-[16/8] bg-[#F5F5F5] overflow-hidden">
                    <Image
                      src={o.desktop_creative_url || '/thebigbannerlogo3.png'}
                      alt={o.brand_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#FFFFFF] text-[#171717] font-mono text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm">
                      #{o.ownership_number}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-[#171717] font-sans truncate">
                        {o.brand_name}
                      </span>
                      <span className="text-[10px] font-mono text-[#707070]">
                        {o.country}
                      </span>
                    </div>

                    <div className="text-xs font-bold text-[#15803D] font-mono">
                      <span>{formatUSDOnly(o.purchase_price, { showCode: true })}</span>
                      {selectedCurrency !== 'USD' && (
                        <span className="text-[10px] text-[#707070] font-normal block">
                          ≈ {formatAmount(o.purchase_price, { showCode: true })} (Est.)
                        </span>
                      )}
                    </div>

                    <div className="text-[11px] text-[#707070] font-mono">
                      {formatDate(o.start_date)} — {formatDate(o.end_date)}
                    </div>
                  </div>
                </div>

                <div className="px-4 py-2.5 bg-[#F8F8F8] border-t border-[#EAEAEA] text-[11px] font-mono text-[#707070] flex items-center justify-between">
                  <span>Verified Tenure</span>
                  <span className="text-[#171717] group-hover:text-[#D50100] font-sans font-bold">
                    View Record →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* Real Database Empty State */
          <div className="bg-[#F8F8F8] border border-dashed border-[#EAEAEA] rounded-lg p-12 text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#EAEAEA] flex items-center justify-center mx-auto text-[#D50100]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold font-sans text-[#171717]">
              First Ownership Has Not Yet Occurred
            </h3>
            <p className="text-xs text-[#707070] max-w-md mx-auto">
              THE BIG BANNER is currently in its inaugural Genesis phase. The winning participant of Genesis Auction #1 will permanently hold Ownership Record #1.
            </p>
            <div className="pt-1">
              <Link
                href="/auction"
                className="text-xs font-bold text-[#D50100] hover:underline uppercase tracking-wider"
              >
                Participate in Genesis Auction →
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
