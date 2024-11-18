import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getClient } from "@/lib/client";
import { Option, Package, Theme, ThemeCategory } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const initalFormData: Theme = {
  slug: "",
  id: null,
  name: "",
  thumbnail: null,
  phone_thumbnail: null,
  package_ids: [],
  theme_category_ids: [],
  cover_video: false,
};

export const useAdminUpdateTheme = (id: number, token: string | null) => {
  const {
    data: themes,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Theme[];
  }>(id ? `/api/_th?id=${id}` : undefined, (url: string) =>
    fetcher(url, token)
  );

  const { data: packageResult } = useSWR<{
    success: boolean;
    data: Package[];
  }>(`/api/_p`, (url: string) => fetcher(url, token));

  const { data: themeCategoryResults } = useSWR<{
    success: boolean;
    data: ThemeCategory[];
  }>(`/api/_tc`, (url: string) => fetcher(url, token));

  const packages = packageResult?.data || [];
  const themeCategories = themeCategoryResults?.data || [];

  const [formData, setFormData] = useState<Theme>(initalFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnailImageForm, setThumbnailImageForm] = useState<null | FileList>(
    null
  );
  const [phoneThumbnailImageForm, setPhoneThumbnailImageForm] =
    useState<null | FileList>(null);

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const currentTheme: Theme = themes.data[0];

      setFormData((state) => ({
        ...state,
        id: currentTheme.id,
        name: currentTheme.name,
        thumbnail: currentTheme.thumbnail,
        phone_thumbnail: currentTheme.phone_thumbnail,
        category: currentTheme.category ?? "Pernikahan",
        package_ids: currentTheme.package_ids ?? [],
        theme_category_ids: currentTheme.theme_category_ids ?? [],
        cover_video: currentTheme.cover_video,
      }));
    }
  }, [themes]);

  const handleChange = (
    value: string | number | FileList | boolean,
    name: string
  ) => {
    if (name === "thumbnail") {
      setThumbnailImageForm(value as FileList);
    } else if (name === "phone_thumbnail") {
      setPhoneThumbnailImageForm(value as FileList);
    } else if (name === "package_ids" || name === "theme_category_ids") {
      let currentValues = [...formData[name]];
      if (currentValues.includes(Number(value))) {
        currentValues = currentValues.filter((p) => p !== Number(value));
      } else {
        currentValues.push(Number(value));
      }
      setFormData((state) => ({
        ...state,
        [name]: currentValues,
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const clearFileInput = () => {
    const thumbInput = document.getElementById("thumbnail") as HTMLInputElement;
    const phoneThumbInput = document.getElementById(
      "phone_thumbnail"
    ) as HTMLInputElement;
    if (thumbInput) thumbInput.value = "";
    if (phoneThumbInput) phoneThumbInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newThumbnailURL = await handleUploadThumbnail();
    const newPhoneThumbnailURL = await handleUploadPhoneThumbnail();
    const modifiedFormdata: Theme = { ...formData };
    modifiedFormdata["thumbnail"] = newThumbnailURL;
    modifiedFormdata["phone_thumbnail"] = newPhoneThumbnailURL;

    const updateTheme = async () => {
      const response = await getClient(
        `/api/_th?id=${id}`,
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

    toast.promise(updateTheme(), {
      loading: "Updating theme...",
      success: () => {
        mutate();
        setLoading(false);
        clearFileInput();
        return "Successfully update theme";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to update theme";
      },
    });
  };

  const handleUploadThumbnail = async () => {
    let imageURL = formData.thumbnail;
    if (thumbnailImageForm && thumbnailImageForm.length) {
      const MAX_SIZE = 5 * 1024 * 1024;

      let i = 0;

      const toastUpload = toast.loading(`Uploading thuimbnail image...`);
      try {
        const image = thumbnailImageForm[0];
        if (image.size > MAX_SIZE) {
          toast.error(`Thumbnnail image size to large`, {
            id: toastUpload,
          });
        }

        const res = await getClient(
          `/api/_ub?filename=Themes/${formData.name}.${
            image.type.split("/")[1]
          }`,
          {
            method: "POST",
            body: image,
          }
        );
        const result = await res.json();
        console.log({ result });
        if (result.success) {
          toast.success(`Thumbnail image uploaded successfully!`, {
            id: toastUpload,
          });
          imageURL = result.data.url;
        }
      } catch (error: any) {
        toast.error(error.message || `Error uploading thumbnail image`, {
          id: toastUpload,
        });
      }
    }
    return imageURL;
  };

  const handleUploadPhoneThumbnail = async () => {
    let imageURL = formData.phone_thumbnail;
    if (phoneThumbnailImageForm && phoneThumbnailImageForm.length) {
      const MAX_SIZE = 5 * 1024 * 1024;

      let i = 0;

      const toastUpload = toast.loading(`Uploading phone thumbnail image...`);
      try {
        const image = phoneThumbnailImageForm[0];
        if (image.size > MAX_SIZE) {
          toast.error(`Phone thumbnnail image size to large`, {
            id: toastUpload,
          });
        }

        const res = await getClient(
          `/api/_ub?filename=Themes/Phone ${formData.name}.${
            image.type.split("/")[1]
          }`,
          {
            method: "POST",
            body: image,
          }
        );
        const result = await res.json();
        if (result.success) {
          toast.success(`Phone thumbnail image uploaded successfully!`, {
            id: toastUpload,
          });
          imageURL = result.data.url;
        }
      } catch (error: any) {
        toast.error(error.message || `Error uploading phone thumbnail image`, {
          id: toastUpload,
        });
      }
    }
    return imageURL;
  };

  const handleDeleteThumbnail = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };

      const deleteBlob = async () => {
        const response = await getClient(
          `/api/_th/_dt`,
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
        loading: "Deleting thumbnail image...",
        success: () => {
          mutate();
          setLoading(false);
          return "Successfully delete thumbnail image";
        },
        error: (error: any) => {
          setLoading(false);
          return error.message || "Failed to delete thumbnail image";
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
      isLoading,
      loading,
      thumbnailImageForm,
      packages,
      themeCategories,
    },
    actions: {
      handleChange,
      handleSubmit,
      handleDeleteThumbnail,
    },
  };
};
