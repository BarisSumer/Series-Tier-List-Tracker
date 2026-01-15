import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, Show, TierShow } from '../types/index';

interface StoreState extends AppState {
  hydrateStore: () => Promise<void>;
}

const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      tierItems: [],
      watchlist: [],
      theme: 'dark',
      language: 'en',

      addToShowTier: (show: Show, tier: TierShow['tier']) => {
        const state = get();
        const existingShowIndex = state.tierItems.findIndex(item => item.id === show.id);
        
        if (existingShowIndex !== -1) {
          set(state => ({
            tierItems: state.tierItems.map(item =>
              item.id === show.id
                ? { ...item, tier, order: item.order }
                : item
            )
          }));
        } else {
          const tierShows = state.tierItems.filter(item => item.tier === tier);
          const maxOrder = tierShows.length > 0 ? Math.max(...tierShows.map(item => item.order)) : -1;
          
          set(state => ({
            tierItems: [
              ...state.tierItems,
              { ...show, tier, order: maxOrder + 1 }
            ]
          }));
        }
      },

      removeFromTier: (showId: number) => {
        set(state => ({
          tierItems: state.tierItems.filter(item => item.id !== showId)
        }));
      },

      updateShowTier: (showId: number, tier: TierShow['tier']) => {
        const state = get();
        const show = state.tierItems.find(item => item.id === showId);
        
        if (!show) return;

        const tierShows = state.tierItems.filter(item => item.tier === tier);
        const maxOrder = tierShows.length > 0 ? Math.max(...tierShows.map(item => item.order)) : -1;

        set(state => ({
          tierItems: state.tierItems.map(item =>
            item.id === showId
              ? { ...item, tier, order: maxOrder + 1 }
              : item
          )
        }));
      },

      reorderInTier: (showId: number, direction: 'left' | 'right') => {
        const state = get();
        const showIndex = state.tierItems.findIndex(item => item.id === showId);
        
        if (showIndex === -1) return;

        const show = state.tierItems[showIndex];
        const tierShows = state.tierItems
          .filter(item => item.tier === show.tier)
          .sort((a, b) => a.order - b.order);
        
        const showPositionInTier = tierShows.findIndex(item => item.id === showId);
        
        if (direction === 'left' && showPositionInTier > 0) {
          const swapShow = tierShows[showPositionInTier - 1];
          set(state => ({
            tierItems: state.tierItems.map(item => {
              if (item.id === showId) return { ...item, order: swapShow.order };
              if (item.id === swapShow.id) return { ...item, order: show.order };
              return item;
            })
          }));
        } else if (direction === 'right' && showPositionInTier < tierShows.length - 1) {
          const swapShow = tierShows[showPositionInTier + 1];
          set(state => ({
            tierItems: state.tierItems.map(item => {
              if (item.id === showId) return { ...item, order: swapShow.order };
              if (item.id === swapShow.id) return { ...item, order: show.order };
              return item;
            })
          }));
        }
      },

      addToWatchlist: (show: Show) => {
        const state = get();
        const exists = state.watchlist.some(item => item.id === show.id);
        
        if (!exists) {
          set(state => ({
            watchlist: [...state.watchlist, show]
          }));
        }
      },

      removeFromWatchlist: (showId: number) => {
        set(state => ({
          watchlist: state.watchlist.filter(item => item.id !== showId)
        }));
      },

      moveWatchlistToPool: (showId: number) => {
        const state = get();
        const show = state.watchlist.find(item => item.id === showId);
        
        if (show) {
          get().addToShowTier(show, 'pool');
          get().removeFromWatchlist(showId);
        }
      },

      setTheme: (theme: 'dark' | 'light') => {
        set({ theme });
      },

      setLanguage: (language: 'en' | 'tr') => {
        set({ language });
      },

      clearAllData: () => {
        set({
          tierItems: [],
          watchlist: []
        });
      },

      hydrateStore: async () => {
        await AsyncStorage.getItem('app-storage');
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);

export default useAppStore;
