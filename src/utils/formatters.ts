import { SupportedCurrency, SUPPORTED_CURRENCIES, FALLBACK_EXCHANGE_RATES } from '@/types/currency';

/**
 * Authoritative Canonical USD Formatter
 * Used for all core bids, contracts, database amounts, and escalation calculations.
 */
export const formatUSD = (
  amountInUSD: number,
  options?: {
    compact?: boolean;
    showCode?: boolean;
    maximumFractionDigits?: number;
  }
): string => {
  const maximumFractionDigits = options?.maximumFractionDigits ?? 0;
  
  if (options?.compact) {
    const compactStr = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amountInUSD);
    return options?.showCode ? `${compactStr} USD` : compactStr;
  }

  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
    minimumFractionDigits: 0,
  }).format(amountInUSD);

  return options?.showCode ? `${formatted} USD` : formatted;
};

/**
 * Universal Currency Formatter
 * - If targetCurrency is 'USD', formats the canonical USD amount.
 * - If targetCurrency is another supported currency, converts using the provided rate.
 * - Handles currencies without minor units (JPY: 0 decimals).
 */
export const formatCurrency = (
  amountInUSD: number,
  targetCurrency: SupportedCurrency = 'USD',
  rates: Record<SupportedCurrency, number> = FALLBACK_EXCHANGE_RATES,
  options?: {
    compact?: boolean;
    showCode?: boolean;
    isEstimate?: boolean;
  }
): string => {
  if (targetCurrency === 'USD') {
    return formatUSD(amountInUSD, options);
  }

  const config = SUPPORTED_CURRENCIES[targetCurrency] || SUPPORTED_CURRENCIES.USD;
  const rate = rates[targetCurrency] || FALLBACK_EXCHANGE_RATES[targetCurrency] || 1.0;
  const convertedAmount = amountInUSD * rate;

  // For currencies without minor units like JPY, always 0 decimals
  const maxFractionDigits = config.decimals === 0 ? 0 : (options?.compact ? 1 : 0);

  if (options?.compact) {
    const compactStr = new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: targetCurrency,
      notation: 'compact',
      maximumFractionDigits: maxFractionDigits,
    }).format(convertedAmount);
    return options?.showCode ? `${compactStr} ${targetCurrency}` : compactStr;
  }

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: targetCurrency,
    maximumFractionDigits: maxFractionDigits,
    minimumFractionDigits: 0,
  }).format(convertedAmount);

  return options?.showCode ? `${formatted} ${targetCurrency}` : formatted;
};

/**
 * Dual Currency Display
 * Always shows the authoritative canonical USD amount, and if the user has selected a local
 * currency, displays the converted estimate alongside with a prominent estimation indicator.
 */
export const formatDualPrice = (
  amountInUSD: number,
  targetCurrency: SupportedCurrency = 'USD',
  rates: Record<SupportedCurrency, number> = FALLBACK_EXCHANGE_RATES
): {
  canonicalUSD: string;
  localEstimate: string | null;
  combinedLabel: string;
} => {
  const canonicalUSD = formatUSD(amountInUSD, { showCode: true });

  if (targetCurrency === 'USD') {
    return {
      canonicalUSD,
      localEstimate: null,
      combinedLabel: canonicalUSD,
    };
  }

  const localConverted = formatCurrency(amountInUSD, targetCurrency, rates, { showCode: true });
  const localEstimate = `≈ ${localConverted} (Approx. Est.)`;

  return {
    canonicalUSD,
    localEstimate,
    combinedLabel: `${canonicalUSD} (${localEstimate})`,
  };
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num);
};

export const truncateHash = (hash: string, start: number = 8, end: number = 6): string => {
  if (!hash) return '';
  if (hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
};

export const formatDate = (dateString: string): string => {
  try {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
};

export const formatDateRange = (start: string, end: string): string => {
  try {
    const s = new Date(start);
    const e = new Date(end);
    const sStr = s.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const eStr = e.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${sStr} — ${eStr}`;
  } catch {
    return `${start} — ${end}`;
  }
};

/**
 * Authoritative Canonical Minimum Bid Escalation ($5 Hike Rule)
 * Calculated strictly in USD.
 */
export const calculateMinNextBid = (
  previousWinningPriceUSD: number,
  currentHighestBidUSD: number,
  minHikeUSD: number = 5
): { minOpeningBid: number; minNextBid: number; minimumIncrement: number } => {
  const incrementStep = 5;
  const minOpeningBid = previousWinningPriceUSD > 0 ? previousWinningPriceUSD + incrementStep : 10000;
  
  if (currentHighestBidUSD <= 0 || currentHighestBidUSD < minOpeningBid) {
    const baseline = minOpeningBid > 0 ? minOpeningBid : 10000;
    return {
      minOpeningBid: baseline,
      minNextBid: baseline,
      minimumIncrement: incrementStep,
    };
  }

  // Once active, each next bid must increment by at least $5 USD
  const minNextBid = currentHighestBidUSD + incrementStep;

  return {
    minOpeningBid,
    minNextBid,
    minimumIncrement: incrementStep,
  };
};

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  totalSeconds: number;
}

export const calculateTimeLeft = (targetIsoDate: string): TimeLeft => {
  const diff = new Date(targetIsoDate).getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true, totalSeconds: 0 };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired: false,
    totalSeconds: Math.floor(diff / 1000),
  };
};
