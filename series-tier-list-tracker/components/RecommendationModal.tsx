import React from 'react';
import { StyleSheet, View, Text, Modal, Pressable, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Show } from '../types/index';
import { getPosterUrl } from '../utils/index';

interface RecommendationModalProps {
  visible: boolean;
  recommendations: Show[];
  loading: boolean;
  onClose: () => void;
  onAddToWatchlist: (show: Show) => void;
  language: 'en' | 'tr';
  translations: any;
}

export default function RecommendationModal({
  visible,
  recommendations,
  loading,
  onClose,
  onAddToWatchlist,
  language,
  translations
}: RecommendationModalProps) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={styles.backdrop}
      >
        <Pressable onPress={() => {}} style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {translations.recommendations}
            </Text>
            <Pressable onPress={onClose}>
              <Text style={styles.close}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.subtitle}>
            {translations.basedOnFavorites}
          </Text>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3b82f6" />
            </View>
          ) : recommendations.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Add some shows to S or A tier to get personalized recommendations
              </Text>
            </View>
          ) : (
            <ScrollView style={styles.content}>
              {recommendations.map((show) => (
                <View
                  key={show.id}
                  style={styles.item}
                >
                  <Image
                    source={{ uri: getPosterUrl(show.posterPath, 200) }}
                    style={styles.poster}
                    resizeMode="cover"
                  />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemTitle}>{show.title}</Text>
                    <Text style={styles.itemOverview} numberOfLines={2}>
                      {show.overview}
                    </Text>
                    <Text style={styles.itemRating}>
                      ⭐ {show.voteAverage.toFixed(1)}
                    </Text>
                    <Pressable
                      onPress={() => onAddToWatchlist(show)}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>
                        {translations.addToWatchlist}
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#111827',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  close: {
    color: '#9ca3af',
    fontSize: 24,
  },
  subtitle: {
    color: '#9ca3af',
    marginBottom: 16,
  },
  loadingContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  poster: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  itemOverview: {
    color: '#9ca3af',
    fontSize: 14,
    marginBottom: 8,
  },
  itemRating: {
    color: '#fbbf24',
    fontSize: 14,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
