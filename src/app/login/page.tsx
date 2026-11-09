'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alex.vance@solaris-aerospace.com');
  const [password, setPassword] = useState('••••••••••••');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 400);
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
            Advertiser Sign In
          </h1>
          <p className="text-xs text-[#707070] font-mono">
            Access your active bids, creative studio, and certificates.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#FFFFFF] border border-[#EAEAEA] rounded-lg p-6 sm:p-8 space-y-5 shadow-subtle">
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-[#707070] block mb-1">Corporate Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#707070]">Password</label>
                <a href="#" className="text-[#D50100] hover:underline text-[11px]">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-[#F8F8F8] border border-[#EAEAEA] rounded text-[#171717] focus:outline-none focus:border-[#D50100]"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#D50100] hover:bg-[#B80000] text-white font-bold text-xs uppercase tracking-wider rounded font-mono shadow-sm"
            >
              {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
            </button>
          </form>

          {/* Quick Demo Personas */}
          <div className="pt-4 border-t border-[#EAEAEA] space-y-2 text-xs font-mono">
            <span className="text-[10px] uppercase text-[#707070] tracking-wider block text-center">
              Evaluation Demo Profiles
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  router.push('/dashboard');
                }}
                className="w-full p-2 bg-[#F8F8F8] hover:bg-[#F5F5F5] border border-[#EAEAEA] rounded text-left flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#171717] block font-sans">Alex Vance (Advertiser / Lead Bidder)</strong>
                  <span className="text-[10px] text-[#707070]">Solaris Aerospace AG</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#707070]" />
              </button>

              <button
                onClick={() => {
                  router.push('/admin');
                }}
                className="w-full p-2 bg-[#F8F8F8] hover:bg-[#F5F5F5] border border-[#EAEAEA] rounded text-left flex items-center justify-between"
              >
                <div>
                  <strong className="text-[#171717] block font-sans">Executive Governance (Admin)</strong>
                  <span className="text-[10px] text-[#707070]">Root Administration & Moderation</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#707070]" />
              </button>
            </div>
          </div>

          <div className="text-center text-xs text-[#707070] pt-2 border-t border-[#EAEAEA] font-sans">
            Need an advertiser profile?{' '}
            <Link href="/register" className="text-[#D50100] font-bold hover:underline">
              Register here
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
