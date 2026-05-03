'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Open/close cart drawer
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      // Add item to cart
      addItem: (item) => {
        const { items } = get();
        const key = `${item.cityId}-${item.modelId}-${item.color1}-${item.color2}`;
        const existing = items.find((i) => i.key === key);

        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, key, quantity: 1 }] });
        }
        set({ isOpen: true });
      },

      // Remove item
      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((i) => i.key !== key),
        }));
      },

      // Update quantity
      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        }));
      },

      // Clear cart
      clearCart: () => set({ items: [] }),

      // Computed
      get totalItems() {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },

      get totalPrice() {
        return get().items.reduce(
          (acc, i) => acc + i.price * i.quantity,
          0
        );
      },

      get formattedTotal() {
        return new Intl.NumberFormat('fr-FR', {
          style: 'currency',
          currency: 'EUR',
        }).format(get().totalPrice);
      },
    }),
    {
      name: 'chess-world-cart',
    }
  )
);

// Helper to format price — re-exported from lib/format for convenience
export { formatPrice } from './format';
