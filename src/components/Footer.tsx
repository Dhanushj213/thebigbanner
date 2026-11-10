'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFFFFF] border-t border-[#EAEAEA] pt-14 pb-12 text-[#707070] text-xs">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#EAEAEA]">
          
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2 space-y-3.5">
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
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-[#171717] font-semibold text-xs uppercase tracking-wider mb-3.5 font-mono">
              Legal & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/legal" className="text-[#D50100] font-bold hover:underline flex items-center gap-1 font-mono">
                  <span>Legal Centre (15 Policies) →</span>
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-and-conditions" className="hover:text-[#171717] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="hover:text-[#171717] transition-colors">
                  Privacy Policy (DPDP / GDPR)
                </Link>
              </li>
              <li>
                <Link href="/legal/refund-policy" className="hover:text-[#171717] transition-colors">
                  Refund & Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/compliance" className="hover:text-[#171717] transition-colors font-mono text-[11px]">
                  Compliance Matrix
                </Link>
              </li>
              <li>
                <Link href="/legal/grievance-redressal" className="hover:text-[#171717] transition-colors font-mono text-[11px]">
                  Grievance Redressal Desk
                </Link>
              </li>
              <li>
                <Link href="/admin/legal" className="text-[#707070] hover:text-[#171717] font-mono text-[11px] pt-1 block">
                  Legal Admin Console
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#707070]">
          <div className="space-y-0.5 text-center md:text-left">
            <div>
              © {new Date().getFullYear()} THE BIG BANNER. All rights reserved.
            </div>
            <div className="text-[10px] text-[#707070]">
              Operated by <strong>AXIOMIS Technologies</strong> (India). Operator Portal:{' '}
              <a
                href="https://axiomis.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#171717] hover:underline font-mono"
              >
                https://axiomis.in
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 font-mono text-[10px]">
            <Link href="/legal/legal-notice" className="hover:text-[#171717]">Legal Notice</Link>
            <span>•</span>
            <Link href="/legal/cookie-policy" className="hover:text-[#171717]">Cookie Preferences</Link>
            <span>•</span>
            <span className="text-[#15803D] font-bold">100% Verified Records</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
