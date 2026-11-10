'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldAlert,
  Scale,
  CheckCircle2,
  AlertTriangle,
  History,
  Building2,
  ExternalLink,
  Users,
  Search,
  Filter,
  Eye,
  Edit3,
  Download,
  Gavel,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { LEGAL_DOCUMENTS, LegalDocument } from '@/data/legalDocuments';

export default function AdminLegalManagementPage() {
  const [stats, setStats] = useState<any>(null);
  const [documents, setDocuments] = useState<LegalDocument[]>(LEGAL_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);
  const [editStatus, setEditStatus] = useState<string>('Published');
  const [reviewRequired, setReviewRequired] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    try {
      const res = await fetch('/api/admin/legal');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      // Offline fallback
    }
  };

  const handleSelectDoc = (doc: LegalDocument) => {
    setSelectedDoc(doc);
    setEditStatus(doc.status);
    setReviewRequired(doc.requiresLegalReview);
  };

  const handleUpdateStatus = async () => {
    if (!selectedDoc) return;
    setStatusMessage('Updating document governance state...');

    try {
      const res = await fetch('/api/admin/legal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'DOCUMENT_STATUS_UPDATED',
          documentSlug: selectedDoc.slug,
          actorId: 'usr_admin',
          details: `Updated status to "${editStatus}" (Legal Review Required: ${reviewRequired})`,
        }),
      });

      if (res.ok) {
        setDocuments((prev) =>
          prev.map((d) =>
            d.slug === selectedDoc.slug
              ? { ...d, status: editStatus as any, requiresLegalReview: reviewRequired }
              : d
          )
        );
        setSelectedDoc((prev) =>
          prev ? { ...prev, status: editStatus as any, requiresLegalReview: reviewRequired } : null
        );
        setStatusMessage('Document status successfully recorded in legal audit trail.');
        fetchAdminStats();
        setTimeout(() => setStatusMessage(null), 4000);
      }
    } catch (e) {
      setStatusMessage('Failed to update document status.');
    }
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#171717] pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-[#EAEAEA] bg-[#F8F8F8]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs font-mono text-[#707070]">
          <div className="flex items-center gap-2">
            <Link href="/admin" className="hover:text-[#171717]">ADMIN CONSOLE</Link>
            <span>/</span>
            <span className="text-[#171717] font-semibold">LEGAL & COMPLIANCE DESK</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#15803D]" />
            <span className="text-[#171717] font-bold">AXIOMIS Technologies Governance Engine</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="border-b border-[#EAEAEA] bg-[#FFFFFF] py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[11px] font-mono text-[#D50100] font-bold uppercase">
                <Scale className="w-3.5 h-3.5" />
                <span>Statutory Governance & Policy Management</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-sans tracking-tight text-[#171717] mt-2">
                LEGAL DOCUMENT MANAGEMENT
              </h1>
              <p className="text-xs sm:text-sm text-[#707070] mt-1 max-w-2xl">
                Manage all 15 authoritative legal policies, review pre-publication checklists, inspect user acceptance records, and track statutory audit logs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/legal"
                target="_blank"
                className="px-4 py-2 border border-[#EAEAEA] hover:border-[#171717] rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <span>View Public Legal Centre</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
              <button
                onClick={fetchAdminStats}
                className="p-2 border border-[#EAEAEA] hover:border-[#171717] rounded text-[#707070] hover:text-[#171717]"
                title="Refresh Metrics"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg">
              <span className="text-[10px] font-mono uppercase text-[#707070] block">Active Policies</span>
              <span className="text-2xl font-black font-mono text-[#171717] mt-1 block">
                {documents.length} Documents
              </span>
              <span className="text-[10px] font-mono text-[#15803D]">100% Comprehensive</span>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg">
              <span className="text-[10px] font-mono uppercase text-[#707070] block">Total Acceptances</span>
              <span className="text-2xl font-black font-mono text-[#171717] mt-1 block">
                {stats?.totalAcceptances || 0} Records
              </span>
              <span className="text-[10px] font-mono text-[#707070]">Immutable Server Logs</span>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg">
              <span className="text-[10px] font-mono uppercase text-[#707070] block">Grievance Tickets</span>
              <span className="text-2xl font-black font-mono text-[#171717] mt-1 block">
                {stats?.grievanceCount || 0} Active
              </span>
              <span className="text-[10px] font-mono text-[#D97706]">Rule 3(2) IT Rules Desk</span>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg">
              <span className="text-[10px] font-mono uppercase text-[#707070] block">Privacy Inquiries</span>
              <span className="text-2xl font-black font-mono text-[#171717] mt-1 block">
                {stats?.privacyCount || 0} Inquiries
              </span>
              <span className="text-[10px] font-mono text-[#15803D]">DPDP Act / GDPR Desk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Documents Table List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#707070] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter documents by name or slug..."
                  className="w-full pl-9 pr-3 py-2 bg-[#FFFFFF] border border-[#EAEAEA] rounded text-xs font-sans text-[#171717] focus:outline-none focus:border-[#D50100]"
                />
              </div>
              <span className="text-xs font-mono text-[#707070] whitespace-nowrap">
                {filteredDocs.length} Policies
              </span>
            </div>

            <div className="border border-[#EAEAEA] rounded-xl overflow-hidden shadow-subtle">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8F8F8] border-b border-[#EAEAEA] font-mono text-[10px] text-[#707070] uppercase">
                  <tr>
                    <th className="py-3 px-3.5">Doc #</th>
                    <th className="py-3 px-3.5">Policy Title</th>
                    <th className="py-3 px-3.5">Version</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] bg-[#FFFFFF]">
                  {filteredDocs.map((doc) => {
                    const isSelected = selectedDoc?.slug === doc.slug;
                    return (
                      <tr
                        key={doc.slug}
                        onClick={() => handleSelectDoc(doc)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-red-50/50' : 'hover:bg-[#F8F8F8]'
                        }`}
                      >
                        <td className="py-3 px-3.5 font-mono font-bold text-[#D50100]">
                          {doc.docNumber}
                        </td>
                        <td className="py-3 px-3.5">
                          <strong className="font-sans text-xs text-[#171717] block">
                            {doc.title}
                          </strong>
                          <span className="text-[10px] text-[#707070] font-mono">
                            /{doc.slug}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 font-mono text-[#707070]">
                          {doc.version}
                        </td>
                        <td className="py-3 px-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              doc.status === 'Published'
                                ? 'bg-emerald-50 text-[#15803D] border border-emerald-200'
                                : 'bg-amber-50 text-[#D97706] border border-amber-200'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </td>
                        <td className="py-3 px-3.5 text-right">
                          <Link
                            href={`/legal/${doc.slug}`}
                            target="_blank"
                            onClick={(e) => e.stopPropagation()}
                            className="text-[#707070] hover:text-[#D50100] p-1 inline-block"
                            title="Preview Public Reader"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Document Governance Editor */}
          <div className="lg:col-span-5 space-y-6">
            {selectedDoc ? (
              <div className="p-6 bg-[#FFFFFF] border-2 border-[#171717] rounded-xl space-y-5 shadow-subtle">
                <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-3">
                  <div>
                    <span className="font-mono text-xs text-[#D50100] font-bold">
                      DOC {selectedDoc.docNumber} • {selectedDoc.category}
                    </span>
                    <h3 className="text-base font-bold font-sans text-[#171717]">
                      {selectedDoc.title}
                    </h3>
                  </div>
                  <Link
                    href={`/legal/${selectedDoc.slug}`}
                    target="_blank"
                    className="text-xs font-mono text-[#D50100] hover:underline flex items-center gap-1"
                  >
                    <span>Live URL</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>

                {statusMessage && (
                  <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono">
                    {statusMessage}
                  </div>
                )}

                <div className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="font-mono font-bold text-[#171717] block">
                      Governance Publication Status
                    </label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
                    >
                      <option value="Published">Published (Active on Website)</option>
                      <option value="Under Review">Under Review (Pending Counsel Review)</option>
                      <option value="Draft">Draft (Administrative Draft)</option>
                      <option value="Scheduled">Scheduled (Future Activation)</option>
                      <option value="Archived">Archived (Superseded Version)</option>
                    </select>
                  </div>

                  <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded flex items-center justify-between">
                    <div>
                      <span className="font-mono font-bold text-[#171717] block text-xs">
                        Legal Counsel Review Required
                      </span>
                      <p className="text-[11px] text-[#707070]">
                        Flag this document as requiring formal legal counsel sign-off before full production launch.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={reviewRequired}
                      onChange={(e) => setReviewRequired(e.target.checked)}
                      className="w-4 h-4 rounded text-[#D50100] focus:ring-[#D50100] cursor-pointer"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono text-[#707070]">
                    <div>
                      <span className="text-[10px] block">Effective Date:</span>
                      <strong className="text-[#171717]">{selectedDoc.effectiveDate}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] block">Last Updated:</span>
                      <strong className="text-[#171717]">{selectedDoc.lastUpdated}</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[#707070] uppercase block">
                      Operating Contracting Entity
                    </span>
                    <p className="text-xs text-[#171717] font-mono bg-[#F8F8F8] p-2.5 rounded border border-[#EAEAEA]">
                      AXIOMIS Technologies (India)
                    </p>
                  </div>

                  <button
                    onClick={handleUpdateStatus}
                    className="w-full py-2.5 bg-[#171717] hover:bg-[#000000] text-white rounded font-mono text-xs font-bold transition-colors"
                  >
                    Commit Governance Status & Audit Log
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-[#F8F8F8] border border-dashed border-[#EAEAEA] rounded-xl text-center space-y-2 text-xs text-[#707070]">
                <FileText className="w-8 h-8 text-[#707070] mx-auto" />
                <p>Select any legal document from the table on the left to inspect its parameters and update its governance status.</p>
              </div>
            )}

            {/* Audit Log Stream */}
            <div className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-2">
                <div className="font-mono font-bold text-xs uppercase text-[#171717] flex items-center gap-1.5">
                  <History className="w-3.5 h-3.5 text-[#D50100]" />
                  <span>Immutable Audit Log Trail</span>
                </div>
                <span className="text-[10px] font-mono text-[#707070]">Server Verified</span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto font-mono text-[11px] pr-1">
                {stats?.recentAuditLogs && stats.recentAuditLogs.length > 0 ? (
                  stats.recentAuditLogs.map((log: any) => (
                    <div key={log.id} className="p-2 bg-[#F8F8F8] rounded border border-[#EAEAEA] space-y-0.5">
                      <div className="flex items-center justify-between text-[10px] text-[#707070]">
                        <span className="text-[#D50100] font-bold">{log.action}</span>
                        <span>{new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-[#171717]">{log.details}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#707070] py-4 text-center">No audit entries logged yet.</p>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
