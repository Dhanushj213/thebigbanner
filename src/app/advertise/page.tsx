'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AdvertisePage() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            FOR BRANDS, FOUNDERS & CREATORS
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Why Own <span className="text-[#D50100]">THE BIG BANNER</span>?
          </h1>
          <p className="text-sm sm:text-base text-[#707070] max-w-xl mx-auto leading-relaxed">
            100% share of voice. Zero programmatic dilution. One billboard commanding the entire global homepage.
          </p>

          <div className="pt-2">
            <Link
              href="/auction"
              className="inline-flex items-center gap-2 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider px-8 py-3.5 rounded font-mono shadow-sm"
            >
              <span>Enter Live Auction Arena</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Programmatic vs The Big Banner Comparison */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle space-y-6">
          <h2 className="text-xl font-bold font-sans text-[#171717] uppercase tracking-tight">
            Programmatic Advertising vs Sovereign Banner Ownership
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
            <div className="p-5 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-3">
              <strong className="text-[#707070] uppercase font-mono block">Conventional Ad Networks</strong>
              <ul className="space-y-2 text-[#707070]">
                <li>• Hundreds of competing ads displayed on a single page simultaneously.</li>
                <li>• 86% of internet users suffer from banner blindness.</li>
                <li>• Ephemeral: once your ad budget runs out, you disappear completely.</li>
                <li>• Invasive tracking cookies and privacy complications.</li>
              </ul>
            </div>

            <div className="p-5 bg-[#FFFFFF] border-2 border-[#D50100] rounded space-y-3">
              <strong className="text-[#D50100] uppercase font-mono block">THE BIG BANNER Model</strong>
              <ul className="space-y-2 text-[#171717]">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
                  <span><strong>100% Share of Voice:</strong> Only ONE banner exists. You own the entire global homepage.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
                  <span><strong>Permanent Archive:</strong> You are forever recorded in the public ledger with an official certificate.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
                  <span><strong>Competitive Bid Progression:</strong> Transparent live auction with guaranteed minimum $5 USD increments per bid.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Creative Technical Specs */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-8 shadow-subtle space-y-6">
          <h2 className="text-xl font-bold font-sans text-[#171717] uppercase tracking-tight">
            Creative Asset Specifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
              <span className="text-[#707070] text-[10px] uppercase block">Desktop Banner</span>
              <strong className="text-sm text-[#171717] block">1920 × 600 px</strong>
              <p className="text-[11px] text-[#707070] font-sans">
                Ultra-wide 16:5 or 16:6 aspect ratio. Max 5MB. PNG, JPG, or WebP.
              </p>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
              <span className="text-[#707070] text-[10px] uppercase block">Mobile Companion</span>
              <strong className="text-sm text-[#171717] block">900 × 1200 px</strong>
              <p className="text-[11px] text-[#707070] font-sans">
                Vertical 3:4 aspect ratio optimized for retina mobile screens.
              </p>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
              <span className="text-[#707070] text-[10px] uppercase block">Destination URL</span>
              <strong className="text-sm text-[#171717] block">Secure HTTPS</strong>
              <p className="text-[11px] text-[#707070] font-sans">
                Active SSL certificate required. No redirect chains or malicious domains.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
