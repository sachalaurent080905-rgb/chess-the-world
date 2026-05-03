# Changelog – v4

## ✨ Nouveautés v4

### ❌ Suppression du modèle Magnétique
Le modèle Magnétique a été retiré (trop complexe à produire).

### ❌ Suppression de l'option acrylique sur Premium
Le Premium est désormais en **bois uniquement** — plus de choix bois/acrylique.

### ➕ Nouvelle gamme : Pièces seules
Pour ceux qui possèdent déjà un échiquier ou souhaitent une collection de pièces uniques. Au choix dans la fiche produit :
- **Pièces 3D légères** — 30 € (PETG haute qualité, idéales voyage)
- **Pièces 3D lourdes premium** — 45 € (lestage interne, sensation premium)

### 🪵 Nouvelles descriptions et dimensions
- **Échiquier Classique** : plateau en **bois brut gravé à la main et verni**, dimensions **30 × 30 cm**, 75 €
- **Échiquier Premium** : plateau en **bois d'acajou et sycomore**, dimensions **36 × 36 cm**, 145 €

### 🎨 Configurateur de couleurs (rappel)
Le configurateur s'applique désormais **uniquement aux pièces** sur tous les modèles. Les plateaux étant en bois (Classique/Premium) ou inexistants (Pièces seules), ils ne sont jamais colorés. Le toggle "Plateau N&B classique" a été retiré.

Un bandeau d'info l'explique sur les modèles avec plateau :
> *« Les couleurs choisies s'appliquent uniquement aux pièces. Le plateau est livré avec son rendu bois naturel. »*

## 📝 Récap complet des 3 gammes

| Gamme        | Prix (lancement)           | Plateau                                       | Dimensions   | Pièces                              |
|--------------|----------------------------|-----------------------------------------------|--------------|-------------------------------------|
| Pièces seules| dès 30€ (~~39€~~)          | —                                             | —            | 3D légères ou lourdes premium       |
| Classique    | 75€ (~~99€~~)              | Bois brut gravé à la main, vernis satiné      | 30 × 30 cm   | 3D PETG légères                     |
| Premium      | 145€ (~~179€~~)            | Bois d'acajou et sycomore, gravure laser      | 36 × 36 cm   | 3D PETG lourdes premium             |

Toutes les gammes : **10 couleurs** au choix × 2 joueurs pour les pièces.

## 🔧 Fichiers modifiés

- `lib/products.js` — gammes refaites, export `PIECES_VARIANTS`, removal de `PREMIUM_MATERIALS`
- `app/products/[city]/page.js` — selecteur variantes pour Pièces seules, suppression toggle N&B et choix bois/acrylique, info plateau bois naturel
- `app/products/page.js` — tableau comparatif refait avec les 3 nouvelles colonnes
- `app/page.js` — CTA `'Commander les pièces'` à la place de magnétique
- `app/special-order/page.js` — options du formulaire mises à jour

## ✅ Build validé (Next 16.2.4 + Turbopack)

```
Route (app)
┌ ○ /                    static
├ ○ /_not-found
├ ○ /about
├ ƒ /api/checkout
├ ƒ /api/contact
├ ƒ /api/webhook
├ ○ /cart
├ ○ /cart/success
├ ○ /products
├ ƒ /products/[city]
└ ○ /special-order
```

Tous les tests runtime passent. Plus aucune référence à "Magnétique" ou "Acrylique" dans les chunks JS.

## 🚀 Déploiement

```bash
unzip chess-the-world.zip && cd chess-the-world
npm install --legacy-peer-deps   # requis avec Next 16 + eslint-config-next 16
cp .env.local.example .env.local # → renseigne tes clés Stripe
npm run build && npm start
```
