'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore, formatPrice } from '@/lib/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  async function handleCheckout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur lors du paiement');
      if (data.url) {
        // Redirect to Stripe Checkout hosted page
        window.location.href = data.url;
      } else {
        throw new Error('URL de paiement invalide');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Une erreur est survenue. Réessayez.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* ── Header ── */}
      <div className="border-b px-6 py-4" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link href="/products" className="flex items-center gap-2 text-smoke hover:text-ivory text-sm transition-colors font-body">
            <ArrowLeft size={16} strokeWidth={1.5} />
            Continuer les achats
          </Link>
          <span className="text-smoke/30">|</span>
          <h1 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Panier
            {totalItems > 0 && (
              <span className="text-smoke text-lg ml-2">({totalItems} article{totalItems > 1 ? 's' : ''})</span>
            )}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
            <ShoppingBag size={56} strokeWidth={0.75} style={{ color: 'var(--color-iron)' }} />
            <div>
              <h2 className="font-display text-3xl text-smoke mb-2" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                Votre panier est vide
              </h2>
              <p className="text-smoke/60 text-sm font-body">Explorez nos collections et trouvez votre échiquier idéal.</p>
            </div>
            <Link href="/products" className="btn-primary mt-2">Découvrir les collections</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* ── Items list ── */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <CartItemRow
                  key={item.key}
                  item={item}
                  onRemove={() => removeItem(item.key)}
                  onUpdateQty={(qty) => updateQuantity(item.key, qty)}
                />
              ))}
              <button onClick={clearCart}
                className="flex items-center gap-1.5 mt-4 text-xs font-body transition-colors"
                style={{ color: 'rgba(136,136,128,0.5)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-smoke)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(136,136,128,0.5)'}
              >
                <Trash2 size={12} strokeWidth={1.5} /> Vider le panier
              </button>
            </div>

            {/* ── Order summary ── */}
            <div className="space-y-4">
              <div className="p-6 border-gold-subtle space-y-4"
                style={{ background: 'linear-gradient(145deg, #131310, #0e0e0b)' }}>
                <h2 className="font-display text-2xl text-ivory" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
                  Récapitulatif
                </h2>

                <div className="line-gold opacity-20" />

                <div className="space-y-3 text-sm font-body">
                  <div className="flex justify-between text-smoke">
                    <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-smoke">
                    <span>Livraison</span>
                    <span style={{ color: '#6ECC8A' }}>Offerte</span>
                  </div>
                  <div className="flex justify-between text-smoke">
                    <span>Taxes</span>
                    <span>Incluses</span>
                  </div>
                </div>

                <div className="line-gold opacity-20" />

                <div className="flex justify-between items-center">
                  <span className="text-ivory font-body text-sm" style={{ fontWeight: 500 }}>Total</span>
                  <span className="font-display text-3xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}>
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {/* Checkout button */}
                <button onClick={handleCheckout} disabled={loading}
                  className="btn-primary w-full justify-center py-4 mt-2"
                  style={{ display: 'flex', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{ borderColor: 'rgba(10,10,10,0.3)', borderTopColor: '#0A0A0A' }} />
                      Redirection vers Stripe…
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Lock size={14} strokeWidth={2} />
                      Commander · {formatPrice(totalPrice)}
                    </span>
                  )}
                </button>

                {/* Security badge */}
                <div className="flex items-center justify-center gap-2 text-[10px] font-body"
                  style={{ color: 'rgba(136,136,128,0.4)' }}>
                  <Lock size={10} strokeWidth={1.5} />
                  Paiement sécurisé 256-bit SSL · Stripe
                </div>

                {/* Payment methods */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  {['Visa', 'Mastercard', 'Amex', 'Apple Pay', 'Google Pay'].map((pm) => (
                    <span key={pm} className="px-2 py-0.5 text-[10px] font-body"
                      style={{ border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(136,136,128,0.5)' }}>
                      {pm}
                    </span>
                  ))}
                </div>
              </div>

              {/* Help */}
              <div className="p-4 border-gold-subtle text-center space-y-1">
                <p className="text-smoke text-xs font-body">Besoin d'aide avec votre commande ?</p>
                <a href="mailto:chesstheworld.contact@gmail.com"
                  className="text-xs font-body underline transition-colors"
                  style={{ color: 'var(--color-gold-light)' }}>
                  chesstheworld.contact@gmail.com
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Cart Item Row ─────────────────────────────────────────────────── */
function CartItemRow({ item, onRemove, onUpdateQty }) {
  return (
    <div className="p-5 flex flex-col sm:flex-row gap-5 transition-all duration-300"
      style={{ background: 'linear-gradient(145deg, #141414, #111)', border: '1px solid rgba(201,168,76,0.1)' }}>

      {/* Visual thumbnail */}
      <div className="w-full sm:w-28 h-28 flex-shrink-0 flex items-center justify-center relative overflow-hidden"
        style={{ background: '#0e0e0e', border: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="chess-pattern absolute inset-0 opacity-30" />
        <div className="relative z-10 flex gap-1">
          <span className="text-3xl" style={{ color: item.color1Hex, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}>♚</span>
          <span className="text-3xl" style={{ color: item.color2Hex, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}>♛</span>
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="tag-badge tag-gold text-[9px] mb-1.5 inline-block">{item.cityName}</span>
            <h3 className="font-display text-xl text-ivory leading-tight"
              style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 400 }}>
              {item.modelName}
            </h3>
            <div className="flex items-center gap-2 mt-1.5">
              <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                style={{ background: item.color1Hex }} title={item.color1Label} />
              <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
                style={{ background: item.color2Hex }} title={item.color2Label} />
              <span className="text-smoke text-xs font-body">{item.color1Label} & {item.color2Label}</span>
            </div>
          </div>
          <button onClick={onRemove}
            className="text-smoke transition-colors mt-0.5 hover:text-red-400">
            <Trash2 size={15} strokeWidth={1.5} />
          </button>
        </div>

        {/* Qty + Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="qty-btn" onClick={() => onUpdateQty(item.quantity - 1)}>
              <Minus size={12} />
            </button>
            <span className="text-ivory text-sm w-6 text-center font-body">{item.quantity}</span>
            <button className="qty-btn" onClick={() => onUpdateQty(item.quantity + 1)}>
              <Plus size={12} />
            </button>
          </div>
          <span className="font-display text-2xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}>
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
