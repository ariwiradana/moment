import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";
import { Theme } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { getFilename } from "@/utils/getFilename";

const initalFormData: Theme = {
  id: null,
  name: "",
  thumbnail: null,
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

  const router = useRouter();

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
      }));
    }
  }, [themes]);

  const handleChange = (value: string | number | FileList, name: string) => {
    if (name === "thumbnail") {
      setThumbnailImageForm(value as FileList);
    } else {
      setFormData((state) => ({
        ...state,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const newImageUrl = await handleUploadThumbnail();
    const modifiedFormdata: Theme = { ...formData };
    modifiedFormdata["thumbnail"] = newImageUrl;

    const updateTheme = async () => {
      const response = await useClient(`/api/themes?id=${id}`, {
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
        return "Successfully update theme";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to update theme";
      },
    });
  };

  const handleUploadThumbnail = async () => {
    let imageURL: string = "";
    if (thumbnailImageForm && thumbnailImageForm.length) {
      const MAX_SIZE = 3 * 1024 * 1024;

      let i = 0;

      const toastUpload = toast.loading(`Uploading thuimbnail image...`);
      try {
        const image = thumbnailImageForm[0];
        if (image.size > MAX_SIZE) {
          toast.error(`Thumbnnail image size to large`, {
            id: toastUpload,
          });
        }

        const filename = getFilename(
          "theme-thumbnail",
          formData.name,
          image.type
        );
        const res = await fetch(`/api/upload-blob?filename=${filename}`, {
          method: "POST",
          body: image,
        });
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
        const response = await useClient(`/api/themes/delete-thumbnail`, {
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
    },
    actions: {
      handleChange,
      handleSubmit,
      handleDeleteThumbnail,
    },
  };
};
