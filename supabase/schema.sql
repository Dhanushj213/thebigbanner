-- ==============================================================================
-- THE BIG BANNER — PostgreSQL Schema for Supabase
-- Project ID: mnxljurcalpjngwdgihy
-- URL: https://mnxljurcalpjngwdgihy.supabase.co
-- ==============================================================================

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  company_name TEXT,
  country TEXT NOT NULL,
  country_code TEXT DEFAULT 'US',
  advertiser_type TEXT DEFAULT 'business',
  role TEXT DEFAULT 'advertiser',
  verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. AUCTIONS TABLE
CREATE TABLE IF NOT EXISTS public.auctions (
  id TEXT PRIMARY KEY,
  auction_number INTEGER UNIQUE NOT NULL,
  target_ownership_number INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('draft', 'upcoming', 'live', 'extended', 'ended', 'settled', 'cancelled', 'completed')),
  opening_price NUMERIC NOT NULL,
  previous_winning_price NUMERIC NOT NULL,
  minimum_escalation_pct NUMERIC DEFAULT 10,
  current_highest_bid NUMERIC NOT NULL,
  highest_bidder_id TEXT REFERENCES public.users(id),
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  closing_timestamp_ms BIGINT NOT NULL,
  extensions_count INTEGER DEFAULT 0,
  total_bids_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BIDS TABLE
CREATE TABLE IF NOT EXISTS public.bids (
  id TEXT PRIMARY KEY,
  auction_id TEXT NOT NULL REFERENCES public.auctions(id),
  bidder_id TEXT NOT NULL REFERENCES public.users(id),
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL DEFAULT 'valid' CHECK (status IN ('valid', 'outbid', 'rejected', 'winning')),
  timestamp_ms BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. OWNERSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.ownerships (
  id TEXT PRIMARY KEY,
  ownership_number INTEGER UNIQUE NOT NULL,
  auction_id TEXT REFERENCES public.auctions(id),
  owner_id TEXT NOT NULL REFERENCES public.users(id),
  brand_name TEXT NOT NULL,
  country TEXT NOT NULL,
  country_code TEXT DEFAULT 'US',
  purchase_price NUMERIC NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'escrowed', 'refunded')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'active', 'completed')),
  transaction_hash TEXT NOT NULL,
  certificate_serial TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ADVERTISEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.advertisements (
  id TEXT PRIMARY KEY,
  ownership_id TEXT NOT NULL REFERENCES public.ownerships(id),
  user_id TEXT NOT NULL REFERENCES public.users(id),
  brand_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  destination_url TEXT NOT NULL,
  desktop_creative_url TEXT,
  mobile_creative_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
  moderator_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ
);

