import { NextResponse } from 'next/server';
import { getAuthoritativeExchangeRates } from '@/lib/exchangeRates';
import { SUPPORTED_CURRENCIES } from '@/types/currency';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await getAuthoritativeExchangeRates();
    return NextResponse.json({
      ...data,
      supportedCurrencies: SUPPORTED_CURRENCIES,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
