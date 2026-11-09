export type OwnershipStatus = 'active' | 'completed' | 'upcoming';

export interface OwnerRecord {
  id: string;
  ownershipNumber: number;
  brandName: string;
  brandSlug: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  tagline: string;
  description: string;
  ctaText: string;
  destinationUrl: string;
  bannerDesktopUrl: string;
  bannerMobileUrl: string;
  purchasePrice: number;
  transactionDate: string;
  startDate: string;
  endDate: string;
  status: OwnershipStatus;
  transactionHash: string;
  certificateSerial: string;
  category: 'Tech' | 'Luxury' | 'Crypto' | 'AI' | 'Fintech' | 'Automotive' | 'Creator';
  verified: boolean;
  impressions?: number;
  clicks?: number;
}

export type AuctionStatus = 'live' | 'ended' | 'scheduled' | 'paused';

export interface Auction {
  id: string;
  auctionNumber: number;
  targetOwnershipNumber: number;
  targetStartDate: string;
  targetEndDate: string;
  status: AuctionStatus;
  startingPrice: number;
  previousWinningPrice: number;
  minimumEscalationPercent: number; // default 10%
  currentHighestBid: number;
  highestBidderId: string;
  highestBidderName: string;
  highestBidderCompany: string;
  highestBidderCountry: string;
  highestBidderCountryCode: string;
  endsAt: string; // ISO string
  extendedCount: number;
  totalBidsCount: number;
  reservePrice: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  bidderCompany: string;
  country: string;
  countryCode: string;
  flagEmoji: string;
  amount: number;
  timestamp: string;
  status: 'valid' | 'outbid' | 'won' | 'cancelled';
}

export interface AdvertisementSubmission {
  id: string;
  userId: string;
  brandName: string;
  tagline: string;
  description: string;
  ctaText: string;
  destinationUrl: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  status: 'draft' | 'under_review' | 'approved' | 'rejected' | 'live';
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewerNotes?: string;
  auctionId?: string;
  ownershipPeriod?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  companyName: string;
  country: string;
  countryCode: string;
  role: 'advertiser' | 'admin';
  verified: boolean;
  avatarUrl?: string;
}

export interface NotificationItem {
  id: string;
  userId?: string;
  type: 'outbid' | 'auction_ending' | 'auction_won' | 'ad_approved' | 'ad_rejected' | 'payment_success' | 'new_record' | 'system';
  title: string;
  message: string;
  link?: string;
  timestamp: string;
  read: boolean;
}

export interface FinancialMetric {
  grossTransactionValue: number;
  totalCompletedSales: number;
  highestSaleValue: number;
  averageSaleValue: number;
  totalOwnersCount: number;
  totalCountriesCount: number;
  totalRefunds: number;
  paymentGatewayFees: number;
  netPlatformProceeds: number;
}

export interface MonthlyReport {
  month: string;
  grossVolume: number;
  salesCount: number;
  gatewayFees: number;
  netRevenue: number;
  highestSale: number;
}
