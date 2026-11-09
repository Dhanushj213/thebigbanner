import { NextResponse } from 'next/server';
import { getFinancialStatistics, getMonthlyReports, getOwnershipById, getPaymentsLedger } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const verifyHash = searchParams.get('verify');

    if (verifyHash) {
      const verifiedRecord = getOwnershipById(verifyHash);
      return NextResponse.json({
        verified: !!verifiedRecord,
        record: verifiedRecord || null,
      });
    }

    const stats = getFinancialStatistics();
    const monthlyReports = getMonthlyReports();
    const paymentsLedger = getPaymentsLedger();

    return NextResponse.json({
      stats,
      monthlyReports,
      paymentsLedger,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
