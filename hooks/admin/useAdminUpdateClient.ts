import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";
import {
  Client,
  Event,
  Option,
  Package,
  Participant,
  Theme,
} from "@/lib/types";
import moment from "moment";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { getFilename } from "@/utils/getFilename";

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
  id: undefined,
  name: "",
  theme_id: null,
  package_id: null,
  events: [initialEvent],
  participants: [initialParticipants],
  gallery: [],
  cover: null,
  videos: [],
  music: null,
  opening_title: "",
  opening_description: "",
  closing_title: "",
  closing_description: "",
  gift_bank_name: "",
  gift_account_name: "",
  gift_account_number: "",
};

export const useAdminUpdateClient = (slug: string, token: string | null) => {
  const {
    data: client,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Client[];
  }>(slug && token ? `/api/_c?slug=${slug}` : null, (url: string) =>
    fetcher(url, token)
  );

  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(token ? `/api/_th` : null, (url: string) => fetcher(url, token));

  const { data: packages } = useSWR<{
    success: boolean;
    data: Package[];
  }>(token ? `/api/_p` : null, (url: string) => fetcher(url, token));

  const [formData, setFormData] = useState<Client>(initalFormData);
  const [toggleEndTimes, setToggleEndTimes] = useState<boolean[]>([false]);
  const [loading, setLoading] = useState<boolean>(false);
  const [themeOptions, setThemeOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const [packageOptions, setPackageOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const [galleryImagesForm, setGalleryImagesForm] = useState<FileList | null>(
    null
  );
  const [videosForm, setVideosForm] = useState<string[]>([]);
  const [musicForm, setMusicForm] = useState<File | null>(null);
  const [participantImagesForm, setParticipantImagesForm] = useState<
    (FileList | null)[] | []
  >([]);

  const clearFileInput = () => {
    const galleryInput = document.getElementById("gallery") as HTMLInputElement;
    const musicInput = document.getElementById("music") as HTMLInputElement;

    if (galleryInput) galleryInput.value = "";
    if (musicInput) musicInput.value = "";
    setVideosForm([]);
  };

  useEffect(() => {
    if (packages && packages.data.length > 0) {
      const options: Option[] = packages.data.map((pk) => ({
        label: pk.name,
        value: pk.id as number,
      }));
      setPackageOptions(options);
    }
  }, [packages]);

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const options: Option[] = themes.data.map((theme) => ({
        label: theme.name,
        value: theme.id as number,
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
          facebook: p.facebook,
          twitter: p.twitter,
          instagram: p.instagram,
          tiktok: p.tiktok,
        })
      );

      const currentEvents: Event[] = currentClient.events.map((e) => ({
        id: e.id,
        client_id: currentClient.id,
        name: e.name,
        address: e.address,
        address_url: e.address_url,
        date: e.date,
        start_time: e.start_time,
        end_time: e.end_time,
      }));

      setParticipantImagesForm(
        new Array(currentParticipants.length).fill(null)
      );

      const currentToggleEndtimes: boolean[] = currentClient.events.map((e) =>
        e.end_time === "Selesai" ? true : false
      );
      setToggleEndTimes(currentToggleEndtimes);

      setFormData((state) => ({
        ...state,
        id: currentClient.id,
        name: currentClient.name,
        theme_id: !currentClient.theme_id
          ? (themeOptions[0].value as number)
          : currentClient.theme_id,
        gallery: currentClient.gallery,
        videos: currentClient.videos,
        cover: currentClient.cover,
        participants: currentParticipants,
        events: currentEvents,
        music: currentClient.music,
        package_id: currentClient.package_id,
        opening_title: currentClient.opening_title,
        opening_description: currentClient.opening_description,
        closing_title: currentClient.closing_title,
        closing_description: currentClient.closing_description,
        gift_bank_name: currentClient.gift_bank_name,
        gift_account_number: currentClient.gift_account_number,
        gift_account_name: currentClient.gift_account_name,
      }));
    }
  }, [client, themeOptions, packageOptions]);

  const handleChangeClient = (
    value: string | number | FileList | File | string[],
    name: string
  ) => {
    if (name === "images") {
      setGalleryImagesForm(value as FileList);
    } else if (name === "videos") {
      setVideosForm(value as string[]);
    } else if (name === "music") {
      setMusicForm(value as File);
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    }
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

  const handleAddAnotherParticipant = () => {
    setFormData((state) => ({
      ...state,
      participants: [...formData.participants, initialParticipants],
    }));
    setParticipantImagesForm((state) => [...state, null]);
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

    if (name === "image") {
      let currentParticipantImages = [...participantImagesForm];
      currentParticipantImages[index] = value as FileList;
      setParticipantImagesForm(currentParticipantImages);
    } else {
      currentParticipants[index] = {
        ...currentParticipants[index],
        client_id: client?.data[0].id,
        [name]: value,
      };

      setFormData({
        ...formData,
        participants: currentParticipants,
      });
    }
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

  const handleUploadGallery = async () => {
    const imageURLs: string[] = [];
    if (galleryImagesForm && galleryImagesForm.length) {
      const MAX_SIZE = 5 * 1024 * 1024;

      let i = 0;

      if (galleryImagesForm instanceof FileList) {
        for (const image of Array.from(galleryImagesForm)) {
          i++;
          const toastUpload = toast.loading(
            `Uploading gallery image ${i} of ${galleryImagesForm.length}`
          );
          try {
            if (image.size > MAX_SIZE) {
              toast.error(`Gallery image ${i} size to large`, {
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

            const res = await getClient(`/api/_ub?filename=${filename}`, {
              method: "POST",
              body: image,
            });
            const result = await res.json();
            if (result.success) {
              toast.success(
                `Gallery image ${i} of ${galleryImagesForm.length} uploaded successfully!`,
                { id: toastUpload }
              );
              imageURLs.push(result.data.url);
            }
          } catch (error: any) {
            toast.error(
              error.message ||
                `Error uploading gallery image ${i} of ${galleryImagesForm.length}`
            );
          }
        }
      }
    }
    return imageURLs;
  };

  const handleUploadMusic = async () => {
    let musicURL: string = "";
    if (musicForm) {
      const MAX_SIZE = 5 * 1024 * 1024;
      let i = 0;

      if (musicForm instanceof File) {
        i++;
        const toastUpload = toast.loading(`Uploading music`);
        try {
          if (musicForm.size > MAX_SIZE) {
            toast.error(`Music file size to large`, {
              id: toastUpload,
            });
            return;
          }

          const filename = getFilename(
            "Clients",
            formData.name,
            "Music",
            musicForm.type
          );
          const res = await getClient(`/api/_ub?filename=${filename}`, {
            method: "POST",
            body: musicForm,
          });
          const result = await res.json();
          if (result.success) {
            toast.success(`Music uploaded successfully!`, {
              id: toastUpload,
            });
            musicURL = result.data.url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading music`);
        }
      }
    }
    return musicURL;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newGalleryURLs = await handleUploadGallery();
    const newMusicURL = await handleUploadMusic();
    const updatedParticipant = await handleUploadImageParticipant();

    const modifiedFormdata: Client = { ...formData };
    const currentGallery = Array.isArray(formData.gallery)
      ? formData.gallery
      : [];
    const currentVideos = Array.isArray(formData.videos) ? formData.videos : [];

    modifiedFormdata["gallery"] = [...currentGallery, ...newGalleryURLs];
    modifiedFormdata["videos"] = [...currentVideos, ...videosForm];
    modifiedFormdata["music"] =
      !formData.music && newMusicURL ? newMusicURL : formData.music;
    modifiedFormdata["participants"] = updatedParticipant as Participant[];
    modifiedFormdata["cover"] =
      !formData.cover && newGalleryURLs.length
        ? newGalleryURLs[0]
        : formData.cover;

    const updateClient = async () => {
      const response = await getClient(
        `/api/_c?id=${client?.data[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify(modifiedFormdata),
        },
        token
      );

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      return await response.json();
    };

    toast.promise(updateClient(), {
      loading: "Updating client...",
      success: () => {
        mutate();
        setLoading(false);
        clearFileInput();
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

      const deleteBlob = async () => {
        const response = await getClient(
          `/api/_c/_dg`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteBlob(), {
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

      const deleteBlob = async () => {
        const response = await getClient(
          `/api/_c/_dpi`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteBlob(), {
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
    let currentParticipants: Participant[] = formData.participants;

    for (let i = 0; i < participantImagesForm.length; i++) {
      const file = participantImagesForm[i];

      if (file && file[0]) {
        const image = file[0] as File;
        const MAX_SIZE = 5 * 1024 * 1024;

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

          const res = await getClient(`/api/_ub?filename=${filename}`, {
            method: "POST",
            body: image,
          });

          const result = await res.json();

          if (result.success) {
            toast.success(`Image participant ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });

            if (currentParticipants[i].image) {
              await getClient(
                `/api/_c/delete-participant-image`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    id: currentParticipants[i].id,
                    url: currentParticipants[i].image,
                  }),
                },
                token
              );
            }

            currentParticipants[i].image = result.data.url;
          }
        } catch (error: any) {
          toast.error(
            error.message || `Error uploading participant image ${i + 1}`
          );
        }
      }
    }
    return currentParticipants;
  };

  const handleSetCover = async (url: string, id: number) => {
    const setCover = async () => {
      const response = await getClient(
        `/api/_c/_sc`,
        {
          method: "POST",
          body: JSON.stringify({ url, id }),
        },
        token
      );
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      return await response.json();
    };
    toast.promise(setCover(), {
      loading: "Set cover image...",
      success: () => {
        mutate();
        setLoading(false);
        return "Successfully set cover image";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to set cover image";
      },
    });
  };

  const handleDeleteVideo = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };

      const deleteVideo = async () => {
        const response = await getClient(
          `/api/_c/_dv`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteVideo(), {
        loading: "Deleting video...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete video";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete video";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMusic = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };

      const deleteMusic = async () => {
        const response = await getClient(
          `/api/_c/_dm`,
          {
            method: "POST",
            body: JSON.stringify(payload),
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteMusic(), {
        loading: "Deleting music...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete music";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete music";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = (id: number) => {
    try {
      setLoading(true);

      const deleteEvent = async () => {
        const response = await getClient(
          `/api/_e?id=${encodeURIComponent(id)}`,
          {
            method: "DELETE",
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteEvent(), {
        loading: "Deleting event...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete event";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete event";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteParticipant = (
    id: number,
    imageURL?: string | undefined
  ) => {
    try {
      setLoading(true);

      const deleteParticipant = async () => {
        let url = `/api/_pr?id=${encodeURIComponent(id)}`;

        if (imageURL)
          url = `/api/_pr?id=${encodeURIComponent(
            id
          )}&image_url=${encodeURIComponent(imageURL)}`;

        const response = await getClient(
          url,
          {
            method: "DELETE",
          },
          token
        );
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(deleteParticipant(), {
        loading: "Deleting participant...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete participant";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete participant";
        },
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return {
    state: {
      formData,
      themeOptions,
      packageOptions,
      toggleEndTimes,
      galleryImagesForm,
      loading,
      isLoading,
      client,
      participantImagesForm,
      videosForm,
    },
    actions: {
      handleChangeClient,
      handleSubmit,
      handleAddAnotherParticipant,
      handleChangeParticipant,
      handletoggleEndTime,
      handleDeleteImageGallery,
      handleDeleteImageParticipant,
      handleSetCover,
      handleDeleteVideo,
      handleDeleteMusic,
      handleAddAnotherEvent,
      handleChangeEvent,
      handleDeleteEvent,
      handleDeleteParticipant,
    },
  };
};
