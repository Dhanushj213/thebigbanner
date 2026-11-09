'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Flame, ShieldCheck, Globe, ArrowRight, TrendingUp, Clock, Lock } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            GOVERNANCE & PLATFORM ARCHITECTURE
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#171717] uppercase tracking-tight font-sans">
            How THE BIG BANNER Works
          </h1>
          <p className="text-sm sm:text-base text-[#707070] max-w-xl mx-auto leading-relaxed">
            The mathematical, algorithmic, and governance principles behind the world’s single global digital advertising billboard.
          </p>
        </div>

        {/* 4 Pillars Deep-Dive */}
        <div className="space-y-6">
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <span className="text-5xl font-black font-mono text-[#D50100]">01</span>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h3 className="text-lg font-bold font-sans text-[#171717] uppercase">1. Discover — One Exclusive Space</h3>
              <p className="text-xs sm:text-sm text-[#707070] leading-relaxed">
                Conventional advertising platforms maximize ad inventory by packing dozens of banners, sidebars, and native popups onto every page. THE BIG BANNER features exactly ONE billboard and ONE owner at a time. The entire global audience sees only your message.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <span className="text-5xl font-black font-mono text-[#15803D]">02</span>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h3 className="text-lg font-bold font-sans text-[#171717] uppercase">2. Compete — The 10% Minimum Escalator</h3>
              <p className="text-xs sm:text-sm text-[#707070] leading-relaxed">
                Every subsequent ownership tenure must command at least 10% more than the previous successful transaction, strictly calculated in canonical USD:
              </p>
              <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs space-y-1 my-2">
                <div className="text-[#707070]">Previous Successful Settlement: <strong className="text-[#171717]">$100,000 USD</strong></div>
                <div className="text-[#707070]">Minimum Value Increase Rule: <strong className="text-[#15803D]">+10%</strong></div>
                <div className="text-[#D50100] font-bold">Next Minimum Qualifying Purchase Price: $110,000 USD</div>
                <div className="text-[10px] text-[#707070] pt-1 border-t border-[#EAEAEA] font-sans">
                  * All auction bids and escalator thresholds are authoritatively enforced in canonical USD on the backend. Visitors may view approximate converted estimates in EUR, GBP, INR, JPY, and other supported local currencies.
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <span className="text-5xl font-black font-mono text-[#D97706]">03</span>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h3 className="text-lg font-bold font-sans text-[#171717] uppercase">3. Own — Anti-Sniping & Escrow Settlement</h3>
              <p className="text-xs sm:text-sm text-[#707070] leading-relaxed">
                Any valid qualifying bid placed in the final 120 seconds automatically triggers a <strong>+2:00 minute extension</strong> on the auction clock. The winning bidder completes payment within 24 hours into an escrow account.
              </p>
            </div>
          </div>

          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-2 text-center md:text-left">
              <span className="text-5xl font-black font-mono text-[#171717]">04</span>
            </div>
            <div className="md:col-span-10 space-y-2">
              <h3 className="text-lg font-bold font-sans text-[#171717] uppercase">4. Be Seen — Broadcast & Permanent Archive</h3>
              <p className="text-xs sm:text-sm text-[#707070] leading-relaxed">
                Winning the auction grants the right to submit creative assets. Once editorial verification clears, your brand commands the global homepage for your full tenure. When completed, your brand is permanently immortalized in the public archive with a verifiable digital certificate.
              </p>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="text-center pt-4">
          <Link
            href="/auction"
            className="inline-flex items-center gap-2 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded font-mono shadow-sm"
          >
            <span>Enter Live Auction</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
