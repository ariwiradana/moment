import { Client } from "@/lib/types";
import { create } from "zustand";

interface Form {
  text: string;
  guest: string;
}

interface StoreState {
  form: Form;
  setForm: (name: string, value: string) => void;
  resetForm: () => void;
}

const initialForm: Form = {
  text: "",
  guest: "",
};

const useAddGuestStore = create<StoreState>((set) => ({
  form: initialForm,

  setForm: (name, value) =>
    set((state) => ({
      form: {
        ...state.form,
        [name]: value,
      },
    })),
  resetForm: () =>
    set(() => ({
      form: initialForm,
    })),
}));

export default useAddGuestStore;
