import React from 'react';
import { Star, MapPin, DollarSign } from 'lucide-react';
import { MockLocation, Recommendation } from '../types';

interface RecommendationsPanelProps {
  destination: string;
  mockData: MockLocation[];
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({
  destination,
  mockData,
}) => {
  const locationData = mockData.find(
    (location) => location.destination.toLowerCase().includes(destination.toLowerCase().split(',')[0])
  );

  if (!locationData) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recommendations</h3>
        <p className="text-gray-500">No recommendations available for this destination.</p>
      </div>
    );
  }

  const RecommendationCard: React.FC<{ item: Recommendation }> = ({ item }) => (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
      <div className="aspect-video bg-gray-300 rounded-lg mb-3 overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{item.name}</h4>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">{item.rating}</span>
          </div>
          {item.price && (
            <div className="flex items-center text-green-600">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">{item.price}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-bold text-gray-900">
          Recommendations for {locationData.destination}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-4">Popular Attractions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationData.attractions.map((attraction) => (
              <RecommendationCard key={attraction.id} item={attraction} />
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-md font-semibold text-gray-900 mb-4">Recommended Hotels</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {locationData.hotels.map((hotel) => (
              <RecommendationCard key={hotel.id} item={hotel} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPanel;