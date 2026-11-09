import React from 'react';
import {
  getCurrentLiveBanner,
  getAuthoritativeAuction,
  getOwnershipHistory,
  getFinancialStatistics,
} from '@/lib/services';
import { LiveBannerHero } from '@/components/LiveBannerHero';
import { AuctionOverviewSection } from '@/components/AuctionOverviewSection';
import { HowItWorksHomepage } from '@/components/HowItWorksHomepage';
import { OwnershipHistoryPreview } from '@/components/OwnershipHistoryPreview';
import { PlatformStatisticsSection } from '@/components/PlatformStatisticsSection';
import { FinalCtaSection } from '@/components/FinalCtaSection';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  // Live database queries (Authoritative Backend State)
  const banner = getCurrentLiveBanner();
  const auction = getAuthoritativeAuction();
  const recentOwners = getOwnershipHistory();
  const stats = getFinancialStatistics();

  return (
    <div className="bg-[#FFFFFF] min-h-screen">
      {/* Sections 1 & 2 & 3: Hero & Centerpiece Live Billboard */}
      <LiveBannerHero banner={banner} auction={auction} />

      {/* Section 4: Live Auction Overview */}
      <AuctionOverviewSection initialAuction={auction} />

      {/* Section 5: How It Works */}
      <HowItWorksHomepage />

      {/* Section 6: Ownership History Preview */}
      <OwnershipHistoryPreview owners={recentOwners} />

      {/* Section 7: Live Platform Statistics */}
      <PlatformStatisticsSection stats={stats} />

      {/* Section 8: Final Call to Action */}
      <FinalCtaSection />
    </div>
  );
}
