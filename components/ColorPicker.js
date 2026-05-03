'use client';

import { PIECE_COLORS } from '@/lib/products';

export default function ColorPicker({ label, selected, onSelect, exclude }) {
  const available = PIECE_COLORS.filter((c) => c.id !== exclude);

  return (
    <div>
      <label className="label-luxury">{label}</label>
      <div className="flex flex-wrap gap-2.5 mt-2">
        {available.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color)}
            className={`color-swatch ${selected?.id === color.id ? 'selected' : ''}`}
            style={{ background: color.hex }}
            title={color.label}
            aria-label={`Couleur : ${color.label}`}
          />
        ))}
      </div>
      {selected && (
        <p className="text-smoke text-xs mt-2 tracking-wide font-body">
          Sélectionné : <span style={{ color: 'var(--color-gold-light)' }}>{selected.label}</span>
        </p>
      )}
    </div>
  );
}
