'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

interface FAQClientProps {
  faqs: FAQItem[];
}

export function FAQClient({ faqs }: FAQClientProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg overflow-hidden shadow-subtle"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F8F8F8] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono bg-[#F5F5F5] text-[#707070] px-2 py-0.5 rounded uppercase font-bold">
                  {item.category}
                </span>
                <span className="text-sm font-bold text-[#171717] font-sans">{item.q}</span>
              </div>
              {isOpen ? (
                <ChevronUp className="w-4 h-4 text-[#D50100] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#707070] flex-shrink-0" />
              )}
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 text-xs text-[#707070] leading-relaxed border-t border-[#EAEAEA] font-sans">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
