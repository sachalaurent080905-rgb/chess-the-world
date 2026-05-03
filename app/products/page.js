import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { CITIES, MODELS } from '@/lib/products';
import { formatPrice } from '@/lib/format';

export const metadata = {
  title: 'Collections – Chess The World',
  description: "Découvrez nos jeux d'échecs premium : Paris, Londres, Le Puy-en-Velay et Barcelone. Pièces seules, échiquier Classique ou Premium en bois gravé. Livraison internationale.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* ── Header ── */}
      <div
        className="relative py-20 px-6 text-center overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(201,168,76,0.04) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <div className="chess-pattern absolute inset-0 opacity-30" />
        <div className="relative z-10">
          <div className="section-label justify-center mb-4">
            <span />Collections
            <span />
          </div>
          <h1
            className="font-display text-ivory mb-4"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              fontWeight: 300,
            }}
          >
            Nos Échiquiers
          </h1>
          <p className="text-smoke text-base max-w-xl mx-auto font-body">
            Chaque échiquier est une œuvre d{'\u2019'}art unique. Choisissez votre ville, personnalisez vos couleurs, et jouez le monde.
          </p>
        </div>
      </div>

      {/* ── Cities × Models grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {CITIES.map((city) => (
          <CitySection key={city.id} city={city} />
        ))}
      </div>

      {/* ── Models comparison ── */}
      <ModelsComparison />

      {/* ── Special order CTA ── */}
      <SpecialOrderBanner />
    </div>
  );
}

