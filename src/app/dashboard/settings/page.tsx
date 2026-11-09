'use client';

import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DashboardSettingsPage() {
  const [name, setName] = useState('Alex Vance');
  const [email, setEmail] = useState('alex.vance@solaris-aerospace.com');
  const [company, setCompany] = useState('Solaris Aerospace AG');
  const [country, setCountry] = useState('Germany');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-sans text-[#171717]">Account Settings & Compliance</h2>
        <p className="text-xs text-[#707070] mt-0.5">Manage your corporate credentials and billing details.</p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 max-w-2xl space-y-5 shadow-subtle">
        {saved && (
          <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] text-[#15803D] text-xs font-mono rounded flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Account profile updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4 text-xs font-mono">
          <div>
            <label className="text-[#707070] block mb-1">Corporate Representative Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
            />
          </div>

          <div>
            <label className="text-[#707070] block mb-1">Registered Entity Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
            />
          </div>

          <div>
            <label className="text-[#707070] block mb-1">Verified Corporate Email</label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-3 py-2 bg-[#F5F5F5] border border-[#EAEAEA] rounded text-[#707070] cursor-not-allowed"
            />
            <span className="text-[10px] text-[#707070] mt-1 block font-sans">
              Primary email address is locked for institutional auction compliance.
            </span>
          </div>

          <div>
            <label className="text-[#707070] block mb-1">Jurisdiction</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#171717] hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded font-mono shadow-sm"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
