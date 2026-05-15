/**
 * 검색 전역 상태 관리 store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSearchStore = create(
  persist(
    (set) => ({
      searchQuery: '',
      recentSearches: [],
      isFocused: false,

      setSearchQuery: (query) => set({ searchQuery: query }),
      clearSearchQuery: () => set({ searchQuery: '' }),
      setIsFocused: (focused) => set({ isFocused: focused }),

      // 최근 검색어 추가 (중복 제거 + 최대 10개)
      addRecentSearch: (query) =>
        set((state) => {
          const trimmed = query.trim();
          if (!trimmed) return state;

          // 중복 제거 (기존에 있으면 삭제)
          const filtered = state.recentSearches.filter((item) => item !== trimmed);
          // 최상단에 추가 + 최대 5개 유지
          return { recentSearches: [trimmed, ...filtered].slice(0, 5) };
        }),

      // 개별 삭제
      removeRecentSearch: (query) =>
        set((state) => ({
          recentSearches: state.recentSearches.filter((item) => item !== query),
        })),
    }),
    {
      name: 'search-store',
      // searchQuery는 저장하지 않음 (재방문 시 검색창 초기화)
      partialize: (state) => ({ recentSearches: state.recentSearches }),
    },
  ),
);

export default useSearchStore;
