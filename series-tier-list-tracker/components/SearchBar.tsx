import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, Pressable, Keyboard } from 'react-native';
import { searchShows } from '../services/tmdb';
import { TMDBShow } from '../services/tmdb';
import Poster from './Poster';

interface SearchBarProps {
  onShowSelect: (show: TMDBShow) => void;
  placeholder: string;
  language: 'en' | 'tr';
}

export default function SearchBar({ onShowSelect, placeholder, language }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TMDBShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    
    if (text.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    try {
      const shows = await searchShows(text);
      setResults(shows);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (show: TMDBShow) => {
    onShowSelect(show);
    setQuery('');
    setResults([]);
    setShowResults(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          value={query}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>...</Text>
          </View>
        )}
      </View>

      {showResults && results.length > 0 && (
        <Pressable
          onPress={() => {
            setShowResults(false);
            Keyboard.dismiss();
          }}
          style={styles.backdrop}
        />
      )}

      {showResults && results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.resultItem}
              >
                <View style={styles.posterWrapper}>
                  <Poster
                    posterPath={item.poster_path}
                    title={item.name}
                    size="small"
                  />
                </View>
                <View style={styles.resultInfo}>
                  <Text style={styles.resultTitle}>{item.name}</Text>
                  <Text style={styles.resultYear}>
                    {new Date(item.first_air_date).getFullYear()}
                  </Text>
                  <Text style={styles.resultRating}>
                    ⭐ {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 50,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#1f2937',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  loadingContainer: {
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10,
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#111827',
    borderRadius: 8,
    marginTop: 8,
    maxHeight: 400,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#374151',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  resultItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
    alignItems: 'center',
  },
  posterWrapper: {
    width: 48,
    marginRight: 12,
    borderRadius: 4,
    overflow: 'hidden',
  },
  resultInfo: {
    flex: 1,
  },
  resultTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  resultYear: {
    color: '#9ca3af',
    fontSize: 14,
  },
  resultRating: {
    color: '#fbbf24',
    fontSize: 14,
  },
});
