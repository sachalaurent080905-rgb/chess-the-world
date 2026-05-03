'Use Client'

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatPrice } from '@/lib/cartStore';

export default function ProductCard({ city, model, featured = false }) {
  const stockBadge = model.stock <= 5 && model.stock > 0;

  return (
    <Link
      href={`/products/${city.id}?model=${model.id}`}
      className={`card-luxury group block overflow-hidden relative ${featured ? 'md:col-span-2' : ''}`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-charcoal ${featured ? 'h-80' : 'h-56'}`}
        style={{ background: 'linear-gradient(145deg, #1a1a1a, #111)' }}
      >
        {city.image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={city.image}
              alt={`${city.name} – ${model.name}`}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              className="transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient for legibility */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(10,10,10,0.15) 0%, transparent 40%, rgba(10,10,10,0.55) 100%)',
              }}
            />
          </>
        ) : (
          <>
            {/* Fallback: chess visual placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-2 animate-float opacity-80" style={{ animationDuration: '4s' }}>
                  {city.id === 'paris' ? '\u265F' : city.id === 'londres' ? '\u265C' : city.id === 'barcelone' ? '\u265A' : '\u265E'}
                </div>
                <div
                  className="text-xs tracking-[0.3em] uppercase font-body"
                  style={{ color: 'var(--color-gold)', opacity: 0.6 }}
                >
                  {city.flag} {city.name}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 chess-pattern opacity-40" />
          </>
        )}

        {/* Gold glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 70%)' }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
          {model.badge && model.badgeType === 'limited' && (
            <span className="tag-badge tag-limited">{model.badge}</span>
          )}
          {model.badge && model.badgeType === 'gold' && (
            <span className="tag-badge tag-gold">{model.badge}</span>
          )}
          {model.badge && model.badgeType === 'coming-soon' && (
            <span className="tag-badge tag-coming-soon">{model.badge}</span>
          )}
        </div>

        {stockBadge && !model.comingSoon && (
          <div className="absolute top-3 right-3 z-10">
            <span className="tag-badge" style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(180,60,60,0.4)', color: '#E88' }}>
              Plus que {model.stock}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="section-label text-[10px] mb-1.5">
              <span style={{ width: '20px', display: 'inline-block', height: '1px', background: 'var(--color-gold)', marginRight: '6px', verticalAlign: 'middle' }} />
              {city.name}
            </p>
            <h3 className="font-display text-xl font-400 text-ivory leading-tight group-hover:text-gold-light transition-colors duration-300"
              style={{ fontFamily: 'var(--font-cormorant)' }}>
              {model.name}
            </h3>
            <p className="text-smoke text-xs mt-1 font-body">{model.subtitle}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-500 text-gold" style={{ fontFamily: 'var(--font-cormorant)' }}>
              {model.comingSoon ? '—' : formatPrice(model.price)}
            </span>
            {!model.comingSoon && (
              <span className="text-smoke text-sm line-through font-body">
                {formatPrice(model.originalPrice)}
              </span>
            )}
          </div>

          <span
            className="flex items-center gap-1 text-xs text-smoke group-hover:text-gold group-hover:gap-2 transition-all duration-300 font-body"
            style={{ letterSpacing: '0.1em' }}
          >
            {model.comingSoon ? 'Bientôt' : 'Découvrir'}
            <ArrowRight size={12} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}
