import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Clock, MapPin, Home } from 'lucide-react';
import { Trip, ItineraryDay, Activity } from '../types';
import { formatDate, generateDateRange } from '../utils/dateUtils';
import ActivityForm from './ActivityForm';

interface ItineraryViewProps {
  trip: Trip;
  onBack: () => void;
  onUpdateTrip: (trip: Trip) => void;
}

const ItineraryView: React.FC<ItineraryViewProps> = ({ trip, onBack, onUpdateTrip }) => {
  const [editingActivity, setEditingActivity] = useState<{ dayId: string; activity?: Activity } | null>(null);
  const [editingAccommodation, setEditingAccommodation] = useState<string | null>(null);
  const [accommodationInput, setAccommodationInput] = useState('');

  const dateRange = generateDateRange(trip.startDate, trip.endDate);
  
  // Ensure we have itinerary days for all dates
  const itineraryDays = dateRange.map(date => {
    const existingDay = trip.itinerary.find(day => day.date === date);
    return existingDay || {
      id: `day-${date}`,
      date,
      activities: [],
      accommodation: ''
    };
  });

  const handleSaveActivity = (dayId: string, activity: Omit<Activity, 'id'>) => {
    const updatedItinerary = itineraryDays.map(day => {
      if (day.id === dayId) {
        if (editingActivity?.activity) {
          // Update existing activity
          return {
            ...day,
            activities: day.activities.map(act =>
              act.id === editingActivity.activity!.id
                ? { ...activity, id: editingActivity.activity!.id }
                : act
            )
          };
        } else {
          // Add new activity
          return {
            ...day,
            activities: [...day.activities, { ...activity, id: `activity-${Date.now()}` }]
              .sort((a, b) => a.time.localeCompare(b.time))
          };
        }
      }
      return day;
    });

    onUpdateTrip({ ...trip, itinerary: updatedItinerary });
    setEditingActivity(null);
  };

  const handleDeleteActivity = (dayId: string, activityId: string) => {
    const updatedItinerary = itineraryDays.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: day.activities.filter(act => act.id !== activityId)
        };
      }
      return day;
    });

    onUpdateTrip({ ...trip, itinerary: updatedItinerary });
  };

  const handleSaveAccommodation = (dayId: string) => {
    const updatedItinerary = itineraryDays.map(day => {
      if (day.id === dayId) {
        return { ...day, accommodation: accommodationInput };
      }
      return day;
    });

    onUpdateTrip({ ...trip, itinerary: updatedItinerary });
    setEditingAccommodation(null);
    setAccommodationInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Trips</span>
        </button>
        
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.destination}</h1>
          <p className="text-gray-600 mb-4">{formatDate(trip.startDate)} - {formatDate(trip.endDate)}</p>
          {trip.notes && (
            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{trip.notes}</p>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {itineraryDays.map((day) => (
          <div key={day.id} className="bg-white rounded-xl shadow-sm border">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">{formatDate(day.date)}</h2>
                <button
                  onClick={() => setEditingActivity({ dayId: day.id })}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Activity</span>
                </button>
              </div>

              {/* Accommodation */}
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Home className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Accommodation</span>
                </div>
                {editingAccommodation === day.id ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={accommodationInput}
                      onChange={(e) => setAccommodationInput(e.target.value)}
                      placeholder="Enter accommodation..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSaveAccommodation(day.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingAccommodation(null)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">
                      {day.accommodation || 'No accommodation specified'}
                    </span>
                    <button
                      onClick={() => {
                        setEditingAccommodation(day.id);
                        setAccommodationInput(day.accommodation || '');
                      }}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Activities */}
            <div className="p-6">
              {day.activities.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activities planned for this day</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {day.activities.map((activity) => (
                    <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm font-medium">
                              {activity.time}
                            </span>
                            <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          </div>
                          {activity.description && (
                            <p className="text-gray-700 mb-2">{activity.description}</p>
                          )}
                          {activity.location && (
                            <div className="flex items-center text-gray-600">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span className="text-sm">{activity.location}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => setEditingActivity({ dayId: day.id, activity })}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(day.id, activity.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingActivity && (
        <ActivityForm
          activity={editingActivity.activity}
          onSave={(activity) => handleSaveActivity(editingActivity.dayId, activity)}
          onCancel={() => setEditingActivity(null)}
        />
      )}
    </div>
  );
};

export default ItineraryView;