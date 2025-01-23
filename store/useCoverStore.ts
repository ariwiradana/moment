import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  toggleIsOpen: () => void;
}

const useCoverStore = create<StoreState>((set) => ({
  isOpen: false,
  toggleIsOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));

export default useCoverStore;
