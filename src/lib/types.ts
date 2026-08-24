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
  totalBudget?: number;
  currency?: string;
  tripType?: string;
  readingTime?: number;
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
