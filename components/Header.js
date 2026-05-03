'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

const navLinks = [
  { href: '/',               label: 'Accueil' },
  { href: '/products',       label: 'Collections' },
  { href: '/special-order',  label: 'Sur Mesure' },
  { href: '/about',          label: "L'Atelier" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items, openCart } = useCartStore();

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'glass-dark shadow-[0_1px_0_rgba(201,168,76,0.1)]'
            : 'bg-transparent'
        }`}
        style={{ height: 'var(--nav-height)' }}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start group">
            <span
              className="font-display text-xl font-400 text-ivory tracking-widest uppercase"
              style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.2em' }}
            >
              Chess
            </span>
            <span
              className="font-display text-xs font-300 tracking-[0.4em] uppercase"
              style={{
                fontFamily: 'var(--font-cormorant)',
                color: 'var(--color-gold)',
                letterSpacing: '0.4em',
                marginTop: '-2px',
              }}
            >
              The World
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center justify-center w-10 h-10 text-ash hover:text-ivory transition-colors duration-300"
              aria-label="Panier"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-[10px] font-600 rounded-full"
                  style={{
                    background: 'var(--color-gold)',
                    color: 'var(--color-obsidian)',
                  }}
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-ash hover:text-ivory transition-colors duration-300"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        {/* Gold border bottom */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background:
                'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)',
            }}
          />
        )}
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-500 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: 'var(--nav-height)' }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-obsidian/95"
          onClick={() => setMobileOpen(false)}
        />

        {/* Menu content */}
        <nav
          className="relative flex flex-col items-center justify-center h-full gap-8 pb-20"
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-3xl font-300 transition-all duration-300 ${
                pathname === link.href
                  ? 'text-gold-light'
                  : 'text-ivory/80 hover:text-ivory'
              }`}
              style={{
                fontFamily: 'var(--font-cormorant)',
                animationDelay: `${i * 0.05}s`,
              }}
            >
              {link.label}
            </Link>
          ))}

          <div className="line-gold mt-4" style={{ width: '80px' }} />

          <div className="flex flex-col items-center gap-1">
            <span className="text-smoke text-xs tracking-widest uppercase font-body">
              chesstheworld.contact@gmail.com
            </span>
            <span className="text-smoke text-xs tracking-widest">+33 6 41 37 85 05</span>
          </div>
        </nav>
      </div>
    </>
  );
}
