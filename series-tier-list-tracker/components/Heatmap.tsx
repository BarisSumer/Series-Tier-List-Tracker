import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Episode } from '../types/index';
import { getRatingColor } from '../utils/index';

interface HeatmapProps {
  episodes: Episode[];
}

export default function Heatmap({ episodes }: HeatmapProps) {
  const groupedEpisodes = episodes.reduce((acc, episode) => {
    if (!acc[episode.seasonNumber]) {
      acc[episode.seasonNumber] = [];
    }
    acc[episode.seasonNumber].push(episode);
    return acc;
  }, {} as Record<number, Episode[]>);

  const allEpisodesSorted = Object.values(groupedEpisodes).flat().sort((a, b) => {
    if (a.seasonNumber !== b.seasonNumber) {
      return a.seasonNumber - b.seasonNumber;
    }
    return a.episodeNumber - b.episodeNumber;
  });

  const renderHeatmap = () => {
    const squares: JSX.Element[] = [];
    const cols = 7;

    allEpisodesSorted.forEach((episode, index) => {
      const color = getRatingColor(episode.voteAverage);
      squares.push(
        <View
          key={`${episode.seasonNumber}-${episode.episodeNumber}`}
          style={[styles.square, { backgroundColor: color }]}
        >
          <Text
            style={styles.episodeLabel}
          >
            S{episode.seasonNumber}E{episode.episodeNumber}
          </Text>
        </View>
      );
    });

    const rows = [];
    for (let i = 0; i < squares.length; i += cols) {
      rows.push(
        <View key={i} style={styles.row}>
          {squares.slice(i, i + cols)}
        </View>
      );
    }

    return rows;
  };

  const ratingRanges = [
    { min: 8, color: '#2ed573', label: '8.0+' },
    { min: 6, color: '#7bed9f', label: '6.0-7.9' },
    { min: 4, color: '#ffa502', label: '4.0-5.9' },
    { min: 2, color: '#ff6348', label: '2.0-3.9' },
    { min: 0, color: '#ff4757', label: '<2.0' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Episode Rating Heatmap
      </Text>
      
      <View style={styles.grid}>
        {renderHeatmap()}
      </View>

      <View style={styles.legend}>
        <Text style={styles.legendText}>Less</Text>
        <View style={styles.legendItems}>
          {ratingRanges.map((range) => (
            <View key={range.min} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: range.color }]}
              />
              <Text style={styles.legendLabel}>
                {range.label}
              </Text>
            </View>
          ))}
        </View>
        <Text style={styles.legendText}>More</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: '#111827',
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 24,
  },
  square: {
    width: 16,
    height: 16,
    borderRadius: 2,
    position: 'relative',
  },
  episodeLabel: {
    position: 'absolute',
    bottom: -20,
    left: '50%',
    marginLeft: -20,
    color: '#9ca3af',
    fontSize: 8,
    width: 40,
    textAlign: 'center',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 8,
  },
  legendText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  legendItems: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 2,
    marginRight: 4,
  },
  legendLabel: {
    color: '#9ca3af',
    fontSize: 10,
    marginRight: 8,
  },
});
