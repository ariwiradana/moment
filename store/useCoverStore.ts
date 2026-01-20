import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  toggleIsOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const useCoverStore = create<StoreState>((set) => ({
  isOpen: false,
  toggleIsOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
  setIsOpen: (isOpen: boolean) => set((state) => ({ ...state, isOpen })),
}));

export default useCoverStore;
