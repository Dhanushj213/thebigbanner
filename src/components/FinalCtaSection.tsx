'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-20 sm:py-28 border-t border-[#EAEAEA]">
      <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <Logo size="md" withText={true} />
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#171717] uppercase tracking-tight font-sans leading-[0.95]">
              THE INTERNET IS HUGE.<br />
              <span className="text-[#D50100]">THE SPOT IS NOT.</span>
            </h2>
            <p className="text-base sm:text-xl text-[#707070] leading-relaxed">
              Your brand could be the next to command global attention. One banner. One owner. Global attention.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link
              href="/auction"
              className="inline-flex items-center gap-2.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs sm:text-sm font-bold uppercase tracking-wider px-8 sm:px-10 py-4 sm:py-5 rounded-md transition-all shadow-md group"
            >
              <span>OWN THE NEXT SLOT</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
