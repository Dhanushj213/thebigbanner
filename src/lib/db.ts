import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// In Vercel serverless environments, the root directory is read-only.
// We copy the database to /tmp if running on Vercel so SQLite can write.
let dbPath: string;

if (process.env.VERCEL) {
  const tmpDir = '/tmp';
  const tmpDbPath = path.join(tmpDir, 'thebigbanner.db');
  const sourceDbPath = path.join(process.cwd(), 'data', 'thebigbanner.db');

  if (!fs.existsSync(tmpDbPath)) {
    if (fs.existsSync(sourceDbPath)) {
      try {
        fs.copyFileSync(sourceDbPath, tmpDbPath);
      } catch (err) {
        console.error('Failed to copy database to /tmp:', err);
      }
    }
  }
  dbPath = tmpDbPath;
} else {
  const dbDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
  dbPath = path.join(dbDir, 'thebigbanner.db');
}

const db = new Database(dbPath, { timeout: 10000 });

// Set busy timeout and WAL mode for high concurrency
db.pragma('busy_timeout = 10000');
try {
  db.pragma('journal_mode = WAL');
} catch (e) {
  // Ignored if busy or already in WAL mode
}

// Initialize database schema
try {
  db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    name TEXT NOT NULL,
    company_name TEXT,
    country TEXT NOT NULL,
    country_code TEXT DEFAULT 'US',
    advertiser_type TEXT DEFAULT 'business',
    role TEXT DEFAULT 'advertiser',
    verified INTEGER DEFAULT 1,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS auctions (
    id TEXT PRIMARY KEY,
    auction_number INTEGER UNIQUE NOT NULL,
    target_ownership_number INTEGER NOT NULL,
    status TEXT NOT NULL,
    opening_price INTEGER NOT NULL,
    previous_winning_price INTEGER NOT NULL,
    minimum_escalation_pct INTEGER DEFAULT 10,
    current_highest_bid INTEGER NOT NULL,
    highest_bidder_id TEXT,
    starts_at TEXT NOT NULL,
    ends_at TEXT NOT NULL,
    closing_timestamp_ms INTEGER NOT NULL,
    extensions_count INTEGER DEFAULT 0,
    total_bids_count INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY(highest_bidder_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS bids (
    id TEXT PRIMARY KEY,
    auction_id TEXT NOT NULL,
    bidder_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    timestamp TEXT NOT NULL,
    timestamp_ms INTEGER NOT NULL,
    status TEXT NOT NULL,
    is_winning INTEGER DEFAULT 0,
    FOREIGN KEY(auction_id) REFERENCES auctions(id),
    FOREIGN KEY(bidder_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS ownerships (
    id TEXT PRIMARY KEY,
    ownership_number INTEGER UNIQUE NOT NULL,
    auction_id TEXT,
    owner_id TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    country TEXT NOT NULL,
    country_code TEXT NOT NULL,
    purchase_price INTEGER NOT NULL,
    payment_status TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    status TEXT NOT NULL,
    transaction_hash TEXT UNIQUE NOT NULL,
    certificate_serial TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(auction_id) REFERENCES auctions(id),
    FOREIGN KEY(owner_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS advertisements (
    id TEXT PRIMARY KEY,
    ownership_id TEXT,
    user_id TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    destination_url TEXT NOT NULL,
    desktop_creative_url TEXT NOT NULL,
    mobile_creative_url TEXT NOT NULL,
    status TEXT NOT NULL,
    rejection_reason TEXT,
    moderator_notes TEXT,
    submitted_at TEXT NOT NULL,
    reviewed_at TEXT,
    FOREIGN KEY(ownership_id) REFERENCES ownerships(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    auction_id TEXT NOT NULL,
    ownership_id TEXT,
    user_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    charged_currency TEXT DEFAULT 'USD',
    charged_amount REAL NOT NULL,
    exchange_rate REAL DEFAULT 1.0,
    gateway_fee INTEGER NOT NULL,
    net_amount INTEGER NOT NULL,
    payment_method TEXT NOT NULL,
    gateway_reference TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(auction_id) REFERENCES auctions(id),
    FOREIGN KEY(ownership_id) REFERENCES ownerships(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    actor_id TEXT,
    details TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    link TEXT,
    is_read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS legal_documents (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    version TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published',
    effective_date TEXT NOT NULL,
    last_updated TEXT NOT NULL,
    requires_legal_review INTEGER DEFAULT 1,
    content_json TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS legal_document_versions (
    id TEXT PRIMARY KEY,
    document_slug TEXT NOT NULL,
    version TEXT NOT NULL,
    content_json TEXT NOT NULL,
    effective_date TEXT NOT NULL,
    created_at TEXT NOT NULL,
    created_by TEXT
  );

  CREATE TABLE IF NOT EXISTS legal_document_acceptances (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    document_slug TEXT NOT NULL,
    document_version TEXT NOT NULL,
    acceptance_context TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    accepted_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS legal_audit_logs (
    id TEXT PRIMARY KEY,
    action TEXT NOT NULL,
    actor_id TEXT NOT NULL,
    target_document TEXT NOT NULL,
    details TEXT NOT NULL,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS cookie_preferences (
    id TEXT PRIMARY KEY,
    visitor_id TEXT NOT NULL,
    essential INTEGER DEFAULT 1,
    analytics INTEGER DEFAULT 0,
    marketing INTEGER DEFAULT 0,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS privacy_requests (
    id TEXT PRIMARY KEY,
    ticket_number TEXT UNIQUE NOT NULL,
    request_type TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    jurisdiction TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'received',
    resolution_notes TEXT,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS grievance_requests (
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
    created_at TEXT NOT NULL
  );
  `);

  // Safe table schema migrations
  try { db.exec("ALTER TABLE payments ADD COLUMN currency TEXT DEFAULT 'USD'"); } catch (e) {}
  try { db.exec("ALTER TABLE payments ADD COLUMN charged_currency TEXT DEFAULT 'USD'"); } catch (e) {}
  try { db.exec("ALTER TABLE payments ADD COLUMN charged_amount REAL DEFAULT 0"); } catch (e) {}
  try { db.exec("ALTER TABLE payments ADD COLUMN exchange_rate REAL DEFAULT 1.0"); } catch (e) {}
  try { db.exec("ALTER TABLE ownerships ADD COLUMN currency TEXT DEFAULT 'USD'"); } catch (e) {}

  // Auto-seed baseline operational structure if table is empty
  const auctionCount = db.prepare('SELECT COUNT(*) as count FROM auctions').get() as { count: number };

  if (auctionCount.count === 0) {
    // Ensure default root administrator exists
    db.prepare(`
      INSERT OR IGNORE INTO users (id, email, password_hash, name, company_name, country, country_code, advertiser_type, role, verified, created_at)
      VALUES 
        ('usr_admin', 'governance@thebigbanner.com', 'admin_hash_protected', 'Executive Governance', 'THE BIG BANNER Foundation', 'Switzerland', 'CH', 'business', 'admin', 1, datetime('now'))
    `).run();

    // Create Genesis Auction #1 (Authoritative Opening Reserve Price: $100 USD)
    const initialAuctionDurationMs = 3 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000; // 3 days, 4 hours
    const now = Date.now();
    const endsAtMs = now + initialAuctionDurationMs;

    db.prepare(`
      INSERT INTO auctions (
        id, auction_number, target_ownership_number, status, opening_price,
        previous_winning_price, minimum_escalation_pct, current_highest_bid,
        highest_bidder_id, starts_at, ends_at, closing_timestamp_ms,
        extensions_count, total_bids_count, created_at
      ) VALUES (
        'auc_001', 1, 1, 'live', 100, 0, 10, 0, NULL,
        datetime('now'), datetime(?, 'unixepoch'), ?, 0, 0, datetime('now')
      )
    `).run(Math.floor(endsAtMs / 1000), endsAtMs);

    db.prepare(`
      INSERT INTO audit_logs (id, action, actor_id, details, created_at)
      VALUES ('audit_genesis', 'GENESIS_INITIALIZED', 'system', 'Genesis Auction #1 created with opening price $100 USD.', datetime('now'))
    `).run();
  }
} catch (e) {
  // If another thread is migrating or initializing, continue safely
}

export default db;
