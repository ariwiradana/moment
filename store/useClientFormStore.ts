import { Client, Event, Participant } from "@/lib/types";
import moment from "moment";
import { create } from "zustand";

interface StoreState {
  form: Client;
  activeStep: number;
  toggleEndTimes: boolean[];
  toggleExpanded: boolean[];
  setForm: (
    name: string,
    value: string | number | Event[] | Participant[]
  ) => void;
  setActiveStep: (step: number) => void;
  setToggleEndTimes: (index: number) => void;
  setAddEndTimes: (value: boolean) => void;
}

export const initialEvent: Event = {
  name: "",
  date: moment().format("YYYY-MM-DD"),
  address: "",
  address_url: "",
  start_time: "",
  end_time: "",
  image: "",
};

const useClientFormStore = create<StoreState>((set) => ({
  activeStep: 0,
  toggleEndTimes: [false],
  toggleExpanded: [true],
  form: {
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
    participants: [
      {
        name: "",
        nickname: "",
        gender: "male",
        child: "",
        image: "",
        address: "",
        parents_female: "",
        parents_male: "",
        role: "groom",
        facebook: "",
        instagram: "",
        tiktok: "",
        twitter: "",
      },
      {
        name: "",
        nickname: "",
        gender: "female",
        child: "",
        image: "",
        address: "",
        parents_female: "",
        parents_male: "",
        role: "bride",
        facebook: "",
        instagram: "",
        tiktok: "",
        twitter: "",
      },
    ],
    theme_category_id: null,
    theme_id: null,
    videos: [],
    gallery: [],
    music: null,
  },
  setForm: (name: string, value: string | number | Event[] | Participant[]) =>
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
}));

export default useClientFormStore;
