'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Flame,
  ShieldCheck,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Info,
  Sparkles,
  Zap,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBanner } from '@/context/BannerContext';
import {
  formatCurrency,
  formatDate,
  calculateMinNextBid,
  calculateTimeLeft,
} from '@/utils/formatters';

export const LiveAuctionWidget: React.FC<{ fullPage?: boolean }> = ({ fullPage = false }) => {
  const { auction, bids, currentUser, currency, placeBid, concludeAuctionManually } = useBanner();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(auction.endsAt));
  const [customBidAmount, setCustomBidAmount] = useState<string>('');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { minOpeningBid, minNextBid, minimumIncrement } = calculateMinNextBid(
    auction.previousWinningPrice,
    auction.currentHighestBid,
    auction.minimumEscalationPercent
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(auction.endsAt));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction.endsAt]);

  const handleQuickBid = (multiplier: number) => {
    const amount = Math.round(auction.currentHighestBid * multiplier / 1000) * 1000;
    submitBid(amount);
  };

  const handleCustomBid = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customBidAmount.replace(/[^0-9]/g, ''), 10);
    if (!amount || isNaN(amount)) {
      setFeedback({ type: 'error', message: 'Please enter a valid bid amount.' });
      return;
    }
    submitBid(amount);
  };

  const submitBid = (amount: number) => {
    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      const result = placeBid(amount);
      if (result.success) {
        setFeedback({
          type: 'success',
          message: result.extended
            ? `${result.message} ⏱️ Anti-sniping: +2 minutes added to clock!`
            : result.message,
        });
        setCustomBidAmount('');

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#f59e0b', '#ffffff'],
        });
      } else {
        setFeedback({ type: 'error', message: result.message });
      }
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div className={`glass-panel rounded-2xl border border-white/10 overflow-hidden ${fullPage ? 'p-6 sm:p-8' : 'p-6'}`}>
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-banner-red animate-ping" />
            <span className="text-xs font-mono font-bold uppercase text-banner-red tracking-wider">
              AUCTION #{auction.auctionNumber} • LIVE BIDDING
            </span>
            <span className="bg-white/10 text-white text-[10px] px-2 py-0.5 rounded font-mono">
              TARGET OWNERSHIP #{auction.targetOwnershipNumber}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
            Own The Next 14-Day Global Banner
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Display your brand on the world’s single billboard. Ownership period: {formatDate(auction.targetStartDate)} — {formatDate(auction.targetEndDate)}.
          </p>
        </div>

        {/* Live Clock HUD */}
        <div className="bg-black/60 rounded-xl p-3.5 border border-white/10 text-right">
          <span className="text-[10px] font-mono uppercase text-zinc-400 block tracking-wider">
            Time Remaining
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-black text-white flex items-center gap-1.5 mt-0.5">
            <Clock className="w-5 h-5 text-banner-red animate-pulse" />
            <span>{String(timeLeft.days).padStart(2, '0')}d</span>
            <span className="text-zinc-600">:</span>
            <span>{String(timeLeft.hours).padStart(2, '0')}h</span>
            <span className="text-zinc-600">:</span>
            <span>{String(timeLeft.minutes).padStart(2, '0')}m</span>
            <span className="text-zinc-600">:</span>
            <span className="text-banner-red">{String(timeLeft.seconds).padStart(2, '0')}s</span>
          </div>
          {auction.extendedCount > 0 && (
            <span className="text-[10px] text-amber-400 font-mono inline-flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3" />
              <span>Anti-sniping extended (+{auction.extendedCount * 2}m)</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Grid: Bidding Console vs Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* Left Column: Bidding Console (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Current High Bid Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-banner-red/20 via-black/40 to-white/5 border border-banner-red/30">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-mono text-zinc-400 tracking-wider">
                Current Highest Bid
              </span>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                VERIFIED QUALIFYING BID
              </span>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                {formatCurrency(auction.currentHighestBid, currency)}
              </div>
              <div className="text-right">
                <span className="text-xs text-zinc-400 block">Leading Bidder</span>
                <span className="text-sm font-bold text-white flex items-center gap-1 justify-end">
                  <span>{auction.highestBidderCompany}</span>
                  <span className="text-xs">({auction.highestBidderCountryCode})</span>
                </span>
              </div>
            </div>

            {/* Price Rule Calculation Strip */}
            <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-[11px] font-mono text-zinc-400">
              <div>
                <span className="text-zinc-500 block text-[10px]">Previous Ownership:</span>
                <span className="text-white font-medium">{formatCurrency(auction.previousWinningPrice, currency)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">+10% Minimum Escalation:</span>
                <span className="text-emerald-400 font-medium">+{formatCurrency(auction.previousWinningPrice * 0.1, currency)}</span>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px]">Min Next Qualifying Bid:</span>
                <span className="text-banner-red font-bold">{formatCurrency(minNextBid, currency)}</span>
              </div>
            </div>
          </div>

          {/* User Status / Profile Alert */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-banner-red/20 text-banner-red flex items-center justify-center font-bold text-xs">
                {currentUser.name.charAt(0)}
              </div>
              <div>
                <span className="text-zinc-400">Bidding as: </span>
                <strong className="text-white">{currentUser.name}</strong>
                <span className="text-zinc-400"> ({currentUser.companyName})</span>
              </div>
            </div>
            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
              Verified Bidder
            </span>
          </div>

          {/* Feedback Toast */}
          {feedback && (
            <div
              className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
                feedback.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 font-medium">{feedback.message}</div>
            </div>
          )}

          {/* Quick Preset Bids */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block">
              Quick Increment Shortcuts
            </span>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => submitBid(minNextBid)}
                disabled={isSubmitting}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all hover:border-banner-red/40 group"
              >
                <span className="text-[10px] text-zinc-400 font-mono block">Minimum Next (+${minimumIncrement.toLocaleString('en-US')})</span>
                <span className="text-sm font-bold text-white font-mono group-hover:text-banner-red">
                  {formatCurrency(minNextBid, currency)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickBid(1.10)}
                disabled={isSubmitting}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all hover:border-banner-red/40 group"
              >
                <span className="text-[10px] text-zinc-400 font-mono block">Aggressive (+10%)</span>
                <span className="text-sm font-bold text-white font-mono group-hover:text-banner-red">
                  {formatCurrency(Math.round(auction.currentHighestBid * 1.1), currency)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickBid(1.25)}
                disabled={isSubmitting}
                className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-left transition-all hover:border-banner-red/40 group"
              >
                <span className="text-[10px] text-zinc-400 font-mono block">Knockout (+25%)</span>
                <span className="text-sm font-bold text-white font-mono group-hover:text-banner-red">
                  {formatCurrency(Math.round(auction.currentHighestBid * 1.25), currency)}
                </span>
              </button>
            </div>
          </div>

          {/* Custom Bid Input Form */}
          <form onSubmit={handleCustomBid} className="space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider block">
              Or Enter Custom Bid Amount (USD)
            </span>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-zinc-400 font-bold text-base">
                  $
                </span>
                <input
                  type="text"
                  placeholder={`Min. ${minNextBid.toLocaleString('en-US')} USD`}
                  value={customBidAmount}
                  onChange={(e) => setCustomBidAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-3.5 bg-black/50 border border-white/15 rounded-xl text-white font-mono font-bold text-base focus:outline-none focus:border-banner-red transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3.5 bg-banner-red hover:bg-rose-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-banner-red/40 flex items-center gap-2 flex-shrink-0"
              >
                <Flame className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Place Bid'}</span>
              </button>
            </div>
          </form>

          {/* Anti-sniping & Rules Accordion / Note */}
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-zinc-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Zap className="w-3.5 h-3.5 text-banner-gold" />
              <span>Auction Guard Rules Active</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              • <strong>Anti-Sniping Protection:</strong> Any bid received within the final 2 minutes extends the auction timer by +2:00 minutes.
            </p>
            <p className="text-[11px] leading-relaxed">
              • <strong>Escrow & Settlement:</strong> The winning bidder receives 24 hours to complete payment. If unpaid, the next highest qualifying bidder receives the spot.
            </p>
            <p className="text-[11px] leading-relaxed">
              • <strong>Creative Approval:</strong> Winner must submit creative compliant with guidelines before banner launch.
            </p>
          </div>

        </div>

        {/* Right Column: Live Bid Feed & History (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-mono text-zinc-400 tracking-wider">
              Live Bid Feed ({bids.length} Bids Placed)
            </span>
            <span className="text-[10px] text-zinc-500 font-mono">Real-time Stream</span>
          </div>

          <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
            {bids.map((b, idx) => {
              const isLead = idx === 0 && b.status === 'valid';
              return (
                <div
                  key={b.id}
                  className={`p-3.5 rounded-xl border text-xs transition-all ${
                    isLead
                      ? 'bg-banner-red/15 border-banner-red/40 shadow-md'
                      : 'bg-white/5 border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base">{b.flagEmoji}</span>
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{b.bidderCompany}</span>
                          {isLead && (
                            <span className="text-[9px] bg-banner-red text-white font-mono px-1.5 py-0.2 rounded uppercase">
                              LEADING
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {b.bidderName} • {b.country}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono font-bold text-white text-sm">
                        {formatCurrency(b.amount, currency)}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {new Date(b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Admin Simulation Fast-Forward button */}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={concludeAuctionManually}
              className="w-full py-2.5 px-3 rounded-lg bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulate Auction Close (Declare Winner & Open #10)</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
