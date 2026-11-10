'use client';

import React, { useState } from 'react';
import { Globe, MapPin, Award, ShieldCheck } from 'lucide-react';
import { useBanner } from '@/context/BannerContext';
import { formatCurrency } from '@/utils/formatters';

interface CountryData {
  code: string;
  name: string;
  flag: string;
  ownersCount: number;
  totalSpent: number;
  brands: string[];
  x: number; // percentage coordinate
  y: number;
}

export const GlobalOwnershipMap: React.FC = () => {
  const { currency, owners } = useBanner();
  const [activeCountry, setActiveCountry] = useState<CountryData | null>(null);

  // Dynamically group actual verified owners from state (0 hardcoded data)
  const countryMap = new Map<string, CountryData>();
  owners.forEach((o) => {
    if (!countryMap.has(o.countryCode)) {
      countryMap.set(o.countryCode, {
        code: o.countryCode,
        name: o.country,
        flag: o.flagEmoji || '🌐',
        ownersCount: 0,
        totalSpent: 0,
        brands: [],
        x: 50,
        y: 50,
      });
    }
    const c = countryMap.get(o.countryCode)!;
    c.ownersCount += 1;
    c.totalSpent += o.purchasePrice;
    if (!c.brands.includes(o.brandName)) {
      c.brands.push(o.brandName);
    }
  });

  const countryLocations = Array.from(countryMap.values());

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-banner-red uppercase tracking-wider font-semibold">
            <Globe className="w-3.5 h-3.5" />
            <span>GLOBAL INFLUENCE REACH</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
            Global Ownership Map
          </h3>
          <p className="text-xs text-zinc-400 mt-1">
            Interactive geographic distribution of brands that have claimed THE BIG BANNER.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white font-bold">
            {owners.length} Total Tenures
          </span>
          <span className="px-2.5 py-1 rounded bg-banner-red/20 border border-banner-red/40 text-banner-red font-bold">
            {countryLocations.length} Nations Represented
          </span>
        </div>
      </div>

      {/* Visual Stylized Map Canvas */}
      <div className="relative w-full aspect-[21/9] min-h-[300px] bg-[#080a10] rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-4">
        {/* World Map SVG Silhouette */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full opacity-20 filter drop-shadow-md"
          fill="currentColor"
        >
          {/* Stylized world grid dots */}
          <pattern id="dotGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" className="text-zinc-600" />
          </pattern>
          <rect width="1000" height="500" fill="url(#dotGrid)" />

          {/* Continents rough shapes */}
          {/* North America */}
          <path
            d="M150 90 L270 100 L300 180 L230 260 L180 230 L110 160 Z"
            className="text-zinc-700"
          />
          {/* South America */}
          <path
            d="M240 280 L310 300 L280 430 L230 400 Z"
            className="text-zinc-700"
          />
          {/* Europe */}
          <path
            d="M460 110 L540 100 L560 170 L470 180 Z"
            className="text-zinc-700"
          />
          {/* Africa */}
          <path
            d="M480 200 L580 200 L560 360 L500 360 L460 250 Z"
            className="text-zinc-700"
          />
          {/* Asia */}
          <path
            d="M580 90 L850 110 L880 260 L730 320 L600 240 Z"
            className="text-zinc-700"
          />
          {/* Australia */}
          <path
            d="M780 340 L880 350 L870 430 L790 410 Z"
            className="text-zinc-700"
          />
        </svg>

        {/* Dynamic Country Nodes */}
        {countryLocations.map((c) => {
          const isSelected = activeCountry?.code === c.code;
          return (
            <div
              key={c.code}
              style={{ left: `${c.x}%`, top: `${c.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
              onClick={() => setActiveCountry(isSelected ? null : c)}
              onMouseEnter={() => setActiveCountry(c)}
            >
              {/* Ping Ring */}
              <div className="relative flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-banner-red opacity-60" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-banner-red border-2 border-white shadow-lg shadow-banner-red/50" />
              </div>

              {/* Country Badge Label */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur px-2 py-0.5 rounded border border-white/10 text-[10px] font-mono text-zinc-300 pointer-events-none group-hover:text-white group-hover:border-banner-red/50 transition-colors">
                {c.flag} {c.code}
              </div>
            </div>
          );
        })}

        {/* Selected Country HUD Detail Box */}
        {activeCountry && (
          <div className="absolute bottom-4 right-4 z-30 max-w-xs w-full bg-black/90 backdrop-blur-md rounded-xl p-4 border border-banner-red/40 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeCountry.flag}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{activeCountry.name}</h4>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {activeCountry.ownersCount} Verified Owner
                  </span>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-banner-red">
                {formatCurrency(activeCountry.totalSpent, currency)}
              </span>
            </div>

            <div className="mt-2.5">
              <span className="text-[10px] uppercase font-mono text-zinc-500 block">Brands from this nation:</span>
              <div className="mt-1 flex flex-wrap gap-1">
                {activeCountry.brands.map((b, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium bg-white/10 text-white px-2 py-0.5 rounded"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Country List Horizontal Pills */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2 text-xs">
        {countryLocations.map((c) => (
          <button
            key={c.code}
            onClick={() => setActiveCountry(c)}
            className={`px-3 py-1.5 rounded-lg border font-mono transition-all flex items-center gap-1.5 ${
              activeCountry?.code === c.code
                ? 'bg-banner-red text-white border-banner-red shadow-md'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span>{c.flag}</span>
            <span>{c.name}</span>
            <span className="text-[10px] opacity-75">({c.ownersCount})</span>
          </button>
        ))}
      </div>

    </div>
  );
};
