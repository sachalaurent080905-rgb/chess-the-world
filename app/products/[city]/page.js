'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShoppingCart, Check, ChevronDown, ChevronLeft, ChevronRight,
  Ruler, Info,
} from 'lucide-react';
import toast from 'react-hot-toast';
import {
  getCityById, MODELS, PIECE_COLORS, PIECES_VARIANTS,
} from '@/lib/products';
import { useCartStore, formatPrice } from '@/lib/cartStore';
import ColorPicker from '@/components/ColorPicker';
import ChessBoardPreview from '@/components/ChessBoardPreview';

export default function CityProductPage({ params }) {
  const resolvedParams = use(params);
  const cityId = resolvedParams.city;

  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCartStore();

  const city = getCityById(cityId);
  const defaultModelId = searchParams.get('model') || 'classic';

  const [selectedModel, setSelectedModel] = useState(null);
  const [color1, setColor1] = useState(PIECE_COLORS[0]);     // Pièces joueur 1
  const [color2, setColor2] = useState(PIECE_COLORS[1]);     // Pièces joueur 2
  const [piecesVariant, setPiecesVariant] = useState(PIECES_VARIANTS[0]); // light par défaut
  const [expandedPiece, setExpandedPiece] = useState(null);
  const [adding, setAdding] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  useEffect(() => {
    if (!city) { router.push('/products'); return; }
    const m = MODELS.find(m => m.id === defaultModelId) || MODELS[0];
    setSelectedModel(m);
  }, [city, defaultModelId, router]);

  // Reset gallery index when city changes
  useEffect(() => { setGalleryIndex(0); }, [cityId]);

  if (!city || !selectedModel) return (
    <div className="min-h-screen flex items-center justify-center">
      <div style={{ color: 'var(--color-gold)', fontSize: '3rem' }}>{'\u265B'}</div>
    </div>
  );

  const gallery = city.gallery && city.gallery.length > 0 ? city.gallery : [city.image];
  const currentImage = gallery[galleryIndex % gallery.length];

  const supportsColorConfig   = selectedModel.supportsColorConfig;
  const supportsPiecesVariant = selectedModel.supportsPiecesVariant;

  // Prix effectif :
  // - Pièces seules → dépend de la variante choisie (light/heavy)
  // - Sinon → prix du modèle
  const effectivePrice         = supportsPiecesVariant ? piecesVariant.price         : selectedModel.price;
  const effectiveOriginalPrice = supportsPiecesVariant ? piecesVariant.originalPrice : selectedModel.originalPrice;

  // Pour le mini-aperçu (ChessBoardPreview), le plateau utilise toujours noir & blanc classique
  // (le plateau réel est en bois — il n'est jamais coloré)
  const boardColor1 = { id: 'black', label: 'Noir',  hex: '#1A1A1A' };
  const boardColor2 = { id: 'white', label: 'Blanc', hex: '#F5F5F0' };

  const savings    = effectiveOriginalPrice - effectivePrice;
  const savingsPct = Math.round((savings / effectiveOriginalPrice) * 100);

  function handleAddToCart() {
    setAdding(true);
    const payload = {
      cityId: city.id,
      cityName: city.name,
      modelId: selectedModel.id,
      modelName: selectedModel.name,
      price: effectivePrice,
      dimensions: selectedModel.dimensions,
    };
    if (supportsColorConfig) {
      Object.assign(payload, {
        color1: color1.id, color1Label: color1.label, color1Hex: color1.hex,
        color2: color2.id, color2Label: color2.label, color2Hex: color2.hex,
      });
    }
    if (supportsPiecesVariant) {
      Object.assign(payload, {
        piecesVariant: piecesVariant.id,
        piecesVariantLabel: piecesVariant.label,
      });
    }
    addItem(payload);
    toast.success(`${city.name} – ${selectedModel.name} ajouté !`);
    setTimeout(() => setAdding(false), 600);
  }

  function nextImage() { setGalleryIndex(i => (i + 1) % gallery.length); }
  function prevImage() { setGalleryIndex(i => (i - 1 + gallery.length) % gallery.length); }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="border-b px-6 py-3" style={{ borderColor: 'rgba(201,168,76,0.08)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-smoke font-body">
          <Link href="/" className="hover:text-ivory transition-colors">Accueil</Link>
          <span className="opacity-30">/</span>
          <Link href="/products" className="hover:text-ivory transition-colors">Collections</Link>
          <span className="opacity-30">/</span>
          <span style={{ color: 'var(--color-gold-light)' }}>{city.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* LEFT — Carousel photos + pièces */}
          <div className="space-y-6">
            <div className="relative overflow-hidden group" style={{
              background: 'linear-gradient(145deg, #161616, #0e0e0e)',
              border: '1px solid rgba(201,168,76,0.12)',
              aspectRatio: '1',
            }}>
              <Image
                key={currentImage}
                src={currentImage}
                alt={`Échiquier ${city.name} – image ${galleryIndex + 1}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority={galleryIndex === 0}
              />

              {/* Flag + badges */}
              <div className="absolute top-4 right-4 text-3xl z-10" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.8))' }}>
                {city.flag}
              </div>
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {selectedModel.badgeType === 'limited' && <span className="tag-badge tag-limited">{selectedModel.badge}</span>}
                {selectedModel.badgeType === 'gold'    && <span className="tag-badge tag-gold">{selectedModel.badge}</span>}
                {selectedModel.stock <= 5 && (
                  <span className="tag-badge text-[10px]" style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(180,60,60,0.4)', color: '#E88' }}>
                    {selectedModel.stock} restant{selectedModel.stock > 1 ? 's' : ''}
                  </span>
                )}
              </div>

              {/* Gallery controls */}
              {gallery.length > 1 && (
                <>
                  <button onClick={prevImage} aria-label="Image précédente"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                    style={{ background: 'rgba(10,10,10,0.65)', backdropFilter: 'blur(6px)', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <ChevronLeft size={18} color="var(--color-ivory)" strokeWidth={1.5} />
                  </button>
                  <button onClick={nextImage} aria-label="Image suivante"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
                    style={{ background: 'rgba(10,10,10,0.65)', backdropFilter: 'blur(6px)', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <ChevronRight size={18} color="var(--color-ivory)" strokeWidth={1.5} />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-3 py-2" style={{ background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(6px)' }}>
                    {gallery.map((_, i) => (
                      <button key={i} onClick={() => setGalleryIndex(i)} aria-label={`Aller à l${'\u2019'}image ${i + 1}`}
                        className="transition-all"
                        style={{
                          width:  i === galleryIndex ? '20px' : '6px',
                          height: '6px',
                          background: i === galleryIndex ? 'var(--color-gold)' : 'rgba(255,255,255,0.35)',
                        }} />
                    ))}
                  </div>

                  {/* Counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-[10px] tracking-widest uppercase px-2.5 py-1 text-ivory font-body"
                    style={{ background: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(6px)' }}>
                    {galleryIndex + 1} / {gallery.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div className="grid grid-cols-9 gap-1.5">
                {gallery.map((img, i) => (
                  <button key={img} onClick={() => setGalleryIndex(i)}
                    className="relative overflow-hidden transition-all"
                    style={{
                      aspectRatio: '1',
                      border: i === galleryIndex ? '1px solid var(--color-gold)' : '1px solid rgba(201,168,76,0.1)',
                      opacity: i === galleryIndex ? 1 : 0.55,
                    }}>
                    <Image src={img} alt="" fill sizes="80px" style={{ objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Live preview (only when color config active) */}
            {supportsColorConfig && (
              <ChessBoardPreview
                color1={color1}
                color2={color2}
                boardColor1={boardColor1}
                boardColor2={boardColor2}
                city={city}
              />
            )}

            {/* Pieces list */}
            <div className="border-gold-subtle p-5" style={{ background: 'rgba(201,168,76,0.02)' }}>
              <h3 className="font-display text-xl text-ivory mb-4" style={{ fontFamily: 'var(--font-cormorant)' }}>
                Les 6 types de pièces
              </h3>
              <div className="space-y-1">
                {city.pieces.map((piece) => (
                  <button key={piece.role}
                    onClick={() => setExpandedPiece(expandedPiece === piece.role ? null : piece.role)}
                    className="w-full flex items-center justify-between p-3 transition-colors hover:bg-white/5 text-left">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" style={{ color: 'var(--color-gold)' }}>{piece.symbol}</span>
                      <div>
                        <div className="text-ivory text-sm font-body font-500">{piece.role}</div>
                        <div className="text-smoke text-xs font-body">{piece.name}</div>
                      </div>
                    </div>
                    <ChevronDown size={14} strokeWidth={1.5}
                      style={{ transform: expandedPiece === piece.role ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
                  </button>
                ))}
              </div>
              {expandedPiece && (
                <div className="mt-3 p-3 text-xs text-smoke font-body" style={{ background: 'rgba(10,10,10,0.4)', borderLeft: '2px solid var(--color-gold)' }}>
                  <span className="text-gold-light font-500">{city.pieces.find(p => p.role === expandedPiece)?.name}</span>
                  {' '}— {city.pieces.find(p => p.role === expandedPiece)?.description}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Titre + options + CTA */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{city.flag}</span>
                <div className="section-label text-[10px]">
                  <span />{city.country} · {city.name}<span />
                </div>
              </div>
              <h1 className="font-display text-ivory mb-2" style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
                fontWeight: 300, lineHeight: 1.05,
              }}>Échiquier {city.name}</h1>
              <p className="italic" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold-light)', fontSize: '1.1rem' }}>
                {city.tagline}
              </p>
            </div>

            <p className="text-smoke text-sm font-body leading-relaxed border-l-2 pl-4" style={{ borderColor: 'rgba(201,168,76,0.3)' }}>
              {city.story}
            </p>

            {/* Model selector */}
            <div>
              <label className="label-luxury">Choisir le modèle</label>
              <div className="grid grid-cols-1 gap-3 mt-2">
                {MODELS.map((model) => (
                  <button key={model.id}
                    onClick={() => setSelectedModel(model)}
                    className="relative flex items-center justify-between p-4 transition-all duration-300 text-left cursor-pointer"
                    style={{
                      border: selectedModel?.id === model.id ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.15)',
                      background: selectedModel?.id === model.id ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.02)',
                    }}>
                    <div className="flex-1 pr-10">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-ivory text-sm font-body font-500">{model.name}</span>
                        {model.badgeType === 'limited' && <span className="tag-badge tag-limited text-[9px]">{model.badge}</span>}
                        {model.badgeType === 'gold'    && <span className="tag-badge tag-gold text-[9px]">{model.badge}</span>}
                      </div>
                      <span className="text-smoke text-xs font-body block">{model.subtitle}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}>
                        {model.id === 'pieces-only' ? `dès ${formatPrice(model.price)}` : formatPrice(model.price)}
                      </div>
                      <div className="text-smoke text-xs line-through font-body">{formatPrice(model.originalPrice)}</div>
                    </div>
                    {selectedModel?.id === model.id && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full" style={{ background: 'var(--color-gold)' }}>
                        <Check size={11} color="#0A0A0A" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Dimensions / matériau info */}
            <div className="flex items-center gap-3 p-4 border-gold-subtle" style={{ background: 'rgba(201,168,76,0.03)' }}>
              <Ruler size={18} color="var(--color-gold)" strokeWidth={1.5} />
              <div>
                <div className="text-[10px] tracking-widest uppercase text-gold-light font-body">
                  {selectedModel.id === 'pieces-only' ? 'Composition' : 'Dimensions du plateau'}
                </div>
                <div className="text-ivory text-sm font-body font-500">{selectedModel.dimensions} · {selectedModel.material}</div>
              </div>
            </div>

            {/* ── OPTIONS ── */}

            {/* Pièces seules : choix variante (léger / lourdes) */}
            {supportsPiecesVariant && (
              <div className="space-y-3">
                <div className="label-luxury">Type de pièces</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PIECES_VARIANTS.map((v) => (
                    <button key={v.id}
                      onClick={() => setPiecesVariant(v)}
                      className="relative p-4 text-left transition-all"
                      style={{
                        border: piecesVariant.id === v.id ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.15)',
                        background: piecesVariant.id === v.id ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.02)',
                      }}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">{v.icon}</span>
                        <span className="text-ivory text-sm font-body font-500">{v.label}</span>
                        {piecesVariant.id === v.id && (
                          <div className="ml-auto w-4 h-4 flex items-center justify-center rounded-full" style={{ background: 'var(--color-gold)' }}>
                            <Check size={9} color="#0A0A0A" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <p className="text-smoke text-xs font-body leading-relaxed mb-2">{v.description}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="font-display text-lg" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}>
                          {formatPrice(v.price)}
                        </span>
                        <span className="text-smoke text-xs line-through font-body">{formatPrice(v.originalPrice)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Configurateur de couleurs */}
            {supportsColorConfig && (
              <div className="space-y-5">
                <div className="label-luxury">Personnaliser les couleurs des pièces</div>

                <ColorPicker label="Couleur Joueur 1" selected={color1} onSelect={setColor1} exclude={color2.id} />
                <ColorPicker label="Couleur Joueur 2" selected={color2} onSelect={setColor2} exclude={color1.id} />

                {/* Info plateau (sauf pour pièces seules) */}
                {!supportsPiecesVariant && (
                  <div className="flex items-start gap-2 p-3 text-xs font-body" style={{ background: 'rgba(201,168,76,0.04)', borderLeft: '2px solid var(--color-gold)' }}>
                    <Info size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--color-gold-light)' }} strokeWidth={1.5} />
                    <div className="text-smoke leading-relaxed">
                      Les couleurs choisies s{'\u2019'}appliquent uniquement aux <strong className="text-ivory">pièces</strong>. Le plateau est livré avec son rendu bois naturel ({selectedModel.material.toLowerCase()}).
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Price summary */}
            <div className="p-5 border-gold-subtle space-y-3" style={{ background: 'rgba(201,168,76,0.03)' }}>
              <div className="flex items-center justify-between">
                <span className="text-smoke text-sm font-body">Prix habituel</span>
                <span className="text-smoke text-sm line-through font-body">{formatPrice(effectiveOriginalPrice)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-smoke text-sm font-body">Offre de lancement</span>
                <span className="text-sm font-body" style={{ color: '#6ECC8A' }}>−{formatPrice(savings)} ({savingsPct}%)</span>
              </div>
              <div className="line-gold opacity-30" />
              <div className="flex items-center justify-between">
                <span className="text-ivory text-sm font-body font-500">Total</span>
                <span className="font-display text-3xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--color-gold)' }}>
                  {formatPrice(effectivePrice)}
                </span>
              </div>
            </div>

            {selectedModel.stock <= 5 && (
              <div className="flex items-center gap-2 text-sm font-body p-3 border" style={{ borderColor: 'rgba(180,60,60,0.3)', background: 'rgba(180,60,60,0.06)', color: '#E88' }}>
                <span>⚠</span> Il ne reste que <strong>{selectedModel.stock} exemplaire{selectedModel.stock > 1 ? 's' : ''}</strong>
              </div>
            )}

            <button onClick={handleAddToCart} disabled={adding}
              className="btn-primary w-full justify-center text-sm py-4"
              style={{ display: 'flex', opacity: adding ? 0.8 : 1 }}>
              {adding ? (
                <><Check size={16} strokeWidth={2.5} /> Ajouté au panier</>
              ) : (
                <><ShoppingCart size={16} strokeWidth={1.5} /> Ajouter au panier</>
              )}
            </button>

            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: '\uD83D\uDD12', label: 'Paiement sécurisé', sub: 'via Stripe' },
                { icon: '\uD83D\uDE9A', label: 'Livraison mondiale', sub: 'suivie' },
                { icon: '\u2B50',         label: 'Satisfaction',      sub: 'garantie' },
              ].map((item) => (
                <div key={item.label} className="p-3 border-gold-subtle">
                  <div className="text-lg mb-1">{item.icon}</div>
                  <div className="text-ivory text-[10px] font-body font-500">{item.label}</div>
                  <div className="text-smoke text-[10px] font-body">{item.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-center text-smoke text-xs font-body">
              Modifications souhaitées ?{' '}
              <Link href="/special-order" className="underline hover:text-gold-light transition-colors">
                Demande spéciale →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
