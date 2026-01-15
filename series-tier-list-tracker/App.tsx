import React from 'react';
import { StyleSheet, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useAppStore from './store/index';
import { translations } from './constants/translations';
import HomeScreen from './screens/HomeScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import AnalysisScreen from './screens/AnalysisScreen';
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ focused, name }: { focused: boolean; name: string }) {
  const icons: Record<string, string> = {
    Home: '🏠',
    Watchlist: '📋',
    Analysis: '📊',
    Settings: '⚙️'
  };

  return (
    <View style={styles.iconContainer}>
      <Text style={styles.icon}>{icons[name]}</Text>
    </View>
  );
}

export default function App() {
  const { theme, language } = useAppStore();
  const t = translations[language];
  const isDark = theme === 'dark';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={isDark ? '#030712' : '#f3f4f6'}
        />
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name={route.name} />
            ),
            tabBarLabel: ({ focused }) => (
              <Text
                style={[
                  styles.tabLabel,
                  focused && styles.tabLabelFocused,
                  isDark ? styles.tabLabelDark : styles.tabLabelLight,
                  focused && (isDark ? styles.tabLabelFocusedDark : styles.tabLabelFocusedLight)
                ]}
              >
                {t[route.name.toLowerCase() as keyof typeof t]}
              </Text>
            ),
            tabBarStyle: {
              backgroundColor: isDark ? '#111827' : '#ffffff',
              borderTopColor: isDark ? '#1f2937' : '#e5e7eb',
              paddingBottom: 8,
              height: 80,
            },
            headerShown: false
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Watchlist" component={WatchlistScreen} />
          <Tab.Screen name="Analysis" component={AnalysisScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
  },
  tabLabelFocused: {
    fontWeight: '600',
  },
  tabLabelDark: {
    color: '#9ca3af',
  },
  tabLabelLight: {
    color: '#6b7280',
  },
  tabLabelFocusedDark: {
    color: '#fff',
  },
  tabLabelFocusedLight: {
    color: '#111827',
  },
});
