'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SupportedCurrency,
  SUPPORTED_CURRENCIES,
  FALLBACK_EXCHANGE_RATES,
  ExchangeRatesData,
} from '@/types/currency';
import {
  formatUSD,
  formatCurrency as formatCurrencyUtil,
  formatDualPrice,
} from '@/utils/formatters';

interface CurrencyContextType {
  selectedCurrency: SupportedCurrency;
  setCurrency: (code: SupportedCurrency) => void;
  rates: Record<SupportedCurrency, number>;
  lastUpdated: string;
  provider: string;
  source: 'live' | 'cache' | 'authoritative_fallback';
  isLoading: boolean;
  refreshRates: () => Promise<void>;
  formatAmount: (
    amountInUSD: number,
    options?: { compact?: boolean; showCode?: boolean }
  ) => string;
  formatUSDOnly: (
    amountInUSD: number,
    options?: { compact?: boolean; showCode?: boolean }
  ) => string;
  getDualPrice: (amountInUSD: number) => {
    canonicalUSD: string;
    localEstimate: string | null;
    combinedLabel: string;
  };
  convertFromUSD: (amountInUSD: number, targetCurrency?: SupportedCurrency) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrencyState] = useState<SupportedCurrency>('USD');
  const [rates, setRates] = useState<Record<SupportedCurrency, number>>(FALLBACK_EXCHANGE_RATES);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toISOString());
  const [provider, setProvider] = useState<string>('European Central Bank / Global FX Consensus');
  const [source, setSource] = useState<'live' | 'cache' | 'authoritative_fallback'>('authoritative_fallback');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize selected currency from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tbb_selected_currency') as SupportedCurrency;
      if (saved && saved in SUPPORTED_CURRENCIES) {
        setSelectedCurrencyState(saved);
      }
    } catch {
      // Ignore localStorage read failures
    }
  }, []);

  const setCurrency = (code: SupportedCurrency) => {
    setSelectedCurrencyState(code);
    try {
      localStorage.setItem('tbb_selected_currency', code);
    } catch {
      // Ignore localStorage write failures
    }
  };

  const fetchRates = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/currency/rates');
      if (res.ok) {
        const data: ExchangeRatesData = await res.json();
        if (data.rates) {
          setRates(data.rates);
          setLastUpdated(data.lastUpdated);
          setProvider(data.provider);
          setSource(data.source);
        }
      }
    } catch {
      // Silently fall back to cached/baseline
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const formatAmount = (
    amountInUSD: number,
    options?: { compact?: boolean; showCode?: boolean }
  ): string => {
    return formatCurrencyUtil(amountInUSD, selectedCurrency, rates, options);
  };

  const formatUSDOnly = (
    amountInUSD: number,
    options?: { compact?: boolean; showCode?: boolean }
  ): string => {
    // Dynamically convert into selectedCurrency (INR, EUR, GBP, USD, etc.) so the entire site reflects chosen currency
    return formatCurrencyUtil(amountInUSD, selectedCurrency, rates, options);
  };

  const getDualPrice = (amountInUSD: number) => {
    const formattedSelected = formatCurrencyUtil(amountInUSD, selectedCurrency, rates, { showCode: true });
    const formattedUSD = formatUSD(amountInUSD, { showCode: true });

    if (selectedCurrency === 'USD') {
      return {
        canonicalUSD: formattedUSD,
        localEstimate: null,
        combinedLabel: formattedUSD,
      };
    }

    return {
      canonicalUSD: formattedUSD,
      localEstimate: `≈ ${formattedUSD}`,
      combinedLabel: `${formattedSelected} (≈ ${formattedUSD})`,
    };
  };

  const convertFromUSD = (amountInUSD: number, targetCurrency?: SupportedCurrency): number => {
    const target = targetCurrency || selectedCurrency;
    const rate = rates[target] || FALLBACK_EXCHANGE_RATES[target] || 1.0;
    return amountInUSD * rate;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setCurrency,
        rates,
        lastUpdated,
        provider,
        source,
        isLoading,
        refreshRates: fetchRates,
        formatAmount,
        formatUSDOnly,
        getDualPrice,
        convertFromUSD,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
