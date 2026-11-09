'use client';

import React, { useState } from 'react';
import { UserCheck, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

export const PrivacyRequestForm: React.FC = () => {
  const [requestType, setRequestType] = useState('access');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [jurisdiction, setJurisdiction] = useState('India (DPDP Act, 2023)');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; ticketNumber?: string; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !details) {
      setResult({ success: false, message: 'Please complete all required fields.' });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch('/api/legal/privacy-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestType,
          name,
          email,
          jurisdiction,
          details,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit privacy request');
      }

      setResult({
        success: true,
        ticketNumber: data.ticketNumber,
        message: data.message,
      });

      setDetails('');
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="my-8 p-6 sm:p-8 bg-[#FFFFFF] border-2 border-[#171717] rounded-xl space-y-6 shadow-subtle">
      <div className="flex items-center gap-2.5 border-b border-[#EAEAEA] pb-4">
        <UserCheck className="w-5 h-5 text-[#D50100]" />
        <div>
          <h3 className="font-mono font-bold text-base uppercase text-[#171717]">
            Data Principal Rights Request (DPDP Act & GDPR)
          </h3>
          <p className="text-[11px] text-[#707070]">
            Exercise your statutory rights of access, correction, erasure or consent revocation.
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
                Reference Ticket: {result.ticketNumber}
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
              Full Legal Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full legal name"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Registered Account Email *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email used on THE BIG BANNER"
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Nature of Statutory Request *
            </label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            >
              <option value="access">Access: Request Summary of Personal Data Processed</option>
              <option value="correction">Correction: Update Inaccurate or Incomplete Information</option>
              <option value="erasure">Erasure: Request Deletion of Non-Statutory Records</option>
              <option value="withdrawal">Withdrawal: Revoke Non-Essential Consent</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-mono font-bold text-[#171717] block">
              Applicable Legal Framework *
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-mono text-xs text-[#171717] focus:outline-none focus:border-[#D50100]"
            >
              <option value="India (DPDP Act, 2023)">India — Digital Personal Data Protection Act, 2023</option>
              <option value="European Union (GDPR)">European Union — GDPR (Regulation 2016/679)</option>
              <option value="United Kingdom (UK GDPR)">United Kingdom — UK GDPR / DPA 2018</option>
              <option value="United States (CCPA/CPRA)">United States — State Privacy (CCPA / CPRA)</option>
              <option value="Other Global Jurisdiction">Other International Jurisdiction</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="font-mono font-bold text-[#171717] block">
            Specific Data Description & Request Details *
          </label>
          <textarea
            required
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Specify the exact records, identifiers, or actions you are requesting."
            className="w-full px-3.5 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded font-sans text-xs text-[#171717] focus:outline-none focus:border-[#D50100] leading-relaxed"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[10px] text-[#707070] font-mono max-w-sm">
            Statutory identity verification may be requested prior to releasing or erasing records.
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-[#171717] hover:bg-[#000000] text-white rounded font-mono text-xs font-bold transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{submitting ? 'Submitting...' : 'Submit Privacy Request'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
