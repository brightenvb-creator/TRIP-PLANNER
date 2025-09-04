export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  notes: string;
  createdAt: string;
  itinerary: ItineraryDay[];
}

export interface ItineraryDay {
  id: string;
  date: string;
  activities: Activity[];
  accommodation?: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface Recommendation {
  id: string;
  type: 'attraction' | 'hotel';
  name: string;
  description: string;
  rating: number;
  price?: string;
  imageUrl: string;
}

export interface MockLocation {
  destination: string;
  attractions: Recommendation[];
  hotels: Recommendation[];
}