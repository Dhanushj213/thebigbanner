'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Printer, Share2, Check, ExternalLink, QrCode } from 'lucide-react';
import { OwnerRecord } from '@/types';
import { formatDateRange, formatDate, truncateHash } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export const OwnershipCertificate: React.FC<{ owner: OwnerRecord; currency?: 'INR' | 'USD' }> = ({
  owner,
}) => {
  const { formatAmount } = useCurrency();
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center justify-between no-print">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Verifiable Digital Certificate</span>
          <span className="text-zinc-600">•</span>
          <span className="text-white font-bold">{owner.certificateSerial}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-zinc-300 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied!' : 'Share Proof'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-banner-red hover:bg-rose-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* The Luxury Certificate Frame */}
      <div className="relative rounded-2xl p-1 bg-gradient-to-br from-amber-500/40 via-red-600/30 to-amber-700/40 shadow-2xl">
        <div className="relative bg-[#0d0f17] text-white rounded-[15px] p-8 sm:p-12 border-2 border-amber-500/30 overflow-hidden">
          
          {/* Subtle Guilloche / Watermark Pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Luxury Corner Ornaments */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/60" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/60" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/60" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/60" />

          {/* Certificate Header */}
          <div className="text-center space-y-3 pb-8 border-b border-white/10 relative">
            <div className="mx-auto w-16 h-16 bg-black/60 rounded-2xl p-2.5 border border-amber-500/40 flex items-center justify-center shadow-lg">
              <Image
                src="/thebigbannerlogo1.png"
                alt="The Big Banner"
                width={50}
                height={50}
                className="w-full h-full object-contain filter drop-shadow-[0_0_12px_rgba(225,29,72,0.6)]"
              />
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-400 font-bold">
                OFFICIAL CERTIFICATE OF EXCLUSIVE OWNERSHIP
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-serif text-white tracking-wide uppercase mt-1">
                THE BIG BANNER
              </h2>
              <p className="text-xs text-zinc-400 font-mono mt-1">
                ONE BANNER • ONE OWNER • GLOBAL ATTENTION
              </p>
            </div>
          </div>

          {/* Proclamation Body */}
          <div className="py-8 text-center space-y-6">
            <p className="text-xs sm:text-sm font-serif italic text-zinc-300 max-w-xl mx-auto">
              This sovereign document certifies that the organization designated below successfully triumphed in the global auction and held exclusive sovereign dominion over the single digital billboard of THE BIG BANNER.
            </p>

            {/* Brand Spotlight */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10 max-w-lg mx-auto space-y-1">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
                Owner of Record
              </div>
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-amber-200 tracking-wide">
                {owner.brandName}
              </div>
              <div className="text-xs font-mono text-zinc-300 flex items-center justify-center gap-1.5 pt-1">
                <span>{owner.flagEmoji}</span>
                <span>{owner.country}</span>
                <span className="text-zinc-600">•</span>
                <span>Category: {owner.category}</span>
              </div>
            </div>

            {/* Core Credentials Table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2 text-left font-mono">
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">Tenure Slot</span>
                <span className="text-sm font-bold text-white">Tenure #{owner.ownershipNumber}</span>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">Settlement Price</span>
                <span className="text-sm font-bold text-emerald-400">{formatAmount(owner.purchasePrice, { showCode: true })}</span>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">Commenced</span>
                <span className="text-xs font-bold text-zinc-200">{formatDate(owner.startDate)}</span>
              </div>

              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-[10px] text-zinc-500 uppercase block">Concluded</span>
                <span className="text-xs font-bold text-zinc-200">{formatDate(owner.endDate)}</span>
              </div>
            </div>

          </div>

          {/* Certificate Footer / Cryptographic Seal & QR */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
            
            {/* Hash & Serial */}
            <div className="space-y-1 text-center sm:text-left">
              <div>
                <span className="text-zinc-500">Serial: </span>
                <span className="text-white font-bold">{owner.certificateSerial}</span>
              </div>
              <div>
                <span className="text-zinc-500">Tx Hash: </span>
                <span className="text-amber-400/90 text-[11px] font-mono break-all">
                  {truncateHash(owner.transactionHash, 14, 10)}
                </span>
              </div>
              <div className="text-[10px] text-zinc-500">
                Issued on {formatDate(owner.transactionDate)} • Verified & Immutable Record
              </div>
            </div>

            {/* Official Gold Seal Graphic */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full border-2 border-dashed border-amber-400/60 p-1 flex items-center justify-center text-center bg-amber-950/20 shadow-inner">
                <div className="w-full h-full rounded-full border border-amber-500/50 flex flex-col items-center justify-center p-1">
                  <Award className="w-5 h-5 text-amber-400 mb-0.5" />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-amber-300">SEAL OF</span>
                  <span className="text-[7px] text-amber-400/80 font-black">HEGEMONY</span>
                </div>
              </div>

              <div className="w-14 h-14 bg-white rounded-lg p-1.5 flex items-center justify-center" title="Scan to Verify Proof">
                <QrCode className="w-full h-full text-black" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