function CitySection({ city }) {
  return (
    <section className="mb-24">
      {/* City header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{city.flag}</span>
            <span className="section-label text-[11px]">
              <span />
              {city.country}
              <span />
            </span>
          </div>
          <h2
            className="font-display text-ivory"
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 300,
            }}
          >
            {city.name}
          </h2>
          <p className="text-smoke mt-1 text-sm font-body max-w-lg">{city.tagline}</p>
        </div>
        <Link
          href={`/products/${city.id}`}
          className="flex-shrink-0 btn-outline text-xs"
        >
          Voir les détails
          <ArrowRight size={12} strokeWidth={1.5} />
        </Link>
      </div>

      {/* Hero image of the city's chess set */}
      {city.image && (
        <div
          className="relative w-full overflow-hidden mb-8 border-gold-subtle"
          style={{ aspectRatio: '16 / 9', maxHeight: '480px' }}
        >
          <Image
            src={city.image}
            alt={`Échiquier ${city.name} – Chess The World`}
            fill
            sizes="(max-width: 768px) 100vw, 80vw"
            style={{ objectFit: 'cover' }}
            priority={city.id === 'le-puy-en-velay'}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, transparent 50%, rgba(10,10,10,0.35) 100%)',
            }}
          />
        </div>
      )}

      {/* Pieces preview bar */}
      <div
        className="flex flex-wrap gap-4 mb-8 p-4 border-gold-subtle"
        style={{ background: 'rgba(201,168,76,0.02)' }}
      >
        {city.pieces.map((piece) => (
          <div key={piece.role} className="flex items-center gap-2 text-sm">
            <span
              className="text-2xl"
              style={{ color: 'var(--color-gold)', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))' }}
            >
              {piece.symbol}
            </span>
            <div>
              <div className="text-smoke text-[10px] tracking-widest uppercase font-body">{piece.role}</div>
              <div className="text-ivory text-xs font-body">{piece.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Models grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODELS.map((model) => (
          <ModelVariantCard key={model.id} city={city} model={model} />
        ))}
      </div>
    </section>
  );
}

function ModelVariantCard({ city, model }) {
  if (model.comingSoon) {
    return (
      <div className="card-luxury p-6 opacity-60 relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <span className="tag-badge tag-coming-soon">{model.badge}</span>
        </div>
        <div
          className="text-5xl mb-4 text-center"
          style={{ color: 'var(--color-smoke)', opacity: 0.3 }}
        >
          {city.pieces[0].symbol}
        </div>
        <h3
          className="font-display text-xl text-smoke"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {city.name} – {model.name}
        </h3>
        <p className="text-smoke/60 text-sm mt-1 font-body">{model.subtitle}</p>
        <p
          className="font-display text-2xl mt-4"
          style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-smoke)' }}
        >
          Bientôt disponible
        </p>
      </div>
    );
  }

  return (
    <Link
      href={`/products/${city.id}?model=${model.id}`}
      className="card-luxury group block overflow-hidden"
    >
      {/* Visual */}
      <div
        className="relative h-44 flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #161616, #0e0e0e)' }}
      >
        {/* City photo background */}
        {city.image && (
          <Image
            src={city.image}
            alt={`${city.name} – ${model.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ objectFit: 'cover', opacity: 0.85 }}
            className="transition-transform duration-700 group-hover:scale-105"
          />
        )}

        {/* Tinted overlay to match model aesthetic */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              model.id === 'premium'
                ? 'linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.55) 100%)'
                : 'linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.6) 100%)',
          }}
        />

        {/* Badge */}
        <div className="absolute top-3 left-3 z-10">
          {model.badgeType === 'limited' && (
            <span className="tag-badge tag-limited text-[10px]">{model.badge}</span>
          )}
          {model.badgeType === 'gold' && (
            <span className="tag-badge tag-gold text-[10px]">{model.badge}</span>
          )}
        </div>

        {/* Stock */}
        {model.stock <= 5 && (
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className="tag-badge text-[10px]"
              style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(180,60,60,0.4)', color: '#E88' }}
            >
              {model.stock} restants
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3
          className="font-display text-xl text-ivory group-hover:text-gold-light transition-colors"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {model.name}
        </h3>
        <p className="text-smoke text-xs mt-0.5 mb-3 font-body">{model.subtitle}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className="font-display text-2xl"
              style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}
            >
              {formatPrice(model.price)}
            </span>
            <span className="text-smoke text-sm line-through font-body">
              {formatPrice(model.originalPrice)}
            </span>
          </div>
          <span
            className="text-smoke text-xs flex items-center gap-1 group-hover:text-gold group-hover:gap-2 transition-all font-body"
          >
            Configurer <ArrowRight size={11} strokeWidth={1.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function ModelsComparison() {
  const features = [
    { label: 'Composition',         pieces: '32 pièces uniquement',     classic: 'Plateau bois + 32 pièces',        premium: 'Plateau bois + 32 pièces' },
    { label: 'Type de plateau',     pieces: '—',                         classic: 'Bois brut gravé à la main',       premium: "Bois d\u2019acajou et sycomore" },
    { label: 'Finition plateau',    pieces: '—',                         classic: 'Vernis satiné',                   premium: 'Gravure laser haute précision' },
    { label: 'Dimensions plateau',  pieces: '—',                         classic: '30 \u00d7 30 cm',                 premium: '36 \u00d7 36 cm' },
    { label: 'Pièces',              pieces: 'Légères ou lourdes',        classic: '3D PETG légères',                 premium: '3D PETG lourdes premium' },
    { label: 'Couleurs au choix',   pieces: '✓ (6 couleurs × 2)',       classic: '✓ (6 couleurs × 2)',              premium: '✓ (6 couleurs × 2)' },
    { label: 'Coffret',             pieces: 'Boîte de protection',        classic: 'Boîte recyclable',                premium: 'Coffret velours noir' },
    { label: 'Certificat',          pieces: '—',                          classic: '—',                                premium: 'Gravé, numéroté' },
    { label: 'Limited Edition',     pieces: '—',                          classic: '—',                                premium: '✓' },
    { label: 'Prix',                pieces: 'dès 30€',                    classic: '60€',                              premium: '110€' },
  ];

  return (
    <section
      className="py-16 px-6"
      style={{ background: 'rgba(201,168,76,0.02)', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-center text-3xl text-ivory mb-10"
          style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
        >
          Comparer les gammes
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: 'rgba(201,168,76,0.15)' }}>
                <th className="text-left py-3 pr-6 text-smoke font-body text-xs tracking-widest uppercase font-500">
                  Caractéristique
                </th>
                <th className="text-center py-3 px-4 font-body text-xs tracking-widest uppercase text-ash font-500">
                  Pièces seules
                </th>
                <th className="text-center py-3 px-4 font-body text-xs tracking-widest uppercase text-ash font-500">
                  Classique
                </th>
                <th
                  className="text-center py-3 px-4 font-body text-xs tracking-widest uppercase font-600"
                  style={{ color: 'var(--color-gold)' }}
                >
                  Premium ✦
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((f, i) => (
                <tr
                  key={i}
                  className="border-b"
                  style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                >
                  <td className="py-3 pr-6 text-smoke font-body text-xs tracking-wide">{f.label}</td>
                  <td className="py-3 px-4 text-center text-ash font-body text-sm">{f.pieces}</td>
                  <td className="py-3 px-4 text-center text-ash font-body text-sm">{f.classic}</td>
                  <td
                    className="py-3 px-4 text-center font-body text-sm"
                    style={{ color: f.premium === '—' ? 'var(--color-smoke)' : 'var(--color-gold-light)' }}
                  >
                    {f.premium}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function SpecialOrderBanner() {
  return (
    <section className="py-16 px-6">
      <div
        className="max-w-4xl mx-auto p-10 text-center relative overflow-hidden border-gold-subtle"
        style={{ background: 'linear-gradient(145deg, #141410, #0e0e0a)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.06), transparent 70%)' }}
        />
        <div className="relative z-10">
          <span className="text-3xl mb-4 block">🌍</span>
          <h2
            className="font-display text-3xl text-ivory mb-3"
            style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}
          >
            Votre ville n{'\u2019'}est pas encore là ?
          </h2>
          <p className="text-smoke text-sm mb-6 font-body max-w-lg mx-auto leading-relaxed">
            Demandez un échiquier personnalisé avec vos monuments préférés, vos couleurs, votre ville — n{'\u2019'}importe où dans le monde.
          </p>
          <Link href="/special-order" className="btn-primary">
            Faire une demande spéciale
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
