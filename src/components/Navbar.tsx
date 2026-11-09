'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { CurrencySelector } from './CurrencySelector';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/auction', label: 'Live Auction', isLive: true },
    { href: '/ownership', label: 'Ownership History' },
    { href: '/transparency', label: 'Transparency' },
    { href: '/about', label: 'About' },
  ];

  return (
    <>
      {/* =========================================================================
          ROW 1: FIXED / STICKY MASTHEAD (MAIN BRANDING CONTENT ONLY)
          Stays pinned to top of screen as user scrolls down.
      ========================================================================= */}
      <div className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#EAEAEA]">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex items-center h-14 sm:h-16">
            {/* Main Branding Logo & Wordmark */}
            <Logo size="md" withText={true} />
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: NON-FIXED NAVIGATION & UTILITY BAR
          Positioned below Row 1; scrolls underneath Row 1 when user scrolls down.
      ========================================================================= */}
      <div className="relative z-40 bg-[#FFFFFF] border-b border-[#EAEAEA]">
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex items-center justify-between h-12 sm:h-13 py-2">

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs tracking-wide transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#171717] font-bold'
                        : 'text-[#707070] font-medium hover:text-[#171717]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D50100] animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop User Utilities & CTA */}
            <div className="hidden sm:flex items-center gap-3">
              <CurrencySelector />

              <Link
                href="/login"
                className="text-xs font-medium text-[#707070] hover:text-[#171717] px-2 py-1.5 transition-colors"
              >
                Sign In
              </Link>

              <Link
                href="/dashboard"
                className="text-xs font-medium text-[#171717] hover:text-black px-2.5 py-1.5 border border-[#EAEAEA] rounded-md hover:bg-[#F8F8F8] transition-all"
              >
                Dashboard
              </Link>

              <Link
                href="/auction"
                className="bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold tracking-wider uppercase px-3.5 py-2 rounded-md transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>OWN THE BANNER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Controls (when screen < lg) */}
            <div className="lg:hidden flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CurrencySelector />
                <Link
                  href="/auction"
                  className="bg-[#D50100] text-white text-[11px] font-bold uppercase px-2.5 py-1.5 rounded sm:hidden flex items-center gap-1"
                >
                  <span>Own</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded text-[#171717] hover:bg-[#F8F8F8] flex items-center gap-1.5 text-xs font-mono font-medium"
                aria-label="Toggle navigation menu"
              >
                <span className="text-[11px] text-[#707070] uppercase">Menu</span>
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFFFFF] border-t border-[#EAEAEA] px-4 pt-3 pb-6 space-y-3 shadow-md animate-in slide-in-from-top-2 duration-150">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 text-xs font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-[#D50100] font-bold'
                    : 'text-[#171717] hover:text-[#D50100]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-[#EAEAEA] flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#707070] py-2"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#171717] py-2 font-medium"
              >
                Advertiser Dashboard
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-[#707070] py-2"
              >
                Governance Panel
              </Link>
              <Link
                href="/auction"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase py-2.5 rounded mt-2 shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Own The Banner</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
