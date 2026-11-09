'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#EAEAEA] pt-14 pb-12 text-[#707070] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EAEAEA]">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-3.5">
            <Logo size="md" withText={true} />
            <p className="text-xs text-[#707070] leading-relaxed max-w-sm pt-1">
              THE BIG BANNER is the world’s exclusive digital advertising marketplace. One primary billboard. One verified owner at a time. Every rotation raises the value and enters the permanent public record.
            </p>
            <div className="text-[11px] font-mono text-[#707070] pt-2">
              ONE BANNER. ONE OWNER. GLOBAL ATTENTION.
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-[#171717] font-semibold text-xs uppercase tracking-wider mb-3.5 font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#171717] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#171717] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/auction" className="text-[#D50100] font-medium hover:underline">
                  Live Auction
                </Link>
              </li>
              <li>
                <Link href="/ownership" className="hover:text-[#171717] transition-colors">
                  Ownership History
                </Link>
              </li>
              <li>
                <Link href="/transparency" className="hover:text-[#171717] transition-colors">
                  Financial Transparency
                </Link>
              </li>
            </ul>
          </div>

          {/* Advertisers */}
          <div>
            <h4 className="text-[#171717] font-semibold text-xs uppercase tracking-wider mb-3.5 font-mono">
              Advertisers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/advertise" className="hover:text-[#171717] transition-colors">
                  Why Own The Banner
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#171717] transition-colors">
                  Advertiser Dashboard
                </Link>
              </li>
              <li>
                <Link href="/dashboard/advertisements" className="hover:text-[#171717] transition-colors">
                  Creative Studio
                </Link>
              </li>
              <li>
                <Link href="/advertising-policy" className="hover:text-[#171717] transition-colors">
                  Advertising Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#171717] transition-colors">
                  FAQ & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Policies */}
          <div>
            <h4 className="text-[#171717] font-semibold text-xs uppercase tracking-wider mb-3.5 font-mono">
              Governance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-[#171717] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#171717] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#171717] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#171717] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#171717] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#707070] hover:text-[#171717] font-mono text-[11px] pt-1 block">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#707070]">
          <div>
            © {new Date().getFullYear()} THE BIG BANNER. All rights reserved.
          </div>
          <div className="flex items-center gap-4 font-mono text-[10px]">
            <span>100% Verified Database Records</span>
            <span>•</span>
            <span>Authoritative Server State</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
