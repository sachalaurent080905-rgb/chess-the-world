// ─── Chess The World – Product Catalog ───────────────────────────────────────

export const PIECE_COLORS = [
  { id: 'black',        label: 'Noir',           hex: '#1A1A1A' },
  { id: 'white',        label: 'Blanc',          hex: '#F5F5F0' },
  { id: 'grey',         label: 'Gris',           hex: '#808080' },
  { id: 'gold',         label: 'Or',             hex: '#C9A84C' },
  { id: 'brown',        label: 'Marron clair',   hex: '#9B6241' },
];

// Sous-variantes pour la gamme "Pièces seules"
export const PIECES_VARIANTS = [
  {
    id: 'light',
    label: 'Pièces 3D légères',
    description: 'Pièces imprimées en 3D PETG. Légères, idéales pour le voyage.',
    icon: '\uD83C\uDFB2',
    price: 30,
    originalPrice: 39,
  },
  {
    id: 'heavy',
    label: 'Pièces 3D lourdes premium',
    description: 'Pièces imprimées en 3D avec lestage interne. Sensation premium en main.',
    icon: '\uD83D\uDC51',
    price: 40,
    originalPrice: 55,
  },
];

export const MODELS = [
  {
    id: 'pieces-only',
    name: 'Pièces seules',
    subtitle: 'Sans plateau \u2014 32 pièces uniques',
    description:
      "Pour ceux qui possèdent déjà un échiquier ou souhaitent une collection de pièces uniques. Les 32 pièces de votre ville préférée, déclinées au choix en version légère ou lourde premium.",
    features: [
      '32 pièces sculptées 3D',
      'Au choix : version légère ou lourdes premium',
      'Compatible avec tout échiquier 30 \u00d7 30 cm ou plus',
      'Personnalisation des couleurs incluse',
      'Livraison internationale incluse',
    ],
    dimensions: 'Pièces uniquement \u2014 sans plateau (correspond à un taille 4; case 37,5mm; base pièce max : 30mm)',
    material: 'PETG haute qualité (léger ou lesté)',
    supportsColorConfig: true,        // Couleurs des pièces personnalisables
    supportsMaterialChoice: false,
    supportsPiecesVariant: true,      // Choix léger / lourdes
    originalPrice: 39,                // Min price (light)
    price: 30,
    badge: 'New',
    badgeType: 'gold',
    stock: 20,
  },
  {
    id: 'classic',
    name: 'Échiquier Classique',
    subtitle: 'Bois brut gravé à la main et verni \u2014 30 \u00d7 30 cm',
    description:
      "Un plateau en bois brut, gravé entièrement à la main et protégé par un vernis satiné. Chaque plateau est une pièce artisanale unique. Les 32 pièces sont imprimées en 3D PETG haute qualité.",
    features: [
      'Plateau bois brut gravé à la main',
      'Vernis satiné protection durable',
      'Dimensions : 30 \u00d7 30 cm',
      '32 pièces 3D PETG haute qualité',
      'Configurateur couleurs des pièces',
      'Livraison internationale incluse',
    ],
    dimensions: '30 \u00d7 30 cm',
    material: 'Bois brut gravé à la main, vernis satiné',
    supportsColorConfig: true,
    supportsMaterialChoice: false,
    supportsPiecesVariant: true,
    originalPrice: 89,
    price: 60,
    badge: 'Best Seller',
    badgeType: 'gold',
    stock: 12,
  },
  {
    id: 'premium',
    name: 'Échiquier Premium',
    subtitle: 'Plateau bois d\u2019acajou et sycomore \u2014 36 \u00d7 36 cm',
    description:
      "Notre pièce maîtresse. Plateau d\u2019exception en bois d\u2019acajou (cases sombres) et sycomore (cases claires). Pièces 3D lourdes premium. Une œuvre à poser sur votre bureau.",
    features: [
      'Plateau bois acajou et sycomore',
      'Dimensions : 36 \u00d7 36 cm',
      'Pièces 3D lourdes \u2014 finition premium',
      'Coffret en velours noir',
      "Certificat d\u2019authenticité gravé",
      'Numérotation Limited Edition',
    ],
    dimensions: '36 \u00d7 36 cm',
    material: 'Bois d\u2019acajou et sycomore',
    supportsColorConfig: true,
    supportsMaterialChoice: false,    // Plus d'option acrylique
    supportsPiecesVariant: false,
    originalPrice: 149,
    price: 110,
    badge: 'Limited Edition',
    badgeType: 'limited',
    stock: 5,
  },
];

