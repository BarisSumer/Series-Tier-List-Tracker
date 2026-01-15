import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { captureView } from 'react-native-view-shot';
import useAppStore from '../store/index';
import { TIERS } from '../constants/tiers';
import { translations } from '../constants/translations';
import TierRow from '../components/TierRow';
import SearchBar from '../components/SearchBar';
import EditModal from '../components/EditModal';
import RecommendationModal from '../components/RecommendationModal';
import { TierShow, Show } from '../types/index';
import { searchShows, getShowDetails, getRecommendations, TMDBShow } from '../services/tmdb';
import { shuffleArray } from '../utils/index';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { tierItems, addToShowTier, removeFromTier, updateShowTier, reorderInTier, language, theme, watchlist } = useAppStore();
  const t = translations[language];

  const [selectedShow, setSelectedShow] = useState<TierShow | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [recommendationModalVisible, setRecommendationModalVisible] = useState(false);
  const [recommendations, setRecommendations] = useState<Show[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const viewRef = useRef<View>(null);

  const handleShowPress = (show: TierShow) => {
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
      addToShowTier(show, 'pool');
    } catch (error) {
      console.error('Error adding show:', error);
    }
  };

  const handleMoveToTier = (tier: string) => {
    if (selectedShow) {
      updateShowTier(selectedShow.id, tier as TierShow['tier']);
      setEditModalVisible(false);
    }
  };

  const handleMoveLeft = () => {
    if (selectedShow) {
      reorderInTier(selectedShow.id, 'left');
    }
  };

  const handleMoveRight = () => {
    if (selectedShow) {
      reorderInTier(selectedShow.id, 'right');
    }
  };

  const handleDelete = () => {
    if (selectedShow) {
      removeFromTier(selectedShow.id);
      setEditModalVisible(false);
    }
  };

  const handleShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleSuggestShow = async () => {
    setRecommendationModalVisible(true);
    setLoadingRecommendations(true);

    try {
      const topTiers = tierItems.filter(item => item.tier === 'S' || item.tier === 'A');
      
      if (topTiers.length === 0) {
        setRecommendations([]);
        setLoadingRecommendations(false);
        return;
      }

      const randomShows = shuffleArray(topTiers).slice(0, 2);
      const allRecs: Show[] = [];

      for (const show of randomShows) {
        try {
          const recs = await getRecommendations(show.id);
          for (const rec of recs) {
            const isInTier = tierItems.some(t => t.id === rec.id);
            const isInWatchlist = watchlist.some(w => w.id === rec.id);
            const isAlreadyAdded = allRecs.some(r => r.id === rec.id);

            if (!isInTier && !isInWatchlist && !isAlreadyAdded && rec.poster_path) {
              const details = await getShowDetails(rec.id);
              allRecs.push({
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
              });

              if (allRecs.length >= 10) break;
            }
          }

          if (allRecs.length >= 10) break;
        } catch (error) {
          console.error('Error fetching recommendations:', error);
        }
      }

      setRecommendations(shuffleArray(allRecs));
    } catch (error) {
      console.error('Error in suggest show:', error);
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleAddToWatchlist = (show: Show) => {
    useAppStore.getState().addToWatchlist(show);
    setRecommendationModalVisible(false);
  };

  const getShowsByTier = (tier: string) => {
    return tierItems.filter(item => item.tier === tier);
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: isDark ? '#030712' : '#f3f4f6' }]}>
      <View ref={viewRef} style={styles.innerContainer}>
        <View style={styles.headerSection}>
          <View style={styles.headerTop}>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#111827' }]}>
              {t.home}
            </Text>
            <View style={styles.headerButtons}>
              <Pressable
                onPress={handleSuggestShow}
                style={styles.suggestButton}
              >
                <Text style={styles.buttonText}>{t.suggestShow}</Text>
              </Pressable>
              <Pressable
                onPress={handleShare}
                style={styles.shareButton}
              >
                <Text style={styles.buttonText}>{t.share}</Text>
              </Pressable>
            </View>
          </View>

          <SearchBar
            onShowSelect={handleAddToShowTier}
            placeholder={t.search}
            language={language}
          />
        </View>

        <ScrollView style={styles.scrollView}>
          {TIERS.map((tier) => (
            <TierRow
              key={tier}
              tier={tier}
              shows={getShowsByTier(tier)}
              onShowPress={handleShowPress}
            />
          ))}

          <TierRow
            tier="pool"
            shows={getShowsByTier('pool')}
            onShowPress={handleShowPress}
            isPool
          />
        </ScrollView>
      </View>

      <EditModal
        visible={editModalVisible}
        show={selectedShow}
        onClose={() => setEditModalVisible(false)}
        onMoveToTier={handleMoveToTier}
        onMoveLeft={handleMoveLeft}
        onMoveRight={handleMoveRight}
        onDelete={handleDelete}
        language={language}
        translations={t}
      />

      <RecommendationModal
        visible={recommendationModalVisible}
        recommendations={recommendations}
        loading={loadingRecommendations}
        onClose={() => setRecommendationModalVisible(false)}
        onAddToWatchlist={handleAddToWatchlist}
        language={language}
        translations={t}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  headerSection: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  suggestButton: {
    backgroundColor: '#9333ea',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  shareButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
});
