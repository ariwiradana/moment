import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";
import { Client, Option, Participant, Theme } from "@/lib/types";
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
  image: null,
};
const initalFormData: Client = {
  id: undefined,
  name: "",
  address: "",
  address_full: "",
  address_url: "",
  date: moment().format("YYYY-MM-DD"),
  start_time: moment("06:00", "HH:mm").format("HH:mm"),
  end_time: "Selesai",
  theme_id: null,
  participants: [initialParticipants],
  gallery: [],
};

export const useAdminUpdateClient = (slug: string) => {
  const {
    data: client,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Client[];
  }>(slug ? `/api/client?slug=${slug}` : undefined, fetcher);

  const router = useRouter();

  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(`/api/themes`, fetcher);

  const [formData, setFormData] = useState<Client>(initalFormData);
  const [toggleEndTime, setToggleEndTime] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [themeOptions, setThemeOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const [images, setImages] = useState<FileList | null>(null);

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
      const currentClient: Client = client.data[0];
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
          image: p.image,
        })
      );

      if (currentClient.end_time === "Selesai") {
        setToggleEndTime(true);
      } else {
        setToggleEndTime(false);
      }

      setFormData((state) => ({
        ...state,
        id: currentClient.id,
        name: currentClient.name,
        address: currentClient.address,
        address_url: currentClient.address_url,
        address_full: currentClient.address_full,
        date: currentClient.date,
        start_time: currentClient.start_time,
        end_time: currentClient.end_time,
        theme_id: currentClient.theme_id,
        gallery: currentClient.gallery,
        participants: currentParticipants,
      }));
    }
  }, [client]);

  const handleChangeClient = (
    value: string | number | FileList,
    name: string
  ) => {
    if (name === "images") {
      setImages(value as FileList);
    }
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
    value: string | number | FileList,
    name: string,
    index: number
  ) => {
    let currentParticipants: Participant[] = [...formData.participants];

    currentParticipants[index] = {
      ...currentParticipants[index],
      client_id: client?.data[0].id,
      [name]: value,
    };

    setFormData({
      ...formData,
      participants: currentParticipants,
    });
  };

  const handleUploadGallery = async () => {
    const imageURLs: string[] = [];
    if (images && images.length) {
      const MAX_SIZE = 2 * 1024 * 1024;

      let i = 0;

      if (images instanceof FileList) {
        for (const image of Array.from(images)) {
          i++;
          const toastUpload = toast.loading(
            `Uploading image ${i} of ${images.length}`
          );
          try {
            if (image.size > MAX_SIZE) {
              toast.error(`Image ${i} size to large`, { id: toastUpload });
              continue;
            }
            const res = await fetch(`/api/upload-blob?filename=${image.name}`, {
              method: "POST",
              body: image,
            });
            const result = await res.json();
            if (result.success) {
              toast.success(
                `Image ${i} of ${images.length} uploaded successfully!`,
                { id: toastUpload }
              );
              imageURLs.push(result.data.url);
            }
          } catch (error: any) {
            toast.error(
              error.message || `Error uploading image ${i} of ${images.length}`,
              {
                id: toastUpload,
              }
            );
          }
        }
      }
    }
    return imageURLs;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newGalleryURLs = await handleUploadGallery();
    const updatedParticipant = await handleUploadImageParticipant();

    const modifiedFormdata: Client = { ...formData };
    const currentGallery = Array.isArray(formData.gallery)
      ? formData.gallery
      : [];

    modifiedFormdata["gallery"] = [...currentGallery, ...newGalleryURLs];
    modifiedFormdata["participants"] = updatedParticipant as Participant[];

    const updateClient = useClient(`/api/client?id=${client?.data[0].id}`, {
      method: "PUT",
      body: JSON.stringify(modifiedFormdata),
    });

    toast.promise(updateClient, {
      loading: "Updating client...",
      success: () => {
        mutate();
        setLoading(false);
        router.push("/admin/clients");
        return "Successfully update client";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to update client";
      },
    });
  };

  const handleDeleteImageGallery = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };
      const deleteBlob = useClient(`/api/client/delete-gallery`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.promise(deleteBlob, {
        loading: "Deleting image...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete image";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete image";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImageParticipant = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };
      const deleteBlob = useClient(`/api/client/delete-participant-image`, {
        method: "POST",
        body: JSON.stringify(payload),
      });
      toast.promise(deleteBlob, {
        loading: "Deleting participant image...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete participant image";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete participant image";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleUploadImageParticipant = async () => {
    let participats: Participant[] = formData.participants;

    let i = 0;
    for (const p of participats) {
      i++;
      if (p.image) {
        const image = p.image[0] as File;
        const MAX_SIZE = 2 * 1024 * 1024;

        const toastUpload = toast.loading(`Uploading participant ${i} image`);

        try {
          if (image.size > MAX_SIZE) {
            toast.error(`Image size of participant ${i} is to large`, {
              id: toastUpload,
            });
            continue;
          }

          const res = await fetch(`/api/upload-blob?filename=${image.name}`, {
            method: "POST",
            body: image,
          });
          const result = await res.json();

          if (result.success) {
            toast.success(`Image participant ${i} uploaded successfully!`, {
              id: toastUpload,
            });
            p.image = result.data.url;
          }
        } catch (error: any) {
          toast.error(
            error.message || `Error uploading participant image ${i}`,
            {
              id: toastUpload,
            }
          );
        }
      }
      return participats;
    }
  };

  console.log(formData);

  return {
    state: {
      formData,
      themeOptions,
      toggleEndTime,
      images,
      loading,
      isLoading,
      client,
    },
    actions: {
      handleChangeClient,
      handleSubmit,
      handleAddAnotherParticipant,
      handleChangeParticipant,
      handletoggleEndTime,
      handleDeleteImageGallery,
      handleDeleteImageParticipant,
    },
  };
};
