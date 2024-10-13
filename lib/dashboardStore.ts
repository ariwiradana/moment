import { create } from "zustand";

interface StoreState {
  activeSection: string | null;
  setActiveSection: (section: string) => void;
  manualScroll: boolean;
  setManualScroll: (manualScroll: boolean) => void;
  selectedPackageId: number | null;
  setSelectedPackageId: (pk: number) => void;
}

const useDashboardStore = create<StoreState>((set) => ({
  activeSection: "section1",
  setActiveSection: (activeSection) => set({ activeSection }),
  manualScroll: true,
  setManualScroll: (manualScroll) => set({ manualScroll }),
  selectedPackageId: 1,
  setSelectedPackageId: (selectedPackageId) => set({ selectedPackageId }),
}));

export default useDashboardStore;
