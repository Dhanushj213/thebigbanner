'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  ShieldCheck,
  Scale,
  ExternalLink,
  ChevronRight,
  Gavel,
  Lock,
  Globe2,
  Building2,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { LEGAL_DOCUMENTS, LEGAL_CATEGORIES, OPERATOR_DECLARATION } from '@/data/legalDocuments';

export default function LegalCentrePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredDocs = LEGAL_DOCUMENTS.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] pb-24">
      {/* Top Editorial Breadcrumb & Status */}
      <div className="border-b border-[#EAEAEA] bg-[#F8F8F8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs font-mono text-[#707070]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#171717]">THE BIG BANNER</Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold">LEGAL CENTRE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              <span>15 Legal Policies Active</span>
            </span>
            <span>•</span>
            <span className="text-[#707070]">India & Global Framework</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-[#EAEAEA] bg-[#FFFFFF] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[11px] font-mono text-[#D50100] font-bold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5" />
              <span>Statutory Compliance & Governance Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-sans tracking-tight text-[#171717] uppercase">
              LEGAL CENTRE
            </h1>
            <p className="text-base sm:text-lg text-[#707070] max-w-3xl leading-relaxed">
              Clear policies. Transparent operations. Understand your rights and responsibilities when participating in the world’s most exclusive digital advertising marketplace.
            </p>
          </div>

          {/* Operator Identity Banner */}
          <div className="p-4 sm:p-5 bg-[#F8F8F8] border-l-4 border-[#D50100] rounded-r-lg text-xs space-y-1.5">
            <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D50100]" />
              <span>Legal Contracting Operator Declaration</span>
            </div>
            <p className="text-[#707070] leading-relaxed">
              {OPERATOR_DECLARATION} THE BIG BANNER is a commercial brand and digital platform operated by AXIOMIS Technologies and is not an independently incorporated legal entity.
              Visit the verified operator portal at{' '}
              <a
                href="https://axiomis.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D50100] hover:underline font-mono font-semibold inline-flex items-center gap-0.5"
              >
                <span>https://axiomis.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </div>

          {/* Quick Actions Strip */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/legal/compliance"
              className="px-4 py-2 bg-[#171717] hover:bg-[#000000] text-white rounded text-xs font-mono font-bold transition-colors flex items-center gap-2"
            >
              <Globe2 className="w-3.5 h-3.5 text-[#D50100]" />
              <span>Jurisdictional Compliance Matrix →</span>
            </Link>
            <Link
              href="/legal/grievance-redressal"
              className="px-4 py-2 border border-[#EAEAEA] hover:border-[#171717] text-[#171717] rounded text-xs font-mono font-bold transition-colors flex items-center gap-2"
            >
              <Gavel className="w-3.5 h-3.5 text-[#707070]" />
              <span>File Grievance Complaint</span>
            </Link>
            <Link
              href="/legal/cookie-policy"
              className="px-4 py-2 border border-[#EAEAEA] hover:border-[#171717] text-[#171717] rounded text-xs font-mono font-bold transition-colors"
            >
              <span>Cookie Preferences</span>
            </Link>
            <Link
              href="/legal/legal-notice"
              className="px-4 py-2 border border-[#EAEAEA] hover:border-[#171717] text-[#707070] hover:text-[#171717] rounded text-xs font-mono transition-colors"
            >
              <span>Operator Disclosures</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Legal Content Hub */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 space-y-10">
        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#707070] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search legal documents, policies or clauses..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg text-xs font-sans text-[#171717] placeholder-[#707070] focus:outline-none focus:border-[#D50100]"
              />
            </div>

            {/* Document Count */}
            <div className="text-xs font-mono text-[#707070]">
              Showing <strong className="text-[#171717]">{filteredDocs.length}</strong> of {LEGAL_DOCUMENTS.length} official documents
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-[#EAEAEA] pb-4">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#171717] text-white font-bold'
                  : 'bg-[#F8F8F8] text-[#707070] hover:text-[#171717] hover:bg-[#EAEAEA]'
              }`}
            >
              All Documents ({LEGAL_DOCUMENTS.length})
            </button>
            {LEGAL_CATEGORIES.map((cat) => {
              const count = LEGAL_DOCUMENTS.filter((d) => d.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#171717] text-white font-bold'
                      : 'bg-[#F8F8F8] text-[#707070] hover:text-[#171717] hover:bg-[#EAEAEA]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/legal/${doc.slug}`}
              className="group bg-[#FFFFFF] border border-[#EAEAEA] hover:border-[#171717] rounded-xl p-6 transition-all shadow-subtle hover:shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-[#D50100]">
                    DOC {doc.docNumber}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F8F8F8] text-[#707070] border border-[#EAEAEA]">
                    {doc.version}
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-base font-bold font-sans text-[#171717] group-hover:text-[#D50100] transition-colors leading-tight">
                    {doc.title}
                  </h2>
                  <p className="text-xs text-[#707070] line-clamp-2 leading-relaxed">
                    {doc.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAEAEA] flex items-center justify-between text-[11px] font-mono text-[#707070]">
                <span>{doc.category}</span>
                <span className="text-[#D50100] font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 font-sans">
                  <span>Read Document</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-16 bg-[#F8F8F8] rounded-xl border border-[#EAEAEA] space-y-3">
            <AlertTriangle className="w-8 h-8 text-[#D97706] mx-auto" />
            <h3 className="font-sans font-bold text-base text-[#171717]">No Matching Legal Documents Found</h3>
            <p className="text-xs text-[#707070]">Try adjusting your search query or selecting "All Documents".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 bg-[#171717] text-white rounded text-xs font-mono font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Legal Review Disclaimer */}
        <div className="p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl text-xs space-y-2 text-[#707070]">
          <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#15803D]" />
            <span>Pre-Publication Legal Review Notice</span>
          </div>
          <p className="leading-relaxed">
            All legal documentation published herein has been prepared specifically for THE BIG BANNER’s unique commercial advertising auction model, operated by AXIOMIS Technologies. While comprehensive and rigorously structured, matters designated with administrative placeholders (including statutory tax identification numbers and grievance officer assignments) remain subject to final verification and signing by qualified legal counsel prior to formal production filings.
          </p>
        </div>
      </div>
    </div>
  );
}
