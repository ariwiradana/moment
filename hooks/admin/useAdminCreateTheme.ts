import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getClient } from "@/lib/client";
import { Package, ThemeCategory } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface Form {
  name: string;
  thumbnail: FileList | null | string;
  phone_thumbnail: FileList | null | string;
  package_ids: Number[];
  theme_category_ids: Number[];
  cover_video: boolean;
}

const initalFormData: Form = {
  name: "",
  thumbnail: null,
  phone_thumbnail: null,
  package_ids: [],
  theme_category_ids: [],
  cover_video: false,
};

export const useAdminCreateTheme = (token: string | null) => {
  const [formData, setFormData] = useState<Form>(initalFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: packageResult } = useSWR<{
    success: boolean;
    data: Package[];
  }>(token ? `/api/_p` : null, (url: string) => fetcher(url, token));

  const { data: themeCategoryResults } = useSWR<{
    success: boolean;
    data: ThemeCategory[];
  }>(token ? `/api/_tc` : null, (url: string) => fetcher(url, token));

  const packages = packageResult?.data || [];
  const themeCategories = themeCategoryResults?.data || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      ["thumbnail", "phone_thumbnail"].includes(name) &&
      e.target.type === "file"
    ) {
      const files = e.target.files;
      if (files && files.length > 0) {
        setFormData((state) => ({
          ...state,
          [name]: files,
        }));
      }
    } else if (name === "package_ids" || name === "theme_category_ids") {
      let currentValues: Number[] = [...formData[name]];
      if (currentValues.includes(Number(value))) {
        currentValues = currentValues.filter((v) => v !== Number(value));
      } else {
        currentValues.push(Number(value));
      }
      setFormData((state) => ({
        ...state,
        [name]: currentValues,
      }));
    } else if (name === "cover_video") {
      setFormData((state) => ({
        ...state,
        cover_video: !JSON.parse(value),
      }));
    } else {
      setFormData((state) => ({
        ...state,
        [name]: name === "price" ? Number(value) : value,
      }));
    }
  };

  const handleUploadThumbnail = async () => {
    let url = "";
    if (formData.thumbnail) {
      const MAX_SIZE = 5 * 1024 * 1024;

      if (formData.thumbnail instanceof FileList) {
        const image = formData.thumbnail[0];
        const toastUpload = toast.loading(`Uploading thumbnail...`);
        try {
          if (image.size > MAX_SIZE) {
            toast.error(`File size is to large`, { id: toastUpload });
            return;
          }

          const fd = new FormData();
          fd.append("file", image);
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Thumbnail uploaded successfully!`, {
              id: toastUpload,
            });
            url = result.data.secure_url;
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
  const handleUploadPhoneThumbnail = async () => {
    let url = "";
    if (formData.phone_thumbnail) {
      const MAX_SIZE = 5 * 1024 * 1024;

      if (formData.phone_thumbnail instanceof FileList) {
        const image = formData.phone_thumbnail[0];
        const toastUpload = toast.loading(`Uploading phone thumbnail...`);
        try {
          if (image.size > MAX_SIZE) {
            toast.error(`File size is to large`, { id: toastUpload });
            return;
          }

          const fd = new FormData();
          fd.append("file", image);
          const response = await fetch(`/api/_ub`, {
            method: "POST",
            body: fd,
          });
          const result = await response.json();

          if (result.success) {
            toast.success(`Phone thumbnail uploaded successfully!`, {
              id: toastUpload,
            });
            url = result.data.secure_url;
          }
        } catch (error: any) {
          toast.error(error.message || `Error uploading phone thumbnail`, {
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
    const phoneThumbnailURL = await handleUploadPhoneThumbnail();

    const modifiedFormdata = { ...formData };
    modifiedFormdata["thumbnail"] = thumbnailURL ?? null;
    modifiedFormdata["phone_thumbnail"] = phoneThumbnailURL ?? null;

    const createTheme = async () => {
      const response = await getClient(
        "/api/_th",
        {
          method: "POST",
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
      packages,
      themeCategories,
    },
    actions: {
      handleChange,
      handleSubmit,
    },
  };
};
