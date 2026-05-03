/**
 * Toast 전역 상태 관리 store (Zustand)
 */

import { create } from 'zustand';

const useToastStore = create((set) => ({
  text: '',
  type: 'check',
  isOpen: false,

  showToast: (text, type = 'check') =>
    set({
      text,
      type,
      isOpen: true,
    }),

  closeToast: () =>
    set({
      isOpen: false,
    }),
}));

export default useToastStore;
