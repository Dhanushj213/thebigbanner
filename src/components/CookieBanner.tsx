'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, Cookie, X, Check, Settings2 } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('tbb_cookie_consent');
    if (!saved) {
      setShowBanner(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setAnalytics(Boolean(parsed.analytics));
        setMarketing(Boolean(parsed.marketing));
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const savePreferences = async (analyticsVal: boolean, marketingVal: boolean) => {
    const prefs = {
      essential: true,
      analytics: analyticsVal,
      marketing: marketingVal,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('tbb_cookie_consent', JSON.stringify(prefs));
    setShowBanner(false);
    setShowModal(false);

    try {
      await fetch('/api/legal/cookie-preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId: localStorage.getItem('tbb_visitor_id') || undefined,
          essential: true,
          analytics: analyticsVal,
          marketing: marketingVal,
        }),
      });
    } catch (e) {
      // Offline fallback
    }
  };

  if (!mounted || !showBanner) return null;

  return (
    <>
      {/* Floating Bottom Banner */}
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="bg-[#FFFFFF] border border-[#171717] p-5 rounded-lg shadow-2xl space-y-3.5 text-xs text-[#171717]">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase tracking-wider text-[#171717]">
              <Cookie className="w-4 h-4 text-[#D50100]" />
              <span>Cookie & Privacy Choice</span>
            </div>
            <button
              onClick={() => savePreferences(false, false)}
              className="text-[#707070] hover:text-[#171717] p-0.5"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[#707070] text-[11px] leading-relaxed">
            THE BIG BANNER (operated by AXIOMIS Technologies) uses essential cookies for secure bidding and session preservation. We seek your optional consent for performance analytics.
          </p>

          <div className="flex items-center justify-between pt-1 gap-2">
            <Link
              href="/legal/cookie-policy"
              className="text-[11px] font-mono text-[#707070] hover:text-[#171717] underline"
            >
              Read Cookie Policy
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="px-2.5 py-1.5 border border-[#EAEAEA] hover:border-[#171717] rounded text-[11px] font-mono text-[#171717] flex items-center gap-1 transition-colors"
              >
                <Settings2 className="w-3 h-3" />
                <span>Customize</span>
              </button>
              <button
                type="button"
                onClick={() => savePreferences(true, true)}
                className="px-3 py-1.5 bg-[#171717] hover:bg-[#000000] text-white rounded text-[11px] font-mono font-bold transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Customizer */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-xl max-w-lg w-full p-6 space-y-5 text-xs text-[#171717] shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
              <div className="flex items-center gap-2 font-mono font-bold text-sm uppercase">
                <Shield className="w-4 h-4 text-[#D50100]" />
                <span>Cookie Preference Centre</span>
              </div>
              <button onClick={() => setShowModal(false)} className="text-[#707070] hover:text-[#171717]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#707070] leading-relaxed">
              Customize your privacy choices below. Essential cookies are strictly necessary for the platform to process bids and maintain session security.
            </p>

            <div className="space-y-3 pt-1">
              {/* Essential */}
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded flex items-center justify-between">
                <div>
                  <div className="font-bold font-mono text-xs">Essential & Security (Strictly Necessary)</div>
                  <div className="text-[11px] text-[#707070]">Session state, CSRF tokens, currency selector, and bidding authentication.</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-[#15803D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Always Active
                </span>
              </div>

              {/* Analytics */}
              <div className="p-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded flex items-center justify-between">
                <div>
                  <div className="font-bold font-mono text-xs">Performance & Analytics</div>
                  <div className="text-[11px] text-[#707070]">Aggregated traffic volume and platform uptime metrics without personal tracking.</div>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D50100] focus:ring-[#D50100] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded flex items-center justify-between">
                <div>
                  <div className="font-bold font-mono text-xs">Marketing Communications</div>
                  <div className="text-[11px] text-[#707070]">Auction announcements and milestone notifications.</div>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="w-4 h-4 rounded text-[#D50100] focus:ring-[#D50100] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#EAEAEA]">
              <button
                type="button"
                onClick={() => savePreferences(false, false)}
                className="px-3 py-2 border border-[#EAEAEA] hover:border-[#171717] rounded font-mono text-xs text-[#707070] hover:text-[#171717]"
              >
                Reject Optional
              </button>
              <button
                type="button"
                onClick={() => savePreferences(analytics, marketing)}
                className="px-4 py-2 bg-[#D50100] hover:bg-[#B50100] text-white rounded font-mono text-xs font-bold transition-colors"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
