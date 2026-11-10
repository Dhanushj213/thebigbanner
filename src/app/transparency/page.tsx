'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Download,
  Search,
  CheckCircle2,
  AlertCircle,
  FileText,
  ArrowRight,
  Globe,
  Coins,
  Receipt,
  ExternalLink,
} from 'lucide-react';
import { AuthoritativeStats } from '@/lib/services';
import { formatDate } from '@/utils/formatters';
import { useCurrency } from '@/context/CurrencyContext';
import { SUPPORTED_CURRENCIES, SupportedCurrency } from '@/types/currency';

interface PaymentLedgerItem {
  id: string;
  ownership_id: string;
  amount: number;
  currency: string;
  charged_currency?: string;
  charged_amount?: number;
  exchange_rate?: number;
  fee_amount: number;
  net_amount: number;
  payment_method: string;
  gateway_reference: string;
  status: string;
  created_at: string;
  brand_name: string;
  country: string;
  ownership_number: number;
}

export default function TransparencyPage() {
  const { selectedCurrency, formatUSDOnly, formatAmount, rates, lastUpdated } = useCurrency();
  const [stats, setStats] = useState<AuthoritativeStats | null>(null);
  const [monthlyReports, setMonthlyReports] = useState<any[]>([]);
  const [paymentsLedger, setPaymentsLedger] = useState<PaymentLedgerItem[]>([]);
  const [verifyHash, setVerifyHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTransparencyData() {
      try {
        const res = await fetch('/api/transparency');
        if (res.ok) {
          const data = await res.json();
          setStats(data.stats);
          setMonthlyReports(data.monthlyReports || []);
          setPaymentsLedger(data.paymentsLedger || []);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    loadTransparencyData();
  }, []);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyHash) return;
    setHasSearched(true);
    try {
      const res = await fetch(`/api/transparency?verify=${encodeURIComponent(verifyHash.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setVerificationResult(data.record);
      } else {
        setVerificationResult(null);
      }
    } catch {
      setVerificationResult(null);
    }
  };

  const handleDownloadMonthlyCSV = () => {
    if (!monthlyReports.length) return;
    const headers = [
      'Month',
      'Sales Completed',
      'Gross Collections (USD)',
      'Payment Gateway Fees (USD)',
      'Net Platform Receipts (USD)',
      'Highest Sale (USD)',
      'Canonical Currency',
    ];
    const rows = monthlyReports.map((r) => [
      r.month,
      r.salesCount,
      r.grossVolume,
      r.gatewayFees,
      r.netRevenue,
      r.highestSale,
      'USD',
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `the_big_banner_monthly_financial_report_usd_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadLedgerCSV = () => {
    if (!paymentsLedger.length) return;
    const headers = [
      'Payment ID',
      'Tenure #',
      'Brand Name',
      'Country',
      'Canonical Amount (USD)',
      'Charged Currency',
      'Charged Amount',
      'Exchange Rate (USD to Local)',
      'Gateway Fees (USD)',
      'Net Proceeds (USD)',
      'Payment Method',
      'Gateway Reference',
      'Settled At',
    ];
    const rows = paymentsLedger.map((p) => [
      p.id,
      p.ownership_number || 'N/A',
      `"${p.brand_name || 'N/A'}"`,
      p.country || 'N/A',
      p.amount,
      p.charged_currency || 'USD',
      p.charged_amount || p.amount,
      p.exchange_rate || 1.0,
      p.fee_amount,
      p.net_amount,
      p.payment_method,
      p.gateway_reference,
      p.created_at,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `the_big_banner_payments_audit_ledger_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatNativeCharged = (amount: number, currencyCode: string) => {
    const meta = SUPPORTED_CURRENCIES[currencyCode as SupportedCurrency];
    const decimals = meta ? meta.decimals : 2;
    return `${meta?.symbol || currencyCode + ' '}${amount.toLocaleString(meta?.locale || 'en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })} ${currencyCode}`;
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EAEAEA]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#D50100] uppercase font-bold tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>RADICAL FINANCIAL INTEGRITY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
              Financial Transparency
            </h1>
            <p className="text-xs sm:text-sm text-[#707070] mt-1 max-w-2xl">
              Verified financial figures computed strictly from captured payment receipts and settled ledger records in canonical USD.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadMonthlyCSV}
              disabled={!monthlyReports.length}
              className="px-4 py-2 bg-[#FFFFFF] border border-[#EAEAEA] hover:bg-[#F8F8F8] disabled:opacity-50 text-[#171717] text-xs font-mono font-medium rounded flex items-center gap-2 transition-colors shadow-subtle"
            >
              <Download className="w-3.5 h-3.5 text-[#D50100]" />
              <span>Monthly Summaries CSV</span>
            </button>

            <button
              onClick={handleDownloadLedgerCSV}
              disabled={!paymentsLedger.length}
              className="px-4 py-2 bg-[#171717] hover:bg-black disabled:opacity-50 text-white text-xs font-mono font-medium rounded flex items-center gap-2 transition-colors shadow-subtle"
            >
              <Receipt className="w-3.5 h-3.5 text-white" />
              <span>Payment Audit Ledger CSV</span>
            </button>
          </div>
        </div>

        {/* Global Currency Architecture & Authoritative Accounting Principles Notice */}
        <div className="p-5 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#171717] uppercase tracking-wider">
            <Coins className="w-4 h-4 text-[#D50100]" />
            <span>Canonical USD Pricing Architecture & Settlement Transparency</span>
          </div>
          <p className="text-xs text-[#707070] leading-relaxed">
            THE BIG BANNER operates authoritatively in <strong className="text-[#171717]">United States Dollars (USD)</strong>.
            All auction bids, clearing prices, ledger balances, and the immutable $5 minimum bid hike rule are strictly calculated in USD.
            While international advertisers may settle in supported local currencies (EUR, GBP, CHF, JPY, INR, CAD, AUD, AED, SGD), each transaction is permanently anchored to its canonical USD value at the verified settlement exchange rate.
            {selectedCurrency !== 'USD' && (
              <span className="block mt-1 font-mono text-[#15803D]">
                Active Currency Selector: <strong>{selectedCurrency}</strong> (Conversion rate: 1 USD = {rates[selectedCurrency]} {selectedCurrency}). Displayed local values are approximate estimates.
              </span>
            )}
          </p>
        </div>

        {/* Primary Accounting Figures Grid (Authoritative USD) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#707070] block">Gross Collections (GTV)</span>
            <div className="text-2xl font-black font-mono text-[#171717]">
              {stats ? formatAmount(stats.grossTransactionValue, { showCode: true }) : '...'}
            </div>
            {selectedCurrency !== 'USD' && stats && (
              <div className="text-[11px] font-mono text-[#707070]">
                ≈ ${stats.grossTransactionValue.toLocaleString('en-US')} USD
              </div>
            )}
            <p className="text-[11px] text-[#707070] pt-1">Total completed ownerships</p>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#707070] block">Completed Purchases</span>
            <div className="text-2xl font-black font-mono text-[#171717]">
              {stats ? stats.totalSuccessfulOwnerships : 0} Tenures
            </div>
            <p className="text-[11px] text-[#707070] pt-1">Verified historical rotations</p>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#707070] block">Processing Fees (~2%)</span>
            <div className="text-2xl font-black font-mono text-[#DC2626]">
              {stats ? `-${formatAmount(stats.paymentProcessingFees, { showCode: true })}` : '...'}
            </div>
            {selectedCurrency !== 'USD' && stats && (
              <div className="text-[11px] font-mono text-[#DC2626]">
                ≈ -${stats.paymentProcessingFees.toLocaleString('en-US')} USD
              </div>
            )}
            <p className="text-[11px] text-[#707070] pt-1">Merchant gateway & SWIFT fees</p>
          </div>

          <div className="p-5 bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg shadow-subtle space-y-1">
            <span className="text-[10px] font-mono uppercase text-[#707070] block">Net Platform Receipts</span>
            <div className="text-2xl font-black font-mono text-[#15803D]">
              {stats ? formatAmount(stats.netReceipts, { showCode: true }) : '...'}
            </div>
            {selectedCurrency !== 'USD' && stats && (
              <div className="text-[11px] font-mono text-[#15803D]">
                ≈ ${stats.netReceipts.toLocaleString('en-US')} USD
              </div>
            )}
            <p className="text-[11px] text-[#707070] pt-1">Gross collections minus fees</p>
          </div>
        </div>

        {/* Multi-Currency Settlement Breakdown Widget */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono uppercase text-[#D50100] font-bold tracking-wider mb-0.5">
                GLOBAL PAYMENT CLEARING
              </div>
              <h3 className="text-base font-bold font-sans text-[#171717]">
                Multi-Currency Settlement Breakdown
              </h3>
            </div>
            <span className="text-xs font-mono text-[#707070]">
              Canonical USD Peg • Multi-Currency Gateway Settlement
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
                <tr>
                  <th className="py-3 px-4">Settlement Currency</th>
                  <th className="py-3 px-4">Transactions</th>
                  <th className="py-3 px-4">Charged Volume (Native)</th>
                  <th className="py-3 px-4">Canonical USD Volume</th>
                  <th className="py-3 px-4 text-right">Share of GTV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[#171717]">
                {stats && stats.settlementBreakdown && stats.settlementBreakdown.length > 0 ? (
                  stats.settlementBreakdown.map((item, idx) => {
                    const meta = SUPPORTED_CURRENCIES[item.currency as SupportedCurrency];
                    const share = stats.grossTransactionValue > 0
                      ? ((item.totalUSD / stats.grossTransactionValue) * 100).toFixed(1)
                      : '0.0';
                    return (
                      <tr key={idx} className="hover:bg-[#F8F8F8] transition-colors">
                        <td className="py-3.5 px-4 font-bold font-sans flex items-center gap-2">
                          <span className="text-base">{meta?.flag || '🌐'}</span>
                          <span>{item.currency}</span>
                          <span className="text-[#707070] font-mono text-[11px] font-normal">
                            ({meta?.name || item.currency})
                          </span>
                        </td>
                        <td className="py-3.5 px-4">{item.transactionCount} Tenure{item.transactionCount !== 1 ? 's' : ''}</td>
                        <td className="py-3.5 px-4 font-bold">
                          {formatNativeCharged(item.totalCharged, item.currency)}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#15803D]">
                          {formatUSDOnly(item.totalUSD)}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#707070]">
                          {share}%
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-[#707070]">
                      No multi-currency settlements recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cryptographic Transaction Hash Verifier */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 sm:p-8 space-y-6 shadow-subtle">
          <div>
            <div className="text-xs font-mono uppercase text-[#D50100] font-bold tracking-wider mb-1">
              PUBLIC AUDIT DESK
            </div>
            <h3 className="text-xl font-bold font-sans text-[#171717]">
              Verify Transaction Authenticity
            </h3>
            <p className="text-xs text-[#707070] mt-1">
              Enter any transaction hash, ownership ID, or certificate serial to inspect the authoritative ledger record.
            </p>
          </div>

          <form onSubmit={handleVerify} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#707070] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Paste transaction hash (e.g. 0x8f2d93e1...) or Certificate Serial..."
                value={verifyHash}
                onChange={(e) => setVerifyHash(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-xs font-mono text-[#171717] focus:outline-none focus:border-[#D50100]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#171717] hover:bg-black text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-all"
            >
              Verify Record
            </button>
          </form>

          {hasSearched && (
            <div className="pt-2">
              {verificationResult ? (
                <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded text-xs font-mono space-y-2 text-[#15803D]">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>AUTHENTIC & VERIFIED TRANSACTION RECORD</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[#171717] pt-2 border-t border-[#BBF7D0]">
                    <div>
                      <span className="text-[10px] text-[#707070] block">Owner:</span>
                      <strong>{verificationResult.brand_name}</strong> ({verificationResult.country})
                    </div>
                    <div>
                      <span className="text-[10px] text-[#707070] block">Purchase Settlement:</span>
                      <strong className="text-[#15803D]">
                        {formatAmount(verificationResult.purchase_price, { showCode: true })}
                      </strong>
                      {selectedCurrency !== 'USD' && (
                        <span className="text-[10px] text-[#707070] block">
                          ≈ ${verificationResult.purchase_price.toLocaleString('en-US')} USD
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] text-[#707070] block">Tenure:</span>
                      <span>#{verificationResult.ownership_number} ({formatDate(verificationResult.start_date)})</span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <Link href={`/ownership/${verificationResult.id}`} className="text-[#D50100] underline font-sans text-xs">
                      View Full Verified Certificate →
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded text-xs font-mono text-[#DC2626] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>No matching transaction hash or serial found in the database.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Verified Payment Audit Ledger Table */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-mono uppercase text-[#D50100] font-bold tracking-wider mb-0.5">
                IMMUTABLE TRANSACTION JOURNAL
              </div>
              <h3 className="text-base font-bold font-sans text-[#171717]">
                Captured Payment Audit Ledger
              </h3>
            </div>
            <span className="text-xs font-mono text-[#707070]">
              {paymentsLedger.length} Verified Payment Record{paymentsLedger.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
                <tr>
                  <th className="py-3 px-4">Tenure & Brand</th>
                  <th className="py-3 px-4">Canonical USD</th>
                  <th className="py-3 px-4">Charged Settlement</th>
                  <th className="py-3 px-4">Exchange Rate</th>
                  <th className="py-3 px-4">Fee / Net (USD)</th>
                  <th className="py-3 px-4">Channel & Reference</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[#171717]">
                {paymentsLedger.length > 0 ? (
                  paymentsLedger.map((p) => {
                    const chargedCur = p.charged_currency || 'USD';
                    const chargedAmt = p.charged_amount || p.amount;
                    const meta = SUPPORTED_CURRENCIES[chargedCur as SupportedCurrency];
                    return (
                      <tr key={p.id} className="hover:bg-[#F8F8F8] transition-colors">
                        <td className="py-3.5 px-4 font-sans">
                          <div className="font-bold text-[#171717]">
                            #{p.ownership_number} — {p.brand_name}
                          </div>
                          <div className="text-[11px] font-mono text-[#707070]">
                            {p.country} • {p.created_at ? formatDate(p.created_at) : 'Settled'}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#15803D]">
                          {formatUSDOnly(p.amount)}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold">
                            {formatNativeCharged(chargedAmt, chargedCur)}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-[#707070]">
                          {chargedCur === 'USD' ? (
                            <span className="text-[11px] text-[#707070]">1:1 (Canonical)</span>
                          ) : (
                            <span className="text-[11px] text-[#171717]">
                              1 USD = {p.exchange_rate} {chargedCur}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-[11px] text-[#DC2626]">-{formatUSDOnly(p.fee_amount)} fee</div>
                          <div className="text-[11px] text-[#15803D] font-bold">{formatUSDOnly(p.net_amount)} net</div>
                        </td>
                        <td className="py-3.5 px-4 font-sans">
                          <div className="text-xs text-[#171717]">{p.payment_method}</div>
                          <div className="text-[10px] font-mono text-[#707070]">{p.gateway_reference}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F0FDF4] text-[#15803D]">
                            SETTLED
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-[#707070]">
                      No settled payment records yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Transaction Summaries Table */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-sans text-[#171717]">
              Monthly Transaction Summaries (Canonical USD)
            </h3>
            <span className="text-xs font-mono text-[#707070]">
              {monthlyReports.length} Accounting Period{monthlyReports.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F8F8F8] text-[#707070] uppercase text-[10px] border-b border-[#EAEAEA]">
                <tr>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Sales Completed</th>
                  <th className="py-3 px-4">Gross Collections (USD)</th>
                  <th className="py-3 px-4">Gateway Fees (USD)</th>
                  <th className="py-3 px-4">Net Receipts (USD)</th>
                  <th className="py-3 px-4 text-right">Highest Sale (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAEAEA] text-[#171717]">
                {monthlyReports.length > 0 ? (
                  monthlyReports.map((r, i) => (
                    <tr key={i} className="hover:bg-[#F8F8F8] transition-colors">
                      <td className="py-3.5 px-4 font-bold font-sans">{r.month}</td>
                      <td className="py-3.5 px-4">{r.salesCount} Tenure{r.salesCount !== 1 ? 's' : ''}</td>
                      <td className="py-3.5 px-4 font-bold">{formatUSDOnly(r.grossVolume)}</td>
                      <td className="py-3.5 px-4 text-[#DC2626]">-{formatUSDOnly(r.gatewayFees)}</td>
                      <td className="py-3.5 px-4 font-bold text-[#15803D]">{formatUSDOnly(r.netRevenue)}</td>
                      <td className="py-3.5 px-4 text-right text-[#707070]">{formatUSDOnly(r.highestSale)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-[#707070]">
                      No settled monthly transactions yet recorded.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
