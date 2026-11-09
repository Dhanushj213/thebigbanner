'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Flame,
  Clock,
  Award,
  Image as ImageIcon,
  CreditCard,
  FileText,
  Bell,
  Settings,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/bids', label: 'My Bids', icon: Flame },
    { href: '/dashboard/advertisements', label: 'Advertisements', icon: ImageIcon },
    { href: '/dashboard/payments', label: 'Payments & Invoices', icon: CreditCard },
    { href: '/dashboard/certificates', label: 'Certificates', icon: Award },
    { href: '/dashboard/settings', label: 'Account Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#F8F8F8] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Header Card */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#F5F5F5] border border-[#EAEAEA] flex items-center justify-center font-bold text-[#D50100] font-sans">
              <ShieldCheck className="w-5 h-5 text-[#15803D]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-[#171717] font-sans">Advertiser Console</h1>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-[#F0FDF4] text-[#15803D] font-bold">
                  VERIFIED ACCESS
                </span>
              </div>
              <p className="text-xs text-[#707070] font-mono mt-0.5">
                Institutional Bidding, Creative Management & Ownership Records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/advertisements"
              className="px-4 py-2 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider rounded font-mono shadow-sm"
            >
              Submit Creative
            </Link>
          </div>
        </div>

        {/* Dashboard Sub Navigation Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-[#EAEAEA] text-xs font-mono">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-md transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FFFFFF] text-[#171717] font-bold border-t-2 border-t-[#D50100] border-x border-[#EAEAEA] shadow-subtle'
                    : 'text-[#707070] hover:text-[#171717] hover:bg-[#FFFFFF]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#D50100]' : 'text-[#707070]'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Body */}
        <div>{children}</div>

      </div>
    </div>
  );
}
