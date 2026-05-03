# ♟ Chess The World – Site E-commerce Premium

> Jeux d'échecs où chaque pièce est un monument iconique. Fabriqué en France. Livraison internationale.

## 🚀 Démarrage rapide

### 1. Prérequis
- **Node.js** ≥ 18.x
- **npm** (inclus avec Node.js)
- Un compte **Stripe** (gratuit pour tester)

### 2. Installation

```bash
cd chess-the-world
npm install
cp .env.local.example .env.local
```

### 3. Configuration Stripe

1. Créez un compte sur [stripe.com](https://stripe.com)
2. Allez dans **Developers → API Keys**
3. Renseignez vos clés dans `.env.local` :

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Lancer le projet

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Structure

```
chess-the-world/
├── app/
│   ├── layout.js                  # Layout global
│   ├── page.js                    # Accueil
│   ├── globals.css                # Styles + variables CSS luxury
│   ├── products/
│   │   ├── page.js                # Catalogue complet
│   │   └── [city]/page.js         # Fiche produit par ville
│   ├── cart/
│   │   ├── page.js                # Panier + paiement
│   │   └── success/page.js        # Confirmation commande
│   ├── about/page.js              # L'atelier & fabrication
│   ├── contact/page.js            # Formulaire contact
│   ├── special-order/page.js      # Demande personnalisée
│   └── api/
│       ├── checkout/route.js      # Stripe Checkout Session
│       ├── contact/route.js       # Envoi messages
│       └── webhook/route.js       # Stripe webhooks
├── components/
│   ├── Header.js                  # Navigation luxe
│   ├── Footer.js                  # Pied de page
│   ├── CartDrawer.js              # Tiroir panier latéral
│   ├── ProductCard.js             # Carte produit
│   ├── ColorPicker.js             # Sélecteur couleurs
│   └── ChessBoardPreview.js       # Visualisation plateau live
├── lib/
│   ├── products.js                # ← Données catalogue (villes, prix)
│   ├── cartStore.js               # State panier (Zustand)
│   └── stripe.js                  # Config Stripe serveur
└── .env.local.example
```

---

## 🌍 Pages du site

| URL | Description |
|-----|-------------|
| `/` | Accueil premium avec hero, collections, avis |
| `/products` | Catalogue : 3 villes × 2 gammes |
| `/products/paris` | Fiche Paris + configurateur couleurs |
| `/products/londres` | Fiche Londres + configurateur couleurs |
| `/products/le-puy-en-velay` | Fiche Le Puy + configurateur couleurs |
| `/cart` | Panier + paiement Stripe |
| `/cart/success` | Confirmation après paiement |
| `/about` | L'atelier, process, machines |
| `/special-order` | Formulaire demande sur mesure |
| `/contact` | Formulaire + coordonnées |

---

## 💳 Intégration Stripe

**Flow complet :**
1. Utilisateur clique "Commander" dans `/cart`
2. `POST /api/checkout` → crée une Stripe Checkout Session
3. Redirection vers la page Stripe hébergée (SSL, sécurisée)
4. Après paiement → `/cart/success`
5. Webhook `/api/webhook` reçoit la confirmation et peut déclencher email/BDD

**Webhook en local (test) :**
```bash
npm install -g stripe
stripe listen --forward-to localhost:3000/api/webhook
# Copier le secret affiché dans STRIPE_WEBHOOK_SECRET
```

---

## 🎨 Personnalisation

### Ajouter une ville (`lib/products.js`)
```js
{
  id: 'rome',
  name: 'Rome',
  country: 'Italie',
  flag: '🇮🇹',
  tagline: 'La Città Eterna en 32 pièces',
  description: '...',
  story: '...',
  pieces: [
    { role: 'Roi',      name: 'Colisée',           symbol: '♚', count: 1, description: '...' },
    { role: 'Reine',    name: 'Fontaine de Trevi',  symbol: '♛', count: 1, description: '...' },
    { role: 'Fou',      name: 'Panthéon',           symbol: '♝', count: 2, description: '...' },
    { role: 'Cavalier', name: 'Véspa',              symbol: '♞', count: 2, description: '...' },
    { role: 'Tour',     name: "Château Sant'Angelo", symbol: '♜', count: 2, description: '...' },
    { role: 'Pions',    name: 'Pizza',              symbol: '♟', count: 8, description: '...' },
  ],
}
```

### Modifier les prix (`lib/products.js`)
Ajuster `price` et `originalPrice` dans le tableau `MODELS`.

---

## 🚀 Déploiement Vercel (recommandé)

```bash
npm i -g vercel
vercel

# Dans le dashboard Vercel → Environment Variables :
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_...
# STRIPE_SECRET_KEY = sk_live_...
# STRIPE_WEBHOOK_SECRET = whsec_...
# NEXT_PUBLIC_APP_URL = https://votre-domaine.vercel.app
```

Compatible aussi : Netlify, Railway, Render, AWS Amplify.

---

## 📧 Activer les emails de contact

Dans `app/api/contact/route.js`, décommentez le bloc **Resend** et configurez :
```env
RESEND_API_KEY=re_...
CONTACT_EMAIL=chesstheworld@gmail.com
```

---

## 📞 Contact

- **Email** : chesstheworld@gmail.com
- **Téléphone** : +33 6 41 37 85 05

---

*Chess The World © 2025 — Tous droits réservés*
