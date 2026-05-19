import { create } from 'zustand';

const useHomeModalStore = create((set) => ({
  showHomeModal: false,

  initializeHomeModal: () => {
    const hiddenDate = localStorage.getItem('hide');
    const today = new Date().toDateString();

    if (hiddenDate !== today) {
      set({ showHomeModal: true });
    }
  },

  closeHomeModal: () =>
    set({
      showHomeModal: false,
    }),
}));

export default useHomeModalStore;
