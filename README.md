# Travel Planner Web App

A comprehensive travel planning application built with React, TypeScript, and Tailwind CSS. Plan your trips, create detailed itineraries, and get recommendations for your destinations.

## ✨ Features

### Core Features
- **Trip Management**: Create, edit, and delete trips with destinations, dates, and notes
- **Detailed Itineraries**: Plan daily activities with times, descriptions, and locations
- **Accommodation Tracking**: Add accommodation details for each day of your trip
- **Search & Filter**: Find trips by destination or travel dates
- **PDF Export**: Export your complete itinerary as a PDF document

### Additional Features
- **Recommendations**: View suggested attractions and hotels for your destinations
- **Mock Map Integration**: Visual representation of your travel destinations
- **Local Storage**: Automatic saving and persistence of your data
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Sample Data**: Pre-loaded with example trips for demonstration

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd travel-planner-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── TripCard.tsx        # Trip display card
│   ├── TripForm.tsx        # Trip creation/editing form
│   ├── ItineraryView.tsx   # Detailed itinerary management
│   ├── ActivityForm.tsx    # Activity creation/editing form
│   ├── SearchFilter.tsx    # Search and filter functionality
│   ├── RecommendationsPanel.tsx # Destination recommendations
│   └── MapView.tsx         # Mock map integration
├── data/               # Mock data and sample content
│   └── mockData.ts        # Sample trips and recommendations
├── types/              # TypeScript type definitions
│   └── index.ts           # Application types
├── utils/              # Utility functions
│   ├── dateUtils.ts       # Date formatting and manipulation
│   └── pdfExport.ts       # PDF generation functionality
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 📱 Usage Guide

### Creating a Trip
1. Click the "New Trip" button on the main page
2. Fill in the destination, start date, end date, and optional notes
3. Save the trip to add it to your collection

### Planning Your Itinerary
1. Click "View Itinerary" on any trip card
2. Add activities for each day by clicking "Add Activity"
3. Set accommodation for each day using the accommodation section
4. Edit or delete activities as needed

### Viewing Recommendations
1. Select a trip from your collection
2. Click "Recommendations" in the navigation
3. Browse suggested attractions and hotels for your destination

### Exporting to PDF
1. Click the download icon on any trip card
2. Your complete itinerary will be generated and downloaded as a PDF

### Searching and Filtering
- Use the search bar to find trips by destination
- Use the date filter to find trips within a specific date range

## 🎨 Design Features

- **Modern UI**: Clean, professional design with thoughtful spacing and typography
- **Responsive Layout**: Seamlessly adapts to different screen sizes
- **Interactive Elements**: Smooth hover effects and transitions
- **Color System**: Consistent color palette with blue primary, teal secondary, and accent colors
- **Accessibility**: Proper contrast ratios and keyboard navigation support

## 🔧 Technical Details

### Built With
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server
- **date-fns** - Date manipulation library
- **jsPDF** - PDF generation
- **Lucide React** - Icon library

### Data Storage
- **Local Storage**: Automatically saves all trip data to browser localStorage
- **Mock Data**: Includes sample trips and recommendations for demonstration
- **No Backend Required**: Fully client-side application

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Or connect your Git repository for automatic deployments

### Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Other Platforms
The built application in the `dist` folder can be deployed to any static hosting service.

## 📝 Sample Data

The app comes with pre-loaded sample trips including:
- **Paris, France** - Complete itinerary with Eiffel Tower and Louvre visits
- **Tokyo, Japan** - Modern Japan exploration with technology and culture focus
- **New York City, USA** - Holiday season trip with Broadway shows and Christmas markets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure you're using a modern browser
3. Clear localStorage if you encounter data issues: `localStorage.clear()`

---

**Enjoy planning your travels!** ✈️🌍