export type SupportedCurrency = 
  | 'USD' 
  | 'EUR' 
  | 'GBP' 
  | 'INR' 
  | 'CAD' 
  | 'AUD' 
  | 'AED' 
  | 'SGD' 
  | 'JPY' 
  | 'CHF';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  locale: string;
  decimals: number;
  flag: string;
  fractionDigits: number;
}

export const SUPPORTED_CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    decimals: 2,
    flag: '🇺🇸',
    fractionDigits: 0,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    decimals: 2,
    flag: '🇪🇺',
    fractionDigits: 0,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    decimals: 2,
    flag: '🇬🇧',
    fractionDigits: 0,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    decimals: 2,
    flag: '🇮🇳',
    fractionDigits: 0,
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    decimals: 2,
    flag: '🇨🇦',
    fractionDigits: 0,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    decimals: 2,
    flag: '🇦🇺',
    fractionDigits: 0,
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    locale: 'en-AE',
    decimals: 2,
    flag: '🇦🇪',
    fractionDigits: 0,
  },
  SGD: {
    code: 'SGD',
    symbol: 'SG$',
    name: 'Singapore Dollar',
    locale: 'en-SG',
    decimals: 2,
    flag: '🇸🇬',
    fractionDigits: 0,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    decimals: 0, // Currencies without minor units (0 decimals)
    flag: '🇯🇵',
    fractionDigits: 0,
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF ',
    name: 'Swiss Franc',
    locale: 'de-CH',
    decimals: 2,
    flag: '🇨🇭',
    fractionDigits: 0,
  },
};

export interface ExchangeRatesData {
  base: 'USD';
  rates: Record<SupportedCurrency, number>;
  lastUpdated: string;
  provider: string;
  source: 'live' | 'cache' | 'authoritative_fallback';
}

export const FALLBACK_EXCHANGE_RATES: Record<SupportedCurrency, number> = {
  USD: 1.0,
  EUR: 0.92,
  GBP: 0.79,
  INR: 84.40,
  CAD: 1.39,
  AUD: 1.52,
  AED: 3.6725,
  SGD: 1.34,
  JPY: 154.20,
  CHF: 0.88,
};
