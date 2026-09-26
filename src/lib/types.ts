// Core TypeScript types for the travel blog

export interface Author {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  photo?: SanityImage;
  socialLinks?: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
}

/**
 * Structured quick-reference facts shown at the top of every trip article.
 * All fields optional — only show rows where the source article states a value.
 * This is the ONE authoritative source; FAQPage JSON-LD and the QuickFacts UI
 * both read from here.
 */
export interface QuickFacts {
  bestTime?: string;          // e.g. "June – September"
  durationDays?: number;      // total trip days
  budgetRange?: string;       // e.g. "₹25,000 – ₹40,000 per person"
  difficulty?: "Easy" | "Moderate" | "Hard" | "Extreme";
  nearestTown?: string;       // nearest town/city with services
  baseLocation?: string;      // typical starting point / base camp
  idealFor?: string;          // e.g. "Bikers, backpackers, photographers"
  permitsRequired?: string;   // "No" | "Yes — ILP required from Leh DC Office"
  altitude?: string;          // max altitude, e.g. "5,359 m (Khardung La)"
  roadCondition?: string;     // e.g. "Paved + gravel; 4WD recommended"
  mobileNetwork?: string;     // e.g. "BSNL only beyond Kaza"
}

export interface Activity {
  _key: string;
  time?: string;
  title: string;
  description?: string;
  location?: {
    name: string;
    lat: number;
    lng: number;
  };
  photos?: SanityImage[];
  cost?: number;
  currency?: string;
  notes?: string;
  type?: "transport" | "accommodation" | "food" | "activity" | "sightseeing";
}

export interface ItineraryDay {
  _key: string;
  dayNumber: number;
  title: string;
  date?: string;
  summary?: string;
  activities: Activity[];
  coverImage?: SanityImage;
}

export interface Trip {
  _id: string;
  title: string;
  slug: string;
  coverImage?: SanityImage;
  excerpt?: string;
  tags?: string[];
  country?: string;
  startDate?: string;
  endDate?: string;
  bestSuggestedMonth?: string;
  author?: Author;
  status: "draft" | "published";
  itinerary?: ItineraryDay[];
  gallery?: SanityImage[];
  body?: unknown; // Portable Text
  viewCount?: number;
  likes?: number;
  totalBudget?: number;
  currency?: string;
  tripType?: string;
  difficulty?: "Easy" | "Moderate" | "Hard";
  readingTime?: number;
  generationStatus?: "generating" | "complete" | "failed";
  /** Structured quick-reference metadata — single source of truth for QuickFacts box and FAQPage JSON-LD */
  quickFacts?: QuickFacts;
  _createdAt: string;
  _updatedAt: string;
}

export interface Comment {
  _id: string;
  trip: { _ref: string };
  authorName: string;
  email: string;
  body: string;
  createdAt: string;
  approved: boolean;
}

export interface ParsedItinerary {
  title: string;
  days: {
    dayNumber: number;
    title: string;
    activities: {
      time?: string;
      title: string;
      description?: string;
      notes?: string;
    }[];
  }[];
  rawHtml?: string;
}

export interface FilterState {
  tags: string[];
  sortBy: "date" | "views" | "title";
  query: string;
}

export type MapPin = {
  lat: number;
  lng: number;
  label: string;
  day?: number;
};

export interface HotelSuggestion {
  id: string;
  name: string;
  type: "hotel" | "homestay" | "guesthouse" | "camp" | "resort";
  stars?: number; // 1-5
  avgPricePerNight: number; // INR
  currency?: string;
  town: string;
  contact?: string;
  bookingUrl?: string;
  notes?: string;
  amenities?: string[];
}

export interface FoodSpot {
  id: string;
  name: string;
  type: "restaurant" | "dhaba" | "street-food" | "cafe" | "homestay-kitchen";
  town: string;
  mustTry: string[];
  priceRange: "₹" | "₹₹" | "₹₹₹";
  isVeg?: boolean;
  notes?: string;
}

export interface FuelStop {
  id: string;
  name: string;
  type: "fuel" | "rest" | "food" | "viewpoint" | "atm";
  distanceFromPrev?: number; // km from last stop
  town: string;
  notes?: string;
  altitude?: number; // meters
}

export interface TripComment {
  id: string;
  tripSlug: string;
  authorName: string;
  userId: string;
  body: string;
  createdAt: string;
}

export type FieldNoteCategory =
  | "gear-review"
  | "budget-breakdown"
  | "seasonal-advisory"
  | "trail-update"
  | "tips";

export interface FieldNote {
  _id: string;
  slug: string;
  title: string;
  category: FieldNoteCategory;
  excerpt: string;
  body: string; // Markdown
  coverImageUrl?: string;
  relatedTripSlug?: string;
  tags?: string[];
  readingTime?: number; // minutes
  _createdAt: string;
  _updatedAt: string;
}
