'use client';

import React, { useState } from 'react';
import { Mail, ShieldCheck, MapPin, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName('');
      setEmail('');
      setCompany('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 pt-4">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F5F5F5] border border-[#EAEAEA] text-[11px] font-mono text-[#707070] uppercase font-bold tracking-wider">
            CONCIERGE & ADVERTISER RELATIONS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Contact Concierge Desk
          </h1>
          <p className="text-sm text-[#707070] max-w-lg mx-auto">
            Direct institutional inquiries, high-value wire agreements, and white-glove onboarding.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Direct channels (5 cols) */}
          <div className="md:col-span-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-5 shadow-subtle text-xs font-mono">
            <h3 className="text-sm font-bold font-sans text-[#171717]">Executive Channels</h3>

            <div className="space-y-4 text-[#707070]">
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase block">Concierge Desk:</span>
                <strong className="text-[#171717] font-mono">concierge@thebigbanner.com</strong>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase block">Compliance & Approvals:</span>
                <strong className="text-[#171717] font-mono">compliance@thebigbanner.com</strong>
              </div>

              <div className="space-y-0.5">
                <span className="text-[10px] uppercase block">Global Offices:</span>
                <span className="text-[#171717]">Zurich • Singapore • New York</span>
              </div>
            </div>

            <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[11px] text-[#707070] space-y-1 font-sans">
              <strong className="text-[#171717] block">Institutional Escrow Support:</strong>
              <p>For institutional bids exceeding $500,000 USD, contact us for custom wire agreements and pre-funded bidding lines.</p>
            </div>
          </div>

          {/* Form (7 cols) */}
          <div className="md:col-span-7 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
            <h3 className="text-sm font-bold font-sans text-[#171717]">Send Direct Inquiry</h3>

            {sent && (
              <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] rounded text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Your message has been delivered to the executive desk.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[#707070] block mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                    required
                  />
                </div>
                <div>
                  <label className="text-[#707070] block mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-[#707070] block mb-1">Brand or Entity Name *</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-[#707070] block mb-1">Inquiry Details *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white font-bold text-xs uppercase tracking-wider rounded font-mono shadow-sm"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
