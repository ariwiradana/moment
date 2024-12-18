import { Client } from "@/lib/types";
import { create } from "zustand";

interface StoreState {
  client: Client | null;
  setClient: (client: Client | null) => void;
}

const useClientStore = create<StoreState>((set) => ({
  client: null,
  setClient: (client) => set({ client }),
}));

export default useClientStore;
