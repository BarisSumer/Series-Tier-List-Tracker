import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Pressable, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppStore from '../store/index';
import { translations } from '../constants/translations';
import SearchBar from '../components/SearchBar';
import EditModal from '../components/EditModal';
import { Show, TierShow } from '../types/index';
import { getShowDetails, TMDBShow } from '../services/tmdb';

export default function WatchlistScreen() {
  const insets = useSafeAreaInsets();
  const { watchlist, addToWatchlist, removeFromWatchlist, language, theme } = useAppStore();
  const t = translations[language];

  const [selectedShow, setSelectedShow] = useState<Show | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const handleShowPress = (show: Show) => {
    setSelectedShow(show);
    setEditModalVisible(true);
  };

  const handleAddToShowTier = async (tmdbShow: TMDBShow) => {
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
      useAppStore.getState().addToWatchlist(show);
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const handleMoveToPool = () => {
    if (selectedShow) {
      useAppStore.getState().moveWatchlistToPool(selectedShow.id);
      setEditModalVisible(false);
    }
  };

  const handleDelete = () => {
    if (selectedShow) {
      removeFromWatchlist(selectedShow.id);
      setEditModalVisible(false);
    }
  };

  const isDark = theme === 'dark';

  const renderWatchlistItem = ({ item }: { item: Show }) => (
    <Pressable
      onPress={() => handleShowPress(item)}
      style={styles.itemContainer}
    >
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${item.posterPath}` }}
          style={styles.poster}
          resizeMode="cover"
        />
        <View style={styles.titleOverlay}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
        </View>
      </View>
    </Pressable>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: isDark ? '#030712' : '#f3f4f6' }]}>
      <View style={styles.header}>
        <Text style={[styles.titleLarge, { color: isDark ? '#fff' : '#111827' }]}>
          {t.watchlist}
        </Text>

        <SearchBar
          onShowSelect={handleAddToShowTier}
          placeholder={t.search}
          language={language}
        />
      </View>

      {watchlist.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            {t.noShows}
          </Text>
        </View>
      ) : (
        <FlatList
          data={watchlist}
          renderItem={renderWatchlistItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          contentContainerStyle={styles.listContent}
        />
      )}

      <EditModal
        visible={editModalVisible}
        show={selectedShow ? { ...selectedShow, tier: 'pool' as TierShow['tier'], order: 0 } : null}
        onClose={() => setEditModalVisible(false)}
        onMoveToTier={() => handleMoveToPool()}
        onMoveLeft={() => {}}
        onMoveRight={() => {}}
        onDelete={handleDelete}
        language={language}
        translations={{
          ...t,
          moveToTier: t.moveToPool
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  titleLarge: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    width: '33.33%',
    padding: 4,
  },
  posterContainer: {
    position: 'relative',
  },
  poster: {
    width: '100%',
    aspectRatio: 2 / 3,
    borderRadius: 8,
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
