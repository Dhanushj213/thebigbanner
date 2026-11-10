'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  OwnerRecord,
  Auction,
  Bid,
  AdvertisementSubmission,
  User,
  NotificationItem,
  FinancialMetric,
} from '@/types';
import {
  INITIAL_OWNERS,
  INITIAL_AUCTION,
  INITIAL_BIDS,
  INITIAL_SUBMISSIONS,
  DEMO_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_FINANCIAL_METRICS,
} from '@/data/mockData';
import { calculateMinNextBid } from '@/utils/formatters';

interface BannerContextType {
  owners: OwnerRecord[];
  currentOwner: OwnerRecord | null;
  auction: Auction;
  bids: Bid[];
  submissions: AdvertisementSubmission[];
  notifications: NotificationItem[];
  currentUser: User;
  currency: 'INR' | 'USD';
  financialMetrics: FinancialMetric;
  unreadCount: number;
  placeBid: (amount: number) => { success: boolean; message: string; extended?: boolean };
  submitCreative: (data: Omit<AdvertisementSubmission, 'id' | 'userId' | 'status' | 'submittedAt'>) => void;
  moderateCreative: (submissionId: string, status: 'approved' | 'rejected', notes?: string) => void;
  setLiveBannerOwner: (ownerId: string) => void;
  concludeAuctionManually: () => void;
  switchUser: (userId: string) => void;
  toggleCurrency: () => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  resetToDefaults: () => void;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = 'tbb_v1_';

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [owners, setOwners] = useState<OwnerRecord[]>(INITIAL_OWNERS);
  const [auction, setAuction] = useState<Auction>(INITIAL_AUCTION);
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [submissions, setSubmissions] = useState<AdvertisementSubmission[]>(INITIAL_SUBMISSIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [currentUser, setCurrentUser] = useState<User>(DEMO_USERS[0]); // Alex Vance by default
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');
  const [financialMetrics, setFinancialMetrics] = useState<FinancialMetric>(INITIAL_FINANCIAL_METRICS);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved state from localStorage if available
  useEffect(() => {
    try {
      const savedOwners = localStorage.getItem(`${STORAGE_KEY_PREFIX}owners`);
      if (savedOwners) {
        const parsed = JSON.parse(savedOwners);
        const hasLegacyFakeData = Array.isArray(parsed) && parsed.some(
          (p: any) => p.brandName === 'AETHER X' || p.brandName === 'KRONOS GENEVE' || p.brandName === 'HYPERION MOTORS'
        );
        if (hasLegacyFakeData) {
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}owners`);
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}auction`);
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}bids`);
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}submissions`);
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}notifs`);
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}user`);
          setOwners([]);
          setAuction(INITIAL_AUCTION);
          setBids([]);
          setSubmissions([]);
          setNotifications([]);
          return;
        }
        setOwners(parsed);
      }

      const savedAuction = localStorage.getItem(`${STORAGE_KEY_PREFIX}auction`);
      if (savedAuction) {
        const parsed = JSON.parse(savedAuction);
        if (parsed.auctionNumber === 9 || parsed.currentHighestBid === 365000) {
          localStorage.removeItem(`${STORAGE_KEY_PREFIX}auction`);
          setAuction(INITIAL_AUCTION);
        } else {
          setAuction(parsed);
        }
      }

      const savedBids = localStorage.getItem(`${STORAGE_KEY_PREFIX}bids`);
      if (savedBids) setBids(JSON.parse(savedBids));
      const savedSubmissions = localStorage.getItem(`${STORAGE_KEY_PREFIX}submissions`);
      if (savedSubmissions) setSubmissions(JSON.parse(savedSubmissions));
      const savedNotifs = localStorage.getItem(`${STORAGE_KEY_PREFIX}notifs`);
      if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
      const savedUser = localStorage.getItem(`${STORAGE_KEY_PREFIX}user`);
      if (savedUser) {
        const found = DEMO_USERS.find(u => u.id === JSON.parse(savedUser));
        if (found) setCurrentUser(found);
      }
      const savedCurrency = localStorage.getItem(`${STORAGE_KEY_PREFIX}currency`);
      if (savedCurrency) setCurrency(savedCurrency as 'INR' | 'USD');
    } catch {
      // LocalStorage not available or parse error
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem(`${STORAGE_KEY_PREFIX}owners`, JSON.stringify(owners));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}auction`, JSON.stringify(auction));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}bids`, JSON.stringify(bids));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}submissions`, JSON.stringify(submissions));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}notifs`, JSON.stringify(notifications));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}user`, JSON.stringify(currentUser.id));
      localStorage.setItem(`${STORAGE_KEY_PREFIX}currency`, currency);
    } catch {
      // Storage error ignore
    }
  }, [owners, auction, bids, submissions, notifications, currentUser, currency, isInitialized]);

  // Determine current active owner
  const currentOwner = owners.find(o => o.status === 'active') || owners[0] || null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleCurrency = () => {
    setCurrency(prev => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const switchUser = (userId: string) => {
    const user = DEMO_USERS.find(u => u.id === userId);
    if (user) {
      setCurrentUser(user);
    }
  };

  const placeBid = (amount: number) => {
    const { minNextBid } = calculateMinNextBid(
      auction.previousWinningPrice,
      auction.currentHighestBid,
      auction.minimumEscalationPercent
    );

    if (amount < minNextBid) {
      return {
        success: false,
        message: `Bid must be at least $${minNextBid.toLocaleString('en-US')} USD`,
      };
    }

    // Check anti-sniping rule: if bid placed with less than 2 minutes left
    const now = Date.now();
    const endsAtTime = new Date(auction.endsAt).getTime();
    const secondsRemaining = (endsAtTime - now) / 1000;
    let extended = false;
    let newEndsAt = auction.endsAt;

    if (secondsRemaining > 0 && secondsRemaining < 120) {
      // Extend by 2 minutes from current end
      extended = true;
      newEndsAt = new Date(endsAtTime + 2 * 60 * 1000).toISOString();
    }

    const previousHighBidderName = auction.highestBidderName;
    const previousHighBid = auction.currentHighestBid;

    // Create new bid record
    const newBid: Bid = {
      id: `BID-${Date.now()}`,
      auctionId: auction.id,
      bidderId: currentUser.id,
      bidderName: currentUser.name,
      bidderCompany: currentUser.companyName,
      country: currentUser.country,
      countryCode: currentUser.countryCode,
      flagEmoji: currentUser.countryCode === 'GB' ? '🇬🇧' : currentUser.countryCode === 'DE' ? '🇩🇪' : '🇮🇳',
      amount,
      timestamp: new Date().toISOString(),
      status: 'valid',
    };

    // Mark previous winning bid as outbid
    const updatedBids = bids.map(b => (b.status === 'valid' ? { ...b, status: 'outbid' as const } : b));
    setBids([newBid, ...updatedBids]);

    // Update auction state
    setAuction(prev => ({
      ...prev,
      currentHighestBid: amount,
      highestBidderId: currentUser.id,
      highestBidderName: currentUser.name,
      highestBidderCompany: currentUser.companyName,
      highestBidderCountry: currentUser.country,
      highestBidderCountryCode: currentUser.countryCode,
      endsAt: newEndsAt,
      extendedCount: extended ? prev.extendedCount + 1 : prev.extendedCount,
      totalBidsCount: prev.totalBidsCount + 1,
    }));

    // Generate notifications
    const newNotifs: NotificationItem[] = [
      {
        id: `NOTIF-${Date.now()}-1`,
        type: 'new_record',
        title: `New High Bid: $${amount.toLocaleString('en-US')} USD`,
        message: `${currentUser.name} (${currentUser.companyName}) is now leading Auction #${auction.auctionNumber}.`,
        link: '/auction',
        timestamp: 'Just now',
        read: false,
      },
    ];

    if (previousHighBidderName !== currentUser.name) {
      newNotifs.push({
        id: `NOTIF-${Date.now()}-2`,
        type: 'outbid',
        title: 'You were outbid!',
        message: `${previousHighBidderName}: Your bid of $${previousHighBid.toLocaleString('en-US')} USD was outbid by $${(amount - previousHighBid).toLocaleString('en-US')} USD.`,
        link: '/auction',
        timestamp: 'Just now',
        read: false,
      });
    }

    if (extended) {
      newNotifs.push({
        id: `NOTIF-${Date.now()}-3`,
        type: 'auction_ending',
        title: 'Anti-Sniping Protection Triggered',
        message: 'A bid arrived with under 2 minutes remaining. Auction clock extended by +2:00 minutes.',
        link: '/auction',
        timestamp: 'Just now',
        read: false,
      });
    }

    setNotifications(prev => [...newNotifs, ...prev]);

    return {
      success: true,
      message: `Bid of $${amount.toLocaleString('en-US')} USD placed successfully! You are the highest bidder.`,
      extended,
    };
  };

  const submitCreative = (data: Omit<AdvertisementSubmission, 'id' | 'userId' | 'status' | 'submittedAt'>) => {
    const newSubmission: AdvertisementSubmission = {
      ...data,
      id: `SUB-${Date.now()}`,
      userId: currentUser.id,
      status: 'under_review',
      submittedAt: new Date().toISOString(),
      reviewerNotes: 'Asset uploaded. Automated dimension and URL security checks passed. Awaiting editorial sign-off.',
    };

    setSubmissions(prev => [newSubmission, ...prev]);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'system',
      title: 'Creative Submitted for Moderation',
      message: `Your advertisement "${data.brandName}" is now in review with our verification desk.`,
      link: '/dashboard/advertisements',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const moderateCreative = (submissionId: string, status: 'approved' | 'rejected', notes?: string) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          return {
            ...sub,
            status,
            reviewedAt: new Date().toISOString(),
            reviewerNotes: notes || (status === 'approved' ? 'Approved by verification desk.' : 'Requires revisions.'),
          };
        }
        return sub;
      })
    );

    const submission = submissions.find(s => s.id === submissionId);
    const brand = submission ? submission.brandName : 'Creative';

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: status === 'approved' ? 'ad_approved' : 'ad_rejected',
      title: status === 'approved' ? 'Advertisement Approved' : 'Advertisement Revision Required',
      message: `${brand}: ${notes || (status === 'approved' ? 'Cleared for launch.' : 'Please update your creative assets.')}`,
      link: '/dashboard/advertisements',
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const setLiveBannerOwner = (ownerId: string) => {
    setOwners(prev =>
      prev.map(o => ({
        ...o,
        status: o.id === ownerId ? 'active' : 'completed',
      }))
    );
  };

  const concludeAuctionManually = () => {
    // Conclude current auction and generate a new owner
    const winningBid = auction.currentHighestBid;
    const winnerCompany = auction.highestBidderCompany;
    const winnerCountry = auction.highestBidderCountry;
    const winnerCountryCode = auction.highestBidderCountryCode;

    const newOwnerNumber = auction.targetOwnershipNumber;
    const newOwnerId = `OB-${String(newOwnerNumber).padStart(3, '0')}`;

    const newOwner: OwnerRecord = {
      id: newOwnerId,
      ownershipNumber: newOwnerNumber,
      brandName: winnerCompany,
      brandSlug: winnerCompany.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      country: winnerCountry,
      countryCode: winnerCountryCode,
      flagEmoji: winnerCountryCode === 'GB' ? '🇬🇧' : winnerCountryCode === 'DE' ? '🇩🇪' : '🇮🇳',
      tagline: 'Leading Global Innovation. Official Banner Owner.',
      description: `Victor of Auction #${auction.auctionNumber} on THE BIG BANNER. Exclusively owning the single global advertising space.`,
      ctaText: 'Visit Official Site',
      destinationUrl: 'https://thebigbanner.com',
      bannerDesktopUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1920&q=80',
      bannerMobileUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=900&q=80',
      purchasePrice: winningBid,
      transactionDate: new Date().toISOString(),
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
      status: 'active',
      transactionHash: '0x' + Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      certificateSerial: `TBB-CERT-2026-${String(newOwnerNumber).padStart(4, '0')}`,
      category: 'Tech',
      verified: true,
      impressions: 0,
      clicks: 0,
    };

    // Update owners: mark old active as completed, add new owner
    setOwners(prev => [newOwner, ...prev.map(o => ({ ...o, status: 'completed' as const }))]);

    // Schedule next auction ($5 higher minimum starting price)
    const nextStartPrice = winningBid + 5;
    const nextAuctionNumber = auction.auctionNumber + 1;

    setAuction({
      id: `AUC-${String(nextAuctionNumber).padStart(3, '0')}`,
      auctionNumber: nextAuctionNumber,
      targetOwnershipNumber: newOwnerNumber + 1,
      targetStartDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
      targetEndDate: new Date(Date.now() + 28 * 24 * 3600 * 1000).toISOString(),
      status: 'live',
      startingPrice: nextStartPrice,
      previousWinningPrice: winningBid,
      minimumEscalationPercent: 10,
      currentHighestBid: nextStartPrice,
      highestBidderId: 'USR-RESERVE',
      highestBidderName: 'Opening Reserve Bid',
      highestBidderCompany: 'Reserve Placement',
      highestBidderCountry: 'Global',
      highestBidderCountryCode: 'UN',
      endsAt: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      extendedCount: 0,
      totalBidsCount: 1,
      reservePrice: nextStartPrice,
    });

    // Update financial metrics
    setFinancialMetrics(prev => ({
      ...prev,
      grossTransactionValue: prev.grossTransactionValue + winningBid,
      totalCompletedSales: prev.totalCompletedSales + 1,
      highestSaleValue: Math.max(prev.highestSaleValue, winningBid),
      averageSaleValue: Math.round((prev.grossTransactionValue + winningBid) / (prev.totalCompletedSales + 1)),
      totalOwnersCount: prev.totalOwnersCount + 1,
      paymentGatewayFees: prev.paymentGatewayFees + Math.round(winningBid * 0.02),
      netPlatformProceeds: prev.netPlatformProceeds + Math.round(winningBid * 0.98),
    }));

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'auction_won',
      title: `Auction #${auction.auctionNumber} Concluded!`,
      message: `${winnerCompany} won Ownership #${newOwnerNumber} for $${winningBid.toLocaleString('en-US')} USD. New auction opened!`,
      link: `/ownership/${newOwnerId}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notificationId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetToDefaults = () => {
    localStorage.clear();
    setOwners(INITIAL_OWNERS);
    setAuction(INITIAL_AUCTION);
    setBids(INITIAL_BIDS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentUser(DEMO_USERS[0]);
    setCurrency('INR');
    setFinancialMetrics(INITIAL_FINANCIAL_METRICS);
  };

  return (
    <BannerContext.Provider
      value={{
        owners,
        currentOwner,
        auction,
        bids,
        submissions,
        notifications,
        currentUser,
        currency,
        financialMetrics,
        unreadCount,
        placeBid,
        submitCreative,
        moderateCreative,
        setLiveBannerOwner,
        concludeAuctionManually,
        switchUser,
        toggleCurrency,
        markNotificationAsRead,
        markAllNotificationsRead,
        resetToDefaults,
      }}
    >
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
