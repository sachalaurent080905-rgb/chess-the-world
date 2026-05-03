'use client';

import { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/cartStore';

export default function SuccessPage() {
  return (
    <Suspense fallback={<SuccessFallback />}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessFallback() {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div style={{ color: 'var(--color-gold)', fontSize: '3rem' }}>♛</div>
    </div>
  );
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCartStore();

  useEffect(() => {
    if (sessionId) clearCart();
  }, [sessionId, clearCart]);

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">
        {/* Checkmark */}
        <div
          className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full"
          style={{
            background: 'rgba(110,181,120,0.1)',
            border: '1px solid rgba(110,181,120,0.3)',
          }}
        >
          <CheckCircle size={36} strokeWidth={1.5} style={{ color: '#6EB578' }} />
        </div>

        {/* Gold divider */}
        <div className="divider-gold mx-auto mb-6" />

        <div className="section-label justify-center mb-4">
          <span />
          Commande confirmée
          <span />
        </div>

        <h1
          className="font-display text-ivory mb-4"
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: 300,
          }}
        >
          Merci pour votre commande !
        </h1>

        <p className="text-smoke font-body text-base mb-8 leading-relaxed">
          Votre échiquier Chess The World est désormais en cours de fabrication.
          Vous recevrez un email de confirmation avec le suivi de votre commande.
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {[
            {
              icon: <Mail size={18} strokeWidth={1.5} />,
              title: 'Email de confirmation',
              desc: 'Dans quelques minutes dans votre boîte mail',
            },
            {
              icon: <Package size={18} strokeWidth={1.5} />,
              title: 'Fabrication en cours',
              desc: 'Votre échiquier est fabriqué avec soin sous 48h',
            },
            {
              icon: <ArrowRight size={18} strokeWidth={1.5} />,
              title: 'Expédition',
              desc: 'Livraison internationale sous 5 à 10 jours ouvrés',
            },
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 text-left"
              style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'rgba(201,168,76,0.02)' }}
            >
              <span style={{ color: 'var(--color-gold)', flexShrink: 0 }}>{step.icon}</span>
              <div>
                <div className="text-ivory text-sm font-body" style={{ fontWeight: 500 }}>
                  {step.title}
                </div>
                <div className="text-smoke text-xs font-body">{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className="btn-primary">
            Voir d'autres collections
          </Link>
          <Link href="/" className="btn-outline">
            Retour à l'accueil
          </Link>
        </div>

        <p className="text-smoke/50 text-xs mt-8 font-body">
          Une question ? Contactez-nous :{' '}
          <a href="mailto:chesstheworld.contact@gmail.com" className="hover:text-gold transition-colors">
            chesstheworld.contact@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
