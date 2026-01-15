const API_KEY = 'd86b10ba350f52a4e3ba054ec997d41a';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  genre_ids: number[];
  vote_average: number;
  first_air_date: string;
}

export interface TMDBShowDetails extends TMDBShow {
  genres: Array<{ id: number; name: string }>;
  number_of_seasons: number;
  number_of_episodes: number;
}

export interface TMDBEpisode {
  id: number;
  season_number: number;
  episode_number: number;
  name: string;
  overview: string;
  vote_average: number;
  air_date: string;
}

export interface TMDBSeason {
  season_number: number;
  episode_count: number;
  name: string;
  overview: string;
  poster_path: string | null;
  air_date: string;
}

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const response = await fetch(url.toString());
  
  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.statusText}`);
  }

  return response.json();
}

export async function searchShows(query: string): Promise<TMDBShow[]> {
  const data = await fetchTMDB<{ results: TMDBShow[] }>('/search/tv', { query });
  return data.results;
}

export async function getShowDetails(showId: number): Promise<TMDBShowDetails> {
  return fetchTMDB<TMDBShowDetails>(`/tv/${showId}`);
}

export async function getSeasonDetails(showId: number, seasonNumber: number): Promise<{ episodes: TMDBEpisode[] }> {
  return fetchTMDB<{ episodes: TMDBEpisode[] }>(`/tv/${showId}/season/${seasonNumber}`);
}

export async function getAllEpisodes(showId: number, numberOfSeasons: number): Promise<TMDBEpisode[]> {
  const episodes: TMDBEpisode[] = [];
  
  for (let seasonNumber = 1; seasonNumber <= numberOfSeasons; seasonNumber++) {
    try {
      const seasonData = await getSeasonDetails(showId, seasonNumber);
      episodes.push(...seasonData.episodes);
    } catch (error) {
      console.error(`Error fetching season ${seasonNumber}:`, error);
    }
  }
  
  return episodes;
}

export async function getRecommendations(showId: number): Promise<TMDBShow[]> {
  const data = await fetchTMDB<{ results: TMDBShow[] }>(`/tv/${showId}/recommendations`);
  return data.results;
}

export function getImageUrl(path: string | null, size: number = 500): string {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `${IMAGE_BASE_URL}/w${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: number = 1280): string {
  if (!path) return 'https://via.placeholder.com/1280x720?text=No+Image';
  return `${IMAGE_BASE_URL}/w${size}${path}`;
}
