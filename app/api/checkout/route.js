import { NextResponse } from 'next/server';
import { stripe, buildLineItems } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { items, customerInfo } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Panier vide' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const freeShipping = subtotal >= 150;

    const lineItems = buildLineItems(items);

    // Ajouter les frais de livraison UNIQUEMENT si pas gratuit
    if (!freeShipping) {
      lineItems.push({
        price_data: {
          currency: 'eur',
          product_data: { name: 'Frais de livraison' },
          unit_amount: 1000, // 10€ pour l'Europe
        },
        quantity: 1,
      });
    }

    const orderSummary = items
      .map(
        (i) =>
          `${i.cityName} ${i.modelName} (${i.color1Label}/${i.color2Label}) ×${i.quantity}`
      )
      .join(' | ');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      customer_email: customerInfo?.email || undefined,
      metadata: {
        order_summary: orderSummary.substring(0, 500),
        customer_name: `${customerInfo?.firstName || ''} ${customerInfo?.lastName || ''}`.trim(),
        shipping_address: `${customerInfo?.address || ''}, ${customerInfo?.zip || ''} ${customerInfo?.city || ''}, ${customerInfo?.country || ''}`,
      },
      shipping_address_collection: {
        allowed_countries: [
          'FR', 'BE', 'CH', 'LU', 'MC',
          'GB', 'IE', 'DE', 'AT', 'NL',
          'ES', 'IT', 'PT', 'US', 'CA',
          'AU', 'NZ', 'JP', 'SG',
        ],
      },
      success_url: `${appUrl}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cart`,
      locale: 'fr',
      billing_address_collection: 'auto',
      custom_text: {
        submit: {
          message: 'Fabriqué à la main en France · Livraison sous 5-10 jours ouvrés',
        },
      },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[CHECKOUT ERROR]', error.message);
    return NextResponse.json(
      { error: error.message || 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}