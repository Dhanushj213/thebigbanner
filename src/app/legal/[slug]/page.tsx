'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FileText,
  Printer,
  Share2,
  Calendar,
  Building2,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  ArrowLeft,
  List,
  CheckCircle2,
} from 'lucide-react';
import { getLegalDocumentBySlug, LEGAL_DOCUMENTS } from '@/data/legalDocuments';
import { CookiePreferenceCentre } from '@/components/CookiePreferenceCentre';
import { GrievanceForm } from '@/components/GrievanceForm';
import { PrivacyRequestForm } from '@/components/PrivacyRequestForm';

export default function LegalDocumentReaderPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const doc = getLegalDocumentBySlug(slug);

  const [mobileTocOpen, setMobileTocOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!doc) {
    notFound();
  }

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] pb-24">
      {/* Editorial Breadcrumbs */}
      <div className="border-b border-[#EAEAEA] bg-[#F8F8F8]/60 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between text-xs font-mono text-[#707070]">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#171717]">THE BIG BANNER</Link>
            <span>/</span>
            <Link href="/legal" className="hover:text-[#171717]">LEGAL CENTRE</Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold uppercase">{doc.title}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FFFFFF] border border-[#EAEAEA] text-[#171717]">
              DOC {doc.docNumber} • {doc.version}
            </span>
          </div>
        </div>
      </div>

      {/* Document Header */}
      <div className="border-b border-[#EAEAEA] bg-[#FFFFFF] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/legal"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#707070] hover:text-[#D50100] transition-colors print:hidden"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Legal Centre</span>
          </Link>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-[#F8F8F8] border border-[#EAEAEA] text-[10px] font-mono font-bold text-[#D50100]">
                {doc.category}
              </span>
              <span className="text-xs font-mono text-[#707070]">•</span>
              <span className="text-xs font-mono text-[#707070]">
                Version: <strong className="text-[#171717]">{doc.version}</strong>
              </span>
              <span className="text-xs font-mono text-[#707070]">•</span>
              <span className="text-xs font-mono text-[#707070]">
                Effective: <strong className="text-[#171717]">{doc.effectiveDate}</strong>
              </span>
              <span className="text-xs font-mono text-[#707070]">•</span>
              <span className="text-xs font-mono text-[#707070]">
                Last Updated: <strong className="text-[#171717]">{doc.lastUpdated}</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight text-[#171717]">
              {doc.title}
            </h1>
            <p className="text-sm sm:text-base text-[#707070] max-w-3xl leading-relaxed">
              {doc.subtitle}
            </p>
          </div>

          {/* Operator Declaration Callout */}
          <div className="p-4 bg-[#F8F8F8] border-l-4 border-[#171717] rounded-r-lg text-xs space-y-1">
            <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-[#D50100]" />
              <span>Contracting Party & Legal Operator</span>
            </div>
            <p className="text-[#707070] leading-relaxed">
              {doc.operatorStatement} Operator website:{' '}
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

          {/* Print & Action Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA] print:hidden">
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 border border-[#EAEAEA] hover:border-[#171717] text-[#171717] rounded text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Download PDF</span>
              </button>
              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 border border-[#EAEAEA] hover:border-[#171717] text-[#707070] hover:text-[#171717] rounded text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'URL Copied!' : 'Share Document'}</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-[#707070] hidden sm:block">
              Status: <span className="text-[#15803D] font-bold">Authoritative Active Publication</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Document Body Layout (Reader + Sticky Table of Contents) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-3 hidden lg:block print:hidden">
            <div className="sticky top-24 space-y-4 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <div className="font-mono font-bold text-xs uppercase tracking-wider text-[#171717] flex items-center gap-2 pb-2 border-b border-[#EAEAEA]">
                <List className="w-3.5 h-3.5 text-[#D50100]" />
                <span>Table of Contents</span>
              </div>
              <nav className="space-y-1 text-xs">
                {doc.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1.5 px-2 rounded text-[#707070] hover:text-[#171717] hover:bg-[#F8F8F8] transition-colors leading-snug"
                  >
                    <span className="font-mono text-[#D50100] font-bold mr-1.5">{sec.number}.</span>
                    <span>{sec.title}</span>
                  </a>
                ))}
              </nav>

              {/* Related Policies Widget */}
              <div className="pt-6 border-t border-[#EAEAEA] space-y-2">
                <span className="font-mono text-[11px] font-bold uppercase text-[#707070] block">
                  Related Policies
                </span>
                <ul className="space-y-1.5 text-xs">
                  {doc.relatedLinks.map((rel) => (
                    <li key={rel.slug}>
                      <Link
                        href={`/legal/${rel.slug}`}
                        className="text-[#171717] hover:text-[#D50100] hover:underline flex items-center gap-1 font-sans"
                      >
                        <ChevronRight className="w-3 h-3 text-[#D50100]" />
                        <span>{rel.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Mobile Table of Contents Accordion */}
          <div className="lg:hidden col-span-1 print:hidden">
            <button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="w-full p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg font-mono text-xs font-bold text-[#171717] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-[#D50100]" />
                <span>Document Table of Contents ({doc.sections.length} Sections)</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 transition-transform ${mobileTocOpen ? 'rotate-90' : ''}`}
              />
            </button>

            {mobileTocOpen && (
              <div className="mt-2 p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg space-y-2 text-xs">
                {doc.sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    onClick={() => setMobileTocOpen(false)}
                    className="block py-1 text-[#707070] hover:text-[#171717]"
                  >
                    <span className="font-mono text-[#D50100] font-bold mr-1.5">{sec.number}.</span>
                    <span>{sec.title}</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Full Document Reading Text */}
          <main className="lg:col-span-9 space-y-12">
            {/* Introductory Description Callout */}
            <div className="p-5 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg text-xs leading-relaxed text-[#707070]">
              <strong className="text-[#171717] font-sans block mb-1">Scope & Applicability:</strong>
              {doc.description}
            </div>

            {/* Document Sections */}
            <div className="space-y-10 divide-y divide-[#EAEAEA]">
              {doc.sections.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className={`scroll-mt-28 space-y-4 ${idx > 0 ? 'pt-8' : ''}`}
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#D50100]">
                      {sec.number}.
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#171717] tracking-tight">
                      {sec.title}
                    </h2>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm text-[#707070] leading-relaxed">
                    {sec.content.map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Subclauses if any */}
                  {sec.subclauses && sec.subclauses.length > 0 && (
                    <div className="space-y-3 pt-2 pl-2 sm:pl-4 border-l-2 border-[#EAEAEA]">
                      {sec.subclauses.map((sub) => (
                        <div key={sub.number} className="space-y-1 text-xs">
                          <div className="font-mono font-bold text-[#171717] flex items-center gap-1.5">
                            <span className="text-[#D50100]">{sub.number}</span>
                            <span>{sub.title}</span>
                          </div>
                          <p className="text-[#707070] leading-relaxed pl-4">
                            {sub.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Embedded Interactive Features Depending on Document */}
            {slug === 'cookie-policy' && (
              <div className="pt-8 border-t border-[#EAEAEA] print:hidden">
                <CookiePreferenceCentre />
              </div>
            )}

            {slug === 'grievance-redressal' && (
              <div className="pt-8 border-t border-[#EAEAEA] print:hidden">
                <GrievanceForm />
              </div>
            )}

            {slug === 'privacy-policy' && (
              <div className="pt-8 border-t border-[#EAEAEA] print:hidden">
                <PrivacyRequestForm />
              </div>
            )}

            {/* Bottom Document Footer & Related Navigation */}
            <div className="pt-10 border-t-2 border-[#171717] space-y-6 print:hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#707070]">
                <div>
                  Document Reference: <strong className="text-[#171717]">DOC-{doc.docNumber}-{doc.version}</strong>
                </div>
                <div>
                  Operating Business: <strong className="text-[#171717]">AXIOMIS Technologies (India)</strong>
                </div>
              </div>

              <div className="p-5 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg space-y-3 text-xs">
                <div className="font-bold text-[#171717] font-sans">
                  Related Platform Documentation & Policies
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {doc.relatedLinks.map((rel) => (
                    <Link
                      key={rel.slug}
                      href={`/legal/${rel.slug}`}
                      className="p-2.5 bg-[#FFFFFF] border border-[#EAEAEA] hover:border-[#171717] rounded text-[#171717] text-xs font-mono flex items-center justify-between group transition-colors"
                    >
                      <span>{rel.title}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-[#D50100] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}
