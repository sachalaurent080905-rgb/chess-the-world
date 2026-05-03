import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: "L'Atelier – Chess The World",
  description: "Découvrez le processus de fabrication de nos échiquiers premium : modélisation 3D, impression Bambulab P1S, gravure laser xTool.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <div className="relative py-24 px-6 overflow-hidden" style={{ borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="chess-pattern absolute inset-0 opacity-20" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.06), transparent 60%)' }} />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="section-label justify-center mb-6"><span />L'Atelier<span /></div>
          <h1 className="font-display text-ivory mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 7vw, 6rem)', fontWeight: 300, lineHeight: 0.95 }}>
            De l'idée<br /><span className="italic" style={{ color: 'var(--color-gold-light)' }}>à la pièce</span>
          </h1>
          <div className="divider-gold" />
          <p className="text-smoke text-base font-body leading-relaxed max-w-xl mx-auto">
            Chess The World est né d'une passion double : l'amour des échecs et la fascination pour l'architecture mondiale. Chaque échiquier est une œuvre d'artisan, fabriqué avec soin en France.
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="section-label mb-4"><span />Notre vision<span /></div>
            <h2 className="font-display text-ivory mb-6" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>
              Transformer les monuments en pièces d'art
            </h2>
            <p className="text-smoke text-sm font-body leading-relaxed mb-4">
              Nous croyons que les jeux de stratégie méritent d'être beaux. Chess The World fusionne la culture architecturale mondiale avec la noblesse des échecs pour créer des objets uniques, porteurs d'histoire et d'émotion.
            </p>
            <p className="text-smoke text-sm font-body leading-relaxed">
              Chaque ville que nous sélectionnons est choisie pour sa richesse patrimoniale et sa capacité à raconter une histoire à travers six pièces distinctes. De la Tour Eiffel au Roi de Polignac, chaque monument devient un personnage de jeu.
            </p>
          </div>
          <div className="relative">
            <div className="relative h-72 flex items-center justify-center border-gold-subtle overflow-hidden"
              style={{ background: 'linear-gradient(145deg, #141414, #0e0e0e)' }}>
              <div className="chess-pattern absolute inset-0 opacity-50" />
              <div className="relative z-10 text-center">
                <div className="text-8xl mb-2" style={{ color: 'var(--color-gold)', opacity: 0.6, animation: 'float 4s ease-in-out infinite' }}>♛</div>
                <p className="text-smoke text-xs tracking-widest uppercase font-body">Fabriqué en France</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 px-6" style={{ background: 'rgba(201,168,76,0.02)', borderTop: '1px solid rgba(201,168,76,0.08)', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="section-label justify-center mb-4"><span />Processus de fabrication<span /></div>
            <h2 className="font-display text-ivory" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 300 }}>
              4 étapes d'excellence
            </h2>
          </div>
          <div className="space-y-12">
            {[
              {
                num: '01', icon: '🖥️',
                title: 'Modélisation 3D',
                desc: 'Tout commence par une étude architecturale approfondie du monument. Nous analysons ses proportions, ses détails caractéristiques, et les éléments qui le rendent immédiatement reconnaissable. La modélisation est réalisée dans Blender ou Fusion 360, avec une attention particulière portée aux ombres et volumes qui donneront vie à la pièce une fois imprimée.',
                detail: 'Logiciels : Blender 3D, Fusion 360, Bambustudio',
              },
              {
                num: '02', icon: '🖨️',
                title: 'Impression 3D – Bambulab P1S',
                desc: "Chaque pièce est imprimée sur notre Bambulab P1S, l'une des meilleures imprimantes 3D FDM du marché. Nous utilisons du PETG haute qualité, un matériau qui offre une excellente résistance aux chocs, une belle translucidité et une finition lisse. Les paramètres d'impression sont optimisés pour chaque modèle : hauteur de couche 0.1mm pour les détails fins, supports intelligents pour les surplombs complexes.",
                detail: 'Matériau : PETG premium · Résolution : 0.1mm · Durée : 4-8h/pièce',
              },
              {
                num: '03', icon: '🪵',
                title: 'Gravure Laser – xTool',
                desc: "Le plateau Premium est fabriqué à partir d'un panneau de bois massif (hêtre ou noyer selon disponibilité) gravé au laser xTool avec une précision de 0.05mm. Le motif de l'échiquier est gravé à la perfection, puis le bois reçoit deux couches de vernis satiné anti-UV pour protéger et embellir la gravure. Le résultat est un plateau qui se bonifie avec le temps.",
                detail: 'Machine : xTool D1 Pro · Précision : 0.05mm · Finition : vernis satiné UV',
              },
              {
                num: '04', icon: '📦',
                title: 'Contrôle Qualité & Emballage',
                desc: "Chaque pièce est examinée à la loupe avant conditionnement. Les finitions sont vérifiées, les éventuels artefacts d'impression retirés manuellement. L'échiquier Classique est emballé dans une boîte rigide recyclable avec papier de soie. L'échiquier Premium est présenté dans un coffret velours noir avec certificat d'authenticité gravé et numéroté.",
                detail: 'Délai fabrication : 3-5 jours ouvrés · Emballage cadeau disponible',
              },
            ].map((step, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 items-start">
                <div className="flex items-start gap-6">
                  <div>
                    <span className="font-display text-5xl" style={{ fontFamily: 'var(--font-cormorant)', color: 'rgba(201,168,76,0.2)', fontWeight: 300 }}>{step.num}</span>
                  </div>
                  <span className="text-4xl mt-1">{step.icon}</span>
                </div>
                <div className="border-l-2 pl-8" style={{ borderColor: 'rgba(201,168,76,0.2)' }}>
                  <h3 className="font-display text-2xl text-ivory mb-3" style={{ fontFamily: 'var(--font-cormorant)' }}>{step.title}</h3>
                  <p className="text-smoke text-sm font-body leading-relaxed mb-3">{step.desc}</p>
                  <p className="text-xs font-body tracking-wide" style={{ color: 'var(--color-gold)', opacity: 0.7 }}>✦ {step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="section-label justify-center mb-4"><span />Notre matériel<span /></div>
          <h2 className="font-display text-ivory" style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>
            Des outils de précision
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Bambulab P1S', role: 'Impression 3D', desc: 'Imprimante FDM haute performance avec chambre fermée, idéale pour le PETG. Précision 0.1mm, AMS multi-filaments.', icon: '🖨️' },
            { name: 'xTool D1 Pro', role: 'Gravure Laser', desc: 'Laser 10W pour gravure bois ultra-précise. Connexion WiFi, logiciel intuitif xTool Creative Space.', icon: '⚡' },
            { name: 'PETG Premium', role: 'Filament', desc: "Polyéthylène téréphtalate glycolisé. Résistant, légèrement flexible, belle finition. Température d'impression : 230°C.", icon: '🧵' },
          ].map((eq) => (
            <div key={eq.name} className="card-luxury p-6">
              <span className="text-3xl mb-4 block">{eq.icon}</span>
              <div className="section-label text-[9px] mb-2"><span style={{ width: '15px', display: 'inline-block', height: '1px', background: 'var(--color-gold)', marginRight: '6px', verticalAlign: 'middle' }} />{eq.role}</div>
              <h3 className="font-display text-xl text-ivory mb-2" style={{ fontFamily: 'var(--font-cormorant)' }}>{eq.name}</h3>
              <p className="text-smoke text-sm font-body leading-relaxed">{eq.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-3xl text-ivory mb-4" style={{ fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>
            Prêt à jouer le monde ?
          </h2>
          <p className="text-smoke text-sm font-body mb-8">Découvrez nos collections et choisissez votre échiquier unique.</p>
          <Link href="/products" className="btn-primary">
            Voir les collections <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}
