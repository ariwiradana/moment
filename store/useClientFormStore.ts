import { Client, Event, Participant } from "@/lib/types";
import moment from "moment";
import { create } from "zustand";

interface StoreState {
  category: string;
  form: Client;
  activeStep: number;
  toggleEndTimes: boolean[];
  toggleExpanded: boolean[];
  isLoading: boolean;
  setForm: (
    name: string,
    value: string | number | Event[] | Participant[] | string[] | null
  ) => void;
  setActiveStep: (step: number) => void;
  setToggleEndTimes: (index: number) => void;
  setAddEndTimes: (value: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  resetForm: () => void;
  setCategory: (category: string) => void;
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

const initialForm: Client = {
  slug: "",
  opening_title: "",
  opening_description: "",
  closing_title: "",
  closing_description: "",
  cover: null,
  seo: null,
  gift_account_name: "",
  gift_account_number: "",
  gift_bank_name: "",
  name: "",
  package_id: null,
  events: [initialEvent],
  participants: [],
  theme_category_id: null,
  theme_id: null,
  videos: [],
  gallery: [],
  music: null,
  status: "unpaid",
};

const useClientFormStore = create<StoreState>((set) => ({
  category: "",
  activeStep: 0,
  toggleEndTimes: [false],
  toggleExpanded: [true],
  isLoading: false,
  form: initialForm,
  setForm: (
    name: string,
    value: string | number | Event[] | Participant[] | string[] | null
  ) =>
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    })),
  setActiveStep: (step: number) =>
    set(() => ({
      activeStep: step,
    })),
  setAddEndTimes: (value: boolean) =>
    set((state) => ({
      toggleEndTimes: [...state.toggleEndTimes, value],
    })),
  setToggleEndTimes: (index: number) =>
    set((state) => {
      const updatedToggleEndTimes = [...state.toggleEndTimes];
      updatedToggleEndTimes[index] = !updatedToggleEndTimes[index];
      return {
        toggleEndTimes: updatedToggleEndTimes,
      };
    }),
  setIsLoading: (isLoading: boolean) =>
    set(() => ({
      isLoading,
    })),
  resetForm: () =>
    set(() => ({
      form: initialForm,
    })),
  setCategory: (category: string) =>
    set(() => ({
      category,
    })),
}));

export default useClientFormStore;
