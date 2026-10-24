import { Article, CriticNoteItem, NeighborhoodGuide } from '../types';

export const FEATURED_ARTICLE: Article = {
  id: 'autumn-hearth-circuit',
  issueNumber: 'ISSUE NO. 14 · AUTUMN 2026',
  title: 'The Hearth & The Vine: Where Wood-Fired Fire Meets Low-Intervention Cellars',
  subtitle: 'From Catalan embers in Barcelona to Paris cellars, a new vanguard of chefs is casting aside gas burners for holm oak coals and wild fermentations.',
  readTime: '6 min read',
  date: 'October 2026',
  author: {
    name: 'Elena Vane',
    role: 'Editor-in-Chief & Gastronomic Critic',
  },
  coverImage: '/src/assets/images/culinary_hero_hearth_1792839864518.jpg',
  excerpt: 'There is an intoxicating quiet in a kitchen fueled strictly by fire. Before the clock strikes noon at Asador Malva in Barcelona, the sound is not the hum of convection fans, but the crackle of split oak logs collapsing into scarlet embers.',
  contentParagraphs: [
    'There is an intoxicating quiet in a kitchen fueled strictly by fire. Before the clock strikes noon at Asador Malva in Barcelona, the sound is not the hum of convection fans, but the crackle of split oak logs collapsing into scarlet embers. Chefs Pau Serrat and Mercè Bofill work in silent synchronicity, testing heat gradients not with digital probe thermometers, but with the flat of their palms held six inches above the iron grates.',
    '"Fire forces humility upon the cook," Bofill explains as she brushes wild coastal turbot with an aged Jerez vinegar emulsion. "You cannot force a flame to yield to your schedule. You adapt to the wood, the moisture in the sea air, the density of the coal. It strips modern culinary pretension to its barest bones."',
    'Across Western Europe, this renaissance of primitive technique is converging with an equally radical philosophy in the wine glass: low-intervention, zero-sulfur viticulture. Where heavy oak barrels once matched heavy saucepans, today\'s hearth cookery demands wines of piercing mineral vitality. In Saint-Germain, Camille Delarue at L\'Ambre & Sel demonstrates this counterpoint daily, marrying the saline snap of raw Atlantic bivalves with the oxidative majesty of Jura Savagnin.',
    'Dining in these rooms is less an exercise in luxury status and more an immersion in temporal craft. The meal moves at the pace of coals burning down to ash, each course a testament to patience, smoke, and soil.',
  ],
  pullQuote: '"You cannot force a flame to yield to your schedule. You adapt to the wood, the humidity of the evening, and the density of the coal."',
  pairedVenueId: 'asador-malva',
  category: 'Cover Story',
};

export const EDITORIAL_ARTICLES: Article[] = [
  FEATURED_ARTICLE,
  {
    id: 'the-counter-sanctuary',
    issueNumber: 'ESSAY · ISSUE NO. 14',
    title: 'The Intimacy of the Counter: Why the Best Meals Happen Six Inches from the Fire',
    subtitle: 'How chiseled cedar counters and direct chef dialogue became the antidote to alienated luxury dining.',
    readTime: '4 min read',
    date: 'October 2026',
    author: {
      name: 'Kenzo Moriyama',
      role: 'Culinary Anthropologist',
    },
    coverImage: '/src/assets/images/chef_plating_hearth_1792839865519.jpg',
    excerpt: 'To sit at a counter is to relinquish the passive theater of dining. You smell the fat dripping into the binchotan, you hear the sharp snip of herb shears, and you share an unspoken complicity with the person feeding you.',
    contentParagraphs: [
      'To sit at a counter is to relinquish the passive theater of dining. In traditional white-tablecloth rooms, the kitchen is an unseen engine room, kept sequestered behind heavy swinging doors. The diner receives polished outcomes without bearing witness to the effort.',
      'At venues like Kurogane in Soho or Ceniza in Rome, the boundary dissolves completely. You smell the fat dripping into white charcoal; you hear the crisp snap of wild juniper twigs; you watch the tension in the chef\'s shoulders ease as a delicate course finds its balance.',
      'This proximity changes how food tastes. Dining becomes relational. You don\'t merely consume a dish; you participate in its emergence.',
    ],
    pullQuote: '"Dining becomes relational. You don\'t merely consume a dish; you participate in its immediate emergence."',
    pairedVenueId: 'kurogane-hearth',
    category: 'Gastronomic Culture',
  },
  {
    id: 'saffron-and-figs',
    issueNumber: 'DISPATCH · ISSUE NO. 14',
    title: 'The Sweet Discipline: Saffron, Wild Honey & Roasted Autumn Figs',
    subtitle: 'Pastry chefs are abandoning cloying sugars in favor of earthen herbs, sheep milk curds, and harvested spices.',
    readTime: '5 min read',
    date: 'October 2026',
    author: {
      name: 'Béatrice Morel',
      role: 'Pastry & Terroir Critic',
    },
    coverImage: '/src/assets/images/dessert_saffron_tart_1792839865736.jpg',
    excerpt: 'A great dessert does not end a meal with a sugar spike; it prolongs the savory reverie. In contemporary editorial kitchens, fruit is charred over coals and saffron is treated not as ornament, but as a bridge to spice and earth.',
    contentParagraphs: [
      'A great dessert does not end a meal with a sugar spike; it prolongs the savory reverie. In contemporary editorial kitchens, fruit is charred over coals and saffron is treated not as ornament, but as a bridge to spice and earth.',
      'When you taste a tartlet whose crust is folded with toasted stone-ground spelt, filled with saffron-infused sheep mascarpone and topped with figs roasted until their skins blister, the palate recognizes something ancient. It tastes of autumn orchards in the Mediterranean.',
    ],
    pullQuote: '"A memorable dessert does not break from the savory narrative; it deepens the memory of smoke and terroir."',
    pairedVenueId: 'fonda-solera',
    category: 'Field Notes',
  },
];

