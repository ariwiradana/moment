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
  gender: "male",
  child: "pertama",
  parents_male: "",
  parents_female: "",
  role: "participant",
  client_id: null,
};
const initalFormData: ClientV2 = {
  name: "",
  address: "",
  address_full: "",
  address_url: "",
  date: moment().format("YYYY-MM-DD"),
  start_time: moment("06:00", "HH:mm").format("HH:mm"),
  end_time: "Selesai",
  theme_id: null,
  participants: [initialParticipants],
};

export const useAdminUpdateClient = (slug: string) => {
  const { data: client, mutate } = useSWR<{
    success: boolean;
    data: ClientV2[];
  }>(slug ? `/api/clientv2?slug=${slug}` : undefined, fetcher);

  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(`/api/themes`, fetcher);

  const [formData, setFormData] = useState<ClientV2>(initalFormData);
  const [toggleEndTime, setToggleEndTime] = useState<boolean>(false);
  const [themeOptions, setThemeOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const router = useRouter();

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const options: Option[] = themes.data.map((theme) => ({
        label: theme.name,
        value: theme.id,
      }));
      setThemeOptions(options);
    }
  }, [themes]);

  useEffect(() => {
    if (client && client.data.length > 0) {
      const currentClient: ClientV2 = client.data[0];
      const currentParticipants: Participant[] = currentClient.participants.map(
        (p) => ({
          id: p.id,
          client_id: currentClient.id,
          name: p.name,
          nickname: p.nickname,
          parents_male: p.parents_male,
          parents_female: p.parents_female,
          address: p.address,
          gender: p.gender,
          child: p.child,
          role: p.role,
        })
      );

      if (currentClient.end_time === "Selesai") {
        setToggleEndTime(true);
      } else {
        setToggleEndTime(false);
      }

      setFormData((state) => ({
        ...state,
        name: currentClient.name,
        address: currentClient.address,
        address_url: currentClient.address_url,
        address_full: currentClient.address_full,
        date: currentClient.date,
        start_time: currentClient.start_time,
        end_time: currentClient.end_time,
        theme_id: currentClient.theme_id,
        participants: currentParticipants,
      }));
    }
  }, [client]);

  const handleChangeClient = (value: string | number, name: string) => {
    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handletoggleEndTime = () => {
    setToggleEndTime(!toggleEndTime);
    setFormData((state) => ({
      ...state,
      end_time: toggleEndTime
        ? moment("06:00", "HH:mm").format("HH:mm")
        : "Selesai",
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
      client_id: client?.data[0].id,
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

    const updateClient = useClient(`/api/clientv2?id=${client?.data[0].id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });

    toast.promise(updateClient, {
      loading: "Updating client...",
      success: () => {
        router.push("/admin/clients");
        return "Successfully update client";
      },
      error: (error: any) => {
        return error.message || "Failed to update client";
      },
    });
  };

  return {
    state: {
      formData,
      themeOptions,
      toggleEndTime,
    },
    actions: {
      handleChangeClient,
      handleSubmit,
      handleAddAnotherParticipant,
      handleChangeParticipant,
      handletoggleEndTime,
    },
  };
};
