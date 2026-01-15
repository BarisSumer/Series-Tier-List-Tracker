import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Image, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppStore from '../store/index';
import { translations } from '../constants/translations';
import Heatmap from '../components/Heatmap';
import SearchBar from '../components/SearchBar';
import { Show, Episode } from '../types/index';
import { searchShows, getShowDetails, getAllEpisodes, TMDBShow } from '../services/tmdb';
import { getBackdropUrl } from '../utils/index';

export default function AnalysisScreen() {
  const insets = useSafeAreaInsets();
  const { language, theme } = useAppStore();
  const t = translations[language];

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  const handleShowSelect = async (tmdbShow: TMDBShow) => {
    setLoading(true);
    try {
      const details = await getShowDetails(tmdbShow.id);
      const show: Show = {
        id: details.id,
        title: details.name,
        posterPath: details.poster_path || '',
        backdropPath: details.backdrop_path || '',
        overview: details.overview,
        genres: details.genres.map(g => g.name),
        voteAverage: details.vote_average,
        firstAirDate: details.first_air_date,
        numberOfSeasons: details.number_of_seasons,
        numberOfEpisodes: details.number_of_episodes
      };

      setSelectedShow(show);

      const allEpisodes = await getAllEpisodes(details.id, details.number_of_seasons);
      const formattedEpisodes: Episode[] = allEpisodes.map(ep => ({
        id: ep.id,
        seasonNumber: ep.season_number,
        episodeNumber: ep.episode_number,
        name: ep.name,
        overview: ep.overview,
        voteAverage: ep.vote_average,
        airDate: ep.air_date
      }));

      setEpisodes(formattedEpisodes);
    } catch (error) {
      console.error('Error fetching show details:', error);
    } finally {
      setLoading(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: isDark ? '#030712' : '#f3f4f6' }]}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: isDark ? '#fff' : '#111827' }]}>
            {t.analysis}
          </Text>

          <SearchBar
            onShowSelect={handleShowSelect}
            placeholder={t.search}
            language={language}
          />
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
          </View>
        ) : selectedShow ? (
          <View>
            <View style={styles.backdropContainer}>
              <Image
                source={{ uri: getBackdropUrl(selectedShow.backdropPath, 1280) }}
                style={styles.backdrop}
                resizeMode="cover"
              />
              <View style={styles.backdropOverlay} />
              <View style={styles.backdropContent}>
                <Text style={styles.showTitle}>
                  {selectedShow.title}
                </Text>
                <View style={styles.infoRow}>
                  <Text style={styles.rating}>
                    ⭐ {selectedShow.voteAverage.toFixed(1)}
                  </Text>
                  <Text style={styles.genres}>
                    {selectedShow.genres.join(' • ')}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={[styles.overview, { color: isDark ? '#d1d5db' : '#374151' }]}>
                {selectedShow.overview}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>{t.seasons}</Text>
                  <Text style={styles.statValue}>
                    {selectedShow.numberOfSeasons}
                  </Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statLabel}>{t.episodes}</Text>
                  <Text style={styles.statValue}>
                    {selectedShow.numberOfEpisodes}
                  </Text>
                </View>
              </View>

              {episodes.length > 0 && <Heatmap episodes={episodes} />}
            </View>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              Search for a TV show to analyze its episode ratings
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backdropContainer: {
    height: 256,
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(3, 7, 18, 0.8)',
  },
  backdropContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  showTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rating: {
    color: '#fbbf24',
    fontSize: 18,
  },
  genres: {
    color: '#d1d5db',
  },
  content: {
    padding: 16,
  },
  overview: {
    marginBottom: 24,
    lineHeight: 22,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1f2937',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  statLabel: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 48,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
