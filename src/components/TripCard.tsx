import React from 'react';
import { Calendar, MapPin, FileText, Edit, Trash2, Download } from 'lucide-react';
import { Trip } from '../types';
import { formatDate, getTripDuration } from '../utils/dateUtils';

interface TripCardProps {
  trip: Trip;
  onEdit: () => void;
  onDelete: () => void;
  onViewDetails: () => void;
  onExportPDF: () => void;
}

const TripCard: React.FC<TripCardProps> = ({
  trip,
  onEdit,
  onDelete,
  onViewDetails,
  onExportPDF,
}) => {
  const duration = getTripDuration(trip.startDate, trip.endDate);
  const activitiesCount = trip.itinerary.reduce((total, day) => total + day.activities.length, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
              {trip.destination}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </span>
            </div>
            <div className="flex items-center text-gray-600 mb-3">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{duration} days • {activitiesCount} activities</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit trip"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={onExportPDF}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Export as PDF"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete trip"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {trip.notes && (
          <div className="mb-4">
            <div className="flex items-center text-gray-600 mb-2">
              <FileText className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Notes</span>
            </div>
            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-lg line-clamp-3">
              {trip.notes}
            </p>
          </div>
        )}

        <button
          onClick={onViewDetails}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <span>View Itinerary</span>
        </button>
      </div>
    </div>
  );
};

export default TripCard;