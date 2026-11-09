# THE BIG BANNER

> **ONE BANNER. ONE OWNER. GLOBAL ATTENTION.**  
> *The world’s single global digital advertising marketplace.*

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-mnxljurcalpjngwdgihy-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel)](https://vercel.com/)

---

## 1. Executive Overview

**THE BIG BANNER** is an exclusive digital advertising marketplace where brands, enterprises, and creators compete to own **one advertising space**.

Unlike traditional advertising networks where thousands of banner impressions run simultaneously, THE BIG BANNER focuses on **one primary advertising banner and one owner at a time**. The platform transforms digital advertising space into a scarce, competitive, and globally prestigious asset.

### Core Governance Rules

1. **One Exclusive Space:** Exactly ONE billboard on the global homepage commanding 100% share of voice.
2. **The Mandatory +10% Escalator:** Every subsequent ownership tenure must command at least 10% more than the previous successful transaction, authoritatively calculated and enforced in **canonical USD**:
   $$\text{MinNextBid} = \lceil \text{PreviousWinningPrice} \times 1.10 \rceil$$
3. **Anti-Sniping Clock Protection:** Any qualifying bid received in the final 120 seconds automatically triggers a **+2:00 minute extension** to protect transparent price discovery against bot manipulation.
4. **Separation of Victory & Editorial Clearance:** Auction victory secures the exclusive right of ownership. The billboard placement is broadcast only after corporate identity verification and creative asset compliance pass human review.
5. **Radical Financial Transparency:** A permanent, verifiable public ledger records all gross transaction values (GTV), merchant fees, net receipts, and transaction hashes.

---

## 2. Global Currency & Pricing Architecture

THE BIG BANNER operates under a **canonical USD (United States Dollar)** financial model:

- **Authoritative Currency:** All auction bids, qualifying thresholds, reserve prices, and historical records are strictly governed in USD.
- **Global Currency Selector:** An intuitive selector allows international visitors to view real-time approximate estimates across 10 major global currencies:
  - 🇺🇸 **USD** — United States Dollar (Canonical)
  - 🇪🇺 **EUR** — Euro
  - 🇬🇧 **GBP** — British Pound Sterling
  - 🇮🇳 **INR** — Indian Rupee
  - 🇨🇦 **CAD** — Canadian Dollar
  - 🇦🇺 **AUD** — Australian Dollar
  - 🇦🇪 **AED** — United Arab Emirates Dirham
  - 🇸🇬 **SGD** — Singapore Dollar
  - 🇯🇵 **JPY** — Japanese Yen (0 decimal currency)
  - 🇨🇭 **CHF** — Swiss Franc
- **Exchange Rate Engine:** Multi-tier caching with live API feeds, automated SQLite/Supabase fallback matrices, and last-updated timestamp transparency.
- **Multi-Currency Settlement Ledger:** Advertisers can settle in their local currencies via international wire or Stripe Treasury, with each transaction immutably preserving the canonical USD baseline, applied exchange rate, and native charged amount.

---

## 3. Database & Supabase Integration

- **Supabase Project ID:** `mnxljurcalpjngwdgihy`
- **Supabase Project URL:** `https://mnxljurcalpjngwdgihy.supabase.co`

### Running the Supabase Schema

1. Open your [Supabase SQL Editor](https://supabase.com/dashboard/project/mnxljurcalpjngwdgihy/sql/new).
2. Copy the entire contents of [`supabase/schema.sql`](./supabase/schema.sql).
3. Paste and click **Run**.
4. This instantly creates all relational tables (`users`, `auctions`, `bids`, `ownerships`, `advertisements`, `payments`, `audit_logs`, `exchange_rates_cache`) with Row Level Security (RLS) policies and seeds 8 verified historical rotations!

---

## 4. Deploying to Vercel

### Step 1: Import GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import the repository: `https://github.com/Dhanushj213/thebigbanner`.

### Step 2: Configure Environment Variables
Add the following environment variables in your Vercel project settings:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://mnxljurcalpjngwdgihy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key_from_dashboard
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_from_dashboard
NEXT_PUBLIC_CANONICAL_CURRENCY=USD
```

### Step 3: Deploy
Click **Deploy**. Next.js 14 will build all static and dynamic pages with 0 warnings.

---

## 5. Local Development

```bash
# Clone the repository
git clone https://github.com/Dhanushj213/thebigbanner.git
cd thebigbanner

# Install dependencies
npm install

# Start local development server
npm run dev
# Visit http://localhost:3000

# Build and run optimized production server
npm run build
npm start
```

---

## 6. Complete Route Directory

| Route | Functionality |
|---|---|
| `/` | Sovereign Centerpiece Billboard, Live Auction Overview, 4-Step Framework, Historical Archive Preview, Platform Statistics |
| `/auction` | Real-time interactive auction arena with millisecond countdown, multi-currency bid preview, anti-sniping notices, and bid console |
| `/auction/history` | Public archive of all concluded auctions with clearance prices in canonical USD and victorious brands |
| `/ownership` | Permanent public register of all past and present billboard owners with search, country filters, and price sorting |
| `/ownership/[id]` | Verifiable Digital Certificate of Hegemony with SHA-256 transaction hash, QR code, and print/PDF view |
| `/transparency` | Financial portal with GTV, Net Platform Receipts, multi-currency settlement breakdown, full payment audit ledger, and CSV export |
| `/how-it-works` | Platform architecture, +10% mathematical escalator rules, and anti-sniping protection explained |
| `/advertise` | Advertiser briefing: 100% share of voice vs programmatic noise, desktop (1920×600) & mobile (900×1200) specs |
| `/about` | Philosophical manifesto on intentional scarcity and single global digital real estate |
| `/faq` | Interactive Q&A covering mechanics, global currencies, payments, refunds, and moderation |
| `/contact` | Institutional concierge desk for pre-funded bidding lines and custom escrow agreements |
| `/dashboard` | Advertiser portal with active auction bids, won tenures, creative review status, and escrow standing |
| `/admin` | Root governance console for creative asset moderation, demo data re-seeding, and Genesis resets |
| `/api/currency/rates` | Authoritative exchange rate service with multi-tier caching |
| `/api/auction` | Real-time authoritative auction state, epoch closing timestamp, and live bid feed |
| `/api/bids` | Server-side validated bid placement with canonical USD enforcement |
| `/api/transparency` | Public verified accounting ledger, GTV metrics, and monthly reports |
| `/api/banner` | Live billboard creative metadata endpoint |

---

## 7. License & Credits

All rights reserved © THE BIG BANNER. Designed and built with radical financial transparency and sovereign digital real estate governance.
