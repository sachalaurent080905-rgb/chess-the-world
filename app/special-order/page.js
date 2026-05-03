'use client';

import { useState } from 'react';
import { Send, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { PIECE_COLORS } from '@/lib/products';

export default function SpecialOrderPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    city: '', monument: '',
    colors: [],
    boardType: '',
    budget: '',
    details: '',
  });
  const [loading, setLoading] = useState(false);

  function toggleColor(colorId) {
    setForm(f => ({
      ...f,
      colors: f.colors.includes(colorId)
        ? f.colors.filter(c => c !== colorId)
        : f.colors.length < 2 ? [...f.colors, colorId] : f.colors,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.city) {
      toast.error('Merci de remplir au minimum : nom, email et ville souhaitée.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: `Demande spéciale – ${form.city}`,
          message: `
Ville souhaitée : ${form.city}
Monument spécifique : ${form.monument || 'Non précisé'}
Couleurs : ${form.colors.join(', ') || 'Non précisées'}
Type de plateau : ${form.boardType || 'Non précisé'}
Budget : ${form.budget || 'Non précisé'}
Téléphone : ${form.phone || 'Non fourni'}

Détails : ${form.details || 'Aucun'}
          `.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur');
      toast.success('Demande envoyée ! Nous vous contactons sous 48h avec un devis.');
      setForm({ name: '', email: '', phone: '', city: '', monument: '', colors: [], boardType: '', budget: '', details: '' });
    } catch (err) {
      toast.error(err.message || 'Erreur lors de l\'envoi.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-20 px-6 text-center overflow-hidden" style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="chess-pattern absolute inset-0 opacity-20" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06), transparent 60%)' }} />
        <div className="relative z-10">
          <div className="section-label justify-center mb-4"><span />Sur Mesure<span /></div>
          <h1 className="font-display text-ivory mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 300, lineHeight: 1 }}>
            Votre ville,<br /><span className="italic" style={{ color: 'var(--color-gold-light)' }}>vos règles</span>
          </h1>
          <div className="divider-gold" />
          <p className="text-smoke text-base font-body max-w-lg mx-auto leading-relaxed">
            Paris, Londres, Le Puy n'étaient qu'un début. Demandez un échiquier personnalisé avec n'importe quelle ville et ses monuments — partout dans le monde.
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: '🌍', title: 'Toute ville', desc: 'N\'importe où dans le monde' },
            { icon: '🏛️', title: 'Vos monuments', desc: 'Choisissez chaque pièce' },
            { icon: '🎨', title: 'Vos couleurs', desc: '10 couleurs disponibles' },
            { icon: '📐', title: 'Votre plateau', desc: 'Classique ou Premium' },
          ].map((f) => (
            <div key={f.title} className="card-luxury p-5 text-center">
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h3 className="font-display text-lg text-ivory mb-1" style={{ fontFamily: 'var(--font-cormorant)' }}>{f.title}</h3>
              <p className="text-smoke text-xs font-body">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Info side */}
          <div className="space-y-6">
            <div>
              <div className="section-label mb-4"><span />Comment ça marche<span /></div>
              <ol className="space-y-4">
                {['Remplissez le formulaire avec votre demande', 'Nous vous répondons sous 48h avec un devis', 'Validation et acompte de 30%', 'Fabrication 5-10 jours ouvrés', 'Livraison suivie internationale'].map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-body text-smoke">
                    <span className="font-display text-xl flex-shrink-0" style={{ color: 'var(--color-gold)', fontFamily: 'var(--font-cormorant)', lineHeight: 1.2 }}>{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
            <div className="p-4 border-gold-subtle" style={{ background: 'rgba(201,168,76,0.02)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Star size={14} fill="var(--color-gold)" color="var(--color-gold)" />
                <span className="text-ivory text-sm font-body font-500">Tarification</span>
              </div>
              <div className="space-y-1.5 text-xs text-smoke font-body">
                <div className="flex justify-between"><span>Pièces uniquement</span><span className="text-ivory">à partir de 30€</span></div>
                <div className="flex justify-between"><span>Classique personnalisé</span><span className="text-ivory">à partir de 60€</span></div>
                <div className="flex justify-between"><span>Premium personnalisé</span><span className="text-ivory">à partir de 110€</span></div>
                <div className="flex justify-between"><span>Modélisation nouvelle ville (si possibilite)</span><span className="text-ivory">100€</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-luxury">Nom *</label>
                  <input type="text" className="input-luxury" placeholder="Votre nom" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div>
                  <label className="label-luxury">Email *</label>
                  <input type="email" className="input-luxury" placeholder="votre@email.com" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-luxury">Ville souhaitée *</label>
                  <input type="text" className="input-luxury" placeholder="Ex : Rome, Tokyo, New York…" value={form.city}
                    onChange={e => setForm({ ...form, city: e.target.value })} required />
                </div>
                <div>
                  <label className="label-luxury">Téléphone</label>
                  <input type="tel" className="input-luxury" placeholder="+33 6 xx xx xx xx" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
              </div>

              <div>
                <label className="label-luxury">Monument(s) spécifique(s)</label>
                <input type="text" className="input-luxury" placeholder="Ex : Colisée (Roi), Fontaine de Trevi (Reine)…" value={form.monument}
                  onChange={e => setForm({ ...form, monument: e.target.value })} />
              </div>

              {/* Colors */}
              <div>
                <label className="label-luxury">Couleurs souhaitées (max. 2)</label>
                <div className="flex flex-wrap gap-2.5 mt-2">
                  {PIECE_COLORS.map((c) => (
                    <button type="button" key={c.id}
                      onClick={() => toggleColor(c.id)}
                      className={`color-swatch ${form.colors.includes(c.id) ? 'selected' : ''}`}
                      style={{ background: c.hex }}
                      title={c.label}
                    />
                  ))}
                </div>
                {form.colors.length > 0 && (
                  <p className="text-smoke text-xs mt-2 font-body">
                    Sélectionnées : <span style={{ color: 'var(--color-gold-light)' }}>{form.colors.join(' & ')}</span>
                  </p>
                )}
              </div>

              {/* Board type */}
              <div>
                <label className="label-luxury">Type de plateau</label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {[
                    { id: 'pieces',  label: 'Pièces seules', sub: 'dès 30€' },
                    { id: 'classic', label: 'Classique',     sub: '75€ base' },
                    { id: 'premium', label: 'Premium',       sub: '145€ base' },
                  ].map((b) => (
                    <button type="button" key={b.id}
                      onClick={() => setForm({ ...form, boardType: b.id })}
                      className="p-3 text-center transition-all duration-200 text-left"
                      style={{
                        border: form.boardType === b.id ? '1px solid rgba(201,168,76,0.6)' : '1px solid rgba(201,168,76,0.15)',
                        background: form.boardType === b.id ? 'rgba(201,168,76,0.05)' : 'rgba(255,255,255,0.02)',
                      }}>
                      <div className="text-ivory text-xs font-body font-500">{b.label}</div>
                      <div className="text-smoke text-[10px] font-body">{b.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="label-luxury">Détails supplémentaires</label>
                <textarea className="input-luxury resize-none" rows={4}
                  placeholder="Occasion, délai souhaité, détails spéciaux…"
                  value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} />
              </div>

              <button type="submit" disabled={loading} className="btn-primary py-4 px-8"
                style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', opacity: loading ? 0.7 : 1 }}>
                {loading ? (
                  <><span className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'rgba(10,10,10,0.3)', borderTopColor: '#0A0A0A' }} /> Envoi…</>
                ) : (
                  <><Send size={14} strokeWidth={2} /> Envoyer ma demande</>
                )}
              </button>
              <p className="text-smoke text-xs font-body">Réponse sous 48h · Devis gratuit · Sans engagement</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
