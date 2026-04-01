/**
 * FilterSheet 전역 상태 관리 store (Zustand)
 * - 필터 바텀시트 열기/닫기
 */

import { create } from 'zustand';

const useFilterSheetStore = create((set) => ({
  isOpen: false,
  type: null, // 'booth', 'show', 'etc', 'scrap_booth', 'scrap_show'

  openSheet: (type) =>
    set({
      isOpen: true,
      type,
    }),

  closeSheet: () =>
    set({
      isOpen: false,
      type: null,
    }),
}));

export default useFilterSheetStore;
