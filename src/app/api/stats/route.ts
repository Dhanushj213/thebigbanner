import { NextResponse } from 'next/server';
import { getFinancialStatistics } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = getFinancialStatistics();
    return NextResponse.json({ stats });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
