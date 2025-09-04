import { Trip, MockLocation } from '../types';

export const sampleTrips: Trip[] = [
  {
    id: '1',
    destination: 'Paris, France',
    startDate: '2024-06-15',
    endDate: '2024-06-20',
    notes: 'First trip to Paris! Want to see all the classic landmarks and try authentic French cuisine.',
    createdAt: '2024-05-01',
    itinerary: [
      {
        id: '1',
        date: '2024-06-15',
        accommodation: 'Hotel des Grands Boulevards',
        activities: [
          {
            id: '1',
            time: '09:00',
            title: 'Arrival & Check-in',
            description: 'Arrive at Charles de Gaulle Airport and check into hotel',
            location: 'Hotel des Grands Boulevards'
          },
          {
            id: '2',
            time: '14:00',
            title: 'Eiffel Tower Visit',
            description: 'Visit the iconic Eiffel Tower and take photos',
            location: 'Champ de Mars, Paris'
          },
          {
            id: '3',
            time: '18:00',
            title: 'Seine River Cruise',
            description: 'Evening cruise along the Seine River',
            location: 'Port de la Bourdonnais'
          }
        ]
      },
      {
        id: '2',
        date: '2024-06-16',
        accommodation: 'Hotel des Grands Boulevards',
        activities: [
          {
            id: '4',
            time: '10:00',
            title: 'Louvre Museum',
            description: 'Explore the world-famous Louvre Museum',
            location: 'Rue de Rivoli, Paris'
          },
          {
            id: '5',
            time: '15:00',
            title: 'Walk in Tuileries Garden',
            description: 'Leisurely stroll through the beautiful gardens',
            location: 'Tuileries Garden'
          }
        ]
      }
    ]
  },
  {
    id: '2',
    destination: 'Tokyo, Japan',
    startDate: '2024-08-10',
    endDate: '2024-08-17',
    notes: 'Exploring modern and traditional Japan. Focus on food culture and technology.',
    createdAt: '2024-07-01',
    itinerary: [
      {
        id: '3',
        date: '2024-08-10',
        accommodation: 'Park Hyatt Tokyo',
        activities: [
          {
            id: '6',
            time: '10:00',
            title: 'Arrival in Tokyo',
            description: 'Arrive at Narita Airport and transfer to hotel',
            location: 'Park Hyatt Tokyo'
          },
          {
            id: '7',
            time: '16:00',
            title: 'Shibuya Crossing',
            description: 'Experience the famous Shibuya crossing',
            location: 'Shibuya, Tokyo'
          }
        ]
      }
    ]
  },
  {
    id: '3',
    destination: 'New York City, USA',
    startDate: '2024-12-01',
    endDate: '2024-12-05',
    notes: 'Holiday season in NYC! Broadway shows, Christmas markets, and iconic sights.',
    createdAt: '2024-10-15',
    itinerary: []
  }
];

export const mockRecommendations: MockLocation[] = [
  {
    destination: 'Paris, France',
    attractions: [
      {
        id: 'p1',
        type: 'attraction',
        name: 'Eiffel Tower',
        description: 'Iconic iron lattice tower and symbol of France',
        rating: 4.6,
        imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg'
      },
      {
        id: 'p2',
        type: 'attraction',
        name: 'Louvre Museum',
        description: "World's largest art museum and historic monument",
        rating: 4.7,
        imageUrl: 'https://images.pexels.com/photos/2675266/pexels-photo-2675266.jpeg'
      },
      {
        id: 'p3',
        type: 'attraction',
        name: 'Notre-Dame Cathedral',
        description: 'Medieval Catholic cathedral on the Île de la Cité',
        rating: 4.5,
        imageUrl: 'https://images.pexels.com/photos/1125210/pexels-photo-1125210.jpeg'
      }
    ],
    hotels: [
      {
        id: 'ph1',
        type: 'hotel',
        name: 'Hotel des Grands Boulevards',
        description: 'Boutique hotel in the heart of Paris',
        rating: 4.4,
        price: '$200/night',
        imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
      },
      {
        id: 'ph2',
        type: 'hotel',
        name: 'Le Bristol Paris',
        description: 'Luxury palace hotel on Rue du Faubourg Saint-Honoré',
        rating: 4.8,
        price: '$800/night',
        imageUrl: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg'
      }
    ]
  },
  {
    destination: 'Tokyo, Japan',
    attractions: [
      {
        id: 't1',
        type: 'attraction',
        name: 'Shibuya Crossing',
        description: 'Famous scramble crossing in Shibuya',
        rating: 4.4,
        imageUrl: 'https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg'
      },
      {
        id: 't2',
        type: 'attraction',
        name: 'Senso-ji Temple',
        description: "Tokyo's oldest temple in Asakusa",
        rating: 4.5,
        imageUrl: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg'
      },
      {
        id: 't3',
        type: 'attraction',
        name: 'Tokyo Skytree',
        description: 'Broadcasting tower and observation deck',
        rating: 4.3,
        imageUrl: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg'
      }
    ],
    hotels: [
      {
        id: 'th1',
        type: 'hotel',
        name: 'Park Hyatt Tokyo',
        description: 'Luxury hotel with views of Mount Fuji',
        rating: 4.7,
        price: '$500/night',
        imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
      },
      {
        id: 'th2',
        type: 'hotel',
        name: 'The Tokyo Station Hotel',
        description: 'Historic hotel inside Tokyo Station',
        rating: 4.5,
        price: '$300/night',
        imageUrl: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg'
      }
    ]
  },
  {
    destination: 'New York City, USA',
    attractions: [
      {
        id: 'n1',
        type: 'attraction',
        name: 'Statue of Liberty',
        description: 'Iconic symbol of freedom and democracy',
        rating: 4.5,
        imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg'
      },
      {
        id: 'n2',
        type: 'attraction',
        name: 'Central Park',
        description: 'Large public park in Manhattan',
        rating: 4.6,
        imageUrl: 'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg'
      },
      {
        id: 'n3',
        type: 'attraction',
        name: 'Empire State Building',
        description: 'Art Deco skyscraper with observation decks',
        rating: 4.4,
        imageUrl: 'https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg'
      }
    ],
    hotels: [
      {
        id: 'nh1',
        type: 'hotel',
        name: 'The Plaza',
        description: 'Luxury hotel on Fifth Avenue',
        rating: 4.6,
        price: '$600/night',
        imageUrl: 'https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg'
      },
      {
        id: 'nh2',
        type: 'hotel',
        name: '1 Hotels Brooklyn Bridge',
        description: 'Eco-luxury hotel with Manhattan views',
        rating: 4.4,
        price: '$400/night',
        imageUrl: 'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg'
      }
    ]
  }
];