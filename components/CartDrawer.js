'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore, formatPrice } from '@/lib/cartStore';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-obsidian/60 backdrop-blur-sm transition-opacity duration-400 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full max-w-[420px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: '#0F0F0F', borderLeft: '1px solid rgba(201,168,76,0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gold-subtle">
          <div>
            <h2 className="font-display text-2xl font-300 text-ivory" style={{ fontFamily: 'var(--font-cormorant)' }}>
              Votre Panier
            </h2>
            <p className="text-smoke text-xs tracking-widest mt-0.5">
              {totalItems} {totalItems > 1 ? 'articles' : 'article'}
            </p>
          </div>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center text-smoke hover:text-ivory transition-colors"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <ShoppingBag size={40} className="text-iron" strokeWidth={1} />
              <div>
                <p className="font-display text-xl font-300 text-smoke" style={{ fontFamily: 'var(--font-cormorant)' }}>
                  Votre panier est vide
                </p>
                <p className="text-smoke/60 text-sm mt-1">Explorez nos collections</p>
              </div>
              <Link href="/products" onClick={closeCart} className="btn-outline mt-2 text-xs">
                Voir les collections
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <CartItem
                key={item.key}
                item={item}
                onRemove={() => removeItem(item.key)}
                onUpdateQty={(qty) => updateQuantity(item.key, qty)}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gold-subtle px-6 py-5 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between">
              <span className="text-smoke text-sm tracking-wide uppercase font-body text-xs" style={{ letterSpacing: '0.15em' }}>
                Sous-total
              </span>
              <span className="font-display text-2xl font-400 text-gold" style={{ fontFamily: 'var(--font-cormorant)' }}>
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-smoke/60 text-xs text-center tracking-wide">
              Livraison internationale · Taxes incluses
            </p>

            {/* Checkout CTA */}
            <Link
              href="/cart"
              onClick={closeCart}
              className="btn-primary w-full justify-center text-center"
              style={{ display: 'flex' }}
            >
              Commander →
            </Link>

            <button
              onClick={closeCart}
              className="w-full text-center text-smoke hover:text-ivory text-xs tracking-widest uppercase transition-colors py-2"
            >
              Continuer les achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <div className="card-luxury p-4 space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="tag-gold tag-badge text-[10px]">{item.cityName}</span>
          </div>
          <h4 className="font-display text-lg font-400 text-ivory leading-tight" style={{ fontFamily: 'var(--font-cormorant)' }}>
            {item.modelName}
          </h4>
          <div className="flex items-center gap-2 mt-1.5">
            <div
              className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
              style={{ background: item.color1Hex }}
              title={item.color1Label}
            />
            <div
              className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0"
              style={{ background: item.color2Hex }}
              title={item.color2Label}
            />
            <span className="text-smoke text-xs">
              {item.color1Label} & {item.color2Label}
            </span>
          </div>
        </div>

        <button onClick={onRemove} className="text-smoke hover:text-red-400 transition-colors mt-0.5">
          <Trash2 size={15} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        {/* Qty */}
        <div className="flex items-center gap-2">
          <button className="qty-btn" onClick={() => onUpdateQty(item.quantity - 1)}>
            <Minus size={12} />
          </button>
          <span className="text-ivory text-sm w-6 text-center font-body">{item.quantity}</span>
          <button className="qty-btn" onClick={() => onUpdateQty(item.quantity + 1)}>
            <Plus size={12} />
          </button>
        </div>

        <span className="font-display text-xl font-400 text-gold" style={{ fontFamily: 'var(--font-cormorant)' }}>
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>
    </div>
  );
}
