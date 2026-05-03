'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Globe, Zap, Award } from 'lucide-react';
import { CITIES, MODELS, TESTIMONIALS } from '@/lib/products';
import { formatPrice } from '@/lib/cartStore';

// ── Intersection Observer hook ───────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── Animated counter ─────────────────────────────────────────────────────────
function Counter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const heroRef = useRef(null);

  return (
    <div className="min-h-screen">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden hero-grid"
        style={{ paddingTop: 'var(--nav-height)' }}
      >
        {/* Background radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(201,168,76,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Floating chess pieces decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { symbol: '♚', size: '8rem', top: '15%', left: '8%', delay: '0s', opacity: 0.04 },
            { symbol: '♛', size: '6rem', top: '60%', left: '5%', delay: '1.5s', opacity: 0.03 },
            { symbol: '♟', size: '5rem', top: '30%', right: '6%', delay: '0.8s', opacity: 0.04 },
            { symbol: '♜', size: '7rem', top: '70%', right: '8%', delay: '2s', opacity: 0.03 },
            { symbol: '♝', size: '4rem', top: '80%', left: '20%', delay: '1s', opacity: 0.03 },
            { symbol: '♞', size: '5rem', top: '20%', right: '22%', delay: '0.5s', opacity: 0.03 },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute select-none"
              style={{
                fontSize: p.size,
                top: p.top,
                left: p.left,
                right: p.right,
                opacity: p.opacity,
                color: 'var(--color-gold)',
                animation: `float 6s ease-in-out ${p.delay} infinite`,
                lineHeight: 1,
              }}
            >
              {p.symbol}
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          {/* Eyebrow */}
          <div
            className="section-label justify-center mb-8"
            style={{
              animationFillMode: 'both',
            }}
          >
            <span />
            Jeu d'échecs premium • Éditions limitées
            <span />
          </div>

          {/* Main headline */}
          <h1
            className="font-display mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3rem, 9vw, 8rem)',
              fontWeight: 300,
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block text-ivory">Chess</span>
            <span
              className="block gold-shimmer italic"
              style={{ fontStyle: 'italic' }}
            >
              The World
            </span>
          </h1>

          {/* Divider */}
          <div className="divider-gold" />

          {/* Tagline */}
          <p
            className="text-smoke max-w-xl mx-auto text-lg font-body mb-10 leading-relaxed"
            style={{ fontWeight: 300 }}
          >
            Jouez les plus grandes villes du monde. Chaque pièce est un monument, sculptée en 3D avec précision.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products" className="btn-primary">
              Découvrir les collections
              <ArrowRight size={14} strokeWidth={2} />
            </Link>
            <Link href="/about" className="btn-outline">
              Notre savoir-faire
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 pt-8 border-t"
            style={{ borderColor: 'rgba(201,168,76,0.1)' }}>
            {[
              { value: 4, suffix: ' villes', label: 'disponibles' },
              { value: 32, suffix: ' pièces', label: 'par échiquier' },
              { value: 100, suffix: '%', label: 'fabriqué en France' },
              { value: 48, suffix: 'h', label: 'délai de fabrication' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div
                  className="font-display text-3xl"
                  style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-smoke text-[11px] tracking-[0.2em] uppercase font-body mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-smoke/40">
          <span className="text-[10px] tracking-[0.3em] uppercase font-body">Défiler</span>
          <div
            className="w-[1px] h-12"
            style={{
              background: 'linear-gradient(to bottom, var(--color-gold), transparent)',
              animation: 'fadeIn 1s ease 1s both',
            }}
          />
        </div>
      </section>

      {/* ══ CONCEPT ══════════════════════════════════════════════════════════ */}
      <ConceptSection />

      {/* ══ COLLECTIONS ═══════════════════════════════════════════════════════ */}
      <CollectionsSection />

      {/* ══ MODELS ════════════════════════════════════════════════════════════ */}
      <ModelsSection />

      {/* ══ PROCESS ═══════════════════════════════════════════════════════════ */}
      <ProcessSection />

      {/* ══ TESTIMONIALS ══════════════════════════════════════════════════════ */}
      <TestimonialsSection />

      {/* ══ CTA BANNER ════════════════════════════════════════════════════════ */}
      <CTASection />
    </div>
  );
}

// ── Concept section ───────────────────────────────────────────────────────────
function ConceptSection() {
  const ref = useReveal();
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div
        ref={ref}
        className="reveal grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
      >
        {/* Left: large decorative chess */}
        <div className="relative flex items-center justify-center">
          <div
            className="relative w-72 h-72 md:w-96 md:h-96 border-gold-subtle flex items-center justify-center"
            style={{ background: 'linear-gradient(145deg, #141414, #0e0e0e)' }}
          >
            {/* Chess board mini */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: 'repeat(8, 1fr)',
                width: '220px',
                height: '220px',
              }}
            >
              {Array.from({ length: 64 }).map((_, i) => {
                const row = Math.floor(i / 8);
                const col = i % 8;
                const isLight = (row + col) % 2 === 0;
                return (
                  <div
                    key={i}
                    style={{
                      background: isLight ? 'rgba(245,245,240,0.08)' : 'rgba(201,168,76,0.06)',
                    }}
                  />
                );
              })}
            </div>

            {/* Center piece */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ fontSize: '5rem', color: 'var(--color-gold)', opacity: 0.15 }}
            >
              ♛
            </div>

            {/* Corner decorations */}
            {['tl', 'tr', 'bl', 'br'].map((pos) => (
              <div
                key={pos}
                className="absolute w-3 h-3"
                style={{
                  borderColor: 'var(--color-gold)',
                  borderWidth: '1px',
                  opacity: 0.4,
                  ...(pos === 'tl' ? { top: '-1px', left: '-1px', borderRight: 'none', borderBottom: 'none' } : {}),
                  ...(pos === 'tr' ? { top: '-1px', right: '-1px', borderLeft: 'none', borderBottom: 'none' } : {}),
                  ...(pos === 'bl' ? { bottom: '-1px', left: '-1px', borderRight: 'none', borderTop: 'none' } : {}),
                  ...(pos === 'br' ? { bottom: '-1px', right: '-1px', borderLeft: 'none', borderTop: 'none' } : {}),
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: text */}
        <div>
          <div className="section-label mb-6">
            <span />
            Le concept
            <span />
          </div>
          <h2
            className="font-display text-ivory mb-6"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            Des monuments qui
            <span className="block italic" style={{ color: 'var(--color-gold-light)' }}>
              jouent aux échecs
            </span>
          </h2>

          <p className="text-smoke text-base leading-relaxed mb-4 font-body">
            Chess The World est né d'une passion pour l'architecture et les échecs. Chaque ville est déclinée en 32 pièces uniques, où les monuments les plus emblématiques prennent vie sous vos doigts.
          </p>
          <p className="text-smoke text-base leading-relaxed mb-8 font-body">
            De la Tour Eiffel en Roi à la coquille Saint-Jacques en Pion — chaque pièce est modélisée en 3D puis imprimée avec précision sur une Bambulab P1S, pour une qualité digne des plus grands collectionneurs.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: <Globe size={18} strokeWidth={1.5} />, label: 'Villes iconiques' },
              { icon: <Zap size={18} strokeWidth={1.5} />, label: 'Impression 3D' },
              { icon: <Award size={18} strokeWidth={1.5} />, label: 'Éditions limitées' },
              { icon: <Star size={18} strokeWidth={1.5} fill="currentColor" />, label: '5★ sur chaque commande' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-smoke"
                style={{ fontFamily: 'var(--font-dm-sans)', fontSize: '0.85rem' }}
              >
                <span style={{ color: 'var(--color-gold)' }}>{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>

          <Link href="/about" className="btn-outline mt-8 inline-flex">
            Voir l'atelier
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Collections section ───────────────────────────────────────────────────────
function CollectionsSection() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6" style={{ background: 'linear-gradient(180deg, transparent, rgba(201,168,76,0.02), transparent)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <div className="section-label justify-center mb-4">
            <span />
            Nos Collections
            <span />
          </div>
          <h2
            className="font-display text-ivory"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
            }}
          >
            Choisissez votre ville
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CITIES.map((city, i) => (
            <CityCard key={city.id} city={city} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/products" className="btn-outline">
            Voir toutes les collections
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CityCard({ city, index }) {
  const ref = useReveal();

  // Carousel aléatoire : on shuffle la galerie une fois au montage,
  // puis on défile à intervalle régulier. Chaque ville a son propre rythme
  // (décalé de index * 700 ms) pour éviter que toutes les cartes changent en même temps.
  const [order, setOrder]       = useState([]);
  const [imgIndex, setImgIndex] = useState(0);
  const [fade, setFade]         = useState(false);

  useEffect(() => {
    const gallery = city.gallery && city.gallery.length > 0 ? city.gallery : [city.image].filter(Boolean);
    if (gallery.length <= 1) { setOrder(gallery); return; }
    // Fisher-Yates shuffle
    const shuffled = [...gallery];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOrder(shuffled);
  }, [city]);

  useEffect(() => {
    if (order.length <= 1) return;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setFade(true);
        setTimeout(() => {
          setImgIndex(i => (i + 1) % order.length);
          setFade(false);
        }, 400); // durée du fade-out
      }, 3500 + index * 400); // intervalle légèrement différent par carte
      // Stocker pour cleanup
      CityCard._intervals = CityCard._intervals || {};
      CityCard._intervals[city.id] = interval;
    }, index * 700); // démarrage décalé

    return () => {
      clearTimeout(startDelay);
      if (CityCard._intervals && CityCard._intervals[city.id]) {
        clearInterval(CityCard._intervals[city.id]);
      }
    };
  }, [order, city.id, index]);

  const currentImg = order[imgIndex] ?? city.image;

  return (
    <Link
      ref={ref}
      href={`/products/${city.id}`}
      className={`reveal reveal-delay-${index + 1} card-luxury group block overflow-hidden`}
    >
      {/* City visual — carousel aléatoire */}
      <div
        className="relative h-56 overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #141414, #0e0e0e)' }}
      >
        {currentImg ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={currentImg}
              src={currentImg}
              alt={`Échiquier ${city.name}`}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: fade ? 0 : 1,
                transition: 'opacity 400ms ease, transform 700ms ease',
              }}
              className="group-hover:scale-105"
            />
            {/* Gradient overlay pour lisibilité */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, transparent 40%, rgba(10,10,10,0.55) 100%)',
              }}
            />
            {/* Gold glow on hover */}
            <div
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.1) 0%, transparent 70%)' }}
            />
          </>
        ) : (
          <>
            <div className="chess-pattern absolute inset-0 opacity-50" />
            <div className="relative z-10 flex items-center justify-center h-full gap-3 text-4xl">
              {city.pieces.slice(0, 3).map((p) => (
                <span
                  key={p.role}
                  style={{
                    color: 'var(--color-gold)',
                    filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.6))',
                  }}
                >
                  {p.symbol}
                </span>
              ))}
            </div>
          </>
        )}

        {/* Flag */}
        <span className="absolute top-3 right-3 text-2xl z-10"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' }}>
          {city.flag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3
          className="font-display text-2xl font-400 text-ivory group-hover:text-gold-light transition-colors"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {city.name}
        </h3>
        <p className="text-smoke text-sm mt-1 font-body">{city.tagline}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-smoke text-xs tracking-wide font-body">
            {city.pieces.length} types de pièces
          </span>
          <span className="text-gold text-xs flex items-center gap-1 group-hover:gap-2 transition-all font-body" style={{ letterSpacing: '0.1em' }}>
            Explorer <ArrowRight size={11} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Models section ────────────────────────────────────────────────────────────
function ModelsSection() {
  const ref = useReveal();
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <div className="section-label justify-center mb-4">
            <span />
            Nos Gammes
            <span />
          </div>
          <h2
            className="font-display text-ivory"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
            }}
          >
            Trois niveaux d{'\u2019'}excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MODELS.map((model, i) => (
            <ModelCard key={model.id} model={model} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ModelCard({ model, index }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal reveal-delay-${index + 1} card-luxury p-6 relative overflow-hidden ${
        model.comingSoon ? 'opacity-70' : ''
      }`}
    >
      {/* Background glow for premium */}
      {model.id === 'premium' && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at top, rgba(201,168,76,0.06), transparent 70%)',
          }}
        />
      )}

      {/* Badge */}
      <div className="mb-4">
        {model.badgeType === 'limited' && (
          <span className="tag-badge tag-limited text-[10px]">{model.badge}</span>
        )}
        {model.badgeType === 'gold' && (
          <span className="tag-badge tag-gold text-[10px]">{model.badge}</span>
        )}
        {model.badgeType === 'coming-soon' && (
          <span className="tag-badge tag-coming-soon text-[10px]">{model.badge}</span>
        )}
      </div>

      {/* Name */}
      <h3
        className="font-display text-2xl font-400 text-ivory mb-1"
        style={{ fontFamily: 'var(--font-cormorant)' }}
      >
        {model.name}
      </h3>
      <p className="text-smoke text-sm mb-4 font-body">{model.subtitle}</p>

      {/* Divider */}
      <div className="line-gold opacity-30 mb-4" />

      {/* Features */}
      <ul className="space-y-2 mb-6">
        {model.features.slice(0, 4).map((f, fi) => (
          <li key={fi} className="flex items-start gap-2 text-sm text-smoke font-body">
            <span style={{ color: 'var(--color-gold)', marginTop: '2px', flexShrink: 0 }}>✦</span>
            {f}
          </li>
        ))}
      </ul>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-5">
        {model.comingSoon ? (
          <span className="font-display text-2xl text-smoke" style={{ fontFamily: 'var(--font-cormorant)' }}>
            Bientôt disponible
          </span>
        ) : (
          <>
            <span
              className="font-display text-3xl"
              style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}
            >
              {formatPrice(model.price)}
            </span>
            <span className="text-smoke line-through text-sm font-body">
              {formatPrice(model.originalPrice)}
            </span>
          </>
        )}
      </div>

      {/* Stock */}
      {!model.comingSoon && model.stock <= 5 && (
        <p className="text-xs mb-4 font-body" style={{ color: '#E88' }}>
          ⚠ Plus que {model.stock} en stock
        </p>
      )}

      {/* CTA */}
      {!model.comingSoon && (
        <Link
          href={`/products?model=${model.id}`}
          className="btn-primary w-full justify-center"
          style={{ display: 'flex' }}
        >
          {
            model.id === 'premium'      ? 'Commander Premium'
          : model.id === 'pieces-only'  ? 'Commander les pièces'
          :                                'Commander Classique'
          }
        </Link>
      )}
    </div>
  );
}

// ── Process section ───────────────────────────────────────────────────────────
function ProcessSection() {
  const ref = useReveal();
  const steps = [
    { num: '01', title: 'Modélisation 3D', desc: 'Chaque monument est modélisé avec précision, capturant ses détails architecturaux caractéristiques.' },
    { num: '02', title: 'Impression Bambulab', desc: 'Impression sur Bambulab P1S en PETG haute résistance pour une qualité et durabilité exceptionnelles.' },
    { num: '03', title: 'Gravure Laser', desc: 'Le plateau Premium est gravé au laser xTool sur bois massif, puis verni pour une finition irréprochable.' },
    { num: '04', title: 'Contrôle Qualité', desc: 'Chaque pièce est vérifiée individuellement avant d\'être emballée dans notre coffret signature.' },
  ];

  return (
    <section className="py-24 px-6" style={{ background: 'rgba(201,168,76,0.02)' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <div className="section-label justify-center mb-4">
            <span />
            Fabrication
            <span />
          </div>
          <h2
            className="font-display text-ivory"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
            }}
          >
            Du pixel à la pièce
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="reveal p-6 border-t-2"
              style={{ borderColor: 'rgba(201,168,76,0.3)', transitionDelay: `${i * 0.1}s` }}
            >
              <div
                className="font-display text-5xl mb-4"
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  color: 'rgba(201,168,76,0.2)',
                  fontWeight: 300,
                }}
              >
                {step.num}
              </div>
              <h3
                className="font-display text-xl text-ivory mb-2"
                style={{ fontFamily: 'var(--font-cormorant)' }}
              >
                {step.title}
              </h3>
              <p className="text-smoke text-sm font-body leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials section ──────────────────────────────────────────────────────
function TestimonialsSection() {
  const ref = useReveal();

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="reveal text-center mb-16">
          <div className="section-label justify-center mb-4">
            <span />
            Avis Clients
            <span />
          </div>
          <h2
            className="font-display text-ivory"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
            }}
          >
            Ils jouent avec le monde
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="card-luxury p-5 flex flex-col gap-3 reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star
                    key={si}
                    size={12}
                    fill="var(--color-gold)"
                    color="var(--color-gold)"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-smoke text-sm leading-relaxed font-body flex-1 italic">
                "{t.text}"
              </p>

              {/* Divider */}
              <div className="line-gold opacity-20" />

              {/* Author */}
              <div>
                <p className="text-ivory text-sm font-body" style={{ fontWeight: 500 }}>
                  {t.name}
                </p>
                <p className="text-smoke text-xs font-body">{t.location}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="tag-badge tag-gold text-[9px]">{t.product}</span>
                  <span className="text-smoke/50 text-[10px]">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────────────────────────────────
function CTASection() {
  const ref = useReveal();

  return (
    <section
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(145deg, #0e0e0e, #151510)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="chess-pattern absolute inset-0 opacity-20" />

      <div ref={ref} className="reveal relative z-10 text-center max-w-3xl mx-auto">
        <div className="section-label justify-center mb-6">
          <span />
          Commandez maintenant
          <span />
        </div>

        <h2
          className="font-display text-ivory mb-6"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.05,
          }}
        >
          Jouez les villes
          <span className="block italic" style={{ color: 'var(--color-gold-light)' }}>
            qui vous inspirent
          </span>
        </h2>

        <p className="text-smoke text-base mb-10 font-body max-w-lg mx-auto leading-relaxed">
          Livraison internationale · Paiement sécurisé Stripe · Éditions limitées · Fabriqué en France
        </p>

        <Link href="/products" className="btn-primary text-base px-10 py-4">
          Commander maintenant
          <ArrowRight size={16} strokeWidth={2} />
        </Link>

        <div className="flex justify-center gap-8 mt-10 text-smoke/50">
          {['🔒 Paiement sécurisé', '🚚 Livraison mondiale', '⭐ Satisfaction garantie'].map((item) => (
            <span key={item} className="text-xs tracking-wide font-body">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
