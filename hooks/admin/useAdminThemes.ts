import useSWR from "swr";
import { Theme } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";

export const useAdminThemes = (token: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(
    token ? `/api/_th?page=${page}&limit=${limit}&order=DESC` : null,
    (url: string) => fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = async (id: number) => {
    const deleteToast = toast.loading("Deleting theme...");
    const res = await getClient(
      `/api/_th?id=${id}`,
      {
        method: "DELETE",
      },
      token
    );
    const result = await res.json();

    if (!result.success) {
      toast.error(result.message, { id: deleteToast });
    } else {
      mutate();
      toast.success(result.message, { id: deleteToast });
    }
  };

  return {
    state: {
      themes: data?.data || [],
      isLoading,
      isError: error,
      page,
      limit,
      toalRows: data?.total_rows || 0,
    },
    actions: {
      mutate,
      handleChangePagination,
      handleDelete,
    },
  };
};
