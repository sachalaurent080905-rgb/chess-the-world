import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn('[WEBHOOK] STRIPE_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('[WEBHOOK SIGNATURE ERROR]', err.message);
    return NextResponse.json({ error: `Webhook signature invalid: ${err.message}` }, { status: 400 });
  }

  // Handle events
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log('[ORDER PAID] Session:', session.id);
        console.log('[ORDER PAID] Customer:', session.customer_email);
        console.log('[ORDER PAID] Amount:', session.amount_total / 100, 'EUR');
        console.log('[ORDER PAID] Summary:', session.metadata?.order_summary);

        // TODO: Save order to database
        // TODO: Send confirmation email
        // TODO: Update inventory
        // await saveOrderToDatabase(session);
        // await sendConfirmationEmail(session);
        break;
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object;
        console.log('[PAYMENT FAILED] Intent:', intent.id);
        break;
      }

      default:
        console.log('[WEBHOOK] Unhandled event type:', event.type);
    }
  } catch (err) {
    console.error('[WEBHOOK HANDLER ERROR]', err.message);
    return NextResponse.json({ error: 'Webhook handler error' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// Required: disable body parsing for Stripe raw body verification
export const runtime = 'nodejs';
