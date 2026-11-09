'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function AboutPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="flex justify-center">
            <Logo size="lg" withText={false} />
          </div>
          <div className="text-xs font-mono uppercase text-[#707070] tracking-widest font-bold">
            THE PHILOSOPHY
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Restoring Digital Scarcity
          </h1>
          <p className="text-base text-[#707070] max-w-xl mx-auto leading-relaxed">
            The internet was supposed to democratize attention. Instead, it industrialized noise.
          </p>
        </div>

        {/* Text Essay */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 sm:p-12 space-y-6 text-sm text-[#171717] leading-relaxed font-sans shadow-subtle">
          <h2 className="text-xl font-bold uppercase tracking-tight">The Central Concept</h2>
          <p className="text-base font-bold text-[#D50100] font-mono">
            ONE BANNER. ONE OWNER. GLOBAL ATTENTION.
          </p>
          <p className="text-[#707070]">
            In traditional digital advertising, publishers monetize by maximizing ad density: header banners, sidebars, sticky footers, interstitial videos, and automated clickbait grids. Advertisers fight for split-second glances while users install ad blockers to escape the chaos.
          </p>
          <p className="text-[#707070]">
            THE BIG BANNER replaces mass commodity impressions with extreme digital real estate exclusivity. There is only one billboard. There is only one owner. And every qualifying bid advances the price floor by at least $5 USD.
          </p>
          <p className="text-[#707070]">
            Just like iconic physical real estate—the digital billboard over Times Square, the center ring at Monaco, or the front cover of a historic publication—THE BIG BANNER is an emblem of prestige, capital discipline, and unapologetic ambition.
          </p>
        </div>

        {/* 3 Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg space-y-2 shadow-subtle">
            <span className="text-[#D50100] font-bold text-sm block">100% Share of Voice</span>
            <p className="text-[#707070] font-sans">
              Zero ad rotation. Zero competitor banners on the page. Undivided attention from a worldwide audience.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg space-y-2 shadow-subtle">
            <span className="text-[#15803D] font-bold text-sm block">+$5 Bid Hike Rule</span>
            <p className="text-[#707070] font-sans">
              Every qualifying bid advances by at least $5 USD. Your bid establishes the floor for future competitors.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg space-y-2 shadow-subtle">
            <span className="text-[#171717] font-bold text-sm block">Permanent History</span>
            <p className="text-[#707070] font-sans">
              Every owner receives an immutable cryptographic certificate and permanent enshrinement in the public record.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
