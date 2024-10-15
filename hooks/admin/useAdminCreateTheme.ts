import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { getClient } from "@/lib/client";
import { themeCategoryOptions } from "@/constants/themeCategories";
import { Option, Package } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

interface FormData {
  name: string;
  thumbnail: File | string;
  category: string;
  package_ids: number[] | [];
}

const initalFormData: FormData = {
  name: "",
  thumbnail: "",
  category: themeCategoryOptions[0].value as string,
  package_ids: [],
};

export const useAdminCreateTheme = () => {
  const [formData, setFormData] = useState<FormData>(initalFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const { data: packageResult } = useSWR<{
    success: boolean;
    data: Package[];
  }>(`/api/packages`, fetcher);

  const packages = packageResult?.data || [];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      setFormData((state) => ({
        ...state,
        [name]: files,
      }));
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
        [name]: name === "price" ? Number(value) : value,
      }));
    }
  };

  console.log(formData);

  const handleUploadThumbnail = async () => {
    let url = "";
    if (formData.thumbnail) {
      const MAX_SIZE = 10 * 1024 * 1024;

      if (formData.thumbnail instanceof FileList) {
        const image = formData.thumbnail[0];
        const toastUpload = toast.loading(`Uploading thumbnail...`);
        try {
          if (image.size > MAX_SIZE) {
            toast.error(`File size is to large`, { id: toastUpload });
            return;
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
      const response = await getClient("/api/themes", {
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
      themeCategoryOptions,
      packages,
    },
    actions: {
      handleChange,
      handleSubmit,
    },
  };
};
