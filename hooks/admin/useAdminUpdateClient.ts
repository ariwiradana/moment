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
  ThemeCategory,
} from "@/lib/types";
import moment from "moment";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/router";
import { createSlug } from "@/utils/createSlug";

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
  image: null,
  date: moment().format("YYYY-MM-DD"),
  start_time: moment("06:00", "HH:mm").format("HH:mm"),
  end_time: moment("06:00", "HH:mm").format("HH:mm"),
};

const initalFormData: Client & { password: string } = {
  id: undefined,
  name: "",
  slug: "",
  music_title: "",
  theme_id: null,
  package_id: null,
  events: [initialEvent],
  participants: [initialParticipants],
  gallery: [],
  cover: null,
  seo: null,
  videos: [],
  music: null,
  opening_title: "",
  opening_description: "",
  closing_title: "",
  closing_description: "",
  gift_bank_name: "",
  gift_account_name: "",
  gift_account_number: "",
  is_preview: false,
  status: undefined,
  theme_category_id: null,
  password: "",
  media: null,
};

export const useAdminUpdateClient = (slug: string, token: string | null) => {
  const {
    data: client,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Client[];
  }>(slug && token ? `/api/admin/client?slug=${slug}` : null, (url: string) =>
    fetcher(url, token)
  );

  const { data: user } = useSWR(`/api/admin/user?slug=${slug}`, fetcher);

  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Client & { password: string }>(
    initalFormData
  );
  const [toggleEndTimes, setToggleEndTimes] = useState<boolean[]>([false]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
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
  const [themeCategoryOptions, setThemeCategoryOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const [galleryImagesForm, setGalleryImagesForm] = useState<FileList | null>(
    null
  );
  const [coverVideoForm, setCoverVideoForm] = useState<FileList | null>(null);
  const [videosForm, setVideosForm] = useState<string[]>([]);
  const [musicForm, setMusicForm] = useState<File | null>(null);
  const [participantImagesForm, setParticipantImagesForm] = useState<
    (FileList | null)[] | []
  >([]);
  const [eventImagesForm, setEventImagesForm] = useState<
    (FileList | null)[] | []
  >([]);

  const router = useRouter();

  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(
    token && formData.theme_id ? `/api/admin/themes` : null,
    (url: string) => fetcher(url, token),
    {
      onSuccess: (data) => {
        if (formData.theme_id) {
          const selected = data.data.find((t) => t.id === formData.theme_id);
          if (selected) setSelectedTheme(selected);
        }
      },
    }
  );

  const { data: packages } = useSWR<{
    success: boolean;
    data: Package[];
  }>(
    token && formData.package_id ? `/api/admin/packages` : null,
    (url: string) => fetcher(url, token),
    {
      onSuccess: (data) => {
        if (formData.package_id) {
          const selected = data.data.find((p) => p.id === formData.package_id);
          if (selected) setSelectedPackage(selected);
        }
      },
    }
  );

  useEffect(() => {
    if (user) {
      setFormData((state) => ({ ...state, password: user?.password }));
    }
  }, [user]);

  const clearFileInput = () => {
    const galleryInput = document.getElementById("gallery") as HTMLInputElement;
    const videoFileInput = document.getElementById(
      "cover-video"
    ) as HTMLInputElement;
    const musicInput = document.getElementById("music") as HTMLInputElement;

    if (galleryInput) galleryInput.value = "";
    if (videoFileInput) videoFileInput.value = "";
    if (musicInput) musicInput.value = "";
    setGalleryImagesForm(null);
    setVideosForm([]);
    setCoverVideoForm(null);
    setMusicForm(null);
    setCoverVideoForm(null);
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
        image: e.image,
        end_time: e.end_time,
      }));

      setParticipantImagesForm(
        new Array(currentParticipants.length).fill(null)
      );

      setEventImagesForm(new Array(currentEvents.length).fill(null));

      const currentToggleEndtimes: boolean[] = currentClient.events.map((e) =>
        e.end_time === "Selesai" ? true : false
      );
      setToggleEndTimes(currentToggleEndtimes);

      setFormData((state) => ({
        ...state,
        id: currentClient.id,
        name: currentClient.name,
        phone: currentClient.phone,
        slug: currentClient.slug,
        theme_id: !currentClient.theme_id
          ? (themeOptions[0].value as number)
          : currentClient.theme_id,
        gallery: currentClient.gallery,
        videos: currentClient.videos,
        cover: currentClient.cover,
        seo: currentClient.seo,
        participants: currentParticipants,
        events: currentEvents,
        music: currentClient.music,
        package_id: currentClient.package_id,
        music_title: currentClient.music_title,
        opening_title: currentClient.opening_title,
        opening_description: currentClient.opening_description,
        closing_title: currentClient.closing_title,
        closing_description: currentClient.closing_description,
        gift_bank_name: currentClient.gift_bank_name,
        gift_account_number: currentClient.gift_account_number,
        gift_account_name: currentClient.gift_account_name,
        is_preview: currentClient.is_preview,
        status: currentClient.status,
        media: currentClient.media,
        theme_category_id: !currentClient.theme_category_id
          ? (themeCategoryOptions[0].value as number)
          : currentClient.theme_category_id,
      }));
    }
  }, [client, themeOptions, packageOptions]);

  useEffect(() => {
    if (formData.theme_id) {
      if (formData.theme_id) {
        const matchedTheme = themes?.data.find(
          (th) => th.id === formData.theme_id
        );
        const options: Option[] = (
          matchedTheme?.theme_categories as ThemeCategory[]
        )?.map((tc) => ({
          label: tc.name,
          value: tc.id as number,
        }));
        setThemeCategoryOptions(options);
      }
    }
  }, [formData]);

  const handleChangeClient = (
    value: string | number | FileList | File | string[],
    name: string
  ) => {
    if (name === "images") {
      setGalleryImagesForm(value as FileList);
    } else if (name === "theme_id") {
      const selectedTheme: Theme = themes?.data.find(
        (th) => th.id === Number(value)
      ) as Theme;
      setSelectedTheme(selectedTheme as Theme);
      const options: Option[] =
        selectedTheme.theme_categories?.map((tc) => ({
          label: String(tc.name),
          value: tc.id,
        })) ?? [];
      setThemeCategoryOptions(options);
      setFormData((state) => ({
        ...state,
        theme_id: Number(value),
        theme_category_id:
          client?.data[0].theme_category_id ??
          Number((selectedTheme.theme_categories as ThemeCategory[])[0].id),
      }));
    } else if (name === "package_id") {
      const selectedPackage = packages?.data.find(
        (pk) => pk.id === Number(value)
      );
      setSelectedPackage(selectedPackage as Package);
      setFormData((state) => ({
        ...state,
        package_id: Number(value),
      }));
    } else if (name === "videos") {
      setVideosForm(value as string[]);
    } else if (name === "cover-video") {
      setCoverVideoForm(value as FileList);
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
    setEventImagesForm((state) => [...state, null]);
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

    if (name === "image") {
      let currentEventImages = [...eventImagesForm];
      currentEventImages[index] = value as FileList;
      setEventImagesForm(currentEventImages);
    } else {
      currentEvents[index] = {
        ...currentEvents[index],
        [name]: value,
      };

      setFormData({
        ...formData,
        events: currentEvents,
      });
    }
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

            const fd = new FormData();
            fd.append("file", image);
            const response = await fetch(`/api/upload-blob`, {
              method: "POST",
              body: fd,
            });
            const result = await response.json();

            if (result.success) {
              toast.success(
                `Gallery image ${i} of ${galleryImagesForm.length} uploaded successfully!`,
                { id: toastUpload }
              );
              imageURLs.push(result.data.secure_url);
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

          const fd = new FormData();
          fd.append("file", musicForm);
          const response = await fetch(`/api/upload-blob`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Music uploaded successfully!`, {
              id: toastUpload,
            });
            musicURL = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading music`);
        }
      }
    }
    return musicURL;
  };

  const handleUploadCoverVideo = async () => {
    let videoFileURL: string = "";
    if (coverVideoForm) {
      const MAX_SIZE = 100 * 1024 * 1024;
      let i = 0;

      if (coverVideoForm instanceof File) {
        i++;
        const toastUpload = toast.loading(`Uploading cover video`);
        try {
          if (coverVideoForm.size > MAX_SIZE) {
            toast.error(`cover video size to large`, {
              id: toastUpload,
            });
            return;
          }

          const fd = new FormData();
          fd.append("file", coverVideoForm);
          const response = await fetch(`/api/upload-blob`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Cover video uploaded successfully!`, {
              id: toastUpload,
            });
            videoFileURL = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading cover video`);
        }
      }
    }
    return videoFileURL;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newGalleryURLs = await handleUploadGallery();
    const newMusicURL = await handleUploadMusic();
    const newVideoFileURL = await handleUploadCoverVideo();
    const updatedParticipant = await handleUploadImageParticipant();
    const updatedEvent = await handleUploadImageEvent();

    const modifiedFormdata: Client = { ...formData };
    const currentGallery = Array.isArray(formData.gallery)
      ? formData.gallery
      : [];
    const currentVideos = Array.isArray(formData.videos) ? formData.videos : [];

    modifiedFormdata["gallery"] = [...currentGallery, ...newGalleryURLs];
    modifiedFormdata["videos"] = [
      ...currentVideos,
      ...videosForm,
      ...(newVideoFileURL ? [newVideoFileURL as string] : []),
    ];
    modifiedFormdata["music"] =
      !formData.music && newMusicURL ? newMusicURL : formData.music;
    modifiedFormdata["participants"] = updatedParticipant as Participant[];
    modifiedFormdata["events"] = updatedEvent as Event[];
    modifiedFormdata["cover"] =
      !formData.cover && newGalleryURLs.length
        ? newGalleryURLs[0]
        : formData.cover;

    const updateClient = async () => {
      const response = await getClient(
        `/api/admin/client?id=${client?.data[0].id}`,
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
        router.push(`/admin/clients/${createSlug(formData.slug as string)}`);
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
          `/api/admin/client/delete-gallery`,
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
          `/api/admin/participants/delete-image`,
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

          const fd = new FormData();
          fd.append("file", image);
          const response = await fetch(`/api/upload-blob`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Image participant ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });

            if (currentParticipants[i].image) {
              await getClient(
                `/api/admin/participants/delete-image`,
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

            currentParticipants[i].image = result.data.secure_url;
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

  const handleUploadImageEvent = async () => {
    let currentEvents: Event[] = formData.events;

    for (let i = 0; i < eventImagesForm.length; i++) {
      const file = eventImagesForm[i];

      if (file && file[0]) {
        const image = file[0] as File;
        const MAX_SIZE = 5 * 1024 * 1024;

        const toastUpload = toast.loading(`Uploading event ${i + 1} image`);

        try {
          if (image.size > MAX_SIZE) {
            toast.error(`Image size of event ${i + 1} is too large`, {
              id: toastUpload,
            });
            continue;
          }

          const fd = new FormData();
          fd.append("file", image);
          const response = await fetch(`/api/upload-blob`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Image event ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });

            if (currentEvents[i].image) {
              await getClient(
                `/api/admin/event/delete-image`,
                {
                  method: "POST",
                  body: JSON.stringify({
                    id: currentEvents[i].id,
                    url: currentEvents[i].image,
                  }),
                },
                token
              );
            }

            currentEvents[i].image = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(
            error.message || `Error uploading participant image ${i + 1}`
          );
        }
      }
    }
    return currentEvents;
  };

  const handleSetCover = async (url: string, id: number) => {
    const setCover = async () => {
      const response = await getClient(
        `/api/admin/client/cover`,
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

  const handleSetSeoImage = async (url: string, id: number) => {
    const setCover = async () => {
      const response = await getClient(
        `/api/admin/client/seo`,
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
      loading: "Set seo image...",
      success: () => {
        mutate();
        setLoading(false);
        return "Successfully set seo image";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to set seo image";
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
          `/api/admin/client/delete-video`,
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
          `/api/admin/client/delete-music`,
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
          `/api/admin/event?id=${encodeURIComponent(id)}`,
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

  const handleDeleteImageEvent = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };

      const deleteBlob = async () => {
        const response = await getClient(
          `/api/admin/event/delete-image`,
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
        loading: "Deleting event image...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete event image";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete event image";
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
        let url = `/api/admin/participants?id=${encodeURIComponent(id)}`;

        if (imageURL)
          url = `/api/admin/participants?id=${encodeURIComponent(
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

  const handleToggleShowPassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleChangePassword = async () => {
    const changePassword = async () => {
      const response = await getClient(
        "/api/auth/password",
        {
          method: "POST",
          body: JSON.stringify({
            username: formData.slug,
            password: formData.password,
            role: "client",
          }),
        },
        token
      );

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(
          errorResult.message || "Failed to change client password"
        );
      }

      return await response.json();
    };

    toast.promise(changePassword(), {
      loading: "Changing client password...",
      success: () => {
        setLoading(false);
        setFormData((state) => ({ ...state, password: "" }));
        setShowChangePassword(false);
        return "Client password successfully changed";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to change client password";
      },
    });
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
      themeCategoryOptions,
      selectedPackage,
      selectedTheme,
      user,
      showChangePassword,
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
      handleSetSeoImage,
      handleDeleteImageEvent,
      handleToggleShowPassword,
      handleChangePassword,
    },
  };
};
