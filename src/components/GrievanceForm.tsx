'use client';

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Send, ShieldAlert } from 'lucide-react';

export const GrievanceForm: React.FC = () => {
  const [category, setCategory] = useState('advertising_content');
  const [complainantName, setComplainantName] = useState('');
  const [complainantEmail, setComplainantEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; ticketNumber?: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complainantName || !complainantEmail || !subject || !details) {
      setResult({ success: false, message: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/legal/grievance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          complainantName,
          complainantEmail,
          subject,
          details,
          evidenceUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit grievance');
      }

      setResult({
        success: true,
        ticketNumber: data.ticketNumber,
        message: data.message,
      });

      // Clear form on success
      setSubject('');
      setDetails('');
      setEvidenceUrl('');
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-8 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#171717] rounded-xl space-y-6 shadow-subtle">
      <div className="flex items-center gap-2.5 border-b border-[#EAEAEA] pb-4">
        <ShieldAlert className="w-5 h-5 text-[#D50100]" />
        <div>
          <h3 className="font-mono font-bold text-base uppercase text-[#171717]">
            File A Formal Grievance Complaint
          </h3>
          <p className="text-[11px] text-[#707070]">
            Statutory Escalation under Information Technology (Intermediary Guidelines) Rules, 2021 & Consumer Protection Rules
          </p>
        </div>
      </div>

      {result && (
        <div
          className={`p-4 rounded-lg text-xs flex items-start gap-3 ${
            result.success
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-rose-50 border border-rose-200 text-rose-800'
          }`}
        >
          {result.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            {result.ticketNumber && (
              <div className="font-mono font-bold text-sm">
                Official Tracking Ticket: {result.ticketNumber}
              </div>
            )}
            <p className="leading-relaxed">{result.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Complainant Full Legal Name *
            </label>
            <input
              type="text"
              required
              value={complainantName}
              onChange={(e) => setComplainantName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Verified Contact Email Address *
            </label>
            <input
              type="email"
              required
              value={complainantEmail}
              onChange={(e) => setComplainantEmail(e.target.value)}
              placeholder="e.g. rahul.sharma@domain.com"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Grievance Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            >
              <option value="advertising_content">Objectionable / Unlawful Advertising Content</option>
              <option value="intellectual_property">Intellectual Property / Trademark Infringement</option>
              <option value="auction_outcome">Auction Bidding & Clock Discrepancy</option>
              <option value="payment_escrow">Payment Gateway, Invoicing or Refund Issue</option>
              <option value="privacy_data">Digital Personal Data Protection (DPDP) Concern</option>
              <option value="other">Other Statutory Complaint</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Supporting Evidence URL (Optional)
            </label>
            <input
              type="url"
              value={evidenceUrl}
              onChange={(e) => setEvidenceUrl(e.target.value)}
              placeholder="https://drive.google.com/... or public document link"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono font-bold text-[#171717] block">
            Subject Summary *
          </label>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Brief description of the issue"
            className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-mono font-bold text-[#171717] block">
            Detailed Factual Narrative & Requested Relief *
          </label>
          <textarea
            required
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Provide all relevant dates, tenure identifiers, URLs, and specific facts supporting your complaint."
            className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100] leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[10px] text-[#707070] font-mono max-w-sm">
            Statutory acknowledgment issued within 24 hours. Formal resolution provided within 15 calendar days.
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#D50100] hover:bg-[#B50100] text-white rounded font-mono text-xs font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Transmitting...' : 'File Grievance'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
