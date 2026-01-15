import React from 'react';
import { StyleSheet, View, Text, Modal, Pressable, ScrollView, Image } from 'react-native';
import { TierShow } from '../types/index';
import { TIER_COLORS } from '../constants/tiers';
import { getPosterUrl } from '../utils/index';

interface EditModalProps {
  visible: boolean;
  show: TierShow | null;
  onClose: () => void;
  onMoveToTier: (tier: string) => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDelete: () => void;
  language: 'en' | 'tr';
  translations: any;
}

export default function EditModal({
  visible,
  show,
  onClose,
  onMoveToTier,
  onMoveLeft,
  onMoveRight,
  onDelete,
  language,
  translations
}: EditModalProps) {
  if (!show) return null;

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
            <Image
              source={{ uri: getPosterUrl(show.posterPath, 300) }}
              style={styles.poster}
              resizeMode="cover"
            />
            <View style={styles.headerInfo}>
              <Text style={styles.showTitle}>{show.title}</Text>
              <Text style={styles.showRating}>
                ⭐ {show.voteAverage.toFixed(1)}
              </Text>
              <Text style={styles.showGenres}>
                {show.genres.join(', ')}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.content}>
            <Text style={styles.sectionTitle}>
              {translations.moveToTier}
            </Text>
            <View style={styles.tierButtons}>
              {['S', 'A', 'B', 'C', 'D', 'F', 'pool'].map((tier) => (
                <Pressable
                  key={tier}
                  onPress={() => onMoveToTier(tier)}
                  style={[
                    styles.tierButton,
                    { backgroundColor: tier === 'pool' ? '#6b7280' : TIER_COLORS[tier as keyof typeof TIER_COLORS] },
                    show.tier === tier && styles.tierButtonSelected
                  ]}
                >
                  <Text style={styles.tierButtonText}>
                    {tier === 'pool' ? 'Unranked' : tier}
                  </Text>
                </Pressable>
              ))}
            </View>

            {show.tier !== 'pool' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                  Reorder
                </Text>
                <View style={styles.reorderButtons}>
                  <Pressable
                    onPress={onMoveLeft}
                    style={styles.reorderButton}
                  >
                    <Text style={styles.reorderButtonText}>
                      {translations.moveLeft}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={onMoveRight}
                    style={styles.reorderButton}
                  >
                    <Text style={styles.reorderButtonText}>
                      {translations.moveRight}
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}

            <Pressable
              onPress={onDelete}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>
                {translations.delete}
              </Text>
            </Pressable>
          </ScrollView>

          <Pressable
            onPress={onClose}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>
              {translations.cancel}
            </Text>
          </Pressable>
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
    marginBottom: 24,
  },
  poster: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  showTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  showRating: {
    color: '#fbbf24',
    fontSize: 16,
    marginBottom: 4,
  },
  showGenres: {
    color: '#9ca3af',
    fontSize: 14,
  },
  content: {
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
  },
  tierButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  tierButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tierButtonSelected: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  tierButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  reorderButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  reorderButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#374151',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
