/**
 * ImageModal 전역 상태 관리 store (Zustand)
 */

import { create } from 'zustand';

const useImageModalStore = create((set) => ({
  image: null,

  openImageModal: (image) => {
    if (!image) return;
    set({ image });
  },
  closeImageModal: () => set({ image: null }),
}));

export default useImageModalStore;
