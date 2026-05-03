import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from 'react-hot-toast';

// Les polices (Cormorant Garamond + DM Sans) sont chargées via @import dans globals.css
// pour éviter la dépendance réseau au moment du build (compatible Vercel et environnements offline).

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://chesstheworld.fr'),
  title: 'Chess The World – Play the Greatest Cities',
  description:
    "Jeux d'échecs uniques où chaque pièce représente un monument iconique de Paris, Londres, Le Puy-en-Velay et Barcelone. Impression 3D premium, gravure bois laser. Éditions limitées.",
  keywords:
    "jeu d'échecs, échecs, chess, monument, Paris, Londres, Le Puy-en-Velay, Barcelone, impression 3D, cadeau, luxe, premium",
  authors: [{ name: 'Chess The World' }],
  openGraph: {
    title: 'Chess The World – Play the Greatest Cities',
    description:
      "Des jeux d'échecs premium où vos villes favorites deviennent des pièces sculptées.",
    type: 'website',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Chess The World – Jeux d'échecs premium",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chess The World – Play the Greatest Cities',
    description: "Jeux d'échecs premium – monuments iconiques sculptés en 3D",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-obsidian text-ivory">
        {/* Grain overlay for luxury texture */}
        <div
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.04,
          }}
        />

        <Header />
        <CartDrawer />
        <main>{children}</main>
        <Footer />

        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'toast-luxury',
            style: {
              background: '#1C1C1C',
              color: '#F5F5F0',
              border: '1px solid rgba(201,168,76,0.3)',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '0.875rem',
            },
            success: {
              iconTheme: {
                primary: '#C9A84C',
                secondary: '#0A0A0A',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
