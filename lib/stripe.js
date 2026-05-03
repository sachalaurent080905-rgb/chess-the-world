import Stripe from 'stripe';

// Server-side Stripe instance
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
  appInfo: {
    name: 'Chess The World',
    version: '1.0.0',
  },
});

// Build Stripe line items from cart
export function buildLineItems(cartItems) {
  return cartItems.map((item) => ({
    price_data: {
      currency: 'eur',
      product_data: {
        name: `${item.cityName} – ${item.modelName}`,
        description: `Couleurs : ${item.color1Label} & ${item.color2Label}`,
        metadata: {
          cityId: item.cityId,
          modelId: item.modelId,
          color1: item.color1,
          color2: item.color2,
        },
      },
      unit_amount: Math.round(item.price * 100), // Stripe uses cents
    },
    quantity: item.quantity,
  }));
}

// Format amount for display (from cents to euros)
export function formatStripeAmount(amount) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount / 100);
}
