import { create } from "zustand";

interface StoreState {
  activeSection: string | null;
  setActiveSection: (section: string) => void;
}

const useDashboardStore = create<StoreState>((set) => ({
  activeSection: "section1",
  setActiveSection: (section) => set({ activeSection: section }),
}));

export default useDashboardStore;
