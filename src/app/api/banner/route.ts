import { NextResponse } from 'next/server';
import { getCurrentLiveBanner } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const banner = getCurrentLiveBanner();
    return NextResponse.json({ banner });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
