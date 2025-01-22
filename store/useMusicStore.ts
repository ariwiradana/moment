import { create } from "zustand";

interface MusicState {
  isPlaying: boolean;
  togglePlayPause: () => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  isPlaying: false,
  togglePlayPause: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
