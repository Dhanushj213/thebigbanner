import { NextResponse } from 'next/server';
import { getCashfreeOrder, getCashfreeOrderPayments } from '@/lib/cashfree';
import {
  verifyAndCompletePayment,
  getPaymentByGatewayReference,
} from '@/lib/services';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get('order_id');

    if (!orderId) {
      return NextResponse.json({ error: 'order_id is required' }, { status: 400 });
    }

    const orderData = await getCashfreeOrder(orderId);
    const isPaid =
      orderData.order_status === 'PAID' ||
      orderData.is_simulated ||
      orderData.order_status === 'ACTIVE';

    if (isPaid) {
      const payments = await getCashfreeOrderPayments(orderId);
      const cfPaymentId = payments.length > 0 ? payments[0].cfPaymentId : `cf_pay_${Date.now()}`;
      
      const settledPayment = verifyAndCompletePayment(orderId, cfPaymentId);

      return NextResponse.json({
        verified: true,
        orderStatus: 'PAID',
        payment: settledPayment || getPaymentByGatewayReference(orderId),
        cfPaymentId,
      });
    }

    return NextResponse.json({
      verified: false,
      orderStatus: orderData.order_status,
      payment: getPaymentByGatewayReference(orderId),
    });
  } catch (error: any) {
    console.error('Error verifying Cashfree payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const orderId = body.orderId || body.order_id;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    const orderData = await getCashfreeOrder(orderId);
    const payments = await getCashfreeOrderPayments(orderId);
    const cfPaymentId = payments.length > 0 ? payments[0].cfPaymentId : `cf_pay_${Date.now()}`;

    const settled = verifyAndCompletePayment(orderId, cfPaymentId);

    return NextResponse.json({
      verified: true,
      payment: settled || getPaymentByGatewayReference(orderId),
      cfPaymentId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
