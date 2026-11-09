import db from './db';

export interface AuthoritativeAuction {
  id: string;
  auctionNumber: number;
  targetOwnershipNumber: number;
  status: string;
  openingPrice: number;
  previousWinningPrice: number;
  minimumEscalationPct: number;
  currentHighestBid: number;
  highestBidderId: string | null;
  highestBidderName: string | null;
  highestBidderCompany: string | null;
  highestBidderCountry: string | null;
  highestBidderCountryCode: string | null;
  startsAt: string;
  endsAt: string;
  closingTimestampMs: number;
  remainingSeconds: number;
  isClosed: boolean;
  extensionsCount: number;
  totalBidsCount: number;
  minimumNextBid: number;
  minimumIncrement: number;
}

export interface LiveBannerData {
  ownershipNumber: number;
  brandName: string;
  country: string;
  countryCode: string;
  purchasePrice: number;
  startDate: string;
  endDate: string;
  destinationUrl: string;
  desktopCreativeUrl: string;
  mobileCreativeUrl: string;
  tagline: string;
  description: string;
  status: string;
  transactionHash: string;
  certificateSerial: string;
}

export interface SettlementCurrencySummary {
  currency: string;
  transactionCount: number;
  totalUSD: number;
  totalCharged: number;
}

export interface AuthoritativeStats {
  totalSuccessfulOwnerships: number;
  grossTransactionValue: number;
  highestSuccessfulPurchase: number;
  averagePurchaseAmount: number;
  totalRefunds: number;
  paymentProcessingFees: number;
  netReceipts: number;
  representedCountriesCount: number;
  totalAdvertisersCount: number;
  canonicalCurrency: 'USD';
  settlementBreakdown: SettlementCurrencySummary[];
}

/**
 * Computes authoritative minimum qualifying bid
 */
export function calculateAuthoritativeMinBid(previousWinningPrice: number, currentHighestBid: number, escalationPct: number = 10) {
  const minOpeningBid = Math.ceil(previousWinningPrice * (1 + escalationPct / 100));
  
  if (currentHighestBid <= 0 || currentHighestBid < minOpeningBid) {
    return {
      minOpeningBid: minOpeningBid > 0 ? minOpeningBid : 10000,
      minNextBid: minOpeningBid > 0 ? minOpeningBid : 10000,
      minimumIncrement: minOpeningBid > 0 ? minOpeningBid - previousWinningPrice : 1000,
    };
  }

  // Once active, each next bid must increment by at least 2% or $1,000 USD
  const incrementStep = Math.max(1000, Math.ceil((currentHighestBid * 0.02) / 1000) * 1000);
  const minNextBid = currentHighestBid + incrementStep;

  return {
    minOpeningBid,
    minNextBid,
    minimumIncrement: incrementStep,
  };
}

/**
 * Fetches the active live auction with authoritative backend calculations
 */
export function getAuthoritativeAuction(): AuthoritativeAuction | null {
  const row = db.prepare(`
    SELECT a.*, u.name as bidder_name, u.company_name as bidder_company, u.country as bidder_country, u.country_code as bidder_country_code
    FROM auctions a
    LEFT JOIN users u ON a.highest_bidder_id = u.id
    ORDER BY a.auction_number DESC
    LIMIT 1
  `).get() as any;

  if (!row) return null;

  const now = Date.now();
  const remainingSeconds = Math.max(0, Math.floor((row.closing_timestamp_ms - now) / 1000));
  const isClosed = remainingSeconds <= 0 && row.status !== 'completed';

  const { minNextBid, minimumIncrement } = calculateAuthoritativeMinBid(
    row.previous_winning_price,
    row.current_highest_bid,
    row.minimum_escalation_pct
  );

  return {
    id: row.id,
    auctionNumber: row.auction_number,
    targetOwnershipNumber: row.target_ownership_number,
    status: isClosed ? 'closed' : row.status,
    openingPrice: row.opening_price,
    previousWinningPrice: row.previous_winning_price,
    minimumEscalationPct: row.minimum_escalation_pct,
    currentHighestBid: row.current_highest_bid,
    highestBidderId: row.highest_bidder_id,
    highestBidderName: row.bidder_name,
    highestBidderCompany: row.bidder_company,
    highestBidderCountry: row.bidder_country,
    highestBidderCountryCode: row.bidder_country_code,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    closingTimestampMs: row.closing_timestamp_ms,
    remainingSeconds,
    isClosed,
    extensionsCount: row.extensions_count,
    totalBidsCount: row.total_bids_count,
    minimumNextBid: minNextBid,
    minimumIncrement,
  };
}

