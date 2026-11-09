import { NextResponse } from 'next/server';
import { getAuthoritativeAuction, getAuctionBids } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const auction = getAuthoritativeAuction();
    if (!auction) {
      return NextResponse.json({ error: 'No active auction' }, { status: 404 });
    }
    const bids = getAuctionBids(auction.id);

    return NextResponse.json({
      auction,
      bids,
      serverTimeMs: Date.now(),
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
