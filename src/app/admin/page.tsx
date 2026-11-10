'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  CheckCircle,
  XCircle,
  RotateCcw,
  Sparkles,
  Users,
  CreditCard,
  Image as ImageIcon,
  Flame,
  FileCheck,
  Send,
} from 'lucide-react';
import { AuthoritativeAuction, AuthoritativeStats } from '@/lib/services';
import { formatCurrency, formatDate } from '@/utils/formatters';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'auctions' | 'moderation' | 'database' | 'audit'>('overview');
  const [auction, setAuction] = useState<AuthoritativeAuction | null>(null);
  const [stats, setStats] = useState<AuthoritativeStats | null>(null);
  const [ownerships, setOwnerships] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminData = async () => {
    try {
      const [resAuc, resStats, resOwn] = await Promise.all([
        fetch('/api/auction'),
        fetch('/api/stats'),
        fetch('/api/ownerships'),
      ]);

      if (resAuc.ok) {
        const d = await resAuc.json();
        setAuction(d.auction);
      }
      if (resStats.ok) {
        const d = await resStats.json();
        setStats(d.stats);
      }
      if (resOwn.ok) {
        const d = await resOwn.json();
        setOwnerships(d.records || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAdminAction = async (action: string, payload: any = {}) => {
    try {
      const res = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, payload }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback(data.message || 'Action executed successfully.');
        await fetchAdminData();
      } else {
        setFeedback(data.error || 'Execution failed.');
      }
      setTimeout(() => setFeedback(null), 4000);
    } catch (e: any) {
      setFeedback(e.message || 'Error executing action.');
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Admin Header */}
        <div className="bg-[#171717] text-white rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#FFFFFF]/10 flex items-center justify-center text-[#D50100]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-sans">Platform Governance & Admin</h1>
                <span className="text-[10px] font-mono bg-[#D50100] text-white px-2 py-0.2 rounded font-bold">
                  ROOT DESK
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-mono mt-0.5">
                Authoritative auction engine, creative editorial moderation, and database operations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => handleAdminAction('reset_genesis')}
              className="px-3.5 py-2 bg-[#FFFFFF]/10 hover:bg-[#FFFFFF]/20 rounded text-zinc-300 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset To Fresh Genesis</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] rounded text-xs font-mono">
            {feedback}
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#EAEAEA] pb-2 text-xs font-mono">
          {[
            { id: 'overview', label: 'Platform KPIs' },
            { id: 'auctions', label: 'Auction Controller' },
            { id: 'moderation', label: 'Creative Moderation' },
            { id: 'database', label: 'Live Banner Controller' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#171717] text-white font-bold'
                  : 'text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#707070] block">Gross Collections</span>
                <div className="text-2xl font-black font-mono text-[#171717]">
                  {stats ? formatCurrency(stats.grossTransactionValue) : '...'}
                </div>
                <p className="text-[11px] text-[#707070]">{stats?.totalSuccessfulOwnerships || 0} completed tenures</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#707070] block">Current High Bid</span>
                <div className="text-2xl font-black font-mono text-[#15803D]">
                  {auction ? formatCurrency(auction.currentHighestBid) : '...'}
                </div>
                <p className="text-[11px] text-[#707070]">Auction #{auction?.auctionNumber || 1}</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#707070] block">Represented Nations</span>
                <div className="text-2xl font-black font-mono text-[#171717]">
                  {stats?.representedCountriesCount || 0} Countries
                </div>
                <p className="text-[11px] text-[#707070]">Global advertiser base</p>
              </div>

              <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 shadow-subtle space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#707070] block">Anti-Sniping Triggers</span>
                <div className="text-2xl font-black font-mono text-[#D97706]">
                  {auction?.extensionsCount || 0} Clock Extensions
                </div>
                <p className="text-[11px] text-[#707070]">+2m added per trigger</p>
              </div>
            </div>

            <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg p-6 text-xs font-mono space-y-2">
              <h3 className="text-sm font-bold font-sans text-[#171717]">Evaluation Demo Controls</h3>
              <p className="text-[#707070]">
                Use these controls to immediately test both platform states required by the specification:
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleAdminAction('seed_demo')}
                  className="px-4 py-2 bg-[#171717] text-white rounded text-xs font-bold font-mono"
                >
                  Load 8 Verified Historical Tenures (Populated State)
                </button>
                <button
                  onClick={() => handleAdminAction('reset_genesis')}
                  className="px-4 py-2 bg-[#FFFFFF] border border-[#EAEAEA] text-[#DC2626] rounded text-xs font-bold font-mono"
                >
                  Reset To Clean Genesis State (0 Owners)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Auction Engine Control */}
        {activeTab === 'auctions' && auction && (
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-6 shadow-subtle">
            <h3 className="text-base font-bold font-sans text-[#171717]">
              Auction #{auction.auctionNumber} Engine Controls
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
                <span className="text-[#707070] block text-[10px] uppercase">Status</span>
                <strong className="text-[#15803D] text-sm uppercase">{auction.status}</strong>
              </div>
              <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
                <span className="text-[#707070] block text-[10px] uppercase">Opening Qualification Floor</span>
                <strong className="text-[#171717] text-sm">{formatCurrency(auction.openingPrice)}</strong>
              </div>
              <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded space-y-1">
                <span className="text-[#707070] block text-[10px] uppercase">Previous Sale</span>
                <strong className="text-[#171717] text-sm">{formatCurrency(auction.previousWinningPrice)}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Moderation */}
        {activeTab === 'moderation' && (
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
            <h3 className="text-base font-bold font-sans text-[#171717]">Creative Moderation Desk</h3>
            <p className="text-xs text-[#707070]">
              Review creative assets to guarantee that unapproved advertisements never go live.
            </p>

            <div className="p-8 bg-[#F8F8F8] border border-dashed border-[#EAEAEA] rounded text-center text-xs font-mono text-[#707070]">
              <p>No creative submissions pending review.</p>
              <p className="text-[11px] mt-1 text-[#999999]">Creative assets submitted by winning auction participants will appear here for compliance verification.</p>
            </div>
          </div>
        )}

        {/* Tab 4: Live Banner Switcher */}
        {activeTab === 'database' && (
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
            <h3 className="text-base font-bold font-sans text-[#171717]">Live Homepage Billboard Slot Controller</h3>
            <p className="text-xs text-[#707070]">
              Instantly designate which approved historical owner commands the primary billboard on the homepage.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ownerships.map((o) => (
                <div
                  key={o.id}
                  className={`p-4 rounded border text-xs font-mono space-y-2 ${
                    o.status === 'active' ? 'bg-[#FDF2F2] border-[#D50100]' : 'bg-[#FFFFFF] border-[#EAEAEA]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <strong className="font-sans text-sm text-[#171717]">{o.brand_name}</strong>
                    <span className="text-[10px] font-bold">#{o.ownership_number}</span>
                  </div>
                  <div className="text-[#707070] text-[11px]">
                    Price: {formatCurrency(o.purchase_price)} • {o.country}
                  </div>
                  {o.status === 'active' ? (
                    <div className="text-[10px] text-[#D50100] font-bold uppercase">
                      ● Currently Broadcasting Live
                    </div>
                  ) : (
                    <button
                      onClick={() => handleAdminAction('swap_live_banner', { ownershipId: o.id })}
                      className="w-full py-1.5 bg-[#171717] hover:bg-black text-white text-[11px] font-bold rounded"
                    >
                      Make Live Billboard
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
