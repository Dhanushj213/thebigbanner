'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Gavel, ShieldCheck, X, ExternalLink, ArrowRight } from 'lucide-react';
import { formatUSDOnly } from '@/utils/formatters';

interface AuctionRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  bidAmount: number;
  bidderName: string;
  bidderCompany: string;
  isSubmitting?: boolean;
}

export const AuctionRulesModal: React.FC<AuctionRulesModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  bidAmount,
  bidderName,
  bidderCompany,
  isSubmitting = false,
}) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FFFFFF] border-2 border-[#171717] rounded-xl max-w-lg w-full p-6 sm:p-7 space-y-5 text-xs text-[#171717] shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-[#EAEAEA]">
          <div className="flex items-center gap-2 font-mono font-bold text-sm uppercase">
            <Gavel className="w-4 h-4 text-[#D50100]" />
            <span>Auction Rules Pre-Bid Acknowledgement</span>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-[#707070] hover:text-[#171717]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 bg-[#F8F8F8] border border-[#EAEAEA] rounded-lg space-y-2 font-mono">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#707070]">Proposed Binding Bid:</span>
            <strong className="text-base text-[#D50100] font-bold">
              {formatUSDOnly(bidAmount, { showCode: true })}
            </strong>
          </div>
          <div className="flex items-center justify-between text-[11px] text-[#707070] border-t border-[#EAEAEA] pt-2">
            <span>Bidding As:</span>
            <span className="text-[#171717] font-semibold">{bidderName} ({bidderCompany})</span>
          </div>
        </div>

        <div className="space-y-2.5 text-xs text-[#707070] leading-relaxed">
          <p className="font-semibold text-[#171717]">
            Please confirm your binding agreement to the following authoritative platform rules:
          </p>
          <ul className="space-y-1.5 list-disc pl-4 text-[11px]">
            <li>
              <strong>Binding Irrevocability:</strong> A valid bid submitted to THE BIG BANNER cannot be canceled, reduced, or withdrawn once accepted by the server.
            </li>
            <li>
              <strong>24-Hour Settlement Obligation:</strong> If your bid is the highest bid upon closing, you are legally obligated to complete escrow payment settlement within 24 hours.
            </li>
            <li>
              <strong>Anti-Sniping Clock Extension:</strong> Any qualifying bid placed in the final 120 seconds extends the auction countdown by +120 seconds.
            </li>
            <li>
              <strong>Editorial Separation:</strong> Winning the auction confers the exclusive right to submit a creative, which must pass editorial verification prior to homepage broadcast.
            </li>
          </ul>
        </div>

        <div className="p-3 bg-[#FFFFFF] border border-[#EAEAEA] rounded flex items-start gap-2.5">
          <input
            type="checkbox"
            id="agree-rules"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded text-[#D50100] focus:ring-[#D50100] cursor-pointer"
          />
          <label htmlFor="agree-rules" className="text-xs text-[#171717] cursor-pointer leading-snug">
            I have read and unconditionally agree to the{' '}
            <Link
              href="/legal/auction-rules"
              target="_blank"
              className="text-[#D50100] underline font-bold"
            >
              Auction & Bidding Rules (Doc 05)
            </Link>{' '}
            and the master{' '}
            <Link
              href="/legal/terms-and-conditions"
              target="_blank"
              className="text-[#D50100] underline font-bold"
            >
              Terms & Conditions
            </Link>
            .
          </label>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#EAEAEA]">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 border border-[#EAEAEA] hover:border-[#171717] text-[#707070] hover:text-[#171717] rounded font-mono text-xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!agreed || isSubmitting}
            className="px-6 py-2.5 bg-[#D50100] hover:bg-[#B50100] disabled:bg-[#707070] disabled:opacity-50 text-white rounded font-mono text-xs font-bold transition-all shadow-sm flex items-center gap-2"
          >
            <span>{isSubmitting ? 'Transmitting Bid...' : 'Confirm Binding Bid'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
