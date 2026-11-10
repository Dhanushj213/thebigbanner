'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  Flame,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  History,
  X,
  AlertTriangle,
} from 'lucide-react';
import { AuthoritativeAuction } from '@/lib/services';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';
import { CurrencySelector } from '@/components/CurrencySelector';

export default function AuctionPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount, getDualPrice } = useCurrency();
  const [auction, setAuction] = useState<AuthoritativeAuction | null>(null);
  const [bids, setBids] = useState<any[]>([]);
  const [remainingSecs, setRemainingSecs] = useState<number>(0);
  const [customBid, setCustomBid] = useState<string>('');
  const [bidderName, setBidderName] = useState<string>('');
  const [bidderCompany, setBidderCompany] = useState<string>('');
  const [bidderEmail, setBidderEmail] = useState<string>('');
  const [bidderCountry, setBidderCountry] = useState<string>('United States');
  const [bidderId, setBidderId] = useState<string>('');
  const [confirmModalAmount, setConfirmModalAmount] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tbb_bidder_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) setBidderName(parsed.name);
        if (parsed.companyName) setBidderCompany(parsed.companyName);
        if (parsed.email) setBidderEmail(parsed.email);
        if (parsed.country) setBidderCountry(parsed.country);
        if (parsed.bidderId) setBidderId(parsed.bidderId);
      }
    } catch {}
  }, []);

  const fetchAuctionData = async () => {
    try {
      const res = await fetch('/api/auction');
      if (res.ok) {
        const data = await res.json();
        setAuction(data.auction);
        setBids(data.bids || []);
        if (data.auction) {
          const now = Date.now();
          setRemainingSecs(Math.max(0, Math.floor((data.auction.closingTimestampMs - now) / 1000)));
        }
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuctionData();
    const interval = setInterval(fetchAuctionData, 4000);
    return () => clearInterval(interval);
  }, []);

  // Authoritative countdown timer using server-authoritative timestamp
  useEffect(() => {
    if (!auction) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((auction.closingTimestampMs - now) / 1000));
      setRemainingSecs(diff);
    }, 1000);
    return () => clearInterval(timer);
  }, [auction?.closingTimestampMs]);

  const handleOpenConfirm = (amount: number) => {
    setFeedback(null);
    if (!auction) return;

    if (!bidderCompany.trim() || !bidderEmail.trim() || !bidderName.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please complete your Bidder Identification (Brand, Representative, and Corporate Email) below before confirming your bid.',
      });
      return;
    }

    if (amount < auction.minimumNextBid) {
      setFeedback({
        type: 'error',
        message: `Your bid must be at least the qualifying minimum of $${auction.minimumNextBid.toLocaleString('en-US')} USD.`,
      });
      return;
    }

    setConfirmModalAmount(amount);
  };

  const handleExecuteBid = async () => {
    if (!confirmModalAmount || !auction) return;
    setSubmitting(true);
    setFeedback(null);

    const bidderProfile = {
      name: bidderName.trim(),
      companyName: bidderCompany.trim(),
      email: bidderEmail.trim(),
      country: bidderCountry.trim() || 'Worldwide',
      countryCode: 'US',
    };

    try {
      // Record acceptance of Auction & Bidding Rules (Doc 05)
      try {
        await fetch('/api/legal/accept', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: bidderId || bidderProfile.email,
            documentSlug: 'auction-rules',
            documentVersion: 'v1.2.0',
            context: 'auction_bid',
          }),
        });
      } catch (e) {
        // Continue bid submission
      }

      const res = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auctionId: auction.id,
          bidderId: bidderId || undefined,
          amount: confirmModalAmount,
          bidderInfo: bidderProfile,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        if (data.bidderId) {
          setBidderId(data.bidderId);
          try {
            localStorage.setItem(
              'tbb_bidder_profile',
              JSON.stringify({
                ...bidderProfile,
                bidderId: data.bidderId,
              })
            );
          } catch {}
        }
        setFeedback({
          type: 'success',
          message: data.extended
            ? `${data.message} Anti-sniping activated: +2:00 minutes added to clock.`
            : data.message,
        });
        setConfirmModalAmount(null);
        setCustomBid('');
        await fetchAuctionData();
      } else {
        setFeedback({
          type: 'error',
          message: data.error || 'Bid submission was rejected by the server.',
        });
        setConfirmModalAmount(null);
      }
    } catch (err: any) {
      setFeedback({
        type: 'error',
        message: err.message || 'Network error communicating with auction engine.',
      });
      setConfirmModalAmount(null);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-3 font-mono text-xs text-[#707070]">
        <div className="w-6 h-6 border-2 border-[#D50100] border-t-transparent rounded-full animate-spin mx-auto" />
        <p>Connecting to authoritative auction engine...</p>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-[#171717]">No Active Auction Found</h2>
        <p className="text-xs text-[#707070]">The auction system is currently awaiting scheduled initiation.</p>
        <Link href="/" className="inline-block px-4 py-2 bg-[#171717] text-white text-xs font-mono rounded">
          Return Home
        </Link>
      </div>
    );
  }

  const days = Math.floor(remainingSecs / (3600 * 24));
  const hours = Math.floor((remainingSecs % (3600 * 24)) / 3600);
  const minutes = Math.floor((remainingSecs % 3600) / 60);
  const seconds = remainingSecs % 60;
  const isClosingSoon = remainingSecs < 1800 && remainingSecs > 0;

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#707070] mb-1">
              <Link href="/" className="hover:text-[#171717]">Home</Link>
              <span>/</span>
              <span className="text-[#D50100] font-semibold">Live Auction #{auction.auctionNumber}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
              Live Auction Arena
            </h1>
            <p className="text-xs sm:text-sm text-[#707070] mt-1">
              Official bidding round for Ownership Slot #{auction.targetOwnershipNumber}. Governed by server-authoritative pricing.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/auction/history"
              className="px-4 py-2 bg-[#FFFFFF] border border-[#EAEAEA] text-[#171717] hover:bg-[#F8F8F8] text-xs font-mono rounded transition-colors"
            >
              Concluded Auctions Archive
            </Link>
          </div>
        </div>

        {/* Feedback Alert Toast */}
        {feedback && (
          <div
            className={`p-4 rounded-md text-xs font-mono flex items-start gap-3 border ${
              feedback.type === 'success'
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#15803D]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#15803D]" />
            ) : (
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#DC2626]" />
            )}
            <div className="flex-1 font-sans">{feedback.message}</div>
          </div>
        )}

        {/* Main 2-Column Auction Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bidding Console (7 Cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-4 sm:p-8 space-y-5 sm:space-y-6 shadow-subtle">
            
            {/* Status & Countdown Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pb-4 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#171717] text-white">
                  AUCTION #{auction.auctionNumber}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    auction.isClosed
                      ? 'bg-[#F5F5F5] text-[#707070]'
                      : isClosingSoon
                      ? 'bg-[#FEF2F2] text-[#D50100] border border-[#FECACA]'
                      : 'bg-[#F0FDF4] text-[#15803D]'
                  }`}
                >
                  {auction.isClosed ? 'CLOSED' : isClosingSoon ? 'CLOSING SOON' : 'LIVE'}
                </span>
              </div>

              {/* Authoritative Countdown Clock */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <Clock className="w-4 h-4 text-[#D50100]" />
                <span className="text-[#707070]">Time Remaining:</span>
                <span className="font-bold text-xs sm:text-sm text-[#171717]">
                  {String(days).padStart(2, '0')}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Current Leading Bid Display */}
            <div className="p-4 sm:p-6 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase text-[#707070] tracking-wider">
                  {auction.currentHighestBid > 0 ? 'Current Highest Valid Bid' : 'Opening Reserve Price'}
                </span>
                <span className="text-[10px] font-mono text-[#15803D] bg-[#FFFFFF] border border-[#EAEAEA] px-2 py-0.5 rounded font-bold">
                  {auction.currentHighestBid > 0 ? 'VERIFIED QUALIFIED' : 'AWAITING 1ST BID'}
                </span>
              </div>

              <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2 sm:gap-4">
                <div>
                  <div className="text-2xl xs:text-3xl sm:text-4xl font-black font-mono text-[#171717]">
                    {formatUSDOnly(auction.currentHighestBid > 0 ? auction.currentHighestBid : auction.openingPrice, { showCode: true })}
                  </div>
                  {selectedCurrency !== 'USD' && (
                    <div className="text-xs font-mono text-[#D50100] font-semibold mt-0.5">
                      {getDualPrice(auction.currentHighestBid > 0 ? auction.currentHighestBid : auction.openingPrice).localEstimate}
                    </div>
                  )}
                </div>
                <div className="text-left xs:text-right">
                  <span className="text-[10px] font-mono uppercase text-[#707070] block">
                    {auction.currentHighestBid > 0 ? 'Leading Bidder' : 'Status'}
                  </span>
                  <span className="text-xs font-bold text-[#171717] font-sans">
                    {auction.highestBidderCompany || 'Open for 1st Bid ($100)'}
                  </span>
                </div>
              </div>

              {/* Rules strip */}
              <div className="pt-3 border-t border-[#EAEAEA] grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs font-mono text-[#707070]">
                <div>
                  <span className="text-[10px] text-[#707070] block">Previous Price:</span>
                  <strong className="text-[#171717]">{formatUSDOnly(auction.previousWinningPrice, { showCode: true })}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-[#707070] block">Bid Hike Rule:</span>
                  <strong className="text-[#15803D]">+$5 / Bid</strong>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#707070] block">Min Next Qualifying:</span>
                  <strong className="text-[#D50100]">{formatUSDOnly(auction.minimumNextBid, { showCode: true })}</strong>
                </div>
              </div>

              {/* Cashfree Escrow strip */}
              <div className="pt-2.5 border-t border-[#EAEAEA] flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-mono">
                <span className="text-[#707070]">Official Settlement Protocol:</span>
                <Link
                  href={`/checkout?tenure=${auction.targetOwnershipNumber}&amount=${auction.currentHighestBid || auction.openingPrice}${bidderEmail ? `&email=${encodeURIComponent(bidderEmail)}` : ''}${bidderName ? `&name=${encodeURIComponent(bidderName)}` : ''}${bidderCompany ? `&company=${encodeURIComponent(bidderCompany)}` : ''}`}
                  className="text-[#D50100] hover:underline font-bold flex items-center gap-1 font-sans"
                >
                  <span>Settle Tenure #{auction.targetOwnershipNumber} via Cashfree →</span>
                </Link>
              </div>
            </div>

            {/* Real Bidder Identification */}
            <div className="p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg text-xs space-y-3 shadow-subtle">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAEAEA]">
                <span className="font-mono text-[#171717] font-bold uppercase tracking-wider text-[11px]">
                  Bidder Identification
                </span>
                <span className="text-[10px] font-mono text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded font-bold">
                  VERIFIED ENTRY
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-[#707070] uppercase block mb-1">Brand / Company *</label>
                  <input
                    type="text"
                    value={bidderCompany}
                    onChange={(e) => setBidderCompany(e.target.value)}
                    placeholder="Brand or entity name"
                    className="w-full px-2.5 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#707070] uppercase block mb-1">Representative Name *</label>
                  <input
                    type="text"
                    value={bidderName}
                    onChange={(e) => setBidderName(e.target.value)}
                    placeholder="Authorized bidder name"
                    className="w-full px-2.5 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-[#707070] uppercase block mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    value={bidderEmail}
                    onChange={(e) => setBidderEmail(e.target.value)}
                    placeholder="corporate@domain.com"
                    className="w-full px-2.5 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] text-[#707070] uppercase block mb-1">Country *</label>
                  <input
                    type="text"
                    value={bidderCountry}
                    onChange={(e) => setBidderCountry(e.target.value)}
                    placeholder="e.g. United States, India, Germany"
                    className="w-full px-2.5 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Quick Increment Shortcuts */}
            {(() => {
              const baseIncrementPrice = auction.currentHighestBid > 0 ? auction.currentHighestBid : auction.openingPrice;
              const quickAmount = baseIncrementPrice + 25;
              const jumpAmount = baseIncrementPrice + 100;
              return (
                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-[#707070] tracking-wider block">
                    Quick Increment Shortcuts (USD)
                  </span>
                  <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => handleOpenConfirm(auction.minimumNextBid)}
                      disabled={auction.isClosed}
                      className="p-2.5 sm:p-3 bg-[#FFFFFF] border border-[#EAEAEA] hover:border-[#171717] text-left rounded transition-all group disabled:opacity-50"
                    >
                      <span className="text-[10px] font-mono text-[#707070] block">
                        {auction.currentHighestBid > 0 ? 'Minimum (+$5)' : 'Opening ($100)'}
                      </span>
                      <span className="text-sm font-bold font-mono text-[#171717] group-hover:text-[#D50100]">
                        {formatUSDOnly(auction.minimumNextBid)}
                      </span>
                      {selectedCurrency !== 'USD' && (
                        <span className="text-[9px] font-mono text-[#707070] block">
                          ≈ {formatAmount(auction.minimumNextBid)}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenConfirm(quickAmount)}
                      disabled={auction.isClosed}
                      className="p-2.5 sm:p-3 bg-[#FFFFFF] border border-[#EAEAEA] hover:border-[#171717] text-left rounded transition-all group disabled:opacity-50"
                    >
                      <span className="text-[10px] font-mono text-[#707070] block">Quick (+$25)</span>
                      <span className="text-sm font-bold font-mono text-[#171717] group-hover:text-[#D50100]">
                        {formatUSDOnly(quickAmount)}
                      </span>
                      {selectedCurrency !== 'USD' && (
                        <span className="text-[9px] font-mono text-[#707070] block">
                          ≈ {formatAmount(quickAmount)}
                        </span>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenConfirm(jumpAmount)}
                      disabled={auction.isClosed}
                      className="p-2.5 sm:p-3 bg-[#FFFFFF] border border-[#EAEAEA] hover:border-[#171717] text-left rounded transition-all group disabled:opacity-50"
                    >
                      <span className="text-[10px] font-mono text-[#707070] block">Jump (+$100)</span>
                      <span className="text-sm font-bold font-mono text-[#171717] group-hover:text-[#D50100]">
                        {formatUSDOnly(jumpAmount)}
                      </span>
                      {selectedCurrency !== 'USD' && (
                        <span className="text-[9px] font-mono text-[#707070] block">
                          ≈ {formatAmount(jumpAmount)}
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Custom Bid Entry Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const amt = parseInt(customBid.replace(/[^0-9]/g, ''), 10);
                if (amt) handleOpenConfirm(amt);
              }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase text-[#707070] tracking-wider block">
                  Specify Custom Amount (USD)
                </label>
                <span className="text-[10px] font-mono text-[#707070]">
                  Denominated strictly in USD
                </span>
              </div>
              <div className="flex flex-col xs:flex-row gap-2.5 sm:gap-3">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[#707070] font-bold">
                    $
                  </span>
                  <input
                    type="text"
                    value={customBid}
                    onChange={(e) => setCustomBid(e.target.value)}
                    placeholder={`Min. $${auction.minimumNextBid.toLocaleString('en-US')}`}
                    disabled={auction.isClosed}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono font-bold text-sm text-[#171717] focus:outline-none focus:border-[#D50100]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={auction.isClosed}
                  className="w-full xs:w-auto px-6 py-2.5 bg-[#D50100] hover:bg-[#B80000] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Review Bid</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Auction Extension Explainer */}
            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-xs text-[#707070] space-y-1">
              <strong className="text-[#171717] block font-sans">Anti-Sniping Engine:</strong>
              <p>
                Any bid placed with less than 2 minutes (120 seconds) remaining triggers an automated <strong>+2:00 minute clock extension</strong>. This guarantees that bidding outcomes reflect genuine willingness to pay rather than mechanical latency advantages.
              </p>
            </div>

          </div>

          {/* Right Column: Bid History Stream & Timestamps (5 Cols) */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
              <div>
                <h3 className="text-sm font-bold font-sans text-[#171717] uppercase tracking-wider">
                  Live Bid History
                </h3>
                <span className="text-[11px] font-mono text-[#707070]">
                  {bids.length} Verified Entries
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#15803D] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded font-bold">
                SYNCED
              </span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {bids.length > 0 ? (
                bids.map((b, idx) => {
                  const isLeader = idx === 0 && b.status === 'valid';
                  return (
                    <div
                      key={b.id}
                      className={`p-3.5 rounded border text-xs font-mono transition-colors ${
                        isLeader
                          ? 'bg-[#FDF2F2] border-[#FECACA]'
                          : 'bg-[#FFFFFF] border-[#EAEAEA]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="font-bold text-[#171717] font-sans flex items-center gap-1.5">
                            <span>{b.bidder_company || b.bidder_name}</span>
                            {isLeader && (
                              <span className="text-[9px] bg-[#D50100] text-white px-1.5 py-0.2 rounded uppercase font-bold">
                                LEADING
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#707070]">
                            {b.bidder_country || 'Global'}
                          </span>
                        </div>

                        <div className="text-right">
                          <div className="font-bold text-[#171717] text-sm">
                            {formatUSDOnly(b.amount, { showCode: true })}
                          </div>
                          {selectedCurrency !== 'USD' && (
                            <div className="text-[10px] text-[#707070]">
                              ≈ {formatAmount(b.amount)}
                            </div>
                          )}
                          <span className="text-[10px] text-[#707070] block mt-0.5">
                            {new Date(b.timestamp_ms || b.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-12 text-center text-xs text-[#707070] font-mono">
                  No bids have been submitted yet. Be the inaugural bidder!
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

      {/* Bid Confirmation Modal */}
      {confirmModalAmount && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] rounded-lg max-w-md w-full p-4 sm:p-6 space-y-4 border border-[#EAEAEA] shadow-modal animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
              <div>
                <h3 className="text-base font-bold text-[#171717] font-sans">
                  Confirm Authoritative Bid
                </h3>
                <span className="text-[10px] font-mono text-[#707070]">
                  Canonical Platform Currency: USD ($)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CurrencySelector />
                <button
                  onClick={() => setConfirmModalAmount(null)}
                  className="text-[#707070] hover:text-[#171717] p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-[#707070]">
                You are submitting an authoritative, legally binding qualifying bid in <strong>Auction #{auction.auctionNumber}</strong>:
              </p>

              <div className="p-3.5 sm:p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#707070] uppercase block">Contractual USD Commitment</span>
                  <span className="text-[9px] bg-[#171717] text-white px-1.5 py-0.2 rounded font-bold uppercase">
                    Canonical
                  </span>
                </div>
                <span className="text-xl sm:text-2xl font-black text-[#D50100] block">
                  {formatUSDOnly(confirmModalAmount, { showCode: true })}
                </span>
                {selectedCurrency !== 'USD' && (
                  <div className="p-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded text-[11px] text-[#171717]">
                    <span className="text-[#707070] block text-[10px] uppercase font-bold">Local Currency Estimate:</span>
                    <span className="font-bold text-[#171717]">{getDualPrice(confirmModalAmount).localEstimate}</span>
                    <span className="text-[9.5px] text-[#707070] block mt-0.5 leading-snug">
                      Conversion estimate calculated from real-time foreign exchange feed. Your official charge and contract are settled in USD.
                    </span>
                  </div>
                )}
                <span className="text-[11px] text-[#171717] font-sans block pt-1">
                  If victorious, you will hold exclusive dominion over THE BIG BANNER for 14 days.
                </span>
              </div>

              <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded text-[11px] text-[#DC2626] space-y-1">
                <strong className="block font-bold">Contractual Notice & Anti-Currency-Alteration:</strong>
                <p className="leading-relaxed">
                  Bids are non-cancellable legal commitments denominated strictly in USD ($). The platform will never silently alter your bid currency. Winning bids require payment settlement within 24 hours.
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-end gap-2 sm:gap-3 border-t border-[#EAEAEA]">
              <button
                type="button"
                onClick={() => setConfirmModalAmount(null)}
                disabled={submitting}
                className="w-full xs:w-auto px-4 py-2 text-xs font-mono text-[#707070] hover:text-[#171717] text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExecuteBid}
                disabled={submitting}
                className="w-full xs:w-auto px-5 py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2"
              >
                <span>{submitting ? 'Transacting...' : `Commit $${confirmModalAmount.toLocaleString('en-US')} USD`}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
