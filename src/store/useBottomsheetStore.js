/**
 * 바텀시트 상태 관리 store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useBottomsheetStore = create(
  persist(
    (set) => ({
      sheetSize: 'medium',
      setSheetSize: (size) => set({ sheetSize: size }),
    }),
    { name: 'bottomsheet-store' },
  ),
);

export default useBottomsheetStore;
