'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Award, ArrowLeft, Printer, Share2, Check, ExternalLink, QrCode } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { formatCurrency, formatDate, formatDateRange } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function OwnershipDetailPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const params = useParams();
  const [record, setRecord] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setDeviceView('mobile');
    }
  }, []);

  const id = params?.id as string;

  useEffect(() => {
    async function loadRecord() {
      try {
        const res = await fetch(`/api/ownerships?id=${encodeURIComponent(id)}`);
        if (res.ok) {
          const data = await res.json();
          setRecord(data.record);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    if (id) loadRecord();
  }, [id]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="py-24 text-center font-mono text-xs text-[#707070]">
        Retrieving verified certificate record...
      </div>
    );
  }

  if (!record) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold font-serif text-[#171717]">Record Not Found</h2>
        <p className="text-xs text-[#707070]">No verified historical ownership matches ID &quot;{id}&quot;.</p>
        <Link href="/ownership" className="inline-block px-4 py-2 bg-[#171717] text-white text-xs font-mono rounded">
          ← Return to Ownership Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAEAEA] no-print">
          <Link
            href="/ownership"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#707070] hover:text-[#171717]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Ownership Archive</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-xs font-mono text-[#171717] hover:bg-[#F5F5F5] flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Share Proof'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-[#D50100] hover:bg-[#B80000] text-white rounded text-xs font-bold uppercase tracking-wider font-mono flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>

        {/* Section 1: Exact Creative Display */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 no-print shadow-subtle">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase text-[#707070] font-bold">
              Approved Creative Displayed During Tenure
            </h3>
            <div className="flex gap-2 text-xs font-mono">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`px-2 py-1 rounded ${deviceView === 'desktop' ? 'bg-[#171717] text-white' : 'text-[#707070]'}`}
              >
                Desktop
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`px-2 py-1 rounded ${deviceView === 'mobile' ? 'bg-[#171717] text-white' : 'text-[#707070]'}`}
              >
                Mobile
              </button>
            </div>
          </div>

          <div className="relative bg-[#171717] rounded overflow-hidden">
            {deviceView === 'desktop' ? (
              <div className="relative w-full aspect-[16/6] max-h-[420px]">
                <Image
                  src={record.desktop_creative_url || '/thebigbannerlogo3.png'}
                  alt={record.brand_name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="py-6 flex justify-center bg-[#111111] px-4">
                <div className="relative w-64 max-w-[85vw] aspect-[3/4] rounded-xl overflow-hidden border border-[#2E2E2E] shadow-2xl">
                  <Image
                    src={record.mobile_creative_url || record.desktop_creative_url || '/thebigbannerlogo1.png'}
                    alt={record.brand_name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 2: Official Digital Ownership Certificate */}
        <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-lg p-5 sm:p-14 space-y-6 sm:space-y-8 relative overflow-hidden shadow-card">
          
          {/* Subtle Watermark Border Lines */}
          <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-[#D50100]" />
          <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-[#D50100]" />
          <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-[#D50100]" />
          <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-[#D50100]" />

          {/* Certificate Header */}
          <div className="text-center space-y-3 pb-6 border-b border-[#EAEAEA]">
            <div className="flex justify-center">
              <Logo size="lg" withText={false} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#D50100] font-bold block">
                OFFICIAL CERTIFICATE OF SOVEREIGN OWNERSHIP
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-sans uppercase tracking-tight text-[#171717] mt-1">
                THE BIG BANNER
              </h2>
              <span className="text-xs font-mono text-[#707070]">
                ONE BANNER • ONE OWNER • GLOBAL ATTENTION
              </span>
            </div>
          </div>

          {/* Proclamation */}
          <div className="py-4 text-center space-y-6">
            <p className="text-xs sm:text-sm text-[#707070] italic font-serif max-w-lg mx-auto">
              This document certifies that the organization designated below successfully commanded the single global digital advertising billboard of THE BIG BANNER.
            </p>

            <div className="p-6 bg-[#F8F8F8] border border-[#EAEAEA] rounded max-w-md mx-auto space-y-1">
              <span className="text-[10px] font-mono text-[#707070] uppercase tracking-wider block">
                Verified Owner of Record
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#171717] font-sans">
                {record.brand_name}
              </div>
              <span className="text-xs font-mono text-[#707070] block">
                {record.country}
              </span>
            </div>

            {/* Credentials Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto text-left font-mono text-xs">
              <div className="p-3 border border-[#EAEAEA] rounded bg-[#FFFFFF]">
                <span className="text-[10px] text-[#707070] uppercase block">Tenure Slot</span>
                <strong className="text-[#171717] text-sm">#{record.ownership_number}</strong>
              </div>

              <div className="p-3 border border-[#EAEAEA] rounded bg-[#FFFFFF]">
                <span className="text-[10px] text-[#707070] uppercase block">Purchase Price</span>
                <strong className="text-[#15803D] text-sm block">{formatUSDOnly(record.purchase_price)}</strong>
                {selectedCurrency !== 'USD' && (
                  <span className="text-[10px] text-[#707070] block">
                    ≈ {formatAmount(record.purchase_price)}
                  </span>
                )}
              </div>

              <div className="p-3 border border-[#EAEAEA] rounded bg-[#FFFFFF]">
                <span className="text-[10px] text-[#707070] uppercase block">Commenced</span>
                <span className="text-[#171717]">{formatDate(record.start_date)}</span>
              </div>

              <div className="p-3 border border-[#EAEAEA] rounded bg-[#FFFFFF]">
                <span className="text-[10px] text-[#707070] uppercase block">Concluded</span>
                <span className="text-[#171717]">{formatDate(record.end_date)}</span>
              </div>
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="pt-6 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-[#707070]">
            <div className="space-y-1 text-center sm:text-left">
              <div>
                <span>Serial Number: </span>
                <strong className="text-[#171717]">{record.certificate_serial}</strong>
              </div>
              <div className="text-[11px] break-all">
                <span>Cryptographic Hash: </span>
                <span className="text-[#D50100]">{record.transaction_hash}</span>
              </div>
              <div className="text-[10px] text-[#707070]">
                Verified on immutable ledger • Authoritative Record
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 border-2 border-dashed border-[#D50100] rounded-full p-1 flex items-center justify-center text-center">
                <div className="w-full h-full rounded-full border border-[#D50100] flex flex-col items-center justify-center">
                  <span className="text-[7px] font-bold text-[#D50100] uppercase tracking-widest leading-none">SEAL OF</span>
                  <span className="text-[6px] font-black text-[#171717] leading-none mt-0.5">HEGEMONY</span>
                </div>
              </div>

              <div className="w-14 h-14 bg-[#FFFFFF] border border-[#EAEAEA] p-1 flex items-center justify-center">
                <QrCode className="w-full h-full text-[#171717]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
