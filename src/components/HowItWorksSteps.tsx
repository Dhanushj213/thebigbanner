'use client';

import React from 'react';
import Link from 'next/link';
import { Eye, TrendingUp, History, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export const HowItWorksSteps: React.FC = () => {
  const pillars = [
    {
      step: '01',
      title: 'One Exclusive Space',
      subtitle: 'Zero Ad Clutter. 100% Share of Voice.',
      description:
        'Unlike conventional websites displaying thousands of banner ads, THE BIG BANNER features exactly ONE billboard and ONE owner at a time. The entire audience sees only your message.',
      icon: Eye,
      tag: 'Extreme Scarcity',
    },
    {
      step: '02',
      title: 'Competitive Auction',
      subtitle: 'Every Bid Escalates The Value.',
      description:
        'Advertisers participate in a transparent live auction. By rule, each qualifying bid must increment by at least $5 USD over the leading bid, strictly calculated in canonical USD.',
      icon: TrendingUp,
      tag: '+$5 Minimum Hike',
    },
    {
      step: '03',
      title: 'Permanent History',
      subtitle: 'Your Brand Immortalized Forever.',
      description:
        'When your tenure concludes, your brand never disappears. It is permanently cataloged in the public ownership archive with verifiable cryptographic proof and an official digital certificate.',
      icon: History,
      tag: 'Permanent Legacy',
    },
  ];

  const workflow = [
    { num: '1', title: 'Bid In Live Auction', desc: 'Place qualifying bids. Anti-sniping ensures fair competition.' },
    { num: '2', title: 'Secure Payment', desc: 'Winner completes escrow settlement within 24 hours.' },
    { num: '3', title: 'Creative Verification', desc: 'Submit desktop & mobile creatives for editorial verification.' },
    { num: '4', title: 'Broadcast Worldwide', desc: 'Banner goes live for the full purchased tenure.' },
    { num: '5', title: 'Enshrined in Archive', desc: 'Receive verifiable digital ownership certificate.' },
  ];

  return (
    <section className="py-20 bg-banner-dark/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block px-3 py-1 rounded-full bg-banner-red/10 border border-banner-red/30 text-banner-red text-xs font-mono font-semibold uppercase tracking-wider">
            THE THREE PILLARS
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-serif text-white">
            How THE BIG BANNER Works
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Turning digital advertising into a scarce, competitive, and globally prestigious asset class.
          </p>
        </div>

        {/* 3 Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="relative glass-panel rounded-2xl p-8 border border-white/10 hover:border-banner-red/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black font-mono text-zinc-700 group-hover:text-banner-red transition-colors">
                      {p.step}
                    </span>
                    <span className="text-[10px] font-mono bg-white/5 text-zinc-300 px-2 py-1 rounded border border-white/10">
                      {p.tag}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-banner-red/10 text-banner-red flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-banner-red mb-3 font-semibold">
                    {p.subtitle}
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 5-Step Workflow Horizontal Sequence */}
        <div className="glass-panel rounded-2xl p-8 border border-white/10">
          <h4 className="text-sm font-mono uppercase text-zinc-400 tracking-wider mb-6 text-center">
            The Ownership Lifecycle
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {workflow.map((item, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-banner-red text-white flex items-center justify-center text-xs font-mono font-bold">
                    {item.num}
                  </span>
                  <span className="text-xs font-bold text-white font-sans">{item.title}</span>
                </div>
                <p className="text-[11px] text-zinc-400 pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-zinc-400">
              Ready to claim your place in digital advertising history?
            </span>
            <div className="flex items-center gap-4">
              <Link
                href="/how-it-works"
                className="text-xs text-zinc-300 hover:text-white font-mono"
              >
                Detailed Platform Mechanics →
              </Link>
              <Link
                href="/auction"
                className="px-4 py-2 bg-banner-red hover:bg-rose-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider"
              >
                Join Next Auction
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
