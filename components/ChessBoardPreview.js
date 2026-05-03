'use client';

import Image from 'next/image';

/**
 * ChessBoardPreview
 * Affiche la photo réelle de l'échiquier de la ville sélectionnée,
 * avec une visualisation des couleurs choisies pour les deux joueurs,
 * et un aperçu de plateau miniature qui réagit aussi aux couleurs.
 */
export default function ChessBoardPreview({ color1, color2, boardColor1, boardColor2, city }) {
  // Couleurs pièces
  const piece1 = color1?.hex ?? '#1A1A1A';
  const piece2 = color2?.hex ?? '#F5F5F0';
  // Couleurs plateau — par défaut identiques aux pièces (ancien comportement)
  const boardDark  = (boardColor1 ?? color1)?.hex ?? '#1A1A1A';
  const boardLight = (boardColor2 ?? color2)?.hex ?? '#F5F5F0';
  // Détecter si le plateau a été forcé en noir & blanc classique
  const isClassicBoard = boardColor1 && boardColor1.id !== color1?.id;

  const pieces = [
    { role: 'Roi',      symbol: '\u265A' },
    { role: 'Reine',    symbol: '\u265B' },
    { role: 'Tour',     symbol: '\u265C' },
    { role: 'Cavalier', symbol: '\u265E' },
    { role: 'Fou',      symbol: '\u265D' },
    { role: 'Pions',    symbol: '\u265F' },
  ];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        border: '1px solid rgba(201,168,76,0.15)',
        background: 'linear-gradient(145deg, #141414, #0e0e0e)',
      }}
    >
      {/* ── Label ──────────────────────────── */}
      <div
        className="px-4 py-2.5 border-b text-[10px] tracking-[0.25em] uppercase"
        style={{
          borderColor: 'rgba(201,168,76,0.1)',
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-dm-sans)',
        }}
      >
        ✦ Visualisation en direct · {city?.name}
      </div>

      {/* ── Photo de la ville ──────────────── */}
      {city?.image && (
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '4 / 3', background: '#0a0a0a' }}
        >
          <Image
            src={city.image}
            alt={`Échiquier ${city.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
            priority={false}
          />

          {/* Overlay couleurs sélectionnées — gradients doux */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none transition-all duration-700"
            style={{
              background: `
                radial-gradient(ellipse 60% 50% at 30% 65%, ${piece1}55 0%, transparent 60%),
                radial-gradient(ellipse 60% 50% at 70% 35%, ${piece2}55 0%, transparent 60%),
                linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,0.35) 100%)
              `,
              mixBlendMode: 'color',
            }}
          />

          {/* Légende couleurs posée sur la photo */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 px-2.5 py-1.5 backdrop-blur-sm"
              style={{ background: 'rgba(10,10,10,0.55)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ background: piece1 }}
              />
              <span className="text-ivory text-[10px] tracking-widest uppercase font-body">
                {color1?.label ?? 'Couleur 1'}
              </span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1.5 backdrop-blur-sm"
              style={{ background: 'rgba(10,10,10,0.55)', border: '1px solid rgba(201,168,76,0.2)' }}>
              <div
                className="w-3 h-3 rounded-full border border-white/30"
                style={{ background: piece2 }}
              />
              <span className="text-ivory text-[10px] tracking-widest uppercase font-body">
                {color2?.label ?? 'Couleur 2'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Mini plateau + pièces — réactif aux couleurs ── */}
      <div className="p-4">
        <div
          className="grid mx-auto mb-4 transition-all duration-500"
          style={{
            gridTemplateColumns: 'repeat(8, 1fr)',
            width: '100%',
            maxWidth: '240px',
            aspectRatio: '1',
            border: `2px solid ${boardDark}55`,
          }}
        >
          {Array.from({ length: 64 }).map((_, i) => {
            const row = Math.floor(i / 8);
            const col = i % 8;
            const isLight = (row + col) % 2 === 0;
            return (
              <div
                key={i}
                className="transition-colors duration-500"
                style={{
                  background: isLight ? boardLight : boardDark,
                  opacity: 0.88,
                  aspectRatio: '1',
                }}
              />
            );
          })}
        </div>

        {/* Pièces côte à côte */}
        <div className="flex justify-center items-start gap-4 mt-2">
          {/* Joueur 1 */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {pieces.slice(0, 3).map((p) => (
                <span
                  key={p.role}
                  className="text-2xl leading-none select-none transition-colors duration-500"
                  style={{
                    color: piece1,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
                  }}
                  title={p.role}
                >
                  {p.symbol}
                </span>
              ))}
            </div>
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{
                color: piece1,
                fontFamily: 'var(--font-dm-sans)',
                opacity: 0.85,
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {color1?.label ?? 'Couleur 1'}
            </span>
          </div>

          <div
            className="w-px self-stretch opacity-30"
            style={{ background: 'var(--color-gold)' }}
          />

          {/* Joueur 2 */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {pieces.slice(0, 3).map((p) => (
                <span
                  key={p.role}
                  className="text-2xl leading-none select-none transition-colors duration-500"
                  style={{
                    color: piece2,
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.7))',
                  }}
                  title={p.role}
                >
                  {p.symbol}
                </span>
              ))}
            </div>
            <span
              className="text-[10px] tracking-widest uppercase"
              style={{
                color: piece2,
                fontFamily: 'var(--font-dm-sans)',
                opacity: 0.85,
                textShadow: '0 1px 2px rgba(0,0,0,0.8)',
              }}
            >
              {color2?.label ?? 'Couleur 2'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
