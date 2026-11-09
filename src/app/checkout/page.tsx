'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Coins,
  Building,
  User,
  Mail,
  Phone,
  Sparkles,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { SUPPORTED_CURRENCIES, SupportedCurrency } from '@/types/currency';

declare global {
  interface Window {
    Cashfree?: any;
  }
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { selectedCurrency, formatUSDOnly, formatAmount, rates } = useCurrency();

  const [amountUSD, setAmountUSD] = useState<number>(365000);
  const [tenureNumber, setTenureNumber] = useState<number>(9);
  const [targetCurrency, setTargetCurrency] = useState<SupportedCurrency>('INR');
  const [customerName, setCustomerName] = useState('Alex Vance');
  const [companyName, setCompanyName] = useState('Solaris Aerospace AG');
  const [customerEmail, setCustomerEmail] = useState('alex.vance@solaris-aerospace.com');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cashfreeLoaded, setCashfreeLoaded] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePolicies, setAgreePolicies] = useState(false);

  // Sync amount from URL if provided (e.g. /checkout?amount=365000&tenure=9)
  useEffect(() => {
    const urlAmt = searchParams?.get('amount');
    const urlTenure = searchParams?.get('tenure');
    if (urlAmt && !isNaN(Number(urlAmt))) {
      setAmountUSD(Number(urlAmt));
    }
    if (urlTenure && !isNaN(Number(urlTenure))) {
      setTenureNumber(Number(urlTenure));
    }
  }, [searchParams]);

  // Compute live converted value
  const fxRate = rates[targetCurrency] || 1.0;
  const targetMeta = SUPPORTED_CURRENCIES[targetCurrency];
  const chargedAmount =
    targetCurrency === 'USD'
      ? amountUSD
      : targetCurrency === 'JPY'
      ? Math.round(amountUSD * fxRate)
      : Number((amountUSD * fxRate).toFixed(2));

  const handleCashfreePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms || !agreePolicies) {
      setError('Please review and check both legal acknowledgements before proceeding to settlement.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Record legal acceptances in audit log
      try {
        await Promise.all([
          fetch('/api/legal/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              documentId: 'DOC-01-TERMS',
              version: '2026.1',
              userId: 'usr_alex',
              context: 'checkout_settlement',
            }),
          }),
          fetch('/api/legal/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              documentId: 'DOC-07-PAYMENT',
              version: '2026.1',
              userId: 'usr_alex',
              context: 'checkout_settlement',
            }),
          }),
          fetch('/api/legal/accept', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              documentId: 'DOC-08-OWNERSHIP',
              version: '2026.1',
              userId: 'usr_alex',
              context: 'checkout_settlement',
            }),
          }),
        ]);
      } catch (logErr) {
        console.warn('Legal audit log notice:', logErr);
      }

      // 1. Create order on server
      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          auctionId: `auc_00${tenureNumber}`,
          ownershipId: `own_${tenureNumber}`,
          amountUSD,
          targetCurrency,
          customerName,
          customerEmail,
          customerPhone,
          userId: 'usr_alex',
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to initialize payment order');
      }

      const orderData = await res.json();
      const { paymentSessionId, orderId, isSimulated } = orderData;

      // 2. If Cashfree JS SDK is loaded and we have a valid session
      if (window.Cashfree && paymentSessionId && !isSimulated) {
        const cashfreeEnv = process.env.NEXT_PUBLIC_CASHFREE_ENV === 'PRODUCTION' ? 'production' : 'sandbox';
        const cashfree = window.Cashfree({ mode: cashfreeEnv });

        cashfree.checkout({
          paymentSessionId,
          redirectTarget: '_self', // or redirect after modal
        });
      } else {
        // Simulated / Sandbox fallback: redirect directly to verification page
        setTimeout(() => {
          router.push(`/checkout/result?order_id=${encodeURIComponent(orderId)}`);
        }, 800);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Payment initiation failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10">
      {/* Cashfree JS SDK Script */}
      <Script
        src="https://sdk.cashfree.com/js/v3/cashfree.js"
        onLoad={() => setCashfreeLoaded(true)}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#707070]">
          <Link href="/auction" className="hover:text-[#171717]">Live Auction Arena</Link>
          <span>/</span>
          <span className="text-[#D50100] font-semibold">Cashfree Escrow Settlement</span>
        </div>

        {/* Header */}
        <div className="pb-6 border-b border-[#EAEAEA] space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#D50100] uppercase font-bold tracking-wider">
            <Lock className="w-4 h-4" />
            <span>SECURE ESCROW CHECKOUT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#171717] uppercase tracking-tight font-sans">
            Settle Billboard Ownership
          </h1>
          <p className="text-xs sm:text-sm text-[#707070] max-w-2xl">
            Complete payment for Tenure Slot #{tenureNumber} via Cashfree Payments Gateway. All funds remain in escrow until creative compliance clears.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs font-mono text-[#DC2626] flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Form Column (7 cols) */}
          <form onSubmit={handleCashfreePayment} className="md:col-span-7 space-y-6">
            
            {/* Step 1: Currency Preference */}
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                <h3 className="text-xs font-mono uppercase text-[#171717] font-bold flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#D50100]" />
                  <span>1. Settlement Currency via Cashfree</span>
                </h3>
                <span className="text-[10px] font-mono text-[#15803D] font-bold">
                  INR & Global FX
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-[#707070] block">
                  Select Billing Currency:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['INR', 'USD', 'EUR', 'GBP', 'AED', 'SGD'] as SupportedCurrency[]).map((code) => {
                    const meta = SUPPORTED_CURRENCIES[code];
                    const isSelected = targetCurrency === code;
                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setTargetCurrency(code)}
                        className={`p-2.5 rounded border text-left transition-all text-xs font-mono flex items-center justify-between ${
                          isSelected
                            ? 'border-[#D50100] bg-[#FFF5F5] text-[#D50100] font-bold shadow-sm'
                            : 'border-[#EAEAEA] bg-[#F8F8F8] text-[#171717] hover:border-[#171717]'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{meta.flag}</span>
                          <span>{code}</span>
                        </div>
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#D50100]" />}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-[#707070] pt-1">
                  * Conversion Rate: 1 USD = {fxRate} {targetCurrency} (Authoritative Consensus).
                </p>
              </div>
            </div>

            {/* Step 2: Advertiser Billing Entity */}
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                <h3 className="text-xs font-mono uppercase text-[#171717] font-bold flex items-center gap-2">
                  <Building className="w-4 h-4 text-[#D50100]" />
                  <span>2. Billing Contact & Entity</span>
                </h3>
                <span className="text-[10px] font-mono text-[#707070]">Verified Account</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-[11px] text-[#707070] block mb-1">Company / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#707070] block mb-1">Contact Name</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#707070] block mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-[#707070] block mb-1">Corporate Billing Email</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Legal Compliance & Statutory Acknowledgement */}
            <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 space-y-4 shadow-subtle">
              <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
                <h3 className="text-xs font-mono uppercase text-[#171717] font-bold flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#D50100]" />
                  <span>3. Mandatory Legal Consent & Operator Disclosure</span>
                </h3>
                <span className="text-[10px] font-mono text-[#D50100] font-bold">Required</span>
              </div>

              <div className="space-y-3 text-xs font-sans text-[#171717]">
                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreePolicies}
                    onChange={(e) => setAgreePolicies(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#D50100] border-[#D50100] rounded focus:ring-0 cursor-pointer accent-[#D50100]"
                  />
                  <span className="text-[11px] leading-relaxed text-[#707070]">
                    I have read, understood, and accept the{' '}
                    <Link href="/legal/payment-policy" target="_blank" className="text-[#171717] font-semibold underline underline-offset-2 hover:text-[#D50100]">
                      Payment & Billing Policy
                    </Link>{' '}
                    and{' '}
                    <Link href="/legal/ownership-policy" target="_blank" className="text-[#171717] font-semibold underline underline-offset-2 hover:text-[#D50100]">
                      Ownership & Display Policy
                    </Link>
                    . I understand that payment secures exclusive homepage tenure and that funds remain in escrow until creative clearance.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 w-4 h-4 text-[#D50100] border-[#D50100] rounded focus:ring-0 cursor-pointer accent-[#D50100]"
                  />
                  <span className="text-[11px] leading-relaxed text-[#707070]">
                    I accept the{' '}
                    <Link href="/legal/terms-and-conditions" target="_blank" className="text-[#171717] font-semibold underline underline-offset-2 hover:text-[#D50100]">
                      Terms & Conditions
                    </Link>
                    ,{' '}
                    <Link href="/legal/advertising-policy" target="_blank" className="text-[#171717] font-semibold underline underline-offset-2 hover:text-[#D50100]">
                      Advertising Policy
                    </Link>
                    , and{' '}
                    <Link href="/legal/refund-policy" target="_blank" className="text-[#171717] font-semibold underline underline-offset-2 hover:text-[#D50100]">
                      Refund Policy
                    </Link>
                    . I acknowledge that payments are processed by Cashfree Payments on behalf of{' '}
                    <strong className="text-[#171717]">AXIOMIS Technologies</strong> (Proprietorship, India), the sole operating entity of THE BIG BANNER.
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Cashfree Submit Action */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={loading || !agreeTerms || !agreePolicies}
                className="w-full py-4 bg-[#D50100] hover:bg-[#B80000] disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Connecting to Cashfree Gateway...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay {targetMeta?.symbol || ''}{chargedAmount.toLocaleString()} {targetCurrency} via Cashfree</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] font-mono text-[#707070] pt-1">
                <span>✓ UPI</span>
                <span>•</span>
                <span>✓ NetBanking</span>
                <span>•</span>
                <span>✓ Visa / Mastercard / Amex</span>
                <span>•</span>
                <span>✓ International Cards</span>
              </div>
            </div>

          </form>

          {/* Order Summary Column (5 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-lg p-6 space-y-6 shadow-subtle">
              <div className="pb-4 border-b border-[#EAEAEA] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#D50100] font-bold block">
                  ORDER SPECIFICATION
                </span>
                <h3 className="text-xl font-bold font-sans text-[#171717]">
                  Tenure Slot #{tenureNumber}
                </h3>
                <p className="text-xs text-[#707070] font-mono">
                  14-Day Global Homepage Monopoly
                </p>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between text-[#707070]">
                  <span>Authoritative Clearing Price:</span>
                  <strong className="text-[#171717] text-sm">
                    {formatUSDOnly(amountUSD)}
                  </strong>
                </div>

                <div className="flex items-center justify-between text-[#707070]">
                  <span>Gateway Fee (~2%):</span>
                  <span className="text-[#DC2626]">
                    Included in settlement
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#707070]">
                  <span>Exchange Rate (USD to {targetCurrency}):</span>
                  <span>1 USD = {fxRate} {targetCurrency}</span>
                </div>

                <div className="pt-3 border-t border-[#EAEAEA] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#707070] block">
                      Amount Due in {targetCurrency}:
                    </span>
                    <strong className="text-2xl font-black font-mono text-[#15803D]">
                      {targetMeta?.symbol || ''}{chargedAmount.toLocaleString()} {targetCurrency}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Institutional Protection Note */}
              <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-[#171717] text-[11px] font-mono uppercase">
                  <ShieldCheck className="w-4 h-4 text-[#15803D]" />
                  <span>Escrow & Refund Protection</span>
                </div>
                <p className="text-[11px] text-[#707070] leading-relaxed font-sans">
                  Funds are secured in escrow. If your advertising creative is rejected during compliance review and cannot be amended, 100% of the funds are refunded to the source account.
                </p>
              </div>

              {/* Legal Operator Disclosures */}
              <div className="p-3 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[11px] font-mono space-y-1.5 text-[#707070]">
                <div className="text-[#171717] font-bold uppercase text-[10px] tracking-wider">
                  Legal Operator & Contracting Entity
                </div>
                <div>Entity: <strong className="text-[#171717]">AXIOMIS Technologies</strong></div>
                <div>Legal Form: Sole Proprietorship, India</div>
                <div>Brand: THE BIG BANNER (Global Digital Advertising Marketplace)</div>
                <div>Operator Site: <a href="https://axiomis.in" target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D50100]">axiomis.in</a></div>
              </div>

              {/* Cashfree Official Badge */}
              <div className="pt-2 text-center text-[10px] font-mono text-[#707070] border-t border-[#EAEAEA]">
                Powered by <strong>Cashfree Payments</strong> • PCI-DSS Level 1 Compliant
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-24 text-center font-mono text-xs text-[#707070]">
          Loading Cashfree checkout console...
        </div>
      }
    >
      <CheckoutContent />
    </React.Suspense>
  );
}
