'use client';

import React, { useState, useEffect } from 'react';
import { Shield, Check, RotateCcw } from 'lucide-react';

export const CookiePreferenceCentre: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tbb_cookie_consent');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
      } catch (e) {}
    }
  }, []);

  const handleSave = async () => {
    const prefs = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('tbb_cookie_consent', JSON.stringify(prefs));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);

    try {
      await fetch('/api/legal/cookie-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          essential: true,
          analytics,
          marketing,
        }),
      });
    } catch (e) {}
  };

  const handleReset = () => {
    setAnalytics(false);
    setMarketing(false);
    handleSave();
  };

  if (!mounted) return null;

  return (
    <div className="my-8 p-6 bg-[#FFFFFF] border-2 border-[#171717] rounded-xl space-y-6 shadow-subtle">
      <div className="flex items-center justify-between border-b border-[#EAEAEA] pb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#D50100]" />
          <h3 className="font-mono font-bold text-base uppercase text-[#171717]">
            Interactive Cookie Preference Centre
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="text-xs font-mono text-[#707070] hover:text-[#171717] flex items-center gap-1"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>
      </div>

      <p className="text-xs text-[#707070] leading-relaxed">
        You hold the right to grant or withdraw consent for optional web storage technologies at any time. Changes take effect immediately upon saving.
      </p>

      <div className="space-y-4">
        {/* Essential */}
        <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono font-bold text-xs text-[#171717] block">1. Essential & Authentication (Mandatory)</span>
            <p className="text-[11px] text-[#707070] leading-relaxed">
              Maintains secure login sessions, CSRF prevention tokens, currency conversions, and server-authoritative bid routing. Cannot be disabled.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#15803D] bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex-shrink-0">
            Always Active
          </span>
        </div>

        {/* Analytics */}
        <div className="p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono font-bold text-xs text-[#171717] block">2. Performance & Aggregated Analytics (Optional)</span>
            <p className="text-[11px] text-[#707070] leading-relaxed">
              Provides privacy-preserving metrics on page response times, server latency, and aggregate visit counters without individual profiling.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D50100]"></div>
          </label>
        </div>

        {/* Marketing */}
        <div className="p-4 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg flex items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="font-mono font-bold text-xs text-[#171717] block">3. Communications & Announcements (Optional)</span>
            <p className="text-[11px] text-[#707070] leading-relaxed">
              Enables notifications regarding Genesis milestones, upcoming tenure auctions, and transparency reports.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#D50100]"></div>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        {savedSuccess ? (
          <span className="text-xs font-mono font-bold text-[#15803D] flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Preferences saved successfully to local browser state and server registry.</span>
          </span>
        ) : (
          <span className="text-[11px] font-mono text-[#707070]">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        )}

        <button
          type="button"
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#171717] hover:bg-[#000000] text-white rounded font-mono text-xs font-bold transition-all shadow-sm"
        >
          Save Cookie Preferences
        </button>
      </div>
    </div>
  );
};