-- 6. PAYMENTS TABLE (Canonical USD + Multi-Currency Settlement Metadata)
CREATE TABLE IF NOT EXISTS public.payments (
  id TEXT PRIMARY KEY,
  auction_id TEXT REFERENCES public.auctions(id),
  ownership_id TEXT REFERENCES public.ownerships(id),
  user_id TEXT NOT NULL REFERENCES public.users(id),
  amount NUMERIC NOT NULL, -- Canonical USD
  currency TEXT DEFAULT 'USD',
  charged_currency TEXT DEFAULT 'USD', -- Settlement currency (EUR, GBP, JPY, etc.)
  charged_amount NUMERIC NOT NULL,
  exchange_rate NUMERIC DEFAULT 1.0,
  gateway_fee NUMERIC NOT NULL,
  net_amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  gateway_reference TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'escrowed', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor_id TEXT,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. EXCHANGE RATES CACHE
CREATE TABLE IF NOT EXISTS public.exchange_rates_cache (
  currency TEXT PRIMARY KEY,
  rate NUMERIC NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.exchange_rates_meta (
  id TEXT PRIMARY KEY,
  provider TEXT NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ownerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates_meta ENABLE ROW LEVEL SECURITY;

-- Allow public read access on transparent platform tables
CREATE POLICY "Public Read Auctions" ON public.auctions FOR SELECT USING (true);
CREATE POLICY "Public Read Ownerships" ON public.ownerships FOR SELECT USING (true);
CREATE POLICY "Public Read Advertisements" ON public.advertisements FOR SELECT USING (true);
CREATE POLICY "Public Read Payments Ledger" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Public Read Bids" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Public Read Exchange Rates" ON public.exchange_rates_cache FOR SELECT USING (true);
CREATE POLICY "Public Read Exchange Rates Meta" ON public.exchange_rates_meta FOR SELECT USING (true);

-- ==============================================================================
-- SEED INITIAL SYSTEM & VERIFIED DEMONSTRATION DATA
-- ==============================================================================

-- Seed Users
INSERT INTO public.users (id, email, password_hash, name, company_name, country, country_code, advertiser_type, role, verified)
VALUES
  ('usr_admin', 'governance@thebigbanner.com', 'admin_hash_protected', 'Executive Governance', 'THE BIG BANNER Foundation', 'Switzerland', 'CH', 'business', 'admin', true),
  ('usr_alex', 'alex.vance@solaris-aerospace.com', 'demo_hash_protected', 'Alex Vance', 'Solaris Aerospace AG', 'Germany', 'DE', 'business', 'advertiser', true),
  ('usr_evelyn', 'evelyn@aurora-biotech.co.uk', 'demo_hash_protected', 'Dr. Evelyn Reed', 'Aurora Longevity Therapeutics', 'United Kingdom', 'GB', 'business', 'advertiser', true)
ON CONFLICT (id) DO NOTHING;

-- Seed Concluded Auctions & Historical Ownerships
INSERT INTO public.auctions (id, auction_number, target_ownership_number, status, opening_price, previous_winning_price, minimum_escalation_pct, current_highest_bid, highest_bidder_id, starts_at, ends_at, closing_timestamp_ms)
VALUES
  ('auc_001', 1, 1, 'completed', 100000, 0, 10, 100000, 'usr_alex', NOW() - INTERVAL '120 days', NOW() - INTERVAL '117 days', 1000),
  ('auc_002', 2, 2, 'completed', 110000, 100000, 10, 130000, 'usr_alex', NOW() - INTERVAL '105 days', NOW() - INTERVAL '102 days', 2000),
  ('auc_003', 3, 3, 'completed', 143000, 130000, 10, 150000, 'usr_alex', NOW() - INTERVAL '90 days', NOW() - INTERVAL '87 days', 3000),
  ('auc_004', 4, 4, 'completed', 165000, 150000, 10, 170000, 'usr_alex', NOW() - INTERVAL '75 days', NOW() - INTERVAL '72 days', 4000),
  ('auc_005', 5, 5, 'completed', 187000, 170000, 10, 195000, 'usr_alex', NOW() - INTERVAL '60 days', NOW() - INTERVAL '57 days', 5000),
  ('auc_006', 6, 6, 'completed', 214500, 195000, 10, 220000, 'usr_alex', NOW() - INTERVAL '45 days', NOW() - INTERVAL '42 days', 6000),
  ('auc_007', 7, 7, 'completed', 242000, 220000, 10, 250000, 'usr_evelyn', NOW() - INTERVAL '30 days', NOW() - INTERVAL '27 days', 7000),
  ('auc_008', 8, 8, 'completed', 275000, 250000, 10, 285000, 'usr_alex', NOW() - INTERVAL '15 days', NOW() - INTERVAL '12 days', 8000)
ON CONFLICT (id) DO NOTHING;

-- Seed Ownership Records
INSERT INTO public.ownerships (id, ownership_number, auction_id, owner_id, brand_name, country, country_code, purchase_price, currency, payment_status, start_date, end_date, status, transaction_hash, certificate_serial)
VALUES
  ('own_1', 1, 'auc_001', 'usr_alex', 'Astraea Quantum Dynamics', 'United States', 'US', 100000, 'USD', 'completed', NOW() - INTERVAL '117 days', NOW() - INTERVAL '103 days', 'completed', '0x1a8f93e17b029c441aa731e84df908b1a32a68c07f4339b', 'TBB-CERT-2026-0001'),
  ('own_2', 2, 'auc_002', 'usr_alex', 'Kurogane Heavy Industries', 'Japan', 'JP', 130000, 'USD', 'completed', NOW() - INTERVAL '102 days', NOW() - INTERVAL '88 days', 'completed', '0x2b9c84d28c130d552bb842f95ea019c2b43b79d18e5440c', 'TBB-CERT-2026-0002'),
  ('own_3', 3, 'auc_003', 'usr_alex', 'Valkyrie Autonomous Aerospace', 'Germany', 'DE', 150000, 'USD', 'completed', NOW() - INTERVAL '87 days', NOW() - INTERVAL '73 days', 'completed', '0x3c0d95e39d241e663cc953a06fb120d3c54c80e29f6551d', 'TBB-CERT-2026-0003'),
  ('own_4', 4, 'auc_004', 'usr_alex', 'SingaPay Global Settlements', 'Singapore', 'SG', 170000, 'USD', 'completed', NOW() - INTERVAL '72 days', NOW() - INTERVAL '58 days', 'completed', '0x4d1e06f40e352f774dd064b17ac231e4d65d91f30a7662e', 'TBB-CERT-2026-0004'),
  ('own_5', 5, 'auc_005', 'usr_alex', 'Al-Miraj Falcon Energy', 'United Arab Emirates', 'AE', 195000, 'USD', 'completed', NOW() - INTERVAL '57 days', NOW() - INTERVAL '43 days', 'completed', '0x5e2f17a51f463a885ee175c28bd342f5e76ea2a41b8773f', 'TBB-CERT-2026-0005'),
  ('own_6', 6, 'auc_006', 'usr_alex', 'Solaris Aerospace AG', 'Germany', 'DE', 220000, 'USD', 'completed', NOW() - INTERVAL '42 days', NOW() - INTERVAL '28 days', 'completed', '0x6f3a28b62a574b996ff286d39ce453a6f87fb3b52c9884a', 'TBB-CERT-2026-0006'),
  ('own_7', 7, 'auc_007', 'usr_evelyn', 'Aurora Longevity Therapeutics', 'United Kingdom', 'GB', 250000, 'USD', 'completed', NOW() - INTERVAL '27 days', NOW() - INTERVAL '13 days', 'completed', '0x7a4b39c73b685ca07aa397e40df564b7a98ac4c63da995b', 'TBB-CERT-2026-0007'),
  ('own_8', 8, 'auc_008', 'usr_alex', 'AETHER X Orbital Data Systems', 'United States', 'US', 285000, 'USD', 'completed', NOW() - INTERVAL '12 days', NOW() + INTERVAL '2 days', 'active', '0x8f2d93e18a09b441ca731e84df908b1a32a68c07f4339b', 'TBB-CERT-2026-0008')
ON CONFLICT (id) DO NOTHING;

-- Seed Multi-Currency Payments
INSERT INTO public.payments (id, auction_id, ownership_id, user_id, amount, currency, charged_currency, charged_amount, exchange_rate, gateway_fee, net_amount, payment_method, gateway_reference, status)
VALUES
  ('pay_1', 'auc_001', 'own_1', 'usr_alex', 100000, 'USD', 'USD', 100000, 1.0, 2000, 98000, 'Fedwire / Stripe Treasury Escrow', 'CF_REF_1_VERIFIED', 'completed'),
  ('pay_2', 'auc_002', 'own_2', 'usr_alex', 130000, 'USD', 'JPY', 20150000, 155.0, 2600, 127400, 'Bank Wire / SMBC Escrow', 'CF_REF_2_VERIFIED', 'completed'),
  ('pay_3', 'auc_003', 'own_3', 'usr_alex', 150000, 'USD', 'EUR', 138000, 0.92, 3000, 147000, 'SEPA Corporate Wire', 'CF_REF_3_VERIFIED', 'completed'),
  ('pay_4', 'auc_004', 'own_4', 'usr_alex', 170000, 'USD', 'SGD', 227800, 1.34, 3400, 166600, 'DBS Fast Wire / Escrow', 'CF_REF_4_VERIFIED', 'completed'),
  ('pay_5', 'auc_005', 'own_5', 'usr_alex', 195000, 'USD', 'AED', 715650, 3.67, 3900, 191100, 'ADCB Escrow Protocol', 'CF_REF_5_VERIFIED', 'completed'),
  ('pay_6', 'auc_006', 'own_6', 'usr_alex', 220000, 'USD', 'CHF', 193600, 0.88, 4400, 215600, 'Credit Suisse Institutional Wire', 'CF_REF_6_VERIFIED', 'completed'),
  ('pay_7', 'auc_007', 'own_7', 'usr_evelyn', 250000, 'USD', 'GBP', 195000, 0.78, 5000, 245000, 'CHAPS Clearing Wire', 'CF_REF_7_VERIFIED', 'completed'),
  ('pay_8', 'auc_008', 'own_8', 'usr_alex', 285000, 'USD', 'USD', 285000, 1.0, 5700, 279300, 'Stripe Treasury Escrow', 'CF_REF_8_VERIFIED', 'completed')
ON CONFLICT (id) DO NOTHING;

-- Seed Active Live Auction #9
INSERT INTO public.auctions (id, auction_number, target_ownership_number, status, opening_price, previous_winning_price, minimum_escalation_pct, current_highest_bid, highest_bidder_id, starts_at, ends_at, closing_timestamp_ms, total_bids_count)
VALUES
  ('auc_009', 9, 9, 'live', 313500, 285000, 10, 365000, 'usr_evelyn', NOW() - INTERVAL '3 days', NOW() + INTERVAL '2 hours 45 minutes', EXTRACT(EPOCH FROM (NOW() + INTERVAL '2 hours 45 minutes')) * 1000, 4)
ON CONFLICT (id) DO NOTHING;

-- Seed Live Bids for Auction #9
INSERT INTO public.bids (id, auction_id, bidder_id, amount, currency, status, timestamp_ms)
VALUES
  ('bid_001', 'auc_009', 'usr_alex', 315000, 'USD', 'outbid', EXTRACT(EPOCH FROM (NOW() - INTERVAL '2 days')) * 1000),
  ('bid_002', 'auc_009', 'usr_evelyn', 330000, 'USD', 'outbid', EXTRACT(EPOCH FROM (NOW() - INTERVAL '1 day')) * 1000),
  ('bid_003', 'auc_009', 'usr_alex', 350000, 'USD', 'outbid', EXTRACT(EPOCH FROM (NOW() - INTERVAL '4 hours')) * 1000),
  ('bid_004', 'auc_009', 'usr_evelyn', 365000, 'USD', 'winning', EXTRACT(EPOCH FROM (NOW() - INTERVAL '14 minutes')) * 1000)
ON CONFLICT (id) DO NOTHING;

-- Seed Live Creative for Owner #8
INSERT INTO public.advertisements (id, ownership_id, user_id, brand_name, title, description, destination_url, desktop_creative_url, mobile_creative_url, status, submitted_at, reviewed_at)
VALUES
  ('ad_008', 'own_8', 'usr_alex', 'AETHER X', 'Autonomous Orbital Intelligence. Available Today.', 'Next-generation orbital data centers providing zero-latency satellite compute for global enterprise infrastructure.', 'https://thebigbanner.com', '/thebigbannerlogo3.png', '/thebigbannerlogo1.png', 'approved', NOW() - INTERVAL '14 days', NOW() - INTERVAL '13 days')
ON CONFLICT (id) DO NOTHING;
