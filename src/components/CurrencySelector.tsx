'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { SUPPORTED_CURRENCIES, SupportedCurrency } from '@/types/currency';
import { Globe, ChevronDown, Check, Info, RefreshCw } from 'lucide-react';

interface CurrencySelectorProps {
  variant?: 'nav' | 'compact' | 'modal';
  className?: string;
}

export const CurrencySelector: React.FC<CurrencySelectorProps> = ({
  variant = 'nav',
  className = '',
}) => {
  const {
    selectedCurrency,
    setCurrency,
    lastUpdated,
    provider,
    source,
    isLoading,
    refreshRates,
  } = useCurrency();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentConfig = SUPPORTED_CURRENCIES[selectedCurrency] || SUPPORTED_CURRENCIES.USD;
  const currencyList = Object.values(SUPPORTED_CURRENCIES);

  const formatLastUpdatedTime = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-md border text-[11px] sm:text-xs font-mono transition-all ${
          selectedCurrency === 'USD'
            ? 'bg-[#FFFFFF] text-[#171717] border-[#EAEAEA] hover:border-[#171717]'
            : 'bg-[#F8F8F8] text-[#171717] border-[#D50100] font-semibold'
        }`}
        title={`Canonical currency is USD. Currently displaying approximate prices in ${selectedCurrency}.`}
        aria-expanded={isOpen}
      >
        <span className="text-xs">{currentConfig.flag}</span>
        <span className="font-bold">{currentConfig.code}</span>
        <span className="text-[#707070] hidden xs:inline">({currentConfig.symbol.trim()})</span>
        <ChevronDown className="w-3 h-3 text-[#707070]" />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-[calc(100vw-1.5rem)] max-w-[290px] sm:w-72 rounded-lg bg-[#FFFFFF] border border-[#EAEAEA] shadow-xl z-50 overflow-hidden divide-y divide-[#EAEAEA] animate-in fade-in zoom-in-95 duration-100">
          
          {/* Header */}
          <div className="p-3 bg-[#F8F8F8]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#171717] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#D50100]" />
                Display Currency
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  refreshRates();
                }}
                disabled={isLoading}
                title="Refresh exchange rates"
                className="text-[#707070] hover:text-[#171717] p-1 rounded"
              >
                <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <p className="text-[10px] text-[#707070] mt-1 leading-normal">
              Canonical platform currency is <strong className="text-[#171717]">USD ($)</strong>. Other currencies are approximate market estimates.
            </p>
          </div>

          {/* Currency List */}
          <div className="max-h-60 overflow-y-auto py-1">
            {currencyList.map((c) => {
              const isSelected = c.code === selectedCurrency;
              const isCanonical = c.code === 'USD';

              return (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => {
                    setCurrency(c.code);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 flex items-center justify-between text-xs hover:bg-[#F8F8F8] transition-colors ${
                    isSelected ? 'bg-[#F5F5F5] font-bold text-[#171717]' : 'text-[#707070]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{c.flag}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[#171717]">{c.code}</span>
                        <span className="text-[11px] text-[#707070]">({c.symbol.trim()})</span>
                        {isCanonical && (
                          <span className="text-[9px] font-mono px-1 py-0.2 bg-[#171717] text-white rounded font-bold uppercase tracking-wider">
                            Canonical
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#707070] font-sans font-normal">
                        {c.name}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#D50100] flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Metadata */}
          <div className="p-2.5 bg-[#FFFFFF] text-[10px] text-[#707070] font-mono space-y-1">
            <div className="flex items-center justify-between">
              <span>FX Provider:</span>
              <span className="text-[#171717] truncate max-w-[150px] font-sans font-medium" title={provider}>
                {provider.split('(')[0].trim()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Rates Updated:</span>
              <span className="text-[#171717]">{formatLastUpdatedTime(lastUpdated)}</span>
            </div>
            <div className="pt-1 border-t border-[#EAEAEA] text-[9.5px] text-[#707070] leading-snug">
              <span className="text-[#D50100] font-bold">Important: </span>
              All bids and auction wins are legally settled in canonical USD.
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
