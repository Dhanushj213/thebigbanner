'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, ArrowUpDown, Award, ExternalLink, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';

export default function OwnershipHistoryPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount } = useCurrency();
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('all');
  const [sortBy, setSortBy] = useState('number');
  const [loading, setLoading] = useState(true);

  const fetchRecords = async () => {
    try {
      const params = new URLSearchParams();
      if (search) params.set('search', search);
      if (country !== 'all') params.set('country', country);
      if (sortBy) params.set('sortBy', sortBy);

      const res = await fetch(`/api/ownerships?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data.records || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [search, country, sortBy]);

  const countries = ['all', 'United States', 'Switzerland', 'Germany', 'Japan', 'Singapore', 'India', 'United Kingdom', 'United Arab Emirates'];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-[#EAEAEA] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D50100] uppercase font-bold tracking-wider">
            <Award className="w-4 h-4" />
            <span>PERMANENT PUBLIC REGISTER</span>
          </div>
          <h1 className="text-2xl xs:text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Ownership Archive & History
          </h1>
          <p className="text-xs sm:text-sm text-[#707070] max-w-2xl">
            The immutable ledger of organizations that have held sovereign dominion over THE BIG BANNER.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg p-3 sm:p-5 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#707070] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by advertiser or country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto font-mono text-xs">
            <div className="flex items-center justify-between sm:justify-start gap-1.5 text-[#707070]">
              <span>Country:</span>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="bg-[#FFFFFF] border border-[#EAEAEA] px-2.5 py-1.5 rounded text-[#171717] text-xs focus:outline-none focus:border-[#D50100] flex-1 sm:flex-initial"
              >
                {countries.map((c) => (
                  <option key={c} value={c}>{c === 'all' ? 'All Countries' : c}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-1.5 text-[#707070]">
              <span>Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FFFFFF] border border-[#EAEAEA] px-2.5 py-1.5 rounded text-[#171717] text-xs focus:outline-none focus:border-[#D50100] flex-1 sm:flex-initial"
              >
                <option value="number">Ownership # (Latest First)</option>
                <option value="price_desc">Highest Price First</option>
                <option value="price_asc">Lowest Price First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Records Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs text-[#707070]">
            Loading historical ledger records...
          </div>
        ) : records.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {records.map((r) => (
              <div
                key={r.id}
                className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#171717] transition-all shadow-subtle group"
              >
                <div>
                  {/* Banner Creative Preview */}
                  <div className="relative aspect-[16/8] bg-[#F5F5F5] overflow-hidden">
                    <Image
                      src={r.desktop_creative_url || '/thebigbannerlogo3.png'}
                      alt={r.brand_name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FFFFFF] text-[#171717] font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-sm">
                      TENURE #{r.ownership_number}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#171717] font-sans">
                        {r.brand_name}
                      </h3>
                      <span className="text-xs font-mono text-[#707070]">
                        {r.country}
                      </span>
                    </div>

                    <p className="text-xs text-[#707070] font-sans line-clamp-2">
                      {r.ad_title || 'Verified Exclusive Placement'}
                    </p>

                    <div className="pt-2 text-xs font-mono space-y-1 text-[#707070]">
                      <div className="flex items-center justify-between">
                        <span>Settlement Price:</span>
                        <div className="text-right">
                          <strong className="text-[#15803D] block">{formatAmount(r.purchase_price, { showCode: true })}</strong>
                          {selectedCurrency !== 'USD' && (
                            <span className="text-[10px] text-[#707070] block">
                              ≈ ${r.purchase_price.toLocaleString('en-US')} USD
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Dates:</span>
                        <span>{formatDate(r.start_date)} — {formatDate(r.end_date)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <span className="text-[#15803D] font-bold">VERIFIED ON RECORD</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-4 bg-[#F8F8F8] border-t border-[#EAEAEA] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#707070] text-[10px] truncate max-w-[150px]">
                    Hash: {r.transaction_hash.slice(0, 10)}...
                  </span>

                  <Link
                    href={`/ownership/${r.id}`}
                    className="text-[#D50100] hover:underline font-bold flex items-center gap-1 font-sans"
                  >
                    <span>View Record</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#F8F8F8] border border-dashed border-[#EAEAEA] rounded-lg p-16 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-[#D50100] mx-auto" />
            <h3 className="text-base font-bold font-sans text-[#171717]">
              No Ownership Records Found
            </h3>
            <p className="text-xs text-[#707070] max-w-md mx-auto">
              There are currently no historical owners matching your query. As auctions conclude, verified ownerships are permanently cataloged here.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
