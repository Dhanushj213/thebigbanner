'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ArrowRight, Monitor, Smartphone, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { LiveBannerData, AuthoritativeAuction } from '@/lib/services';
import { formatCurrency, formatDateRange, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

interface LiveBannerHeroProps {
  banner: LiveBannerData | null;
  auction: AuthoritativeAuction | null;
}

export const LiveBannerHero: React.FC<LiveBannerHeroProps> = ({ banner, auction }) => {
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const { selectedCurrency, getDualPrice, formatUSDOnly } = useCurrency();

  return (
    <section className="bg-[#FFFFFF] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 border-b border-[#EAEAEA]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section 2: Hero Editorial Header (Left-Aligned Full-Screen Spread) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-end mb-12 sm:mb-16">
          
          {/* Left Column: Monumental Left-Aligned Typography & CTAs (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-5 sm:space-y-6 lg:space-y-7">

            {/* Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-[5.25rem] 2xl:text-[6.25rem] font-black tracking-tight text-[#171717] uppercase leading-[0.95] font-sans">
              ONE BANNER.<br />
              <span className="text-[#171717]">THE WHOLE WORLD.</span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-[#707070] text-base sm:text-lg lg:text-xl xl:text-2xl max-w-2xl leading-relaxed font-normal">
              An exclusive advertising space where brands compete for global attention. One owner at a time.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#live-billboard"
                className="bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all shadow-sm flex items-center gap-2 group"
              >
                <span>EXPLORE THE LIVE BANNER</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                href="/how-it-works"
                className="bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] text-xs sm:text-sm font-bold uppercase tracking-wider px-6 sm:px-8 py-3.5 sm:py-4 rounded-md border border-[#EAEAEA] hover:border-[#171717] transition-all"
              >
                HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* Right Column: Live Telemetry & Institutional Metrics Card (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-5 sm:p-6 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                    Live Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#FFF5F5] text-[#D50100] px-2 py-0.5 rounded font-bold border border-[#FECACA]">
                  {banner ? `Tenure #${banner.ownershipNumber}` : 'Inaugural Slot'}
                </span>
              </div>

              {/* Owner and Price Stats Grid */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#707070] uppercase block">Current Sovereign</span>
                  <strong className="text-sm font-bold font-sans text-[#171717] truncate block mt-0.5">
                    {banner ? banner.brandName : 'Genesis State'}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-[#707070] uppercase block">Clearing Price</span>
                  <strong className="text-sm font-bold font-mono text-[#15803D] block mt-0.5">
                    {banner ? formatUSDOnly(banner.purchasePrice, { showCode: true }) : '$10,000 USD'}
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-[#707070] uppercase block">Broadcast Share</span>
                  <strong className="text-sm font-bold text-[#171717] block mt-0.5">
                    100% Monopoly
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-[#707070] uppercase block">Next Auction</span>
                  <strong className="text-sm font-bold text-[#D50100] block mt-0.5">
                    {auction ? `Auction #${auction.auctionNumber}` : 'Slot #2 Ready'}
                  </strong>
                </div>
              </div>

              {/* Next Bid Escalation Bar */}
              <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between text-xs font-mono">
                <span className="text-[#707070] text-[11px]">Rule: $5 USD Hike Minimum</span>
                <Link
                  href="/auction"
                  className="text-[#D50100] hover:text-[#B80000] font-bold inline-flex items-center gap-1 group text-xs"
                >
                  <span>Compete Now</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Section 3: Live Banner Billboard — Centerpiece */}
        <div id="live-billboard" className="scroll-mt-24">
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-card overflow-hidden">
            
            {/* Top Billboard Meta Bar */}
            <div className="px-6 py-3.5 bg-[#F8F8F8] border-b border-[#EAEAEA] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="bg-[#D50100] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  {banner ? `OWNER #${banner.ownershipNumber}` : 'GENESIS SLOT #1'}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[#171717] font-bold font-sans text-sm">
                    {banner ? banner.brandName : 'Awaiting First Sovereign Owner'}
                  </span>
                  {banner && (
                    <span className="text-[#707070] text-xs font-mono">
                      • {banner.country}
                    </span>
                  )}
                </div>
              </div>

              {/* Viewport switch: Desktop / Mobile */}
              <div className="flex items-center gap-2">
                <span className="text-[#707070] text-[11px] hidden sm:inline">Format Preview:</span>
                <div className="inline-flex bg-[#FFFFFF] border border-[#EAEAEA] p-0.5 rounded">
                  <button
                    onClick={() => setDeviceView('desktop')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
                      deviceView === 'desktop' ? 'bg-[#171717] text-white font-medium' : 'text-[#707070] hover:text-[#171717]'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop (16:6)</span>
                  </button>
                  <button
                    onClick={() => setDeviceView('mobile')}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] transition-colors ${
                      deviceView === 'mobile' ? 'bg-[#171717] text-white font-medium' : 'text-[#707070] hover:text-[#171717]'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile (3:4)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Creative Canvas */}
            <div className="relative bg-[#171717] flex items-center justify-center overflow-hidden">
              {banner ? (
                deviceView === 'desktop' ? (
                  <div className="relative w-full aspect-[16/6] min-h-[300px] sm:min-h-[380px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[560px]">
                    <Image
                      src={banner.desktopCreativeUrl}
                      alt={`${banner.brandName} Banner`}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pointer-events-auto">
                      <div className="max-w-xl space-y-1 text-white">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFFFFF] bg-[#D50100] px-2 py-0.5 rounded font-bold">
                          CURRENT EXCLUSIVE OWNER #{banner.ownershipNumber}
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black leading-tight text-white font-sans">
                          {banner.tagline}
                        </h2>
                        {banner.description && (
                          <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2">
                            {banner.description}
                          </p>
                        )}
                      </div>

                      <a
                        href={banner.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] font-bold text-xs px-5 py-3 rounded shadow-sm flex items-center gap-2 flex-shrink-0 transition-all"
                      >
                        <span>Visit Official Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 px-4 flex justify-center w-full bg-[#111111]">
                    <div className="relative w-full max-w-xs rounded-2xl overflow-hidden border-2 border-[#2E2E2E] aspect-[9/16] max-h-[460px] bg-black">
                      <Image
                        src={banner.mobileCreativeUrl}
                        alt={`${banner.brandName} Mobile Banner`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
                      <div className="absolute bottom-5 left-4 right-4 space-y-2 pointer-events-auto text-white">
                        <span className="text-[9px] font-mono text-white bg-[#D50100] px-1.5 py-0.2 rounded font-bold">
                          {banner.brandName}
                        </span>
                        <h3 className="text-sm font-bold leading-tight">{banner.tagline}</h3>
                        <a
                          href={banner.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#FFFFFF] text-[#171717] font-bold text-xs py-2 rounded flex items-center justify-center gap-1.5 mt-2"
                        >
                          <span>Visit Brand</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* Carefully designed First-Ownership Genesis Empty State */
                <div className="py-20 px-6 text-center text-white space-y-4 max-w-xl mx-auto">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#D50100]">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold font-serif text-white">
                    Inaugural Slot Awaiting Owner #1
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    The single advertising space is currently uncontested. Participate in Genesis Auction #1 to permanently claim the very first ownership slot in digital advertising history.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/auction"
                      className="inline-block bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded transition-all"
                    >
                      Enter Genesis Auction
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Compact Information Panel Below The Billboard */}
            <div className="p-6 bg-[#FFFFFF] border-t border-[#EAEAEA] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Current Owner
                </span>
                <span className="text-sm font-bold text-[#171717] font-sans truncate block mt-0.5">
                  {banner ? banner.brandName : 'None (Genesis)'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Country
                </span>
                <span className="text-sm font-bold text-[#171717] font-sans truncate block mt-0.5">
                  {banner ? banner.country : 'Worldwide'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Purchase Price
                </span>
                <span className="text-sm font-bold text-[#171717] font-mono block mt-0.5">
                  {banner ? formatUSDOnly(banner.purchasePrice, { showCode: true }) : 'Reserve $10,000 USD'}
                </span>
                {banner && selectedCurrency !== 'USD' && (
                  <span className="text-[10px] font-mono text-[#707070] block">
                    {getDualPrice(banner.purchasePrice).localEstimate}
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Ownership Period
                </span>
                <span className="text-xs font-medium text-[#707070] font-mono block mt-0.5">
                  {banner ? formatDateRange(banner.startDate, banner.endDate) : '14 Days From Victory'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Status
                </span>
                <span className="text-xs font-bold text-[#15803D] font-mono block mt-0.5">
                  {banner ? 'Live & Broadcasting' : 'Open For First Bid'}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Link
                  href="/auction"
                  className="w-full bg-[#D50100] hover:bg-[#B80000] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded text-center block transition-all shadow-sm"
                >
                  COMPETE FOR NEXT SLOT
                </Link>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
