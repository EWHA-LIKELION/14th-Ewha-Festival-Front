/**
 * 인증(로그인) 상태 관리 store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      showLoginSheet: false,

      login: () => {
        set({ isLoggedIn: true, showLoginSheet: false });
      },

      logout: () => {
        set({ isLoggedIn: false });
      },

      openLoginSheet: () => set({ showLoginSheet: true }),
      closeLoginSheet: () => set({ showLoginSheet: false }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
      }),
    },
  ),
);

export default useAuthStore;
