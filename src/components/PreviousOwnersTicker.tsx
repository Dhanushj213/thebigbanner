'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Award } from 'lucide-react';
import { useBanner } from '@/context/BannerContext';
import { formatCurrency, formatDate } from '@/utils/formatters';

export const PreviousOwnersTicker: React.FC = () => {
  const { owners, currency } = useBanner();

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-banner-red font-semibold uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>THE PERMANENT PUBLIC ARCHIVE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif text-white mt-1">
              Hall of Verified Banner Owners
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
              Every owner is permanently etched into THE BIG BANNER history. Once owned, your tenure becomes immutable digital legacy.
            </p>
          </div>

          <Link
            href="/ownership"
            className="text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all flex-shrink-0"
          >
            <span>Explore All {owners.length} Records</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Owners Horizontal Showcase Grid */}
        {owners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {owners.slice(0, 4).map((owner) => {
              const isActive = owner.status === 'active';
              return (
                <Link
                  key={owner.id}
                  href={`/ownership/${owner.id}`}
                  className="group glass-panel rounded-xl overflow-hidden border border-white/10 hover:border-banner-red/50 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Thumbnail Banner */}
                    <div className="relative aspect-[16/8] overflow-hidden bg-black">
                      <Image
                        src={owner.bannerDesktopUrl}
                        alt={owner.brandName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                      
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-black/70 text-white backdrop-blur border border-white/10">
                          #{owner.ownershipNumber}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-banner-red text-white flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            LIVE
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-xs text-white">
                        <span className="font-bold flex items-center gap-1">
                          <span>{owner.flagEmoji}</span>
                          <span className="truncate max-w-[130px]">{owner.brandName}</span>
                        </span>
                        <span className="font-mono text-emerald-400 font-bold text-[11px]">
                          {formatCurrency(owner.purchasePrice, currency)}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-4 space-y-2">
                      <p className="text-xs text-zinc-300 font-medium line-clamp-2">
                        {owner.tagline}
                      </p>
                      <p className="text-[11px] text-zinc-500 line-clamp-2">
                        {owner.description}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-3 bg-black/40 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{formatDate(owner.startDate)}</span>
                    <span className="text-banner-red group-hover:translate-x-0.5 transition-transform font-sans">
                      View Record →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="glass-panel rounded-xl p-10 text-center space-y-2 border border-white/10">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Inaugural Phase Active</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              No historical owners on record yet. Genesis Auction #1 will determine the very first sovereign owner in digital advertising history.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
