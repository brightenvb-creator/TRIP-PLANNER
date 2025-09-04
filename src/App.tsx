import React, { useState, useEffect } from 'react';
import { Plus, Plane, Calendar, Search, Map } from 'lucide-react';
import { Trip } from './types';
import { sampleTrips, mockRecommendations } from './data/mockData';
import { exportTripToPDF } from './utils/pdfExport';
import TripCard from './components/TripCard';
import TripForm from './components/TripForm';
import ItineraryView from './components/ItineraryView';
import SearchFilter from './components/SearchFilter';
import RecommendationsPanel from './components/RecommendationsPanel';
import MapView from './components/MapView';

type View = 'trips' | 'itinerary' | 'recommendations' | 'map';

function App() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [currentView, setCurrentView] = useState<View>('trips');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [isCreatingTrip, setIsCreatingTrip] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Load trips from localStorage on initial load
  useEffect(() => {
    const savedTrips = localStorage.getItem('travelPlannerTrips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    } else {
      setTrips(sampleTrips);
    }
  }, []);

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    localStorage.setItem('travelPlannerTrips', JSON.stringify(trips));
  }, [trips]);

  const filteredTrips = trips.filter((trip) => {
    const matchesSearch = trip.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || trip.startDate <= dateFilter && trip.endDate >= dateFilter;
    return matchesSearch && matchesDate;
  });

  const handleCreateTrip = (tripData: Omit<Trip, 'id' | 'createdAt'>) => {
    const newTrip: Trip = {
      ...tripData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setTrips([newTrip, ...trips]);
    setIsCreatingTrip(false);
  };

  const handleUpdateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(trip => trip.id === updatedTrip.id ? updatedTrip : trip));
    if (selectedTrip?.id === updatedTrip.id) {
      setSelectedTrip(updatedTrip);
    }
  };

  const handleEditTrip = (tripData: Omit<Trip, 'id' | 'createdAt'>) => {
    if (editingTrip) {
      const updatedTrip: Trip = {
        ...editingTrip,
        ...tripData,
      };
      handleUpdateTrip(updatedTrip);
      setEditingTrip(null);
    }
  };

  const handleDeleteTrip = (tripId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      setTrips(trips.filter(trip => trip.id !== tripId));
      if (selectedTrip?.id === tripId) {
        setSelectedTrip(null);
        setCurrentView('trips');
      }
    }
  };

  const handleViewItinerary = (trip: Trip) => {
    setSelectedTrip(trip);
    setCurrentView('itinerary');
  };

  const handleExportPDF = (trip: Trip) => {
    exportTripToPDF(trip);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'itinerary':
        return selectedTrip ? (
          <ItineraryView
            trip={selectedTrip}
            onBack={() => setCurrentView('trips')}
            onUpdateTrip={handleUpdateTrip}
          />
        ) : null;

      case 'recommendations':
        return selectedTrip ? (
          <div className="max-w-6xl mx-auto">
            <RecommendationsPanel
              destination={selectedTrip.destination}
              mockData={mockRecommendations}
            />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a trip to view recommendations</p>
          </div>
        );

      case 'map':
        return selectedTrip ? (
          <div className="max-w-4xl mx-auto">
            <MapView destination={selectedTrip.destination} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Select a trip to view map</p>
          </div>
        );

      default:
        return (
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
                <p className="text-gray-600">Plan and organize your travel adventures</p>
              </div>
              <button
                onClick={() => setIsCreatingTrip(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-sm"
              >
                <Plus className="h-5 w-5" />
                <span>New Trip</span>
              </button>
            </div>

            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />

            {filteredTrips.length === 0 ? (
              <div className="text-center py-12">
                <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {trips.length === 0 ? 'No trips yet' : 'No trips match your search'}
                </h3>
                <p className="text-gray-500 mb-6">
                  {trips.length === 0 
                    ? 'Start planning your next adventure by creating your first trip'
                    : 'Try adjusting your search criteria'
                  }
                </p>
                {trips.length === 0 && (
                  <button
                    onClick={() => setIsCreatingTrip(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Create Your First Trip
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    onEdit={() => setEditingTrip(trip)}
                    onDelete={() => handleDeleteTrip(trip.id)}
                    onViewDetails={() => handleViewItinerary(trip)}
                    onExportPDF={() => handleExportPDF(trip)}
                  />
                ))}
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Travel Planner</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('trips')}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentView === 'trips'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Calendar className="h-4 w-4" />
                <span>Trips</span>
              </button>
              {selectedTrip && (
                <>
                  <button
                    onClick={() => setCurrentView('recommendations')}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentView === 'recommendations'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Search className="h-4 w-4" />
                    <span>Recommendations</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('map')}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentView === 'map'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Map className="h-4 w-4" />
                    <span>Map</span>
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>

      {/* Modals */}
      {isCreatingTrip && (
        <TripForm
          onSave={handleCreateTrip}
          onCancel={() => setIsCreatingTrip(false)}
        />
      )}

      {editingTrip && (
        <TripForm
          trip={editingTrip}
          onSave={handleEditTrip}
          onCancel={() => setEditingTrip(null)}
        />
      )}
    </div>
  );
}

export default App;