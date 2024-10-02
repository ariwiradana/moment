import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";
import { ClientV2, Option, Participant, Theme } from "@/lib/types";
import moment from "moment";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const initialParticipants: Participant = {
  name: "",
  nickname: "",
  address: "",
  gender: "female",
  child: "",
  parents_male: "",
  parents_female: "",
};
const initalFormData: ClientV2 = {
  name: "",
  address: "",
  address_full: "",
  address_url: "",
  date: moment().format("YYYY-MM-DD"),
  time: "",
  theme_id: null,
  participants: [initialParticipants],
};

export const useAdminCreateClient = () => {
  const [formData, setFormData] = useState<ClientV2>(initalFormData);
  const [themeOptions, setThemeOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const router = useRouter();

  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(`/api/themes`, fetcher);

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const options: Option[] = themes.data.map((theme) => ({
        label: theme.name,
        value: theme.id,
      }));
      setThemeOptions(options);
      setFormData((state) => ({
        ...state,
        theme_id: Number(options[0].value),
      }));
    }
  }, [themes]);

  const handleChangeClient = (value: string | number, name: string) => {
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleAddAnotherParticipant = () => {
    setFormData((state) => ({
      ...state,
      participants: [...formData.participants, initialParticipants],
    }));
  };

  const handleChangeParticipant = (
    value: string | number,
    name: string,
    index: number
  ) => {
    let currentParticipants: Participant[] = [...formData.participants];

    currentParticipants[index] = {
      ...currentParticipants[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      participants: currentParticipants,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    const createClient = useClient("/api/clientv2", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    toast.promise(createClient, {
      loading: "Creating new client...",
      success: () => {
        router.push("/admin/clients");
        return "Successfully created new client";
      },
      error: (error: any) => {
        return error.message || "Failed to create new client";
      },
    });
  };

  return {
    state: {
      formData,
      themeOptions,
    },
    actions: {
      handleChangeClient,
      handleSubmit,
      handleAddAnotherParticipant,
      handleChangeParticipant,
    },
  };
};
