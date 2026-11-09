import { NextResponse } from 'next/server';
import { placeServerAuthoritativeBid } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { auctionId, bidderId, amount, bidderInfo } = body;

    if (!auctionId || (!bidderId && !bidderInfo?.email) || !amount) {
      return NextResponse.json({ error: 'Missing required bid parameters (Auction ID, Bidder Profile, and Amount required)' }, { status: 400 });
    }

    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: 'Invalid numeric bid amount' }, { status: 400 });
    }

    const result = placeServerAuthoritativeBid(auctionId, bidderId || '', parsedAmount, bidderInfo);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
