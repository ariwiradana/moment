import {
  Client,
  Event,
  MediaForm,
  Package,
  Participant,
  Theme,
} from "@/lib/types";
import moment from "moment";
import { create } from "zustand";

interface StoreState {
  form: Omit<Client, "cover" | "seo">;
  activeStep: number;
  maxStepReached: number;
  theme: Theme | null;
  pkg: Package | null;
  isLoading: boolean;
  fullfilledSteps: boolean[];
  withPayment: boolean;
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
  setFullForm: (form: Omit<Client, "cover" | "seo">) => void;
  setFullfilledSteps: (fullfilledSteps: boolean[]) => void;
  setWithPayment: (withPayment: boolean) => void;
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

export const initialForm: Omit<Client, "cover" | "seo"> = {
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
  music: null,
  status: "unpaid",
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
  withPayment: true,

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

  setFullForm: (form: Omit<Client, "cover" | "seo">) => set({ form }),

  resetForm: () => set({ form: initialForm }),

  setFullfilledSteps: (fullfilledSteps: boolean[]) => set({ fullfilledSteps }),

  setWithPayment: (withPayment: boolean) => set({ withPayment }),
}));

export default useOrderStore;
