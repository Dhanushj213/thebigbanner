'use client';

import React, { useState, useEffect } from 'react';
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
  const { selectedCurrency, getDualPrice, formatUSDOnly, formatAmount } = useCurrency();

  // On mobile viewports, automatically default to mobile companion preview (3:4 ratio)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setDeviceView('mobile');
    }
  }, []);

  return (
    <section className="bg-[#FFFFFF] pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-24 border-b border-[#EAEAEA]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Section 2: Hero Editorial Header (Left-Aligned Full-Screen Spread) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-end mb-10 sm:mb-16">
          
          {/* Left Column: Monumental Left-Aligned Typography & CTAs (7-8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6 lg:space-y-7">

            {/* Monumental Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-[5.25rem] 2xl:text-[6.25rem] font-black tracking-tight text-[#171717] uppercase leading-[0.98] sm:leading-[0.95] font-sans break-words">
              ONE BANNER.<br />
              <span className="text-[#171717]">THE WHOLE WORLD.</span>
            </h1>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4">
              <a
                href="#live-billboard"
                className="bg-[#171717] hover:bg-black text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-8 py-3.5 sm:py-4 rounded-md transition-all shadow-sm flex items-center justify-center gap-2 group text-center"
              >
                <span>EXPLORE THE LIVE BANNER</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <Link
                href="/how-it-works"
                className="bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] text-xs sm:text-sm font-bold uppercase tracking-wider px-5 sm:px-8 py-3.5 sm:py-4 rounded-md border border-[#EAEAEA] hover:border-[#171717] transition-all text-center justify-center flex items-center"
              >
                HOW IT WORKS
              </Link>
            </div>
          </div>

          {/* Right Column: Live Telemetry & Institutional Metrics Card (4-5 cols) */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-xl p-4 sm:p-6 space-y-3.5 sm:space-y-4 shadow-subtle">
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
                    {formatAmount(banner ? banner.purchasePrice : (auction ? auction.openingPrice : 100), { showCode: true })}
                  </strong>
                  {selectedCurrency !== 'USD' && (
                    <span className="text-[9px] font-mono text-[#707070] block">
                      ≈ ${banner ? banner.purchasePrice : (auction ? auction.openingPrice : 100)} USD
                    </span>
                  )}
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
                <span className="text-[#707070] text-[11px]">
                  Rule: {selectedCurrency === 'USD' ? '+$5 USD Hike Minimum' : `+${formatAmount(5)} (~$5 USD) Hike Minimum`}
                </span>
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
            <div className="px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#F8F8F8] border-b border-[#EAEAEA] flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-[#D50100] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider flex-shrink-0">
                  {banner ? `OWNER #${banner.ownershipNumber}` : 'GENESIS SLOT #1'}
                </span>

                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[#171717] font-bold font-sans text-xs sm:text-sm truncate max-w-[150px] xs:max-w-xs sm:max-w-none">
                    {banner ? banner.brandName : 'Awaiting Sovereign Owner'}
                  </span>
                  {banner && (
                    <span className="text-[#707070] text-[11px] sm:text-xs font-mono">
                      • {banner.country}
                    </span>
                  )}
                </div>
              </div>

              {/* Viewport switch: Desktop / Mobile */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[#707070] text-[11px] hidden md:inline">Format Preview:</span>
                <div className="inline-flex bg-[#FFFFFF] border border-[#EAEAEA] p-0.5 rounded">
                  <button
                    type="button"
                    onClick={() => setDeviceView('desktop')}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] transition-colors ${
                      deviceView === 'desktop' ? 'bg-[#171717] text-white font-medium' : 'text-[#707070] hover:text-[#171717]'
                    }`}
                  >
                    <Monitor className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden xs:inline">Desktop</span>
                    <span>(16:6)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeviceView('mobile')}
                    className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded text-[10px] sm:text-[11px] transition-colors ${
                      deviceView === 'mobile' ? 'bg-[#171717] text-white font-medium' : 'text-[#707070] hover:text-[#171717]'
                    }`}
                  >
                    <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden xs:inline">Mobile</span>
                    <span>(3:4)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Creative Canvas */}
            <div className="relative bg-[#171717] flex items-center justify-center overflow-hidden">
              {banner ? (
                deviceView === 'desktop' ? (
                  <div className="relative w-full aspect-[16/6] min-h-[160px] sm:min-h-[340px] md:min-h-[440px] lg:min-h-[500px] xl:min-h-[560px]">
                    <Image
                      src={banner.desktopCreativeUrl}
                      alt={`${banner.brandName} Banner`}
                      fill
                      className="object-cover"
                      priority
                    />
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2.5 sm:gap-4 pointer-events-auto">
                      <div className="max-w-xl space-y-1 text-white">
                        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-widest text-[#FFFFFF] bg-[#D50100] px-1.5 sm:px-2 py-0.5 rounded font-bold">
                          EXCLUSIVE OWNER #{banner.ownershipNumber}
                        </span>
                        <h2 className="text-sm xs:text-base sm:text-2xl md:text-3xl font-black leading-tight text-white font-sans line-clamp-2">
                          {banner.tagline}
                        </h2>
                        {banner.description && (
                          <p className="hidden xs:block text-[11px] sm:text-sm text-zinc-300 line-clamp-1 sm:line-clamp-2">
                            {banner.description}
                          </p>
                        )}
                      </div>

                      <a
                        href={banner.destinationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] font-bold text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-3 rounded shadow-sm flex items-center justify-center gap-1.5 sm:gap-2 flex-shrink-0 transition-all text-center"
                      >
                        <span>Visit Official Site</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  /* Mobile Companion Canvas (True 3:4 aspect ratio) */
                  <div className="w-full flex justify-center bg-[#111111] md:py-8 md:px-4">
                    <div className="relative w-full md:max-w-xs md:rounded-2xl overflow-hidden md:border-2 md:border-[#2E2E2E] aspect-[3/4] max-h-[560px] bg-black">
                      <Image
                        src={banner.mobileCreativeUrl || banner.desktopCreativeUrl}
                        alt={`${banner.brandName} Mobile Banner`}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 space-y-2 pointer-events-auto text-white">
                        <span className="text-[10px] font-mono text-white bg-[#D50100] px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                          EXCLUSIVE OWNER #{banner.ownershipNumber}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold leading-tight font-sans">{banner.tagline}</h3>
                        {banner.description && (
                          <p className="text-xs text-zinc-300 line-clamp-2">
                            {banner.description}
                          </p>
                        )}
                        <a
                          href={banner.destinationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] font-bold text-xs py-2.5 rounded flex items-center justify-center gap-1.5 mt-2 transition-colors shadow-sm"
                        >
                          <span>Visit Official Site</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* Carefully designed First-Ownership Genesis Empty State */
                <div className="py-12 sm:py-20 px-4 sm:px-6 text-center text-white space-y-3.5 sm:space-y-4 max-w-xl mx-auto">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#D50100]">
                    <Sparkles className="w-5 h-5 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
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
            <div className="p-4 sm:p-6 bg-[#FFFFFF] border-t border-[#EAEAEA] grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-6 items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Current Owner
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171717] font-sans truncate block mt-0.5">
                  {banner ? banner.brandName : 'None (Genesis)'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Country
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171717] font-sans truncate block mt-0.5">
                  {banner ? banner.country : 'Worldwide'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Purchase Price
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#171717] font-mono block mt-0.5">
                  {banner
                    ? formatAmount(banner.purchasePrice, { showCode: true })
                    : `Reserve ${formatAmount(auction ? auction.openingPrice : 100, { showCode: true })}`}
                </span>
                {selectedCurrency !== 'USD' && (
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#707070] block">
                    ≈ ${banner ? banner.purchasePrice : (auction ? auction.openingPrice : 100)} USD
                  </span>
                )}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Ownership Period
                </span>
                <span className="text-[11px] sm:text-xs font-medium text-[#707070] font-mono block mt-0.5">
                  {banner ? formatDateRange(banner.startDate, banner.endDate) : '14 Days From Victory'}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#707070] block">
                  Status
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-[#15803D] font-mono block mt-0.5">
                  {banner ? 'Live & Broadcasting' : 'Open For First Bid'}
                </span>
              </div>

              <div className="col-span-2 sm:col-span-3 lg:col-span-1">
                <Link
                  href="/auction"
                  className="w-full bg-[#D50100] hover:bg-[#B80000] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded text-center block transition-all shadow-sm"
                >
                  COMPETE FOR NEXT SLOT
                </Link>
              </div>
            </div>

          </div>

          {/* Subtitle Statement Below The Banner */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-[#707070] text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl mx-auto">
              An exclusive advertising space where brands compete for global attention. One owner at a time.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
