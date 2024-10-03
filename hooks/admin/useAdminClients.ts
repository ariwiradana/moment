import useSWR from "swr";
import { Client } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { useClient } from "@/lib/client";
import toast from "react-hot-toast";

export const useAdminClients = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Client[];
    total_rows: number;
  }>(`/api/client?page=${page}&limit=${limit}`, fetcher);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = (id: number) => {
    const deleteTheme = useClient(`/api/client?id=${id}`, {
      method: "DELETE",
    });
    toast.promise(deleteTheme, {
      loading: "Deleting client...",
      success: () => {
        mutate();
        return "Successfully deleted client";
      },
      error: (error: any) => {
        return error.message || "Failed to delete client";
      },
    });
  };

  const handleCopySlug = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.success("Slug copied successfully");
      })
      .catch((err) => {
        toast.error("Failed to copy slug");
      });
  };

  return {
    state: {
      clients: data?.data || [],
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
      handleCopySlug,
    },
  };
};
