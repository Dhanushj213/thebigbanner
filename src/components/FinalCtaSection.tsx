'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="flex justify-center">
          <Logo size="lg" withText={false} />
        </div>

        <h2 className="text-4xl sm:text-6xl font-black text-[#171717] uppercase tracking-tight font-sans leading-tight">
          THE INTERNET IS HUGE.<br />THE SPOT IS NOT.
        </h2>

        <p className="text-base text-[#707070] max-w-md mx-auto">
          Your brand could be the next to own the spotlight.
        </p>

        <div className="pt-2">
          <Link
            href="/auction"
            className="inline-flex items-center gap-2 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-md transition-all shadow-sm"
          >
            <span>OWN THE NEXT SLOT</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
