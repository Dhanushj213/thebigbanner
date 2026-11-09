import { NextResponse } from 'next/server';
import { verifyCashfreeWebhookSignature } from '@/lib/cashfree';
import { verifyAndCompletePayment } from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-webhook-signature') || '';
    const timestamp = req.headers.get('x-webhook-timestamp') || '';

    // Verify cryptographic signature
    const isValid = verifyCashfreeWebhookSignature(rawBody, signature, timestamp);
    if (!isValid) {
      console.warn('[Cashfree Webhook]: Invalid webhook signature detected.');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);
    const { type, data } = event;

    if (type === 'PAYMENT_SUCCESS_WEBHOOK' || type === 'ORDER_PAID_WEBHOOK') {
      const orderId = data?.order?.order_id;
      const cfPaymentId = data?.payment?.cf_payment_id ? String(data.payment.cf_payment_id) : undefined;

      if (orderId) {
        verifyAndCompletePayment(orderId, cfPaymentId);
        console.log(`[Cashfree Webhook]: Order ${orderId} verified and settled.`);
      }
    }

    return NextResponse.json({ status: 'OK' });
  } catch (error: any) {
    console.error('[Cashfree Webhook Error]:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
