# Series Tier List & Tracker

A modern, production-ready mobile application for organizing and tracking TV series with tier lists, watchlists, and smart recommendations.

## Features

### 🏠 Home (Tier List)
- Visual tier rows for S, A, B, C, D, F tiers
- Unranked pool section
- Tap-to-edit modal for reordering shows
- Smart suggestions based on your favorites
- Share functionality to export your list as an image
- Search to add shows from TMDB

### 📋 Watchlist
- Grid view of planned shows
- Direct search to add shows
- Move watched shows to tier list

### 📊 Analysis
- Detailed series information
- Episode rating heatmap visualization
- Unified grid display (GitHub-style contributions)
- Season and episode counts

### ⚙️ Settings
- Dark/Light theme toggle
- English (EN) / Turkish (TR) language support
- Clear all data option
- TMDB attribution

## Tech Stack

- **React Native** with Expo SDK 54
- **TypeScript** for type safety
- **NativeWind** (Tailwind CSS) for styling
- **Zustand** for state management with AsyncStorage persistence
- **TMDB API** for show data
- **React Navigation** (Bottom Tabs)

## Installation

```bash
npm install
```

## Running the App

```bash
# Start the development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Project Structure

```
├── app/                 # (Expo Router - not used in this version)
├── components/          # Reusable UI components
│   ├── EditModal.tsx
│   ├── Heatmap.tsx
│   ├── Poster.tsx
│   ├── RecommendationModal.tsx
│   ├── SafeAreaWrapper.tsx
│   ├── SearchBar.tsx
│   └── TierRow.tsx
├── constants/           # App constants
│   ├── tiers.ts
│   └── translations.ts
├── screens/             # Screen components
│   ├── AnalysisScreen.tsx
│   ├── HomeScreen.tsx
│   ├── SettingsScreen.tsx
│   └── WatchlistScreen.tsx
├── services/            # API services
│   └── tmdb.ts
├── store/               # State management
│   └── index.ts
├── types/               # TypeScript types
│   └── index.ts
├── utils/               # Utility functions
│   └── index.ts
├── App.tsx              # Main app component
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## API Key

This project uses The Movie Database (TMDB) API. The API key is included in the code:
```
d86b10ba350f52a4e3ba054ec997d41a
```

## Key Features Implementation

### Smart Recommendation Engine
- Analyzes your S and A tier shows
- Fetches personalized recommendations from TMDB
- Filters out shows already in your list or watchlist

### Tap-to-Edit Flow
- No drag-and-drop libraries used
- Clean tap interaction opens Edit Modal
- Move between tiers, reorder within tier, or delete

### Heatmap Visualization
- Fetches all episode ratings across all seasons
- Displays as a unified grid (not separated by seasons)
- Color-coded by rating (Green = High, Red = Low)

## Design

- **Dark theme** by default with Light mode support
- **Vibrant tier colors** (S=Red, A=Orange, B=Green, etc.)
- **Safe Area compliance** for all screen sizes
- **Modern, premium UI** inspired by Letterboxd and Netflix

## License

This project uses the TMDB API but is not endorsed or certified by TMDB.
