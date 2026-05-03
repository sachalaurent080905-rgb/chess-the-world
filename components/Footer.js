import Link from 'next/link';
import { Mail, Phone, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative border-t mt-24"
      style={{ borderColor: 'rgba(201,168,76,0.1)', background: '#070707' }}
    >
      {/* Gold line top */}
      <div className="line-gold opacity-30" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <span
                className="block text-ivory text-2xl tracking-widest uppercase"
                style={{ fontFamily: 'var(--font-cormorant)', letterSpacing: '0.2em' }}
              >
                Chess
              </span>
              <span
                className="block text-xs tracking-[0.4em] uppercase"
                style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-cormorant)' }}
              >
                The World
              </span>
            </div>
            <p className="text-smoke text-sm leading-relaxed max-w-[240px] font-body">
              Des jeux d'échecs qui transforment les monuments iconiques du monde en pièces d'art.
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border-gold-subtle text-smoke hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border-gold-subtle text-smoke hover:text-gold hover:border-gold transition-all duration-300"
              >
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-ivory text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(245,245,240,0.5)' }}
            >
              Collections
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/products/le-puy-en-velay', label: 'Le Puy-en-Velay' },
                { href: '/products/paris', label: 'Paris' },
                { href: '/products/londres', label: 'Londres' },
                { href: '/products/barcelone', label: 'Barcelone' },
                { href: '/products', label: 'Toutes les collections' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-smoke hover:text-gold-light text-sm transition-colors duration-300 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(245,245,240,0.5)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/about', label: "L'Atelier" },
                { href: '/special-order', label: 'Commande spéciale' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-smoke hover:text-gold-light text-sm transition-colors duration-300 font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs tracking-[0.2em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-dm-sans)', color: 'rgba(245,245,240,0.5)' }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:chesstheworld.contact@gmail.com"
                  className="flex items-center gap-2 text-smoke hover:text-gold transition-colors duration-300 text-sm group"
                >
                  <Mail size={14} strokeWidth={1.5} className="group-hover:text-gold transition-colors" />
                  chesstheworld.contact@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33641378505"
                  className="flex items-center gap-2 text-smoke hover:text-gold transition-colors duration-300 text-sm group"
                >
                  <Phone size={14} strokeWidth={1.5} className="group-hover:text-gold transition-colors" />
                  +33 6 41 37 85 05
                </a>
              </li>
            </ul>

            <div className="mt-8 p-3 border-gold-subtle">
              <p className="text-smoke text-xs tracking-wide leading-relaxed">
                ✦ Livraison partout en Europe<br />
                ✦ Fabrication française<br />
                ✦ Éditions limitées
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderColor: 'rgba(201,168,76,0.08)' }}
        >
          <p className="text-smoke text-xs tracking-wide font-body">
            © {currentYear} Chess The World. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {['Politique de confidentialité', 'CGV', 'Mentions légales'].map((label) => (
              <a key={label} href="#" className="text-smoke/60 hover:text-smoke text-xs transition-colors font-body">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-smoke/40">
            <span className="text-[10px] tracking-widest uppercase font-body">Paiement sécurisé</span>
            <span className="text-gold/60">✦</span>
            <span className="text-[10px] tracking-widest font-body">Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