export const CITIES = [
  {
    id: 'le-puy-en-velay',
    name: 'Le Puy-en-Velay',
    country: 'France',
    flag: '\uD83C\uDDEB\uD83C\uDDF7',
    tagline: 'La cité des volcans et de la foi',
    description:
      "Perchée sur des rochers volcaniques millénaires, Le Puy-en-Velay est l\u2019une des villes les plus mystérieuses et spirituelles de France. Chaque pièce de cet échiquier rend hommage à ses monuments emblématiques, carrefour du chemin de Compostelle.",
    story:
      "L\u2019échiquier Le Puy-en-Velay est né d\u2019un amour profond pour cette ville médiévale unique au monde. Chaque pièce est une miniature architecturale qui capture l\u2019âme d\u2019un lieu chargé d\u2019histoire, de foi et de volcanisme.",
    accentColor: '#8B6914',
    image: '/cities/le-puy-en-velay.png',
    gallery: [
      '/cities/le-puy-en-velay/1.png', '/cities/le-puy-en-velay/2.png', '/cities/le-puy-en-velay/3.png',
      '/cities/le-puy-en-velay/4.png',
    ],
    pieces: [
      { role: 'Roi',      name: 'Saint Joseph',           description: 'La monumentale statue dominant la ville', symbol: '\u265A', count: 1 },
      { role: 'Reine',    name: 'Vierge du Puy',          description: 'La Vierge vénérée depuis le Moyen Âge', symbol: '\u265B', count: 1 },
      { role: 'Fou',      name: 'Cathédrale Notre-Dame du Puy',    description: "La cathédrale avec sa façade mythique et son entrée par le coeur", symbol: '\u265D', count: 2 },
      { role: 'Cavalier', name: 'Rocher Saint-Michel',               description: 'L\u2019aiguille volcanique coiffée de sa chapelle', symbol: '\u265E', count: 2 },
      { role: 'Tour',     name: 'Château de Polignac',    description: 'La forteresse médiévale sur son piton rocheux', symbol: '\u265C', count: 2 },
      { role: 'Pions',    name: 'Coquille Saint-Jacques', description: "L\u2019emblème des pèlerins du monde entier", symbol: '\u265F', count: 8 },
    ],
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    flag: '\uD83C\uDDEB\uD83C\uDDF7',
    tagline: 'La Ville Lumière en 32 pièces',
    description:
      "Paris, capitale du monde, déclinée en chef-d\u2019œuvre de stratégie. De la Tour Eiffel à Notre-Dame, chaque monument emblématique prend vie sous forme de pièce d\u2019échecs, sculptée avec une précision architecturale.",
    story:
      "Paris méritait un hommage à la hauteur de son rayonnement. L\u2019échiquier Paris capture l\u2019essence de la Ville Lumière : ses monuments iconiques, son caractère unique, son art de vivre inégalé.",
    accentColor: '#1A3A5C',
    image: '/cities/paris.png',
    gallery: [
      '/cities/paris/1.png', '/cities/paris/2.png', '/cities/paris/3.png',
      '/cities/paris/4.png',,
    ],
    pieces: [
      { role: 'Roi',      name: 'Tour Eiffel',      description: 'La Dame de Fer, symbole universel de Paris', symbol: '\u265A', count: 1 },
      { role: 'Reine',    name: 'Notre-Dame',        description: 'La cathédrale gothique ressuscitée', symbol: '\u265B', count: 1 },
      { role: 'Fou',      name: 'Moulin Rouge',      description: "L\u2019emblème du Montmartre nocturne", symbol: '\u265D', count: 2 },
      { role: 'Cavalier', name: 'Colonne Morris',    description: "La colonne d\u2019affichage parisienne mythique", symbol: '\u265E', count: 2 },
      { role: 'Tour',     name: 'Arc de Triomphe',   description: "Le monument napoléonien au cœur de l\u2019étoile", symbol: '\u265C', count: 2 },
      { role: 'Pions',    name: 'Croissant',         description: "L\u2019icône gastronomique parisienne par excellence", symbol: '\u265F', count: 8 },
    ],
  },
  {
    id: 'londres',
    name: 'Londres',
    country: 'Royaume-Uni',
    flag: '\uD83C\uDDEC\uD83C\uDDE7',
    tagline: 'The British Empire on 64 squares',
    description:
      "Londres, ville de contrastes et de traditions séculaires. De Big Ben à Tower Bridge, l\u2019échiquier Londres capture la majesté et l\u2019excentricité britannique dans un ensemble architectural époustouflant.",
    story:
      "Conçu pour les amoureux de la culture britannique, l\u2019échiquier Londres mêle histoire royale et modernité iconique. Chaque pièce est une déclaration d\u2019amour à cette capitale qui réinvente continuellement son identité.",
    accentColor: '#1E3A5F',
    image: '/cities/londres.png',
    gallery: [
      '/cities/londres/1.png', '/cities/londres/2.png', '/cities/londres/3.png',
      '/cities/londres/4.png',
    ],
    pieces: [
      { role: 'Roi',      name: 'Big Ben',               description: "L\u2019horloge la plus célèbre du monde", symbol: '\u265A', count: 1 },
      { role: 'Reine',    name: 'Tower Bridge',           description: 'Le pont-levis gothique sur la Tamise', symbol: '\u265B', count: 1 },
      { role: 'Fou',      name: 'Bus londonien',          description: 'Le double-decker rouge, symbole de la ville', symbol: '\u265D', count: 2 },
      { role: 'Cavalier', name: 'London Eye',             description: 'La grande roue panoramique sur la Tamise', symbol: '\u265E', count: 2 },
      { role: 'Tour',     name: 'The Gherkin',            description: 'Le gratte-ciel cornichon de la City', symbol: '\u265C', count: 2 },
      { role: 'Pions',    name: 'Cabine téléphonique',    description: "L\u2019incontournable cabine rouge britannique", symbol: '\u265F', count: 8 },
    ],
  },
  {
    id: 'barcelone',
    name: 'Barcelone',
    country: 'Espagne',
    flag: '\uD83C\uDDEA\uD83C\uDDF8',
    tagline: 'La ville de Gaudí en 32 pièces',
    description:
      "Barcelone, capitale catalane vibrante, où l\u2019architecture moderniste de Gaudí côtoie la Méditerranée. Chaque pièce incarne un chef-d\u2019œuvre de cette ville passionnée, entre art, mer et patrimoine.",
    story:
      "L\u2019échiquier Barcelone rend hommage à l\u2019audace architecturale de la Catalogne. De la Sagrada Familia au Lézard de Gaudí, chaque pièce raconte une histoire de couleur, de courbes et de génie créatif.",
    accentColor: '#C1272D',
    image: '/cities/barcelone.png',
    gallery: [
      '/cities/barcelone/1.png', '/cities/barcelone/2.png', '/cities/barcelone/3.png',
      '/cities/barcelone/4.png',
    ],
    pieces: [
      { role: 'Roi',      name: 'Sagrada Familia',  description: "La basilique emblématique de Gaudí, œuvre d\u2019une vie", symbol: '\u265A', count: 1 },
      { role: 'Reine',    name: 'Casa Batlló',       description: 'La façade onirique du Passeig de Gràcia', symbol: '\u265B', count: 1 },
      { role: 'Fou',      name: 'Tour Christophe Colomb',       description: 'La statue de Christophe Colomb au bout des Ramblas', symbol: '\u265D', count: 2 },
      { role: 'Cavalier', name: 'Hôtel W',           description: 'La voile de verre sur la Barceloneta', symbol: '\u265E', count: 2 },
      { role: 'Tour',     name: 'Arc de Triomphe',   description: "L\u2019arc de brique rouge du Passeig de Lluís Companys", symbol: '\u265C', count: 2 },
      { role: 'Pions',    name: 'Salamandre en mozaïque',   description: 'Le célèbre dragon mosaïque du Parc Güell', symbol: '\u265F', count: 8 },
    ],
  },
];

