import {
  Client,
  Event,
  MediaForm,
  Order,
  Package,
  Participant,
  Theme,
} from "@/lib/types";
import moment from "moment";
import { create } from "zustand";

interface StoreState {
  form: Client;
  activeStep: number;
  maxStepReached: number;
  theme: Theme | null;
  pkg: Package | null;
  isLoading: boolean;
  fullfilledSteps: boolean[];
  order: Omit<Order, "client_id">;
  toggleEndTimes: boolean[];
  hasRecreateInvoice: boolean;
  setForm: (
    name: string,
    value:
      | string
      | number
      | Event[]
      | Participant[]
      | string[]
      | null
      | MediaForm
  ) => void;
  setActiveStep: (step: number) => void;
  setTheme: (theme: Theme) => void;
  setPackage: (pkg: Package) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetForm: () => void;
  setFullForm: (form: Client) => void;
  setFullfilledSteps: (fullfilledSteps: boolean[]) => void;
  setNewOrder: (order: Omit<Order, "client_id">) => void;
  setToggleEndTimes: (toggleEndTimes: boolean[]) => void;
  setHasRecreateInvoice: (hasRecreateInvoice: boolean) => void;
}

export const initialEvent: Event = {
  name: "",
  date: moment().format("YYYY-MM-DD"),
  address: "",
  address_url: "",
  start_time: moment().minutes(0).format("HH:mm"),
  end_time: moment().add(1, "hour").minutes(0).format("HH:mm"),
  image: "",
};

export const initialForm: Client = {
  id: undefined,
  slug: "",
  phone: "",
  opening_title: "",
  opening_description: "",
  closing_title: "",
  closing_description: "",
  gift_account_name: "",
  gift_account_number: "",
  gift_bank_name: "",
  name: "",
  package_id: null,
  events: [initialEvent],
  participants: [],
  theme_category_id: null,
  theme_id: null,
};

const initialOrder: Order = {
  id: undefined,
  client_id: undefined,
  admin_fee: 0,
  price: 0,
  order_id: "",
  discount: 0,
  status: "pending",
  created_at: moment().format("DD-MM-YYYY"),
  snap_token: undefined,
};

const useOrderStore = create<StoreState>((set) => ({
  form: initialForm,
  activeStep: 0,
  maxStepReached: 0,
  theme: null,
  pkg: null,
  themes: null,
  isLoading: false,
  fullfilledSteps: [],
  order: initialOrder,
  toggleEndTimes: [false],
  hasRecreateInvoice: false,

  setForm: (
    name: string,
    value:
      | string
      | number
      | Event[]
      | Participant[]
      | string[]
      | null
      | MediaForm
  ) =>
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    })),

  setActiveStep: (step: number) =>
    set((state) => ({
      activeStep: step,
      maxStepReached: Math.max(state.maxStepReached, step),
    })),

  setIsLoading: (isLoading: boolean) => set({ isLoading }),

  setTheme: (theme: Theme) => set({ theme }),

  setPackage: (pkg: Package) => set({ pkg }),

  setFullForm: (form: Client) => set({ form }),

  resetForm: () => set({ form: initialForm }),

  setFullfilledSteps: (fullfilledSteps: boolean[]) => set({ fullfilledSteps }),

  setNewOrder: (order: Omit<Order, "client_id">) => set({ order }),

  setToggleEndTimes: (toggleEndTimes: boolean[]) => set({ toggleEndTimes }),

  setHasRecreateInvoice: (hasRecreateInvoice: boolean) =>
    set({ hasRecreateInvoice }),
}));

export default useOrderStore;
