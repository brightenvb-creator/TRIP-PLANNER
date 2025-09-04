import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface MapViewProps {
  destination: string;
}

const MapView: React.FC<MapViewProps> = ({ destination }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <div className="flex items-center mb-6">
        <Navigation className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-bold text-gray-900">Map View</h3>
      </div>

      <div className="aspect-video bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-gray-700 mb-2">{destination}</h4>
          <p className="text-gray-500">Interactive map view coming soon</p>
          <div className="mt-4 text-sm text-gray-400">
            This would integrate with a real mapping service
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-blue-600 font-semibold">Distance</div>
          <div className="text-gray-700">~2,500 miles</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-green-600 font-semibold">Flight Time</div>
          <div className="text-gray-700">~8.5 hours</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-orange-600 font-semibold">Time Zone</div>
          <div className="text-gray-700">UTC+1</div>
        </div>
      </div>
    </div>
  );
};

export default MapView;