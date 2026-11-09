'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User as UserIcon } from 'lucide-react';
import { Logo } from './Logo';
import { CurrencySelector } from './CurrencySelector';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/auction', label: 'Live Auction' },
    { href: '/ownership', label: 'Ownership History' },
    { href: '/transparency', label: 'Transparency' },
    { href: '/about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3.5">
          
          {/* Left: Official β. Logo */}
          <Logo size="md" withText={true} />

          {/* Centre: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium tracking-wide transition-colors ${
                    isActive
                      ? 'text-[#171717] font-semibold'
                      : 'text-[#707070] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Global Currency Selector */}
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

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <CurrencySelector />
            <Link
              href="/auction"
              className="bg-[#D50100] text-white text-[11px] font-bold uppercase px-2.5 py-1.5 rounded sm:hidden"
            >
              Own
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-[#171717] hover:bg-[#F8F8F8]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#EAEAEA] px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-medium text-[#171717] hover:text-[#D50100]"
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
              Sign In / Switch Demo Account
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
              className="w-full text-center bg-[#D50100] text-white text-xs font-bold uppercase py-2.5 rounded mt-2"
            >
              Own The Banner
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