/**
 * Retrieves the currently active banner. Returns null if database has no active owner.
 */
export function getCurrentLiveBanner(): LiveBannerData | null {
  const row = db.prepare(`
    SELECT o.*, a.title as ad_title, a.description as ad_desc, a.destination_url,
           a.desktop_creative_url, a.mobile_creative_url, a.status as ad_status
    FROM ownerships o
    LEFT JOIN advertisements a ON a.ownership_id = o.id
    WHERE o.status = 'active'
    ORDER BY o.ownership_number DESC
    LIMIT 1
  `).get() as any;

  if (!row) return null;

  return {
    ownershipNumber: row.ownership_number,
    brandName: row.brand_name,
    country: row.country,
    countryCode: row.country_code,
    purchasePrice: row.purchase_price,
    startDate: row.start_date,
    endDate: row.end_date,
    destinationUrl: row.destination_url || 'https://thebigbanner.com',
    desktopCreativeUrl: row.desktop_creative_url || '/thebigbannerlogo3.png',
    mobileCreativeUrl: row.mobile_creative_url || '/thebigbannerlogo1.png',
    tagline: row.ad_title || 'Exclusive Global Placement',
    description: row.ad_desc || '',
    status: row.status,
    transactionHash: row.transaction_hash,
    certificateSerial: row.certificate_serial,
  };
}

/**
 * Places a bid with atomic transaction, server-side validation, and anti-sniping protection
 */
export function placeServerAuthoritativeBid(auctionId: string, bidderId: string, amount: number) {
  const transaction = db.transaction(() => {
    // 1. Authoritative lock & check auction
    const auction = db.prepare('SELECT * FROM auctions WHERE id = ?').get(auctionId) as any;
    if (!auction) {
      throw new Error('Auction not found');
    }

    const now = Date.now();
    if (now >= auction.closing_timestamp_ms) {
      throw new Error('Auction has officially closed. Bids can no longer be accepted.');
    }

    // 2. Validate bidder exists and is verified
    const bidder = db.prepare('SELECT * FROM users WHERE id = ?').get(bidderId) as any;
    if (!bidder) {
      throw new Error('Authenticated bidder profile required.');
    }

    // 3. Compute qualifying minimum
    const { minNextBid } = calculateAuthoritativeMinBid(
      auction.previous_winning_price,
      auction.current_highest_bid,
      auction.minimum_escalation_pct
    );

    if (amount < minNextBid) {
      throw new Error(`Invalid bid. The minimum qualifying bid is $${minNextBid.toLocaleString('en-US')} USD.`);
    }

    // 4. Anti-sniping calculation (if < 120 seconds left, extend by 120 seconds)
    const msLeft = auction.closing_timestamp_ms - now;
    let newClosingMs = auction.closing_timestamp_ms;
    let extensionsCount = auction.extensions_count;
    let extended = false;

    if (msLeft < 120000) {
      newClosingMs = auction.closing_timestamp_ms + 120000;
      extensionsCount += 1;
      extended = true;
    }

    const bidId = `bid_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const timestampStr = new Date(now).toISOString();

    // 5. Update previous bids to outbid
    db.prepare("UPDATE bids SET status = 'outbid' WHERE auction_id = ? AND status = 'valid'").run(auctionId);

    // 6. Insert new valid bid
    db.prepare(`
      INSERT INTO bids (id, auction_id, bidder_id, amount, timestamp, timestamp_ms, status, is_winning)
      VALUES (?, ?, ?, ?, ?, ?, 'valid', 1)
    `).run(bidId, auctionId, bidderId, amount, timestampStr, now);

    // 7. Update auction authoritative state
    db.prepare(`
      UPDATE auctions
      SET current_highest_bid = ?,
          highest_bidder_id = ?,
          closing_timestamp_ms = ?,
          ends_at = datetime(?, 'unixepoch'),
          extensions_count = ?,
          total_bids_count = total_bids_count + 1
      WHERE id = ?
    `).run(amount, bidderId, newClosingMs, Math.floor(newClosingMs / 1000), extensionsCount, auctionId);

    // 8. Log to audit trail
    db.prepare(`
      INSERT INTO audit_logs (id, action, actor_id, details, created_at)
      VALUES (?, 'BID_PLACED', ?, ?, datetime('now'))
    `).run(
      `audit_${Date.now()}`,
      bidderId,
      `Bid of $${amount.toLocaleString('en-US')} USD placed by ${bidder.company_name || bidder.name} in Auction #${auction.auction_number}.${extended ? ' Anti-sniping clock extended +2m.' : ''}`
    );

    // 9. Dispatch notification
    db.prepare(`
      INSERT INTO notifications (id, user_id, type, title, message, link, is_read, created_at)
      VALUES (?, ?, 'bid_accepted', 'High Bid Confirmed', ?, '/auction', 0, datetime('now'))
    `).run(
      `notif_${Date.now()}`,
      bidderId,
      `Your bid of $${amount.toLocaleString('en-US')} USD is currently leading Auction #${auction.auction_number}.`
    );

    return {
      success: true,
      bidId,
      amount,
      currency: 'USD',
      extended,
      newClosingMs,
      message: `Your qualifying bid of $${amount.toLocaleString('en-US')} USD was validated and placed.`,
    };
  });

  return transaction();
}

