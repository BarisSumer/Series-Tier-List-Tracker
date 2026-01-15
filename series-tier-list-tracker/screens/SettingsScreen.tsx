import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useAppStore from '../store/index';
import { translations } from '../constants/translations';

const TMDB_LOGO_BASE64 = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0iIzAxYjRlNCIvPgogIDx0ZXh0IHg9IjUwIiB5PSI2MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlRNREI8L3RleHQ+Cjwvc3ZnPg==';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { theme, language, setTheme, setLanguage, clearAllData } = useAppStore();
  const t = translations[language];

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLanguageToggle = () => {
    setLanguage(language === 'en' ? 'tr' : 'en');
  };

  const handleClearData = () => {
    clearAllData();
  };

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: isDark ? '#030712' : '#f3f4f6' }]}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title, { color: isDark ? '#fff' : '#111827' }]}>
          {t.settings}
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            APPEARANCE
          </Text>

          <Pressable
            onPress={handleThemeToggle}
            style={[styles.row, { backgroundColor: isDark ? '#1f2937' : '#fff' }]}
          >
            <Text style={[styles.rowText, { color: isDark ? '#fff' : '#111827' }]}>
              {theme === 'dark' ? t.darkMode : t.lightMode}
            </Text>
            <View style={[styles.toggle, { backgroundColor: theme === 'dark' ? '#2563eb' : '#d1d5db' }]}>
              <View
                style={[
                  styles.toggleKnob,
                  theme === 'dark' && styles.toggleKnobRight
                ]}
              />
            </View>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            LANGUAGE
          </Text>

          <Pressable
            onPress={handleLanguageToggle}
            style={[styles.row, { backgroundColor: isDark ? '#1f2937' : '#fff' }]}
          >
            <Text style={[styles.rowText, { color: isDark ? '#fff' : '#111827' }]}>
              {language === 'en' ? 'English (EN)' : 'Türkçe (TR)'}
            </Text>
            <Text style={[styles.arrow, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
              {language === 'en' ? '→ TR' : '→ EN'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: isDark ? '#9ca3af' : '#6b7280' }]}>
            DATA
          </Text>

          <Pressable
            onPress={handleClearData}
            style={styles.clearButton}
          >
            <Text style={styles.clearButtonText}>
              {t.clearData}
            </Text>
          </Pressable>
        </View>

        <View style={styles.attributionBox}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri: TMDB_LOGO_BASE64 }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.attributionText}>
            {t.tmdbAttribution}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  scrollView: {
    flex:1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  rowText: {
    fontSize: 16,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 2,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleKnobRight: {
    transform: [{ translateX: 20 }],
  },
  arrow: {
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: '#dc2626',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  attributionBox: {
    marginTop: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    marginHorizontal: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 80,
    height: 80,
  },
  attributionText: {
    color: '#9ca3af',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
