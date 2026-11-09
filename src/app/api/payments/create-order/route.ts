import { NextResponse } from 'next/server';
import { createCashfreeOrder } from '@/lib/cashfree';
import { getAuthoritativeExchangeRates } from '@/lib/exchangeRates';
import { recordPendingPayment, getAuthoritativeAuction } from '@/lib/services';
import { SupportedCurrency } from '@/types/currency';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      auctionId,
      ownershipId,
      amountUSD: requestedUSD,
      targetCurrency = 'INR',
      customerName = 'Alex Vance',
      customerEmail = 'billing@solaris-aerospace.com',
      customerPhone = '9876543210',
      userId = 'usr_alex',
    } = body;

    // Validate amount: either passed or current high bid of target auction
    let amountUSD = Number(requestedUSD);
    if (!amountUSD || isNaN(amountUSD) || amountUSD <= 0) {
      const liveAuction = getAuthoritativeAuction();
      amountUSD = liveAuction ? liveAuction.currentHighestBid : 365000;
    }

    // Retrieve live authoritative FX rates
    const exchangeData = await getAuthoritativeExchangeRates();
    const rate = exchangeData.rates[targetCurrency as SupportedCurrency] || 1.0;

    // Compute charged amount in target currency (INR, USD, EUR, etc.)
    const chargedAmount =
      targetCurrency === 'USD'
        ? amountUSD
        : targetCurrency === 'JPY'
        ? Math.round(amountUSD * rate)
        : Number((amountUSD * rate).toFixed(2));

    const orderId = `ord_tbb_${Date.now()}`;
    const paymentId = `pay_${Date.now()}`;

    // Call Cashfree PG API to generate payment session
    const cfOrder = await createCashfreeOrder({
      orderId,
      orderAmount: chargedAmount,
      orderCurrency: targetCurrency,
      customerId: userId,
      customerName,
      customerEmail,
      customerPhone,
      orderNote: `THE BIG BANNER - Sovereignty Slot Settlement ($${amountUSD.toLocaleString()} USD)`,
    });

    // Record pending transaction in database
    recordPendingPayment({
      id: paymentId,
      auctionId: auctionId || 'auc_009',
      ownershipId: ownershipId || 'own_9',
      userId,
      amountUSD,
      chargedCurrency: targetCurrency,
      chargedAmount,
      exchangeRate: rate,
      paymentMethod: 'Cashfree Gateway (UPI / Cards / NetBanking)',
      gatewayReference: orderId,
    });

    return NextResponse.json({
      success: true,
      orderId,
      paymentId,
      cfOrderId: cfOrder.cfOrderId,
      paymentSessionId: cfOrder.paymentSessionId,
      orderStatus: cfOrder.orderStatus,
      amountUSD,
      chargedAmount,
      chargedCurrency: targetCurrency,
      exchangeRate: rate,
      isSimulated: cfOrder.isSimulated || false,
    });
  } catch (error: any) {
    console.error('Failed to create Cashfree payment order:', error);
    return NextResponse.json({ error: error.message || 'Payment creation failed' }, { status: 500 });
  }
}