export const CRITIC_NOTES: CriticNoteItem[] = [
  {
    id: 'cn-1',
    author: 'Elena Vane',
    authorRole: 'Editor-in-Chief',
    venueName: 'Asador Malva',
    venueId: 'asador-malva',
    rating: '98/100',
    quote: 'The whole roasted turbot with aged Jerez reduction is among the five finest seafood courses in Europe this year. Uncompromising wood cookery.',
    date: '2 days ago',
  },
  {
    id: 'cn-2',
    author: 'Jean-Luc Moreau',
    authorRole: 'Senior Wine Writer',
    venueName: 'L\'Ambre & Sel',
    venueId: 'l-ambre-et-sel',
    rating: '96/100',
    quote: 'Delarue\'s scallop crudo with blood orange is pure optical and sensory poetry. The Jura wine pairing from Ganevat was revelatory.',
    date: 'Last week',
  },
  {
    id: 'cn-3',
    author: 'Silvia Moretti',
    authorRole: 'Italian Gastronomy Correspondent',
    venueName: 'Ceniza & Terracota',
    venueId: 'ceniza-terracota',
    rating: '99/100',
    quote: 'Ten chiseled stone seats, olive-wood coals, and Apennine venison. Matteo Berti has created Rome\'s most poignant culinary temple.',
    date: 'October 18',
  },
];

export const NEIGHBORHOOD_GUIDES: NeighborhoodGuide[] = [
  {
    id: 'eixample-barcelona',
    name: 'Eixample & Gràcia',
    city: 'Barcelona',
    tagline: 'Modernist archways, vermut cellars & artisan wood embers',
    venueCount: 14,
    image: '/src/assets/images/culinary_hero_hearth_1792839864518.jpg',
    vibe: 'Sun-warmed terraces, architectural courtyards, late-evening dining',
  },
  {
    id: 'saint-germain-paris',
    name: 'Saint-Germain & Odéon',
    city: 'Paris',
    tagline: 'Pewter oyster counters, low-sulfur Jura bottles & literary salons',
    venueCount: 18,
    image: '/src/assets/images/tasting_dish_crudo_1792839864654.jpg',
    vibe: 'Refined intimacy, historic flagstones, candlelit conversation',
  },
  {
    id: 'trastevere-rome',
    name: 'Trastevere & Gianicolo',
    city: 'Rome',
    tagline: 'Monastic stone walls, wild herb foraging & Roman amphoras',
    venueCount: 9,
    image: '/src/assets/images/chef_plating_hearth_1792839865519.jpg',
    vibe: 'Ancient cobblestones, vine-draped alleys, intense terroir focus',
  },
  {
    id: 'soho-london',
    name: 'Soho & Fitzrovia',
    city: 'London',
    tagline: 'Cedar counter yakitori, grower champagnes & secret basements',
    venueCount: 22,
    image: '/src/assets/images/wine_bistro_interior_1792839865684.jpg',
    vibe: 'Kinetic urban energy, hidden doors, precision craftsmanship',
  },
];
