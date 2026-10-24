export type PriceTier = '$$' | '$$$' | '$$$$';

export interface MenuItem {
  course: string;
  dish: string;
  winePairing: string;
  price: number;
}

export interface SeatingArea {
  id: string;
  name: string;
  description: string;
  atmosphere: string;
}

export interface TimeSlot {
  time: string;
  type: 'Lunch' | 'Dinner' | 'Chef Tasting';
  seatsLeft: number;
}

export interface Venue {
  id: string;
  name: string;
  tagline: string;
  neighborhood: string;
  city: string;
  cuisine: string;
  priceTier: PriceTier;
  rating: number;
  reviewCount: number;
  criticNote: string;
  guideAward?: string;
  heroImage: string;
  secondaryImages: string[];
  signatureDish: string;
  chef: {
    name: string;
    title: string;
    bio: string;
  };
  description: string;
  availableSlots: TimeSlot[];
  seatingAreas: SeatingArea[];
  sampleMenu: MenuItem[];
  corkagePolicy: string;
  address: string;
  openingHours: string;
  tags: string[];
}

export interface Booking {
  id: string;
  venueId: string;
  venueName: string;
  venueImage: string;
  venueNeighborhood: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  dietaryNotes?: string;
  occasion?: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Article {
  id: string;
  issueNumber: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
  };
  coverImage: string;
  excerpt: string;
  contentParagraphs: string[];
  pullQuote: string;
  pairedVenueId: string;
  category: string;
}

export interface CriticNoteItem {
  id: string;
  author: string;
  authorRole: string;
  venueName: string;
  venueId: string;
  rating: string;
  quote: string;
  date: string;
}

export interface NeighborhoodGuide {
  id: string;
  name: string;
  city: string;
  tagline: string;
  venueCount: number;
  image: string;
  vibe: string;
}
