import { OwnerRecord, Auction, Bid, AdvertisementSubmission, User, NotificationItem, MonthlyReport, FinancialMetric } from '@/types';

// ==============================================================================
// THE BIG BANNER — Canonical Genesis Initial State
// Zero fake records. Zero hardcoded demo owners.
// ==============================================================================

export const INITIAL_OWNERS: OwnerRecord[] = [];

export const INITIAL_AUCTION: Auction = {
  id: 'AUC-001',
  auctionNumber: 1,
  targetOwnershipNumber: 1,
  targetStartDate: new Date(Date.now() + 3 * 24 * 3600 * 1000).toISOString(),
  targetEndDate: new Date(Date.now() + 17 * 24 * 3600 * 1000).toISOString(),
  status: 'live',
  startingPrice: 10000,
  previousWinningPrice: 0,
  minimumEscalationPercent: 0,
  minimumHikeUSD: 5,
  currentHighestBid: 0,
  highestBidderId: '',
  highestBidderName: '',
  highestBidderCompany: '',
  highestBidderCountry: '',
  highestBidderCountryCode: '',
  endsAt: new Date(Date.now() + 3 * 24 * 3600 * 1000 + 4 * 3600 * 1000).toISOString(),
  extendedCount: 0,
  totalBidsCount: 0,
  reservePrice: 10000,
};

export const INITIAL_BIDS: Bid[] = [];

export const INITIAL_SUBMISSIONS: AdvertisementSubmission[] = [];

export const DEMO_USERS: User[] = [
  {
    id: 'USR-ADMIN',
    name: 'Executive Governance',
    email: 'governance@thebigbanner.com',
    companyName: 'AXIOMIS Technologies',
    country: 'India',
    countryCode: 'IN',
    role: 'admin',
    verified: true,
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [];

export const MONTHLY_FINANCIAL_REPORTS: MonthlyReport[] = [];

export const INITIAL_FINANCIAL_METRICS: FinancialMetric = {
  grossTransactionValue: 0,
  totalCompletedSales: 0,
  highestSaleValue: 0,
  averageSaleValue: 0,
  totalOwnersCount: 0,
  totalCountriesCount: 0,
  totalRefunds: 0,
  paymentGatewayFees: 0,
  netPlatformProceeds: 0,
};
