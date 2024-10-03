import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useClient } from "@/lib/client";
import { getFilename } from "@/utils/getFilename";

interface FormData {
  name: string;
  price: number;
  thumbnail: File | string;
}

const initalFormData: FormData = {
  name: "",
  price: 0,
  thumbnail: "",
};

export const useAdminCreateTheme = () => {
  const [formData, setFormData] = useState<FormData>(initalFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    setFormData((state) => ({
      ...state,
      [name]:
        name === "price" ? Number(value) : name === "thumbnail" ? files : value,
    }));
  };

  const handleUploadThumbnail = async () => {
    let url = "";
    if (formData.thumbnail) {
      const MAX_SIZE = 2 * 1024 * 1024;

      if (formData.thumbnail instanceof FileList) {
        const image = formData.thumbnail[0];
        const toastUpload = toast.loading(`Uploading thumbnail...`);
        try {
          if (image.size > MAX_SIZE) {
            toast.error(`File size is to large`, { id: toastUpload });
            return;
          }

          const filename = getFilename("thumbnail", formData.name, image.type);
          const res = await fetch(`/api/upload-blob?filename=${filename}`, {
            method: "POST",
            body: image,
          });
          const result = await res.json();
          if (result.success) {
            toast.success(`Thumbnail uploaded successfully!`, {
              id: toastUpload,
            });
            url = result.data.url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading thumbnail`, {
            id: toastUpload,
          });
        }
      }
    }
    return url as string;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const thumbnailURL = await handleUploadThumbnail();

    const modifiedFormdata = { ...formData };
    modifiedFormdata["thumbnail"] = thumbnailURL ?? "";

    const createTheme = async () => {
      const response = await useClient("/api/themes", {
        method: "POST",
        body: JSON.stringify(modifiedFormdata),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      return await response.json();
    };

    toast.promise(createTheme(), {
      loading: "Creating new theme...",
      success: () => {
        setLoading(false);
        router.push("/admin/themes");
        return "Successfully created new theme";
      },
      error: (error: any) => {
        setLoading(false);
        return error.message || "Failed to create new theme";
      },
    });
  };

  return {
    state: {
      formData,
      loading,
    },
    actions: {
      handleChange,
      handleSubmit,
    },
  };
};
