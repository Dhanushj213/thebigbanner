'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import { CurrencySelector } from './CurrencySelector';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  // Close side menu whenever route changes
  useEffect(() => {
    setSideMenuOpen(false);
  }, [pathname]);

  // Handle ESC key and lock body scroll when side menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSideMenuOpen(false);
      }
    };

    if (sideMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [sideMenuOpen]);

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
          SINGLE TOP HEADER ROW: BRANDING + UTILITIES + CTA + SIDE MENU ICON
          Everything organized cleanly in 1 single row to maximize vertical space.
      ========================================================================= */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#EAEAEA]">
        <div className="w-full px-3 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
          <div className="flex items-center justify-between h-14 sm:h-20 lg:h-22 transition-all">

            {/* Left: Prominent Branding Logo & Monogram */}
            <div className="flex-shrink-0">
              <Logo size="masthead" withText={true} />
            </div>

            {/* Right: Currency Selector + Sign In + Dashboard + OWN THE BANNER + Side Menu Icon */}
            <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 lg:gap-3.5">
              
              {/* Currency Selector */}
              <CurrencySelector />

              {/* Sign In (Desktop) */}
              <Link
                href="/login"
                className="hidden md:inline-flex items-center text-xs font-semibold text-[#707070] hover:text-[#171717] px-2.5 py-2 transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>

              {/* Dashboard (Tablet & Desktop) */}
              <Link
                href="/dashboard"
                className="hidden sm:inline-flex items-center text-xs font-mono font-semibold text-[#171717] hover:text-black px-3 py-2 border border-[#EAEAEA] hover:border-[#171717] rounded-md hover:bg-[#F8F8F8] transition-all whitespace-nowrap"
              >
                Dashboard
              </Link>

              {/* OWN THE BANNER Action CTA */}
              <Link
                href="/auction"
                className="bg-[#D50100] hover:bg-[#B80000] text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase px-2.5 xs:px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-md transition-all shadow-sm flex items-center gap-1 sm:gap-1.5 whitespace-nowrap active:scale-[0.98]"
              >
                <span>
                  OWN <span className="hidden xs:inline">THE BANNER</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
              </Link>

              {/* Side Menu Icon Button */}
              <button
                type="button"
                onClick={() => setSideMenuOpen(true)}
                className="p-1.5 xs:p-2 sm:px-3 sm:py-2 border border-[#EAEAEA] hover:border-[#171717] rounded-md hover:bg-[#F8F8F8] text-[#171717] transition-all flex items-center gap-1.5 sm:gap-2 group flex-shrink-0"
                aria-label="Open navigation menu"
                aria-expanded={sideMenuOpen}
                title="Navigation Menu"
              >
                <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-[#171717] group-hover:scale-105 transition-transform" />
                <span className="hidden xl:inline text-xs font-mono font-bold uppercase tracking-wider text-[#171717]">
                  Menu
                </span>
              </button>

            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          SLIDE-OVER SIDE MENU DRAWER
          Opens when side menu icon is clicked. Houses full platform navigation.
      ========================================================================= */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
            onClick={() => setSideMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-12">
            <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl border-l border-[#EAEAEA] flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">

              {/* Drawer Top Header */}
              <div className="p-5 sm:p-6 border-b border-[#EAEAEA] flex items-center justify-between bg-[#FAFAFA]">
                <Logo size="sm" withText={true} />
                <button
                  type="button"
                  onClick={() => setSideMenuOpen(false)}
                  className="p-2 rounded-md text-[#707070] hover:text-[#171717] hover:bg-[#EAEAEA] transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Navigation Links */}
              <div className="p-5 sm:p-6 flex-1 space-y-6">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#707070] font-bold mb-3 px-3">
                    Platform Navigation
                  </div>
                  <nav className="space-y-1">
                    {navLinks.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setSideMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-md text-sm font-semibold transition-all group ${
                            isActive
                              ? 'bg-[#F8F8F8] text-[#D50100] font-bold border-l-2 border-[#D50100]'
                              : 'text-[#171717] hover:bg-[#F8F8F8] hover:text-[#D50100]'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span>{link.label}</span>
                            {link.isLive && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D50100]/10 text-[#D50100]">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D50100] animate-pulse" />
                                LIVE
                              </span>
                            )}
                          </span>
                          <ArrowRight className="w-4 h-4 text-[#707070] group-hover:text-[#D50100] group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      );
                    })}
                  </nav>
                </div>

                {/* Account & Platform Section */}
                <div className="pt-4 border-t border-[#EAEAEA]">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#707070] font-bold mb-3 px-3">
                    Account & Platform
                  </div>
                  <div className="grid grid-cols-2 gap-2 px-1">
                    <Link
                      href="/login"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2.5 rounded-md border border-[#EAEAEA] hover:border-[#171717] text-xs font-mono font-semibold text-[#171717] hover:bg-[#F8F8F8] text-center transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2.5 rounded-md border border-[#EAEAEA] hover:border-[#171717] text-xs font-mono font-semibold text-[#171717] hover:bg-[#F8F8F8] text-center transition-all"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/faq"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8] transition-colors"
                    >
                      FAQ & Help
                    </Link>
                    <Link
                      href="/contact"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8] transition-colors"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/legal"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8] transition-colors"
                    >
                      Legal & Terms
                    </Link>
                    <Link
                      href="/legal/compliance"
                      onClick={() => setSideMenuOpen(false)}
                      className="px-3 py-2 rounded-md text-xs text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8] transition-colors"
                    >
                      Compliance
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="p-5 sm:p-6 border-t border-[#EAEAEA] bg-[#FAFAFA] space-y-3">
                <Link
                  href="/auction"
                  onClick={() => setSideMenuOpen(false)}
                  className="w-full bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider py-3 rounded-md shadow-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>OWN THE BANNER</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="text-[10px] text-center text-[#707070] font-mono">
                  Operated by AXIOMIS Technologies (India)
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
