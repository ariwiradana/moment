import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
  isPlayingMusic: boolean;
  toggleIsOpen: () => void;
  setIsPlayingMusic: (playing: boolean) => void;
}

const useCoverStore = create<StoreState>((set) => ({
  isOpen: false,
  isPlayingMusic: false,
  toggleIsOpen: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
  setIsPlayingMusic: (playing: boolean) =>
    set((state) => ({ ...state, isPlayingMusic: playing })),
}));

export default useCoverStore;
