import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { TierShow } from '../types/index';
import { TIER_COLORS } from '../constants/tiers';
import Poster from './Poster';

interface TierRowProps {
  tier: string;
  shows: TierShow[];
  onShowPress: (show: TierShow) => void;
  isPool?: boolean;
}

export default function TierRow({ tier, shows, onShowPress, isPool = false }: TierRowProps) {
  const sortedShows = [...shows].sort((a, b) => a.order - b.order);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.header,
          { backgroundColor: isPool ? '#1f2937' : TIER_COLORS[tier as keyof typeof TIER_COLORS] }
        ]}
      >
        <Text style={styles.headerText}>
          {isPool ? 'Unranked' : `${tier}-Tier`}
        </Text>
        <Text style={styles.count}>
          {shows.length} {shows.length === 1 ? 'show' : 'shows'}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {sortedShows.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Drop shows here</Text>
          </View>
        ) : (
          sortedShows.map((show) => (
            <View key={show.id} style={styles.posterContainer}>
              <Pressable onPress={() => onShowPress(show)}>
                <Poster
                  posterPath={show.posterPath}
                  title={show.title}
                  size="medium"
                />
              </Pressable>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
  count: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
  },
  emptyContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  emptyText: {
    color: '#6b7280',
    fontSize: 14,
  },
  posterContainer: {
    marginRight: 12,
  },
});
