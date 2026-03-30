/**
 * Alert 전역 상태 관리 store (Zustand)
 */

import { create } from 'zustand';

const useAlertStore = create((set) => ({
  alert: null,

  openAlert: ({ variant, title, text, onConfirm, onCancel }) => {
    set({
      alert: {
        variant,
        title,
        text,
        onConfirm,
        onCancel,
      },
    });
  },

  closeAlert: () => set({ alert: null }),
}));

export default useAlertStore;