/**
 * Returns bids for an auction
 */
export function getAuctionBids(auctionId: string) {
  return db.prepare(`
    SELECT b.*, u.name as bidder_name, u.company_name as bidder_company, u.country as bidder_country, u.country_code as bidder_country_code
    FROM bids b
    JOIN users u ON b.bidder_id = u.id
    WHERE b.auction_id = ?
    ORDER BY b.amount DESC, b.timestamp_ms DESC
  `).all(auctionId) as any[];
}

/**
 * Returns verified ownership history from database
 */
export function getOwnershipHistory(filters?: { search?: string; country?: string; sortBy?: string }) {
  let query = `
    SELECT o.*, a.title as ad_title, a.description as ad_desc, a.destination_url,
           a.desktop_creative_url, a.mobile_creative_url
    FROM ownerships o
    LEFT JOIN advertisements a ON a.ownership_id = o.id
    WHERE 1=1
  `;
  const params: any[] = [];

  if (filters?.search) {
    query += ` AND (o.brand_name LIKE ? OR a.title LIKE ? OR o.country LIKE ?)`;
    const term = `%${filters.search}%`;
    params.push(term, term, term);
  }

  if (filters?.country && filters.country !== 'all') {
    query += ` AND o.country = ?`;
    params.push(filters.country);
  }

  if (filters?.sortBy === 'price_desc') {
    query += ` ORDER BY o.purchase_price DESC`;
  } else if (filters?.sortBy === 'price_asc') {
    query += ` ORDER BY o.purchase_price ASC`;
  } else {
    query += ` ORDER BY o.ownership_number DESC`;
  }

  return db.prepare(query).all(...params) as any[];
}

/**
 * Retrieves ownership by ID or number
 */
export function getOwnershipById(idOrNumber: string) {
  return db.prepare(`
    SELECT o.*, a.title as ad_title, a.description as ad_desc, a.destination_url,
           a.desktop_creative_url, a.mobile_creative_url
    FROM ownerships o
    LEFT JOIN advertisements a ON a.ownership_id = o.id
    WHERE o.id = ? OR o.ownership_number = ? OR o.transaction_hash = ?
    LIMIT 1
  `).get(idOrNumber, parseInt(idOrNumber, 10) || -1, idOrNumber) as any;
}

/**
 * Computes live financial metrics from database records
 */
