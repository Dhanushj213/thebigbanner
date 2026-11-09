'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('India');
  const [advertiserType, setAdvertiserType] = useState('business');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setRegistered(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1200);
    }, 600);
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-md mx-auto px-4 space-y-6">
        
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Logo size="lg" withText={false} />
          </div>
          <h1 className="text-2xl font-bold font-sans text-[#171717] uppercase tracking-wide">
            Advertiser Registration
          </h1>
          <p className="text-xs text-[#707070] font-mono">
            Create an individual or corporate profile to participate in live auctions.
          </p>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 sm:p-8 space-y-5 shadow-subtle">
          {registered ? (
            <div className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#15803D] mx-auto" />
              <h3 className="text-sm font-bold text-[#171717] font-sans">Account Registered</h3>
              <p className="text-xs text-[#707070] font-mono">
                Redirecting you to your advertiser dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs font-mono">
              <div>
                <label className="text-[#707070] block mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Maya Sterling"
                  className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                  required
                />
              </div>

              <div>
                <label className="text-[#707070] block mb-1">Account Type *</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdvertiserType('business')}
                    className={`p-2 rounded border text-center transition-colors ${
                      advertiserType === 'business'
                        ? 'border-[#171717] bg-[#F8F8F8] text-[#171717] font-bold'
                        : 'border-[#EAEAEA] text-[#707070]'
                    }`}
                  >
                    Business
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdvertiserType('individual')}
                    className={`p-2 rounded border text-center transition-colors ${
                      advertiserType === 'individual'
                        ? 'border-[#171717] bg-[#F8F8F8] text-[#171717] font-bold'
                        : 'border-[#EAEAEA] text-[#707070]'
                    }`}
                  >
                    Individual
                  </button>
                </div>
              </div>

              {advertiserType === 'business' && (
                <div>
                  <label className="text-[#707070] block mb-1">Company / Brand Legal Name *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Apex Hyperloop AG"
                    className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100] font-sans"
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-[#707070] block mb-1">Corporate Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                  required
                />
              </div>

              <div>
                <label className="text-[#707070] block mb-1">Country *</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                >
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Germany">Germany</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Singapore">Singapore</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Japan">Japan</option>
                </select>
              </div>

              <div className="pt-2 text-[10px] text-[#707070] font-sans leading-relaxed">
                By registering, you agree to our{' '}
                <Link href="/terms" className="text-[#D50100] hover:underline">Terms of Service</Link>{' '}
                and{' '}
                <Link href="/advertising-policy" className="text-[#D50100] hover:underline">Advertising Guidelines</Link>.
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white font-bold text-xs uppercase tracking-wider rounded font-mono shadow-sm"
              >
                {loading ? 'Creating Profile...' : 'Complete Registration'}
              </button>
            </form>
          )}

          <div className="text-center text-xs text-[#707070] pt-2 border-t border-[#EAEAEA] font-sans">
            Already have an account?{' '}
            <Link href="/login" className="text-[#D50100] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
