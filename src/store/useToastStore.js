import { create } from 'zustand';

const useToastStore = create((set) => ({
  text: '',
  isOpen: false,

  showToast: (text) =>
    set({
      text,
      isOpen: true,
    }),

  closeToast: () =>
    set({
      isOpen: false,
    }),
}));

export default useToastStore;
