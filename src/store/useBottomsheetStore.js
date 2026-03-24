/**
 * 바텀시트 상태 관리 store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBottomsheetStore = create(
  persist(
    (set, get) => ({
      sheetSize: 'medium',
      isDragging: false,
      setSheetSize: (size) => set({ sheetSize: size }),
      setIsDragging: (dragging) => set({ isDragging: dragging }),
      isFull: () => {
        const state = get();
        return state.sheetSize === 'full' && !state.isDragging;
      },
    }),
    { name: 'bottomsheet-store' },
  ),
);

export default useBottomsheetStore;