export function getCityById(id) {
  return CITIES.find(c => c.id === id);
}

export function getModelById(id) {
  return MODELS.find(m => m.id === id);
}

export const TESTIMONIALS = [
  {
    name: 'Alexandre M.',
    location: 'Paris, France',
    rating: 5,
    text: "Un cadeau absolument sublime. L\u2019échiquier Paris Premium a émerveillé toute ma famille à Noël. La qualité des pièces est bluffante \u2014 on reconnaît immédiatement chaque monument.",
    product: 'Paris Premium',
    date: 'Décembre 2025',
  },
  {
    name: 'Emily T.',
    location: 'London, UK',
    rating: 5,
    text: 'Ordered the London Classic as a gift for my husband who is an avid chess player. He was completely speechless. The Big Ben king piece is breathtaking. Delivery was fast and packaging impeccable.',
    product: 'London Classic',
    date: 'January 2026',
  },
  {
    name: 'Isabelle R.',
    location: 'Le Puy-en-Velay',
    rating: 5,
    text: "Enfant de la ville, ce jeu d\u2019échecs m\u2019a émue aux larmes. Voir Saint-Joseph en roi et la coquille Saint-Jacques en pion\u2026 c\u2019est un chef-d\u2019œuvre ! Je l\u2019ai commandé en Premium et je ne regrette pas un seul centime.",
    product: 'Le Puy Premium',
    date: 'Mars 2026',
  },
  {
    name: 'Jules K.',
    location: 'Barceline, Espana',
    rating: 5,
    text: 'Pedí el ajedrez clásico de Barcelona y estoy encantado; es de alta calidad y fiel a los monumentos. Las piezas tienen un tamaño y una proporción perfectos en el tablero. Lo recomiendo.',
    product: 'Barcelone Classic',
    date: 'February 2026',
  },
];
