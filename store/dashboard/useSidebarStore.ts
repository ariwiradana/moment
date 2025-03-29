import { create } from "zustand";

interface StoreState {
  isOpenSidebar: boolean;
  toggleIsOpenSidebar: () => void;
}

const useDashboardStore = create<StoreState>((set) => ({
  isOpenSidebar: false,
  toggleIsOpenSidebar: () =>
    set((state) => ({ ...state, isOpenSidebar: !state.isOpenSidebar })),
}));

export default useDashboardStore;
