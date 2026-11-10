-- ==============================================================================
-- THE BIG BANNER — PostgreSQL Production Schema for Supabase
-- Operator: AXIOMIS Technologies (https://axiomis.in)
-- Official Domain: https://thebigbanner.com
-- Idempotent & Genesis-Ready (Zero Fake / Demo Records)
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
  minimum_hike_usd NUMERIC DEFAULT 5,
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
  ownership_id TEXT REFERENCES public.ownerships(id),
  user_id TEXT NOT NULL REFERENCES public.users(id),
  brand_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  destination_url TEXT NOT NULL,
  desktop_creative_url TEXT,
  mobile_creative_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending_review' CHECK (status IN ('pending_review', 'approved', 'rejected')),
  moderator_notes TEXT,
  rejection_reason TEXT,
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
  charged_currency TEXT DEFAULT 'USD', -- Settlement currency (EUR, GBP, JPY, INR, etc.)
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

-- 8. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. EXCHANGE RATES CACHE
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

-- 10. LEGAL DOCUMENTS & COMPLIANCE TABLES
CREATE TABLE IF NOT EXISTS public.legal_documents (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published',
  effective_date TIMESTAMPTZ NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL,
  requires_legal_review BOOLEAN DEFAULT TRUE,
  content_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.legal_document_versions (
  id TEXT PRIMARY KEY,
  document_slug TEXT NOT NULL,
  version TEXT NOT NULL,
  content_json JSONB NOT NULL,
  effective_date TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

CREATE TABLE IF NOT EXISTS public.legal_document_acceptances (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES public.users(id),
  document_slug TEXT NOT NULL,
  document_version TEXT NOT NULL,
  acceptance_context TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  accepted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.legal_audit_logs (
  id TEXT PRIMARY KEY,
  action TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  target_document TEXT NOT NULL,
  details TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cookie_preferences (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  essential BOOLEAN DEFAULT TRUE,
  analytics BOOLEAN DEFAULT FALSE,
  marketing BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.privacy_requests (
  id TEXT PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  request_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  details TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'received',
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.grievance_requests (
  id TEXT PRIMARY KEY,
  ticket_number TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  complainant_name TEXT NOT NULL,
  complainant_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  details TEXT NOT NULL,
  evidence_url TEXT,
  status TEXT NOT NULL DEFAULT 'acknowledged',
  resolution_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR HIGH-CONCURRENCY AUCTION PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_auctions_status ON public.auctions(status);
CREATE INDEX IF NOT EXISTS idx_bids_auction ON public.bids(auction_id);
CREATE INDEX IF NOT EXISTS idx_bids_timestamp ON public.bids(timestamp_ms DESC);
CREATE INDEX IF NOT EXISTS idx_ownerships_status ON public.ownerships(status);
CREATE INDEX IF NOT EXISTS idx_payments_user ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_legal_acceptances_user ON public.legal_document_acceptances(user_id, document_slug);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES (Idempotent)
-- ==============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auctions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ownerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_document_acceptances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.legal_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cookie_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.privacy_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grievance_requests ENABLE ROW LEVEL SECURITY;

-- Clean existing policies for idempotency
DROP POLICY IF EXISTS "Public Read Auctions" ON public.auctions;
DROP POLICY IF EXISTS "Public Read Ownerships" ON public.ownerships;
DROP POLICY IF EXISTS "Public Read Advertisements" ON public.advertisements;
DROP POLICY IF EXISTS "Public Read Payments Ledger" ON public.payments;
DROP POLICY IF EXISTS "Public Read Bids" ON public.bids;
DROP POLICY IF EXISTS "Public Read Exchange Rates" ON public.exchange_rates_cache;
DROP POLICY IF EXISTS "Public Read Exchange Rates Meta" ON public.exchange_rates_meta;
DROP POLICY IF EXISTS "Public Read Notifications" ON public.notifications;
DROP POLICY IF EXISTS "Public Read Users" ON public.users;
DROP POLICY IF EXISTS "Public Read Audit Logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Public Read Legal Documents" ON public.legal_documents;
DROP POLICY IF EXISTS "Public Read Legal Versions" ON public.legal_document_versions;

DROP POLICY IF EXISTS "Public Insert Bids" ON public.bids;
DROP POLICY IF EXISTS "Public Update Auctions" ON public.auctions;
DROP POLICY IF EXISTS "Public Insert Payments" ON public.payments;
DROP POLICY IF EXISTS "Public Update Payments" ON public.payments;
DROP POLICY IF EXISTS "Public Insert Ownerships" ON public.ownerships;
DROP POLICY IF EXISTS "Public Update Ownerships" ON public.ownerships;
DROP POLICY IF EXISTS "Public Insert Advertisements" ON public.advertisements;
DROP POLICY IF EXISTS "Public Update Advertisements" ON public.advertisements;
DROP POLICY IF EXISTS "Public Insert Users" ON public.users;
DROP POLICY IF EXISTS "Public Update Users" ON public.users;
DROP POLICY IF EXISTS "Public Insert Audit Logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Public Insert Notifications" ON public.notifications;
DROP POLICY IF EXISTS "Public Update Notifications" ON public.notifications;
DROP POLICY IF EXISTS "Public Insert Legal Acceptances" ON public.legal_document_acceptances;
DROP POLICY IF EXISTS "Public Insert Cookie Preferences" ON public.cookie_preferences;
DROP POLICY IF EXISTS "Public Insert Privacy Requests" ON public.privacy_requests;
DROP POLICY IF EXISTS "Public Insert Grievance Requests" ON public.grievance_requests;

-- Read policies (Authoritative public transparency ledger)
CREATE POLICY "Public Read Auctions" ON public.auctions FOR SELECT USING (true);
CREATE POLICY "Public Read Ownerships" ON public.ownerships FOR SELECT USING (true);
CREATE POLICY "Public Read Advertisements" ON public.advertisements FOR SELECT USING (true);
CREATE POLICY "Public Read Payments Ledger" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Public Read Bids" ON public.bids FOR SELECT USING (true);
CREATE POLICY "Public Read Users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public Read Notifications" ON public.notifications FOR SELECT USING (true);
CREATE POLICY "Public Read Audit Logs" ON public.audit_logs FOR SELECT USING (true);
CREATE POLICY "Public Read Exchange Rates" ON public.exchange_rates_cache FOR SELECT USING (true);
CREATE POLICY "Public Read Exchange Rates Meta" ON public.exchange_rates_meta FOR SELECT USING (true);
CREATE POLICY "Public Read Legal Documents" ON public.legal_documents FOR SELECT USING (true);
CREATE POLICY "Public Read Legal Versions" ON public.legal_document_versions FOR SELECT USING (true);

-- Operational write policies
CREATE POLICY "Public Insert Bids" ON public.bids FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Auctions" ON public.auctions FOR UPDATE USING (true);
CREATE POLICY "Public Insert Payments" ON public.payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Payments" ON public.payments FOR UPDATE USING (true);
CREATE POLICY "Public Insert Ownerships" ON public.ownerships FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Ownerships" ON public.ownerships FOR UPDATE USING (true);
CREATE POLICY "Public Insert Advertisements" ON public.advertisements FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Advertisements" ON public.advertisements FOR UPDATE USING (true);
CREATE POLICY "Public Insert Users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Users" ON public.users FOR UPDATE USING (true);
CREATE POLICY "Public Insert Audit Logs" ON public.audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Notifications" ON public.notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Notifications" ON public.notifications FOR UPDATE USING (true);
CREATE POLICY "Public Insert Legal Acceptances" ON public.legal_document_acceptances FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Cookie Preferences" ON public.cookie_preferences FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Privacy Requests" ON public.privacy_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Grievance Requests" ON public.grievance_requests FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- ENABLE SUPABASE REALTIME (Live Updates)
-- ==============================================================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'auctions'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.auctions;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'bids'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.bids;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'ownerships'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.ownerships;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    -- If publication doesn't exist yet, continue safely
    NULL;
END $$;

-- ==============================================================================
-- SEED INITIAL AUTHORITATIVE GENESIS DATA (Zero Fake Records)
-- ==============================================================================

-- 1. Default Root Governance Administrator
INSERT INTO public.users (
  id, email, password_hash, name, company_name, country, country_code, advertiser_type, role, verified
)
VALUES (
  'usr_admin',
  'governance@thebigbanner.com',
  'admin_hash_protected',
  'Executive Governance',
  'AXIOMIS Technologies',
  'India',
  'IN',
  'business',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  company_name = EXCLUDED.company_name;

-- 2. Inaugural Genesis Auction #1 (Opening Reserve: $100 USD, $5 Minimum Hike)
INSERT INTO public.auctions (
  id,
  auction_number,
  target_ownership_number,
  status,
  opening_price,
  previous_winning_price,
  minimum_escalation_pct,
  minimum_hike_usd,
  current_highest_bid,
  highest_bidder_id,
  starts_at,
  ends_at,
  closing_timestamp_ms,
  extensions_count,
  total_bids_count
)
VALUES (
  'auc_001',
  1,
  1,
  'live',
  100,
  0,
  10,
  5,
  0,
  NULL,
  NOW(),
  NOW() + INTERVAL '3 days 4 hours',
  CAST(EXTRACT(EPOCH FROM (NOW() + INTERVAL '3 days 4 hours')) * 1000 AS BIGINT),
  0,
  0
)
ON CONFLICT (id) DO UPDATE SET
  opening_price = 100;

-- 3. Initial Audit Log
INSERT INTO public.audit_logs (id, action, actor_id, details)
VALUES (
  'audit_genesis',
  'GENESIS_INITIALIZED',
  'system',
  'Genesis Auction #1 created with opening price $100 USD and $5 USD minimum hike rule.'
)
ON CONFLICT (id) DO NOTHING;

-- 4. Initial Global Exchange Rates Baseline
INSERT INTO public.exchange_rates_cache (currency, rate, updated_at)
VALUES
  ('USD', 1.0, NOW()),
  ('EUR', 0.92, NOW()),
  ('GBP', 0.79, NOW()),
  ('JPY', 154.5, NOW()),
  ('CHF', 0.90, NOW()),
  ('CAD', 1.39, NOW()),
  ('AUD', 1.54, NOW()),
  ('SGD', 1.34, NOW()),
  ('AED', 3.67, NOW()),
  ('INR', 86.50, NOW())
ON CONFLICT (currency) DO UPDATE SET
  rate = EXCLUDED.rate,
  updated_at = NOW();

INSERT INTO public.exchange_rates_meta (id, provider, last_updated)
VALUES (
  'primary',
  'Open Exchange Rates / Institutional Forex Feeds',
  NOW()
)
ON CONFLICT (id) DO UPDATE SET
  last_updated = NOW();
