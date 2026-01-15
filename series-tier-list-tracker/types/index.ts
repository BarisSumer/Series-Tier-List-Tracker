export interface Show {
  id: number;
  title: string;
  posterPath: string;
  backdropPath: string;
  overview: string;
  genres: string[];
  voteAverage: number;
  firstAirDate: string;
  numberOfSeasons: number;
  numberOfEpisodes: number;
}

export interface TierShow extends Show {
  tier: 'S' | 'A' | 'B' | 'C' | 'D' | 'F' | 'pool';
  order: number;
}

export interface Episode {
  id: number;
  seasonNumber: number;
  episodeNumber: number;
  name: string;
  overview: string;
  voteAverage: number;
  airDate: string;
}

export interface Season {
  seasonNumber: number;
  episodeCount: number;
  name: string;
  overview: string;
  posterPath: string;
  airDate: string;
}

export interface AppState {
  tierItems: TierShow[];
  watchlist: Show[];
  theme: 'dark' | 'light';
  language: 'en' | 'tr';
  
  addToShowTier: (show: Show, tier: TierShow['tier']) => void;
  removeFromTier: (showId: number) => void;
  updateShowTier: (showId: number, tier: TierShow['tier']) => void;
  reorderInTier: (showId: number, direction: 'left' | 'right') => void;
  
  addToWatchlist: (show: Show) => void;
  removeFromWatchlist: (showId: number) => void;
  moveWatchlistToPool: (showId: number) => void;
  
  setTheme: (theme: 'dark' | 'light') => void;
  setLanguage: (language: 'en' | 'tr') => void;
  clearAllData: () => void;
}

export interface Translations {
  home: string;
  watchlist: string;
  analysis: string;
  settings: string;
  search: string;
  suggestShow: string;
  share: string;
  addToWatchlist: string;
  delete: string;
  moveLeft: string;
  moveRight: string;
  moveToTier: string;
  unranked: string;
  darkMode: string;
  lightMode: string;
  clearData: string;
  tmdbAttribution: string;
  noShows: string;
  recommendations: string;
  basedOnFavorites: string;
  episodes: string;
  seasons: string;
  rating: string;
  editShow: string;
  cancel: string;
  save: string;
  moveToPool: string;
}
