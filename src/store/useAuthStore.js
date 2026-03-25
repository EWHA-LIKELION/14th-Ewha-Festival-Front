/**
 * 인증(로그인) 상태 관리 store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      isLoggedIn: false,
      showLoginSheet: false,

      login: (token) => {
        set({ token, isLoggedIn: true, showLoginSheet: false });
      },

      logout: () => {
        set({ token: null, isLoggedIn: false });
      },

      openLoginSheet: () => set({ showLoginSheet: true }),
      closeLoginSheet: () => set({ showLoginSheet: false }),
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token, isLoggedIn: state.isLoggedIn }),
    },
  ),
);

export default useAuthStore;
