/**
 * Filter 전역 상태 관리 store (Zustand)
 * - 페이지 이동 후 돌아와도 필터 상태 유지
 * - localStorage에 자동 저장
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const defaultFilters = {
  booth: {
    host: [],
    category: [],
    day: [],
    location: [],
    sort: null,
  },
  show: {
    host: [],
    category: [],
    day: [],
    sort: null,
  },
  etc: {
    category: [],
    location: [],
  },
  scrap_booth: {
    host: [],
    category: [],
    day: [],
    location: [],
    sort: null,
  },
  scrap_show: {
    host: [],
    category: [],
    day: [],
    sort: null,
  },
};

const useFilterStore = create(
  persist(
    (set) => ({
      filters: defaultFilters,

      // 특정 타입의 필터 설정
      setFilter: (type, filterKey, value) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [type]: {
              ...state.filters[type],
              [filterKey]: value,
            },
          },
        })),

      // 여러 필터 한번에 설정
      setFilters: (type, newFilters) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [type]: {
              ...state.filters[type],
              ...newFilters,
            },
          },
        })),

      // 특정 필터 삭제
      deleteFilter: (type, filterKey) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [type]: {
              ...state.filters[type],
              [filterKey]: [],
            },
          },
        })),

      // 특정 타입의 모든 필터 초기화
      resetFilter: (type) =>
        set((state) => ({
          filters: {
            ...state.filters,
            [type]: defaultFilters[type],
          },
        })),
    }),
    {
      name: 'filter-storage', // localStorage key
    },
  ),
);

export default useFilterStore;
