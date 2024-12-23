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
  }>(token ? `/api/_c?page=${page}&limit=${limit}` : null, (url: string) =>
    fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = (id: number) => {
    const deleteTheme = getClient(
      `/api/_c?id=${id}`,
      {
        method: "DELETE",
      },
      token
    );
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

  const handleSetStatus = async (id: number, status: string) => {
    const setStatus = async () => {
      const response = await getClient(
        `/api/_c/_ss`,
        {
          method: "POST",
          body: JSON.stringify({ status, id }),
        },
        token
      );
      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }
      return await response.json();
    };
    toast.promise(setStatus(), {
      loading: `Set status as ${status}...`,
      success: () => {
        mutate();
        return `Successfully set status to ${status}`;
      },
      error: (error: any) => {
        return error.message || `Failed set status to ${status}`;
      },
    });
  };

  const handleSetAsPreview = async (id: number) => {
    const setAsPreview = async () => {
      const response = await getClient(
        `/api/_c/_sp`,
        {
          method: "POST",
          body: JSON.stringify({ is_preview: true, id }),
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
      loading: "Set as preview...",
      success: () => {
        mutate();
        return "Successfully set as preview";
      },
      error: (error: any) => {
        return error.message || "Failed to set as preview";
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
      handleSetStatus,
    },
  };
};
