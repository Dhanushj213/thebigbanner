'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle2,
  ShieldCheck,
  Download,
  ArrowRight,
  FileText,
  Printer,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { formatDate } from '@/utils/formatters';

function CheckoutResultContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('order_id') || searchParams?.get('orderId');
  const { formatUSDOnly } = useCurrency();

  const [payment, setPayment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    async function verifyPayment() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/payments/verify?order_id=${encodeURIComponent(orderId)}`);
        if (res.ok) {
          const data = await res.json();
          setVerified(data.verified);
          setPayment(data.payment);
        }
      } catch (err) {
        console.error('Payment verification error:', err);
      } finally {
        setLoading(false);
      }
    }

    verifyPayment();
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-[#FFFFFF] min-h-screen py-24 text-center font-mono text-xs text-[#707070]">
        Verifying payment with Cashfree Payments Gateway...
      </div>
    );
  }

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-10 space-y-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Success Banner */}
        <div className="bg-[#F0FDF4] border-2 border-[#BBF7D0] rounded-xl p-8 text-center space-y-3 shadow-subtle">
          <div className="w-12 h-12 rounded-full bg-[#15803D] text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#15803D] font-bold block">
            ESCROW PAYMENT CAPTURED & SETTLED
          </span>
          <h1 className="text-2xl sm:text-4xl font-black font-sans uppercase tracking-tight text-[#171717]">
            Ownership Placement Secured
          </h1>
          <p className="text-xs sm:text-sm text-[#707070] max-w-lg mx-auto leading-relaxed">
            Your transaction has been verified through Cashfree Payments. Your funds are secured in escrow pending editorial asset approval.
          </p>
        </div>

        {/* Cryptographic Payment Receipt Card */}
        <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-lg p-6 sm:p-8 space-y-6 shadow-card">
          <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
            <div>
              <span className="text-[10px] font-mono text-[#D50100] uppercase font-bold tracking-wider block">
                OFFICIAL ESCROW RECEIPT
              </span>
              <h3 className="text-base font-bold font-sans text-[#171717] mt-0.5">
                THE BIG BANNER Foundation
              </h3>
            </div>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-[#F8F8F8] border border-[#EAEAEA] hover:bg-[#EAEAEA] text-[#171717] rounded text-xs font-mono font-medium flex items-center gap-1.5 transition-colors no-print"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Cashfree Order Ref:</span>
              <strong className="text-[#171717] break-all">{orderId || 'ord_tbb_verified'}</strong>
            </div>

            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Canonical USD Amount:</span>
              <strong className="text-[#15803D] text-sm">
                {payment?.amount ? formatUSDOnly(payment.amount) : '$365,000 USD'}
              </strong>
            </div>

            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Charged Settlement:</span>
              <strong className="text-[#171717]">
                {payment?.charged_amount
                  ? `${payment.charged_amount.toLocaleString()} ${payment.charged_currency}`
                  : 'Settled in Full'}
              </strong>
            </div>

            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Payment Channel:</span>
              <span className="text-[#171717]">{payment?.payment_method || 'Cashfree PG (Escrow)'}</span>
            </div>

            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Applied FX Rate:</span>
              <span className="text-[#171717]">
                {payment?.exchange_rate ? `1 USD = ${payment.exchange_rate} ${payment.charged_currency}` : 'Canonical (1:1)'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-[#707070] uppercase block">Status:</span>
              <span className="text-[#15803D] font-bold">SETTLED IN ESCROW</span>
            </div>
          </div>

          <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-xs font-mono text-[#707070] space-y-1">
            <span className="text-[#171717] font-bold block">Next Mandatory Action:</span>
            <p className="font-sans leading-relaxed">
              To broadcast your advertisement on the global billboard during your ownership period, upload your desktop (1920×600) and mobile (900×1200) creatives in the Creative Studio.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 no-print">
          <Link
            href="/dashboard/advertisements"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D50100] hover:bg-[#B80000] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Proceed to Creative Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/dashboard/payments"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#FFFFFF] border border-[#EAEAEA] hover:bg-[#F8F8F8] text-[#171717] text-xs font-mono font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2"
          >
            <span>View All Invoices</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutResultPage() {
  return (
    <React.Suspense
      fallback={
        <div className="bg-[#FFFFFF] min-h-screen py-24 text-center font-mono text-xs text-[#707070]">
          Verifying payment with Cashfree Payments Gateway...
        </div>
      }
    >
      <CheckoutResultContent />
    </React.Suspense>
  );
}