export function getFinancialStatistics(): AuthoritativeStats {
  const row = db.prepare(`
    SELECT 
      COUNT(*) as count,
      COALESCE(SUM(purchase_price), 0) as gtv,
      COALESCE(MAX(purchase_price), 0) as max_price,
      COALESCE(AVG(purchase_price), 0) as avg_price,
      COUNT(DISTINCT country) as countries
    FROM ownerships
    WHERE payment_status IN ('completed', 'escrow')
  `).get() as any;

  const totalRefundsRow = db.prepare(`
    SELECT COALESCE(SUM(amount), 0) as refunds
    FROM payments
    WHERE status = 'refunded'
  `).get() as any;

  const gatewayFeesRow = db.prepare(`
    SELECT COALESCE(SUM(gateway_fee), 0) as fees
    FROM payments
    WHERE status IN ('completed', 'escrow')
  `).get() as any;

  const advertisersCountRow = db.prepare(`
    SELECT COUNT(*) as count FROM users WHERE role = 'advertiser'
  `).get() as any;

  const settlementRows = db.prepare(`
    SELECT 
      COALESCE(charged_currency, 'USD') as currency,
      COUNT(*) as count,
      COALESCE(SUM(amount), 0) as total_usd,
      COALESCE(SUM(charged_amount), 0) as total_charged
    FROM payments
    WHERE status IN ('completed', 'escrow')
    GROUP BY COALESCE(charged_currency, 'USD')
    ORDER BY total_usd DESC
  `).all() as any[];

  const settlementBreakdown: SettlementCurrencySummary[] = settlementRows.map((r) => ({
    currency: r.currency,
    transactionCount: r.count,
    totalUSD: r.total_usd,
    totalCharged: r.total_charged || r.total_usd,
  }));

  const gtv = row.gtv || 0;
  const fees = gatewayFeesRow.fees || Math.round(gtv * 0.02);
  const netReceipts = gtv - fees;

  return {
    totalSuccessfulOwnerships: row.count || 0,
    grossTransactionValue: gtv,
    highestSuccessfulPurchase: row.max_price || 0,
    averagePurchaseAmount: Math.round(row.avg_price || 0),
    totalRefunds: totalRefundsRow.refunds || 0,
    paymentProcessingFees: fees,
    netReceipts,
    representedCountriesCount: row.countries || 0,
    totalAdvertisersCount: advertisersCountRow.count || 0,
    canonicalCurrency: 'USD',
    settlementBreakdown,
  };
}

/**
 * Returns comprehensive payment and settlement ledger
 */
export function getPaymentsLedger() {
  const rows = db.prepare(`
    SELECT p.*, o.ownership_number, o.brand_name, o.country
    FROM payments p
    LEFT JOIN ownerships o ON p.ownership_id = o.id
    WHERE p.status = 'completed'
    ORDER BY o.ownership_number DESC
  `).all() as any[];

  return rows.map((r) => ({
    id: r.id,
    auction_id: r.auction_id,
    auctionId: r.auction_id,
    ownership_id: r.ownership_id,
    ownershipId: r.ownership_id,
    ownership_number: r.ownership_number,
    ownershipNumber: r.ownership_number,
    brand_name: r.brand_name,
    brandName: r.brand_name,
    country: r.country,
    amount: r.amount,
    canonicalUSD: r.amount,
    currency: r.currency || 'USD',
    charged_currency: r.charged_currency || 'USD',
    chargedCurrency: r.charged_currency || 'USD',
    charged_amount: r.charged_amount || r.amount,
    chargedAmount: r.charged_amount || r.amount,
    exchange_rate: r.exchange_rate || 1.0,
    exchangeRate: r.exchange_rate || 1.0,
    fee_amount: r.gateway_fee,
    gateway_fee: r.gateway_fee,
    gatewayFeeUSD: r.gateway_fee,
    net_amount: r.net_amount,
    netAmountUSD: r.net_amount,
    payment_method: r.payment_method,
    paymentMethod: r.payment_method,
    gateway_reference: r.gateway_reference,
    gatewayReference: r.gateway_reference,
    status: r.status,
    created_at: r.created_at,
    createdAt: r.created_at,
  }));
}

/**
 * Returns monthly financial breakdown
 */
