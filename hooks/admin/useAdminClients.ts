import useSWR from "swr";
import { Client } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";

export const useAdminClients = (token: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Client[];
    total_rows: number;
  }>(token ? `/api/admin/client?page=${page}&limit=${limit}` : null, (url: string) =>
    fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = (id: number) => {
    const deleteClient = getClient(
      `/api/admin/client?id=${id}`,
      {
        method: "DELETE",
      },
      token
    );
    toast.promise(deleteClient, {
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

  const handleCopyURL = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.success("URL copied successfully");
      })
      .catch((err) => {
        toast.error("Failed to copy URL");
      });
  };

  const handleSetAsPreview = async (id: number, is_preview: boolean) => {
    const setAsPreview = async () => {
      const response = await getClient(
        `/api/admin/client/preview`,
        {
          method: "POST",
          body: JSON.stringify({ is_preview, id }),
        },
        token
      );
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      return await response.json();
    };
    toast.promise(setAsPreview(), {
      loading: is_preview ? "Set as preview..." : "Disable as preview...",
      success: () => {
        mutate();
        return is_preview
          ? "Successfully set as preview"
          : "Successfully disable as preview";
      },
      error: (error: any) => {
        return error.message || is_preview
          ? "Failed set as preview..."
          : "Failed disable as preview...";
      },
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
      handleCopyURL,
      handleSetAsPreview,
    },
  };
};
