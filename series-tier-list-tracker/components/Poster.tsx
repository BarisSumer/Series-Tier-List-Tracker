import React from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { getImageUrl } from '../services/tmdb';

interface PosterProps {
  posterPath: string | null;
  title: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
}

export default function Poster({ posterPath, title, onPress, size = 'medium' }: PosterProps) {
  const sizeStyles = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  };

  return (
    <Pressable onPress={onPress}>
      <View style={[styles.poster, sizeStyles[size]]}>
        <Image
          source={{ uri: getImageUrl(posterPath, size === 'small' ? 200 : 500) }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  poster: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f2937',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  small: {
    width: 96,
    height: 144,
  },
  medium: {
    width: 128,
    height: 192,
  },
  large: {
    width: 160,
    height: 240,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