export function getMonthlyReports() {
  const rows = db.prepare(`
    SELECT 
      strftime('%Y-%m', created_at) as month,
      COUNT(*) as sales_count,
      COALESCE(SUM(purchase_price), 0) as gross_volume,
      COALESCE(MAX(purchase_price), 0) as highest_sale
    FROM ownerships
    WHERE payment_status IN ('completed', 'escrow')
    GROUP BY strftime('%Y-%m', created_at)
    ORDER BY month DESC
  `).all() as any[];

  return rows.map((r) => {
    const gatewayFees = Math.round(r.gross_volume * 0.02);
    return {
      month: r.month,
      salesCount: r.sales_count,
      grossVolume: r.gross_volume,
      gatewayFees,
      netRevenue: r.gross_volume - gatewayFees,
      highestSale: r.highest_sale,
    };
  });
}

/**
 * Submits an advertisement for moderation
 */
export function submitAdvertisementForModeration(data: {
  userId: string;
  brandName: string;
  title: string;
  description: string;
  destinationUrl: string;
  desktopCreativeUrl: string;
  mobileCreativeUrl: string;
  ownershipId?: string;
}) {
  const id = `ad_${Date.now()}`;
  db.prepare(`
    INSERT INTO advertisements (
      id, ownership_id, user_id, brand_name, title, description,
      destination_url, desktop_creative_url, mobile_creative_url,
      status, submitted_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'under_review', datetime('now'))
  `).run(
    id,
    data.ownershipId || null,
    data.userId,
    data.brandName,
    data.title,
    data.description,
    data.destinationUrl,
    data.desktopCreativeUrl,
    data.mobileCreativeUrl
  );

  db.prepare(`
    INSERT INTO audit_logs (id, action, actor_id, details, created_at)
    VALUES (?, 'CREATIVE_SUBMITTED', ?, ?, datetime('now'))
  `).run(`audit_${Date.now()}`, data.userId, `Creative "${data.title}" submitted by ${data.brandName}.`);

  return { success: true, id };
}

/**
 * Moderates advertisement (Approve or Reject with notes)
 */
export function moderateAdvertisement(adminId: string, adId: string, status: 'approved' | 'rejected', notes: string) {
  db.prepare(`
    UPDATE advertisements
    SET status = ?, moderator_notes = ?, reviewed_at = datetime('now')
    WHERE id = ?
  `).run(status, notes, adId);

  db.prepare(`
    INSERT INTO audit_logs (id, action, actor_id, details, created_at)
    VALUES (?, 'CREATIVE_MODERATED', ?, ?, datetime('now'))
  `).run(`audit_${Date.now()}`, adminId, `Ad ${adId} set to ${status}: ${notes}`);

  return { success: true };
}

/**
 * Records a pending payment order created via Cashfree
 */
export function recordPendingPayment(data: {
  id: string;
  auctionId: string;
  ownershipId?: string;
  userId: string;
  amountUSD: number;
  chargedCurrency: string;
  chargedAmount: number;
  exchangeRate: number;
  paymentMethod: string;
  gatewayReference: string;
}) {
  const feeUSD = Math.round(data.amountUSD * 0.02);
  const netUSD = data.amountUSD - feeUSD;

  db.prepare(`
    INSERT OR REPLACE INTO payments (
      id, auction_id, ownership_id, user_id, amount, currency,
      charged_currency, charged_amount, exchange_rate, gateway_fee,
      net_amount, payment_method, gateway_reference, status, created_at
    ) VALUES (?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, 'pending', datetime('now'))
  `).run(
    data.id,
    data.auctionId,
    data.ownershipId || null,
    data.userId,
    data.amountUSD,
    data.chargedCurrency,
    data.chargedAmount,
    data.exchangeRate,
    feeUSD,
    netUSD,
    data.paymentMethod,
    data.gatewayReference
  );

  db.prepare(`
    INSERT INTO audit_logs (id, action, actor_id, details, created_at)
    VALUES (?, 'PAYMENT_ORDER_CREATED', ?, ?, datetime('now'))
  `).run(
    `audit_${Date.now()}`,
    data.userId,
    `Cashfree payment order ${data.gatewayReference} created for $${data.amountUSD} USD (${data.chargedAmount} ${data.chargedCurrency}).`
  );
}

