import { Client, SEO } from "@/lib/types";
import { create } from "zustand";

interface StoreState {
  seo: SEO | null;
  client: Client | null;
  setSEO: (seo: SEO | null) => void;
  setClient: (client: Client | null) => void;
}

const useClientStore = create<StoreState>((set) => ({
  client: null,
  seo: null,
  setClient: (client) => set({ client }),
  setSEO: (seo) => set({ seo }),
}));

export default useClientStore;
