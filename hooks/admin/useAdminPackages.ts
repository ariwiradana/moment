import useSWR from "swr";
import { Package } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { getClient } from "@/lib/client";
import { debounce } from "@/utils/debounce";
import toast from "react-hot-toast";

export const useAdminPackages = (token: string | null) => {
  const [form, setForm] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Package[];
  }>(token ? `/api/admin/packages` : null, (url: string) =>
    fetcher(url, token)
  );

  useEffect(() => {
    if (data?.data) {
      setForm(data.data);
    }
  }, [data]);

  const handleChange = async (
    value: boolean | string | number,
    name: string,
    id: number
  ) => {
    const newForm: Package[] = [...form];
    const index = newForm.findIndex((pkg) => pkg.id === id);

    newForm[index] = {
      ...newForm[index],
      [name]: value,
    };
    setForm(newForm);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const allPackages: Package[] = [...form];
    for (const pk of allPackages) {
      try {
        console.log({ pk });
        const response = await getClient(
          `/api/admin/packages`,
          {
            method: "PUT",
            body: JSON.stringify(pk),
          },
          token
        );

        const result = await response.json();
        if (result.success) {
          toast.success(result.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to update package");
      }
    }
    toast.dismiss();
    mutate();
    setLoading(false);
  };

  return {
    state: {
      packages: data?.data || [],
      isLoading,
      isError: error,
      form,
      loading,
    },
    actions: {
      mutate,
      handleChange,
      handleSubmit,
    },
  };
};
