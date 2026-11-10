'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe2,
  Scale,
  ShieldCheck,
  Building2,
  ArrowLeft,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { COMPLIANCE_MATRIX } from '@/data/complianceMatrix';

export default function ComplianceMatrixPage() {
  const [filterRegion, setFilterRegion] = useState<string>('All');

  const filteredEntries = COMPLIANCE_MATRIX.filter((item) => {
    if (filterRegion === 'All') return true;
    if (filterRegion === 'India') return item.jurisdiction.includes('India');
    if (filterRegion === 'International') return !item.jurisdiction.includes('India');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] pb-24">
      {/* Editorial Breadcrumbs */}
      <div className="border-b border-[#EAEAEA] bg-[#F8F8F8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs font-mono text-[#707070]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#171717]">THE BIG BANNER</Link>
            <span>/</span>
            <Link href="/legal" className="hover:text-[#171717]">LEGAL CENTRE</Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold">COMPLIANCE MATRIX</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#EAEAEA] text-[#171717]">
              STATUTORY COMPLIANCE FRAMEWORK
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-[#EAEAEA] bg-[#FFFFFF] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <Link
            href="/legal"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#707070] hover:text-[#D50100] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Legal Centre</span>
          </Link>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[11px] font-mono text-[#15803D] font-bold uppercase">
              <Globe2 className="w-3.5 h-3.5" />
              <span>Multi-Jurisdictional Statutory Audit</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-[#171717] uppercase">
              JURISDICTIONAL COMPLIANCE MATRIX
            </h1>
            <p className="text-sm sm:text-base text-[#707070] max-w-3xl leading-relaxed">
              Transparent assessment of applicable domestic Indian legislation, cross-border privacy mandates, consumer protection rules, and financial regulations governing THE BIG BANNER.
            </p>
          </div>

          {/* Operator Declaration Callout */}
          <div className="p-4 bg-[#F8F8F8] border-l-4 border-[#171717] rounded-r-lg text-xs space-y-1">
            <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#D50100]" />
              <span>Responsible Operator Identity</span>
            </div>
            <p className="text-[#707070] leading-relaxed">
              All statutory compliance obligations are administered directly by AXIOMIS Technologies, operating from India. Official operator portal:{' '}
              <a
                href="https://axiomis.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D50100] font-mono hover:underline inline-flex items-center gap-0.5"
              >
                <span>https://axiomis.in</span>
                <ExternalLink className="w-3 h-3" />
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-8">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#EAEAEA] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterRegion('All')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                filterRegion === 'All'
                  ? 'bg-[#171717] text-white font-bold'
                  : 'bg-[#F8F8F8] text-[#707070] hover:text-[#171717]'
              }`}
            >
              All Frameworks ({COMPLIANCE_MATRIX.length})
            </button>
            <button
              onClick={() => setFilterRegion('India')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                filterRegion === 'India'
                  ? 'bg-[#171717] text-white font-bold'
                  : 'bg-[#F8F8F8] text-[#707070] hover:text-[#171717]'
              }`}
            >
              Domestic India ({COMPLIANCE_MATRIX.filter((i) => i.jurisdiction.includes('India')).length})
            </button>
            <button
              onClick={() => setFilterRegion('International')}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                filterRegion === 'International'
                  ? 'bg-[#171717] text-white font-bold'
                  : 'bg-[#F8F8F8] text-[#707070] hover:text-[#171717]'
              }`}
            >
              International Markets ({COMPLIANCE_MATRIX.filter((i) => !i.jurisdiction.includes('India')).length})
            </button>
          </div>

          <div className="text-xs font-mono text-[#707070]">
            Last Reviewed: <strong>November 10, 2026</strong>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto border border-[#EAEAEA] rounded-xl shadow-subtle">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F8F8] border-b border-[#EAEAEA] font-mono text-[11px] text-[#707070] uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Jurisdiction & Law</th>
                <th className="py-3.5 px-4">Applicability Trigger</th>
                <th className="py-3.5 px-4">Platform Activity</th>
                <th className="py-3.5 px-4">Implemented Safeguards</th>
                <th className="py-3.5 px-4">Review Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAEAEA] bg-[#FFFFFF]">
              {filteredEntries.map((entry, idx) => (
                <tr key={idx} className="hover:bg-[#F8F8F8]/50 transition-colors">
                  <td className="py-4 px-4 align-top space-y-1 w-64">
                    <span className="font-mono font-bold text-[#D50100] text-[10px] uppercase block">
                      {entry.jurisdiction}
                    </span>
                    <strong className="font-sans font-bold text-xs text-[#171717] block leading-snug">
                      {entry.framework}
                    </strong>
                    <span className="text-[10px] text-[#707070] font-mono block">
                      Operator: {entry.responsibleOperator}
                    </span>
                  </td>

                  <td className="py-4 px-4 align-top text-xs text-[#707070] leading-relaxed w-64">
                    {entry.applicabilityTrigger}
                  </td>

                  <td className="py-4 px-4 align-top text-xs text-[#171717] font-medium leading-relaxed w-56">
                    {entry.platformActivity}
                  </td>

                  <td className="py-4 px-4 align-top text-xs text-[#707070] leading-relaxed">
                    <ul className="space-y-1 list-disc pl-3.5">
                      {entry.complianceMeasures.map((measure, mIdx) => (
                        <li key={mIdx}>{measure}</li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-4 px-4 align-top font-mono text-[10px] whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded font-bold ${
                        entry.legalReviewStatus === 'Confirmed'
                          ? 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                          : 'bg-amber-50 text-[#D97706] border border-amber-200'
                      }`}
                    >
                      {entry.legalReviewStatus === 'Confirmed' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      <span>{entry.legalReviewStatus}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Guidance */}
        <div className="p-6 bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl text-xs space-y-2 text-[#707070]">
          <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-2">
            <Scale className="w-4 h-4 text-[#D50100]" />
            <span>Methodology & Legal Research Standard</span>
          </div>
          <p className="leading-relaxed">
            Statutory applicability determinations in this matrix are derived from primary legislative enactments, government notifications (Ministry of Electronics and Information Technology, Central Board of Indirect Taxes and Customs, Ministry of Consumer Affairs), and authoritative regulatory guidelines. Formal pre-publication sign-off ensures complete legal alignment prior to commercial scaling.
          </p>
        </div>

      </div>
    </div>
  );
}
