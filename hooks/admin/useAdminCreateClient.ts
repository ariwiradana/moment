import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
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
  image: null,
  address: "",
  address_url: "",
  date: moment().format("YYYY-MM-DD"),
  start_time: moment("06:00", "HH:mm").format("HH:mm"),
  end_time: moment("06:00", "HH:mm").format("HH:mm"),
};

const initalFormData: Client & { coverVideo: FileList | null } = {
  name: "",
  slug: "",
  opening_title: "",
  opening_description: "",
  closing_title: "",
  closing_description: "",
  gift_bank_name: "",
  gift_account_name: "",
  gift_account_number: "",
  theme_id: null,
  package_id: null,
  status: "unpaid",
  participants: [initialParticipant],
  events: [initialEvent],
  gallery: [],
  videos: [],
  cover: null,
  seo: null,
  music: null,
  coverVideo: null,
  theme_category_id: null,
};

export const useAdminCreateClient = (token: string | null) => {
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorState>(initialErrorState);
  const [formData, setFormData] = useState<
    Client & { coverVideo: FileList | null }
  >(initalFormData);
  const [toggleEndTimes, setToggleEndTimes] = useState<boolean[]>([false]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packageOptions, setPackageOptions] = useState<Option[]>([
    {
      label: "",
      value: "",
    },
  ]);
  const [themeOptions, setThemeOptions] = useState<Option[]>([
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
  const { data: themes } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(token ? `/api/_th` : null, (url: string) => fetcher(url, token));

  const { data: packages } = useSWR<{
    success: boolean;
    data: Package[];
  }>(token ? `/api/_p` : null, (url: string) => fetcher(url, token));

  const clientSchema = z.object({
    name: z.string().min(1, { message: "Client name is required." }),
  });

  useEffect(() => {
    if (packages && packages.data.length > 0) {
      const options: Option[] = packages.data.map((theme) => ({
        label: theme.name,
        value: theme.id as number,
      }));
      setPackageOptions(options);
      setFormData((state) => ({
        ...state,
        package_id: Number(options[0].value),
      }));
    }
  }, [packages]);

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const options: Option[] = themes.data.map((theme) => ({
        label: theme.name,
        value: theme.id as number,
      }));
      setThemeOptions(options);
      const initialThemeCategory: ThemeCategory[] =
        themes.data[0].theme_categories || [];
      const initialThemeCategoryOptions: Option[] =
        initialThemeCategory?.map((tc) => ({
          value: Number(tc.id),
          label: tc.name,
        })) ?? [];
      setThemeCategoryOptions(initialThemeCategoryOptions);
      setFormData((state) => ({
        ...state,
        theme_id: Number(options[0].value),
        theme_category_id: Number(initialThemeCategory[0].id),
      }));
    }
  }, [themes]);

  const handleUploadGallery = async () => {
    const imageURLs: string[] = [];
    if (formData.gallery && formData.gallery.length > 0) {
      const MAX_SIZE = 5 * 1024 * 1024;

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

            const fd = new FormData();
            fd.append("file", image);
            const response = await fetch(`/api/_ub`, {
              method: "POST",
              body: fd,
            });
            const result = await response.json();

            if (result.success) {
              toast.success(
                `Gallery image ${i} of ${images.length} uploaded successfully!`,
                { id: toastUpload }
              );
              imageURLs.push(result.data.secure_url);
            }
          } catch (error: any) {
            toast.error(
              error.message ||
                `Error uploading gallery image ${i} of ${images.length}`
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
      const MAX_SIZE = 200 * 1024 * 1024;

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
              toast.error(`Video ${i} size must lower than 200mb`, {
                id: toastUpload,
              });
              continue;
            }

            const fd = new FormData();
            fd.append("file", video);
            const response = await fetch(`/api/_ub`, {
              method: "POST",
              body: fd,
            });
            const result = await response.json();

            if (result.success) {
              toast.success(
                `Video ${i} of ${videos.length} uploaded successfully!`,
                { id: toastUpload }
              );
              videoURLs.push(result.data.secure_url);
            }
          } catch (error: any) {
            toast.error(
              error.message || `Error uploading video ${i} of ${videos.length}`
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

          const fd = new FormData();
          fd.append("file", music);
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Music uploaded successfully!`, { id: toastUpload });
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
    let coverVideoURL: string = "";
    if (formData.coverVideo) {
      const MAX_SIZE = 50 * 1024 * 1024;

      let i = 0;

      if (formData.coverVideo instanceof File) {
        const coverVideo = formData.coverVideo;
        i++;
        const toastUpload = toast.loading(`Uploading cover video`);
        try {
          if (coverVideo.size > MAX_SIZE) {
            toast.error(`Cover video size to large`, {
              id: toastUpload,
            });
            return;
          }

          const fd = new FormData();
          fd.append("file", coverVideo);
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Cover video uploaded successfully!`, {
              id: toastUpload,
            });
            coverVideoURL = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading cover video`);
        }
      }
    }
    return coverVideoURL;
  };

  const handleUploadImageParticipant = async () => {
    let currentParticipants: Participant[] = formData.participants;

    for (let i = 0; i < currentParticipants.length; i++) {
      const file = currentParticipants[i].image;

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
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Image participant ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });
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

    for (let i = 0; i < currentEvents.length; i++) {
      const file = currentEvents[i].image;

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
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Image event ${i + 1} uploaded successfully!`, {
              id: toastUpload,
            });
            currentEvents[i].image = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading event image ${i + 1}`);
        }
      }
    }
    return currentEvents;
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
    value: string | number | FileList | File | string[],
    name: string
  ) => {
    setErrors((state) => ({
      ...state,
      [name]: "",
    }));

    const selectedPackage = packages?.data.find(
      (pk: Package) => pk.id === formData.package_id
    );

    if (name === "gallery") {
      if (
        (value as FileList).length > Number(selectedPackage?.max_gallery_photos)
      ) {
        toast.error(
          `Maximum gallery photos is ${selectedPackage?.max_gallery_photos}`
        );
        const galleryInput = document.getElementById(
          "gallery"
        ) as HTMLInputElement;
        if (galleryInput) galleryInput.value = "";
        setFormData((state) => ({
          ...state,
          gallery: [],
        }));
      }
    }

    if (name === "videos") {
      if ((value as string[]).length > Number(selectedPackage?.max_videos)) {
        toast.error(`Maximum videos is ${selectedPackage?.max_videos}`);
        return;
      }
    }

    if (name === "theme_id") {
      const selectedTheme: Theme = themes?.data.find(
        (th) => th.id === Number(value)
      ) as Theme;
      const options: Option[] =
        selectedTheme.theme_categories?.map((tc) => ({
          label: String(tc.name),
          value: tc.id,
        })) ?? [];
      setThemeCategoryOptions(options);
      setSelectedTheme(selectedTheme as Theme);
      setFormData((state) => ({
        ...state,
        theme_category_id: Number(
          (selectedTheme.theme_categories as ThemeCategory[])[0].id
        ),
      }));
    }

    if (name === "package_id") {
      const selectedPackage = packages?.data.find(
        (pk) => pk.id === Number(value)
      );
      setSelectedPackage(selectedPackage as Package);
    }

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
      const updatedEvent = await handleUploadImageEvent();
      const updatedParticipant = await handleUploadImageParticipant();
      const newMusicURL = await handleUploadMusic();
      const newVideoFileURL = await handleUploadCoverVideo();

      const modifiedFormdata: Client = { ...formData };

      modifiedFormdata["gallery"] = newGalleryURLs;
      modifiedFormdata["videos"] = [
        ...newVideoURLs,
        ...(newVideoFileURL ? [newVideoFileURL as string] : []),
      ];
      modifiedFormdata["music"] = newMusicURL;
      modifiedFormdata["cover"] =
        !formData.cover && newGalleryURLs.length ? newGalleryURLs[0] : null;
      modifiedFormdata["seo"] =
        !formData.cover && newGalleryURLs.length ? newGalleryURLs[0] : null;
      modifiedFormdata["events"] = updatedEvent;
      modifiedFormdata["participants"] = updatedParticipant;

      const createClient = async () => {
        const response = await getClient(
          "/api/_c",
          {
            method: "POST",
            body: JSON.stringify(modifiedFormdata),
          },
          token
        );

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
      packageOptions,
      toggleEndTimes,
      loading,
      errors,
      packages,
      themes,
      selectedTheme,
      selectedPackage,
      themeCategoryOptions,
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
