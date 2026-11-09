import { NextResponse } from 'next/server';
import { placeServerAuthoritativeBid } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { auctionId, bidderId, amount } = body;

    if (!auctionId || !bidderId || !amount) {
      return NextResponse.json({ error: 'Missing required bid parameters' }, { status: 400 });
    }

    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: 'Invalid numeric bid amount' }, { status: 400 });
    }

    const result = placeServerAuthoritativeBid(auctionId, bidderId, parsedAmount);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
