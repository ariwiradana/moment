import { Client } from "@/lib/types";
import { create } from "zustand";

type ClientStore = {
  client: Client | null;
  setClient: (client: Client) => void;
};

export const useClientStore = create<ClientStore>()((set) => ({
  client: null,
  setClient: (client) => set(() => ({ client })),
}));
