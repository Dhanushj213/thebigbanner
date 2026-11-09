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
    <section className="bg-[#FFFFFF] pt-12 pb-16 border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 2: Hero Editorial Header */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#171717]">
            <span className="w-2 h-2 rounded-full bg-[#D50100]" />
            <span className="font-semibold uppercase tracking-wider">ONE BANNER. ONE OWNER. GLOBAL ATTENTION.</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#171717] uppercase leading-[1.08] font-sans">
            ONE BANNER.<br />THE WHOLE WORLD.
          </h1>

          <p className="text-[#707070] text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
            An exclusive advertising space where brands compete for global attention. One owner at a time.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#live-billboard"
              className="bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-md transition-all shadow-sm"
            >
              EXPLORE THE LIVE BANNER
            </a>

            <Link
              href="/how-it-works"
              className="bg-[#FFFFFF] hover:bg-[#F8F8F8] text-[#171717] text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-md border border-[#EAEAEA] transition-all"
            >
              HOW IT WORKS
            </Link>
          </div>

          {/* Concise live ownership indicator */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-[#707070] font-mono border-t border-[#EAEAEA] max-w-2xl mx-auto">
            <div>
              <span>Current Owner: </span>
              <strong className="text-[#171717]">
                {banner ? banner.brandName : 'Genesis State (No Active Owner)'}
              </strong>
            </div>
            <div>
              <span>Status: </span>
              <strong className="text-[#D50100]">
                {banner ? 'Live Global Placement' : 'Inaugural Opening'}
              </strong>
            </div>
            {auction && (
              <div>
                <span>Next Auction: </span>
                <strong className="text-[#171717]">
                  Auction #{auction.auctionNumber} {auction.status.toUpperCase()}
                </strong>
              </div>
            )}
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
                  <div className="relative w-full aspect-[16/6] max-h-[500px] min-h-[320px]">
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
