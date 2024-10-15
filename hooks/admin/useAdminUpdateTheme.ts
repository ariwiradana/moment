import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getClient } from "@/lib/client";
import { Option, Package, Theme } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { themeCategoryOptions } from "@/constants/themeCategories";

const initalFormData: Theme = {
  slug: "",
  id: null,
  name: "",
  thumbnail: null,
  category: "Pernikahan",
  package_ids: [],
};

export const useAdminUpdateTheme = (id: number) => {
  const {
    data: themes,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Theme[];
  }>(id ? `/api/themes?id=${id}` : undefined, fetcher);

  const { data: packageResult } = useSWR<{
    success: boolean;
    data: Package[];
  }>(`/api/packages`, fetcher);

  const packages = packageResult?.data || [];

  const [formData, setFormData] = useState<Theme>(initalFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnailImageForm, setThumbnailImageForm] = useState<null | FileList>(
    null
  );

  useEffect(() => {
    if (themes && themes.data.length > 0) {
      const currentTheme: Theme = themes.data[0];

      setFormData((state) => ({
        ...state,
        id: currentTheme.id,
        name: currentTheme.name,
        thumbnail: currentTheme.thumbnail,
        category: currentTheme.category ?? "Pernikahan",
        package_ids: currentTheme.package_ids,
      }));
    }
  }, [themes]);

  const handleChange = (value: string | number | FileList, name: string) => {
    if (name === "thumbnail") {
      setThumbnailImageForm(value as FileList);
    } else if (name === "package_ids") {
      let currentPackages = [...formData.package_ids];
      if (currentPackages.includes(Number(value))) {
        currentPackages = currentPackages.filter((p) => p !== Number(value));
      } else {
        currentPackages.push(Number(value));
      }
      setFormData((state) => ({
        ...state,
        package_ids: currentPackages,
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

    if (thumbInput) thumbInput.value = "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newImageUrl = await handleUploadThumbnail();
    const modifiedFormdata: Theme = { ...formData };
    modifiedFormdata["thumbnail"] = newImageUrl;

    const updateTheme = async () => {
      const response = await getClient(`/api/themes?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(modifiedFormdata),
      });

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
      const MAX_SIZE = 10 * 1024 * 1024;

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
          `/api/upload-blob?filename=Themes/${formData.name}.${
            image.type.split("/")[1]
          }`,
          {
            method: "POST",
            body: image,
          }
        );
        const result = await res.json();
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

  const handleDeleteThumbnail = (url: string, id: number) => {
    try {
      setLoading(true);

      const payload = {
        id,
        url,
      };

      const deleteBlob = async () => {
        const response = await getClient(`/api/themes/delete-thumbnail`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
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
      themeCategoryOptions,
      packages,
    },
    actions: {
      handleChange,
      handleSubmit,
      handleDeleteThumbnail,
    },
  };
};