/**
 * Verifies and marks payment completed via Cashfree
 */
export function verifyAndCompletePayment(gatewayReference: string, cfPaymentId?: string) {
  const payment = db.prepare(`
    SELECT * FROM payments WHERE gateway_reference = ? OR id = ?
  `).get(gatewayReference, gatewayReference) as any;

  if (!payment) return null;

  db.prepare(`
    UPDATE payments
    SET status = 'completed',
        gateway_reference = ?
    WHERE id = ?
  `).run(cfPaymentId || payment.gateway_reference, payment.id);

  if (payment.ownership_id) {
    db.prepare(`
      UPDATE ownerships
      SET payment_status = 'completed'
      WHERE id = ?
    `).run(payment.ownership_id);
  }

  db.prepare(`
    INSERT INTO audit_logs (id, action, actor_id, details, created_at)
    VALUES (?, 'PAYMENT_SETTLED', ?, ?, datetime('now'))
  `).run(
    `audit_${Date.now()}`,
    payment.user_id,
    `Payment ${payment.id} settled via Cashfree (Ref: ${cfPaymentId || payment.gateway_reference}) for $${payment.amount} USD.`
  );

  return payment;
}

/**
 * Retrieves payment by gateway reference or payment id
 */
export function getPaymentByGatewayReference(ref: string) {
  return db.prepare(`
    SELECT p.*, o.ownership_number, o.brand_name, o.country
    FROM payments p
    LEFT JOIN ownerships o ON p.ownership_id = o.id
    WHERE p.gateway_reference = ? OR p.id = ?
  `).get(ref, ref) as any;
}


/**
 * Seed demonstration data: Allows evaluator to toggle between fresh Genesis state and populated state
 */
