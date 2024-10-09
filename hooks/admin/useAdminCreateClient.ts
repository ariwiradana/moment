import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";
import { Client, Event, Option, Participant, Theme } from "@/lib/types";
import moment from "moment";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { getFilename } from "@/utils/getFilename";
import * as z from "zod";

type ErrorState = Record<string, string>;
const initialErrorState: ErrorState = {};

const initialParticipant: Participant = {
  name: "",
  nickname: "",
  address: "",
  gender: "male",
  child: "pertama",
  parents_male: "",
  parents_female: "",
  role: "participant",
  image: null,
  facebook: null,
  instagram: null,
  twitter: null,
  tiktok: null,
};

const initialEvent: Event = {
  name: "",
  address: "",
  address_url: "",
  date: moment().format("YYYY-MM-DD"),
  start_time: moment("06:00", "HH:mm").format("HH:mm"),
  end_time: moment("06:00", "HH:mm").format("HH:mm"),
};

const initalFormData: Client = {
  name: "",
  theme_id: null,
  status: "unpaid",
  participants: [initialParticipant],
  events: [initialEvent],
  gallery: [],
  videos: [],
  cover: null,
  music: null,
};

export const useAdminCreateClient = () => {
  const [errors, setErrors] = useState<ErrorState>(initialErrorState);
  const [formData, setFormData] = useState<Client>(initalFormData);
  const [toggleEndTimes, setToggleEndTimes] = useState<boolean[]>([false]);
  const [loading, setLoading] = useState<boolean>(false);
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

  const clientSchema = z.object({
    name: z.string().min(1, { message: "Client name is required." }),
  });

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const options: Option[] = themes.data.map((theme) => ({
        label: theme.name,
        value: theme.id as number,
      }));
      setThemeOptions(options);
      setFormData((state) => ({
        ...state,
        theme_id: Number(options[0].value),
      }));
    }
  }, [themes]);

  const handleUploadGallery = async () => {
    const imageURLs: string[] = [];
    if (formData.gallery && formData.gallery.length > 0) {
      const MAX_SIZE = 3 * 1024 * 1024;

      let i = 0;

      if (formData.gallery instanceof FileList) {
        const images = formData.gallery;
        for (const image of Array.from(formData.gallery)) {
          i++;
          const toastUpload = toast.loading(
            `Uploading gallery image ${i} of ${images.length}`
          );
          try {
            if (image.size > MAX_SIZE) {
              toast.error(`Gallery image (${i}) size to large`, {
                id: toastUpload,
              });
              continue;
            }
            const filename = getFilename(
              "Clients",
              formData.name,
              "Gallery",
              image.type
            );
            const res = await useClient(
              `/api/upload-blob?filename=${filename}`,
              {
                method: "POST",
                body: image,
              }
            );
            const result = await res.json();
            if (result.success) {
              toast.success(
                `Gallery image ${i} of ${images.length} uploaded successfully!`,
                { id: toastUpload }
              );
              imageURLs.push(result.data.url);
            }
          } catch (error: any) {
            toast.error(
              error.message ||
                `Error uploading gallery image ${i} of ${images.length}`,
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

  const handleUploadVideos = async () => {
    const videoURLs: string[] = [];
    if (formData.videos && formData.videos.length > 0) {
      const MAX_SIZE = 10 * 1024 * 1024;

      let i = 0;

      if (formData.videos instanceof FileList) {
        const videos = formData.videos;
        for (const video of Array.from(formData.videos)) {
          i++;
          const toastUpload = toast.loading(
            `Uploading video ${i} of ${videos.length}`
          );
          try {
            if (video.size > MAX_SIZE) {
              toast.error(`Video (${i}) size to large`, {
                id: toastUpload,
              });
              continue;
            }
            const filename = getFilename(
              "Clients",
              formData.name,
              "Videos",
              video.type
            );
            const res = await useClient(
              `/api/upload-blob?filename=${filename}`,
              {
                method: "POST",
                body: video,
              }
            );
            const result = await res.json();
            if (result.success) {
              toast.success(
                `Video ${i} of ${videos.length} uploaded successfully!`,
                { id: toastUpload }
              );
              videoURLs.push(result.data.url);
            }
          } catch (error: any) {
            toast.error(
              error.message || `Error uploading video ${i} of ${videos.length}`,
              {
                id: toastUpload,
              }
            );
          }
        }
      }
    }
    return videoURLs;
  };

  const handleUploadMusic = async () => {
    let musicURL: string = "";
    if (formData.music) {
      const MAX_SIZE = 5 * 1024 * 1024;

      let i = 0;

      if (formData.music instanceof File) {
        const music = formData.music;
        i++;
        const toastUpload = toast.loading(`Uploading music`);
        try {
          if (music.size > MAX_SIZE) {
            toast.error(`Music file size to large`, {
              id: toastUpload,
            });
            return;
          }
          const filename = getFilename(
            "Clients",
            formData.name,
            "Music",
            music.type
          );
          const res = await useClient(`/api/upload-blob?filename=${filename}`, {
            method: "POST",
            body: music,
          });
          const result = await res.json();
          if (result.success) {
            toast.success(`Music uploaded successfully!`, { id: toastUpload });
            musicURL = result.data.url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading music`, {
            id: toastUpload,
          });
        }
      }
    }
    return musicURL;
  };

  const handleUploadImageParticipant = async () => {
    let currentParticipants: Participant[] = formData.participants;

    for (let i = 0; i < currentParticipants.length; i++) {
      const file = currentParticipants[i].image;

      if (file && file[0]) {
        const image = file[0] as File;
        const MAX_SIZE = 3 * 1024 * 1024;

        const toastUpload = toast.loading(
          `Uploading participant ${i + 1} image`
        );

        try {
          if (image.size > MAX_SIZE) {
            toast.error(`Image size of participant ${i + 1} is too large`, {
              id: toastUpload,
            });
            continue;
          }

          const filename = getFilename(
            "Clients",
            formData.name,
            "Participants",
            image.type
          );
          const res = await useClient(`/api/upload-blob?filename=${filename}`, {
            method: "POST",
            body: image,
          });

          const result = await res.json();

          if (result.success) {
            toast.success(`Image participant ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });
            currentParticipants[i].image = result.data.url;
          }
        } catch (error: any) {
          toast.error(
            error.message || `Error uploading participant image ${i + 1}`,
            {
              id: toastUpload,
            }
          );
        }
      }
    }
    return currentParticipants;
  };

  const handletoggleEndTime = (index: number) => {
    let currentEvents: Event[] = [...formData.events];
    let currentToggleEndTimes: boolean[] = [...toggleEndTimes];

    currentEvents[index] = {
      ...currentEvents[index],
      end_time: toggleEndTimes[index]
        ? moment("06:00", "HH:mm").format("HH:mm")
        : "Selesai",
    };

    currentToggleEndTimes[index] = !toggleEndTimes[index];
    setFormData((state) => ({ ...state, events: currentEvents }));
    setToggleEndTimes(currentToggleEndTimes);
  };

  const handleChangeClient = (
    value: string | number | FileList | File,
    name: string
  ) => {
    setErrors((state) => ({
      ...state,
      [name]: "",
    }));

    setFormData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleAddAnotherParticipant = () => {
    setFormData((state) => ({
      ...state,
      participants: [...formData.participants, initialParticipant],
    }));
  };

  const handleAddAnotherEvent = () => {
    setFormData((state) => ({
      ...state,
      events: [...formData.events, initialEvent],
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
      [name]: value,
    };

    setFormData({
      ...formData,
      participants: currentParticipants,
    });
  };

  const handleChangeEvent = (
    value: string | number | FileList,
    name: string,
    index: number
  ) => {
    let currentEvents: Event[] = [...formData.events];

    currentEvents[index] = {
      ...currentEvents[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      events: currentEvents,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      clientSchema.parse(formData);
      setLoading(true);

      const newGalleryURLs = await handleUploadGallery();
      const newVideoURLs = await handleUploadVideos();
      const updatedParticipant = await handleUploadImageParticipant();
      const newMusicURL = await handleUploadMusic();

      const modifiedFormdata: Client = { ...formData };

      modifiedFormdata["gallery"] = newGalleryURLs;
      modifiedFormdata["videos"] = newVideoURLs;
      modifiedFormdata["music"] = newMusicURL;
      modifiedFormdata["cover"] =
        !formData.cover && newGalleryURLs.length ? newGalleryURLs[0] : null;
      modifiedFormdata["participants"] = updatedParticipant;

      const createClient = async () => {
        const response = await useClient("/api/client", {
          method: "POST",
          body: JSON.stringify(modifiedFormdata),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(
            errorResult.message || "Failed to create new client."
          );
        }

        return await response.json();
      };

      toast.promise(createClient(), {
        loading: "Creating new client...",
        success: () => {
          setFormData(initalFormData);
          setLoading(false);
          router.push("/admin/clients");
          return "Successfully created new client";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to create new client";
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: ErrorState = {};
        error.errors.forEach((err) => {
          validationErrors[err.path.join(".")] = err.message;
        });
        setErrors(validationErrors);
      }
    }
  };

  return {
    state: {
      formData,
      themeOptions,
      toggleEndTimes,
      loading,
      errors,
    },
    actions: {
      handleChangeClient,
      handleSubmit,
      handleAddAnotherParticipant,
      handleChangeParticipant,
      handletoggleEndTime,
      handleAddAnotherEvent,
      handleChangeEvent,
    },
  };
};
