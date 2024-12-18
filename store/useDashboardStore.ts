import { create } from "zustand";

interface StoreState {
  activeSection: string | null;
  setActiveSection: (section: string) => void;
  manualScroll: boolean;
  setManualScroll: (manualScroll: boolean) => void;
  disableScroll: boolean;
  setDisableScroll: (disableScroll: boolean) => void;
  selectedPackageId: number | null;
  setSelectedPackageId: (pk: number) => void;
}

const useDashboardStore = create<StoreState>((set) => ({
  activeSection: "section1",
  setActiveSection: (activeSection) => set({ activeSection }),
  manualScroll: true,
  setManualScroll: (manualScroll) => set({ manualScroll }),
  disableScroll: false,
  setDisableScroll: (disableScroll) => set({ disableScroll }),
  selectedPackageId: null,
  setSelectedPackageId: (selectedPackageId) => set({ selectedPackageId }),
}));

export default useDashboardStore;