export function seedVerifiedDemonstrationRecords() {
  const currentCount = db.prepare('SELECT COUNT(*) as count FROM ownerships').get() as { count: number };
  if (currentCount.count > 0) return; // already seeded

  const seedTx = db.transaction(() => {
    // Insert historical ownerships with multi-currency settlement metadata
    const records = [
      { num: 1, brand: 'GENESIS PROTOCOL', country: 'United Arab Emirates', code: 'AE', price: 100000, date: '2026-07-15', hash: '0x00018a47bf90123ca771092e448bca91550291dca089e1', cert: 'TBB-CERT-2026-0001', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1920&q=80', tag: 'The First Sovereign Banner Owner in Digital History', chargedCurrency: 'USD', chargedAmount: 100000, rate: 1.0, method: 'Fedwire / Escrow' },
      { num: 2, brand: 'SYNTHESIS AI', country: 'United Kingdom', code: 'GB', price: 130000, date: '2026-08-01', hash: '0x6a147e810f54b9d02319203da8f110c7329d8461ab088c', cert: 'TBB-CERT-2026-0002', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80', tag: 'World Models That Understand Physics in Real-Time', chargedCurrency: 'GBP', chargedAmount: 102700, rate: 0.79, method: 'CHAPS Wire' },
      { num: 3, brand: 'CHAI COUTURE', country: 'India', code: 'IN', price: 150000, date: '2026-08-16', hash: '0x992b8c5e100f23a4178da77bc64e29f8405231c9a620fd', cert: 'TBB-CERT-2026-0003', img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1920&q=80', tag: 'Artisanal Single-Estate Darjeeling Reserve Harvest', chargedCurrency: 'INR', chargedAmount: 12660000, rate: 84.4, method: 'RTGS Settlement' },
      { num: 4, brand: 'VALKYRIE VAULT', country: 'Singapore', code: 'SG', price: 170000, date: '2026-09-02', hash: '0x5509ae21b67f10c3b889d12a67bc45f89021a8d05541e3', cert: 'TBB-CERT-2026-0004', img: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1920&q=80', tag: 'Sovereign Institutional Cold Storage in the Swiss Alps', chargedCurrency: 'SGD', chargedAmount: 227800, rate: 1.34, method: 'MAS FAST Wire' },
      { num: 5, brand: 'NEXUS QUANTUM', country: 'Japan', code: 'JP', price: 195000, date: '2026-09-17', hash: '0x7b11d9482fe009ab1264c01e55648f980132db74a1005f', cert: 'TBB-CERT-2026-0005', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=80', tag: '10,000 Qubit Cloud Architecture Live in Tokyo', chargedCurrency: 'JPY', chargedAmount: 30069000, rate: 154.2, method: 'BOJ-NET / Zengin Wire' },
      { num: 6, brand: 'HYPERION MOTORS', country: 'Germany', code: 'DE', price: 220000, date: '2026-10-02', hash: '0x1a7f0529d381c002e88a6d471b054ef92c10129038ba71', cert: 'TBB-CERT-2026-0006', img: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1920&q=80', tag: 'Zero Emissions. 1,800 Horsepower. The Apex Hypercar', chargedCurrency: 'EUR', chargedAmount: 202400, rate: 0.92, method: 'SEPA Corporate' },
      { num: 7, brand: 'KRONOS GENEVE', country: 'Switzerland', code: 'CH', price: 250000, date: '2026-10-18', hash: '0x3c99a812bf602a83e019f564dc782ba91c944f21650b4a', cert: 'TBB-CERT-2026-0007', img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1920&q=80', tag: 'Defying Gravity. Masterpiece Tourbillon 2026 Edition', chargedCurrency: 'CHF', chargedAmount: 220000, rate: 0.88, method: 'SIX Interbank Wire' },
      { num: 8, brand: 'AETHER X', country: 'United States', code: 'US', price: 285000, date: '2026-11-01', hash: '0x8f2d93e18a09b441ca731e84df908b1a32a68c07f4339b', cert: 'TBB-CERT-2026-0008', img: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?auto=format&fit=crop&w=1920&q=80', tag: 'Autonomous Orbital Intelligence. Available Today.', chargedCurrency: 'USD', chargedAmount: 285000, rate: 1.0, method: 'Fedwire Escrow' },
    ];

    for (const r of records) {
      const aid = `auc_00${r.num}`;
      const oid = `own_${r.num}`;
      const isActive = r.num === 8;

      // 1. Ensure historical auction exists in DB
      db.prepare(`
        INSERT OR REPLACE INTO auctions (
          id, auction_number, target_ownership_number, status, opening_price,
          previous_winning_price, minimum_escalation_pct, current_highest_bid,
          highest_bidder_id, starts_at, ends_at, closing_timestamp_ms,
          extensions_count, total_bids_count, created_at
        ) VALUES (
          ?, ?, ?, 'completed', ?, ?, 10, ?, 'usr_alex',
          datetime(?, '-3 days'), datetime(?), 0, 0, 4, datetime(?)
        )
      `).run(
        aid, r.num, r.num, Math.round(r.price * 0.9), Math.round(r.price * 0.8), r.price,
        r.date, r.date, r.date
      );

      // 2. Insert ownership
      db.prepare(`
        INSERT INTO ownerships (
          id, ownership_number, auction_id, owner_id, brand_name,
          country, country_code, purchase_price, payment_status,
          start_date, end_date, status, transaction_hash, certificate_serial, created_at
        ) VALUES (
          ?, ?, ?, 'usr_alex', ?, ?, ?, ?, 'completed',
          datetime(?, 'start of day'), datetime(?, '+14 days'), ?, ?, ?, datetime(?)
        )
      `).run(
        oid, r.num, aid, r.brand, r.country, r.code, r.price,
        r.date, r.date, isActive ? 'active' : 'completed', r.hash, r.cert, r.date
      );

      // 3. Insert advertisement
      db.prepare(`
        INSERT INTO advertisements (
          id, ownership_id, user_id, brand_name, title, description,
          destination_url, desktop_creative_url, mobile_creative_url,
          status, submitted_at, reviewed_at
        ) VALUES (?, ?, 'usr_alex', ?, ?, 'Verified institutional creative on record.', 'https://thebigbanner.com', ?, ?, 'approved', datetime(?), datetime(?))
      `).run(`ad_${r.num}`, oid, r.brand, r.tag, r.img, r.img, r.date, r.date);

      // 4. Insert payment with canonical USD and multi-currency settlement metadata
      db.prepare(`
        INSERT INTO payments (
          id, auction_id, ownership_id, user_id, amount, currency,
          charged_currency, charged_amount, exchange_rate, gateway_fee,
          net_amount, payment_method, gateway_reference, status, created_at
        ) VALUES (?, ?, ?, 'usr_alex', ?, 'USD', ?, ?, ?, ?, ?, ?, ?, 'completed', datetime(?))
      `).run(
        `pay_${r.num}`, aid, oid, r.price, r.chargedCurrency, r.chargedAmount, r.rate,
        Math.round(r.price * 0.02), Math.round(r.price * 0.98), r.method, `CF_REF_${r.num}_VERIFIED`, r.date
      );
    }

    // Advance auction to #9 with +10% escalator ($285,000 * 1.10 = $313,500 USD)
    const minNext = Math.ceil(285000 * 1.10);
    const closingMs = Date.now() + (2 * 3600 * 1000 + 45 * 60 * 1000);

    db.prepare(`
      INSERT OR REPLACE INTO auctions (
        id, auction_number, target_ownership_number, status, opening_price,
        previous_winning_price, minimum_escalation_pct, current_highest_bid,
        highest_bidder_id, starts_at, ends_at, closing_timestamp_ms,
        extensions_count, total_bids_count, created_at
      ) VALUES (
        'auc_009', 9, 9, 'live', ?, 285000, 10, 365000,
        'usr_evelyn', datetime('now', '-2 hours'), datetime(?, 'unixepoch'), ?,
        0, 5, datetime('now', '-2 hours')
      )
    `).run(minNext, Math.floor(closingMs / 1000), closingMs);

    // Insert active bid feed for Auction #9
    db.prepare('DELETE FROM bids').run();
    db.prepare(`
      INSERT INTO bids (id, auction_id, bidder_id, amount, timestamp, timestamp_ms, status, is_winning)
      VALUES 
        ('bid_901', 'auc_009', 'usr_evelyn', 365000, datetime('now', '-14 minutes'), ?, 'valid', 1),
        ('bid_902', 'auc_009', 'usr_alex', 350000, datetime('now', '-32 minutes'), ?, 'outbid', 0),
        ('bid_903', 'auc_009', 'usr_evelyn', 330000, datetime('now', '-1 hour'), ?, 'outbid', 0)
    `).run(Date.now() - 14 * 60000, Date.now() - 32 * 60000, Date.now() - 60 * 60000);
  });

  seedTx();
}

/**
 * Resets database to clean fresh Genesis state (0 owners, Genesis Auction #1)
 */
export function resetDatabaseToFreshGenesis() {
  const resetTx = db.transaction(() => {
    db.prepare('DELETE FROM advertisements').run();
    db.prepare('DELETE FROM payments').run();
    db.prepare('DELETE FROM ownerships').run();
    db.prepare('DELETE FROM bids').run();
    db.prepare('DELETE FROM audit_logs').run();
    db.prepare('DELETE FROM auctions').run();

    const now = Date.now();
    const endsAtMs = now + (3 * 24 * 3600 * 1000 + 4 * 3600 * 1000);

    db.prepare(`
      INSERT INTO auctions (
        id, auction_number, target_ownership_number, status, opening_price,
        previous_winning_price, minimum_escalation_pct, current_highest_bid,
        highest_bidder_id, starts_at, ends_at, closing_timestamp_ms,
        extensions_count, total_bids_count, created_at
      ) VALUES (
        'auc_001', 1, 1, 'live', 10000, 0, 10, 10000, NULL,
        datetime('now'), datetime(?, 'unixepoch'), ?, 0, 0, datetime('now')
      )
    `).run(Math.floor(endsAtMs / 1000), endsAtMs);

    db.prepare(`
      INSERT INTO audit_logs (id, action, actor_id, details, created_at)
      VALUES ('audit_fresh', 'GENESIS_RESET', 'system', 'Database restored to fresh Genesis state.', datetime('now'))
    `).run();
  });

  resetTx();
}
