'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, Flame, ShieldCheck, Globe, ArrowRight } from 'lucide-react';

export const HowItWorksHomepage: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'DISCOVER',
      subtitle: 'Explore the exclusive advertising space.',
      description:
        'Witness the single global digital billboard commanding 100% of homepage attention without programmatic clutter or competitor banners.',
      icon: Eye,
    },
    {
      num: '02',
      title: 'COMPETE',
      subtitle: 'Participate in the live auction.',
      description:
        'Submit qualifying bids. By rule, each bid advances the price by at least $5 USD with anti-sniping clock protections.',
      icon: Flame,
    },
    {
      num: '03',
      title: 'OWN',
      subtitle: 'Complete winning payment & verification.',
      description:
        'Settle your winning bid via secure escrow wire, verify corporate identity, and upload high-resolution desktop and mobile assets.',
      icon: ShieldCheck,
    },
    {
      num: '04',
      title: 'BE SEEN',
      subtitle: 'Display your approved advertisement.',
      description:
        'Dominate the homepage for your full 14-day tenure and become an immutable part of the permanent public ownership archive.',
      icon: Globe,
    },
  ];

  return (
    <section className="bg-[#FFFFFF] py-20 border-b border-[#EAEAEA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            THE PLATFORM ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            How THE BIG BANNER Works
          </h2>
          <p className="text-sm text-[#707070] max-w-xl mx-auto">
            A transparent four-step cycle turning digital advertising into a scarce, competitive, and globally prestigious asset.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 hover:border-[#D4D4D4] transition-all space-y-4 flex flex-col justify-between shadow-subtle"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                    <span className="text-2xl font-black font-mono text-[#D50100]">
                      {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-[#707070]" />
                  </div>

                  <div>
                    <h3 className="text-base font-black text-[#171717] font-sans tracking-wide">
                      {step.title}
                    </h3>
                    <div className="text-xs font-semibold text-[#D50100] mt-0.5">
                      {step.subtitle}
                    </div>
                  </div>

                  <p className="text-xs text-[#707070] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-2 text-[11px] font-mono text-[#707070]">
                  Step {idx + 1} of 4
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Link */}
        <div className="text-center pt-2">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#171717] hover:text-[#D50100] font-sans uppercase tracking-wider"
          >
            <span>Read Complete Operational Rules & Escalator Formula</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
};
