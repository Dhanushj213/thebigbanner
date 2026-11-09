'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, CheckCircle2, AlertCircle, Monitor, Smartphone, ExternalLink, ShieldCheck } from 'lucide-react';

export default function DashboardAdvertisementsPage() {
  const [brandName, setBrandName] = useState('Solaris Aerospace AG');
  const [title, setTitle] = useState('Autonomous Solar Satellite Propulsion');
  const [description, setDescription] = useState('Next-generation ion drive systems engineered in Munich.');
  const [destinationUrl, setDestinationUrl] = useState('https://solaris-aerospace.com/launch');
  const [desktopCreativeUrl, setDesktopCreativeUrl] = useState('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=80');
  const [mobileCreativeUrl, setMobileCreativeUrl] = useState('https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=900&q=80');
  const [previewTab, setPreviewTab] = useState<'desktop' | 'mobile'>('desktop');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!destinationUrl.startsWith('https://')) {
      setError('Destination URL must resolve via secure HTTPS protocol.');
      return;
    }

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold font-sans text-[#171717]">
          Advertisement Management Studio
        </h2>
        <p className="text-xs text-[#707070] mt-0.5">
          Submit and preview your high-resolution banner creative. All assets are inspected by our editorial desk before broadcast.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form (7 Cols) */}
        <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-5 shadow-subtle">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
            <h3 className="text-xs font-mono font-bold uppercase text-[#171717]">
              Creative Submission Form
            </h3>
            <span className="text-[10px] font-mono text-[#707070]">
              * Strict Moderation Enforced
            </span>
          </div>

          {submitted && (
            <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-xs font-mono text-[#15803D] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Asset uploaded and queued for editorial verification. SLA: &lt; 12 hours.</span>
            </div>
          )}

          {error && (
            <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs font-mono text-[#DC2626] flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-[#707070] block mb-1">Brand Name *</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                required
              />
            </div>

            <div>
              <label className="text-[#707070] block mb-1">Advertisement Headline / Tagline *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                required
              />
            </div>

            <div>
              <label className="text-[#707070] block mb-1">Description (Optional)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
              />
            </div>

            <div>
              <label className="text-[#707070] block mb-1">Destination URL (Must start with https://) *</label>
              <input
                type="url"
                value={destinationUrl}
                onChange={(e) => setDestinationUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                required
              />
            </div>

            <div>
              <label className="text-[#707070] block mb-1">Desktop Creative URL (1920×600 px) *</label>
              <input
                type="url"
                value={desktopCreativeUrl}
                onChange={(e) => setDesktopCreativeUrl(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                required
              />
            </div>

            <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
              <span className="text-[10px] text-[#707070] font-sans">
                Winning an auction grants right of submission; display requires editorial approval.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-bold uppercase tracking-wider rounded font-mono shadow-sm"
              >
                Submit For Review
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Deck (5 Cols) */}
        <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-5 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
            <h3 className="text-xs font-mono font-bold uppercase text-[#171717]">
              Live Preview
            </h3>
            <div className="flex gap-1 bg-[#F8F8F8] p-0.5 rounded border border-[#EAEAEA] text-[11px] font-mono">
              <button
                onClick={() => setPreviewTab('desktop')}
                className={`px-2 py-0.5 rounded ${previewTab === 'desktop' ? 'bg-[#171717] text-white' : 'text-[#707070]'}`}
              >
                Desktop
              </button>
              <button
                onClick={() => setPreviewTab('mobile')}
                className={`px-2 py-0.5 rounded ${previewTab === 'mobile' ? 'bg-[#171717] text-white' : 'text-[#707070]'}`}
              >
                Mobile
              </button>
            </div>
          </div>

          <div className="relative bg-[#171717] rounded overflow-hidden">
            {previewTab === 'desktop' ? (
              <div className="relative w-full aspect-[16/7]">
                <Image src={desktopCreativeUrl} alt="Preview" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[9px] font-mono text-[#D50100] bg-black/70 px-1 py-0.2 rounded font-bold">
                    {brandName}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-1">{title}</h4>
                </div>
              </div>
            ) : (
              <div className="py-6 flex justify-center bg-[#111111]">
                <div className="relative w-44 aspect-[9/16] rounded-xl overflow-hidden border border-[#2E2E2E]">
                  <Image src={mobileCreativeUrl || desktopCreativeUrl} alt="Preview" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h5 className="text-[10px] font-bold line-clamp-1">{title}</h5>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="text-[11px] font-mono text-[#707070] text-center pt-1">
            Destination: <span className="text-[#171717]">{destinationUrl}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
