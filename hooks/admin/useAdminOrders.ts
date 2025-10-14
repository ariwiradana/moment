import useSWR from "swr";
import { Order } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";

export const useAdminOrders = (token: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Order[];
    total_rows: number;
  }>(
    token ? `/api/admin/orders?page=${page}&limit=${limit}` : null,
    (url: string) => fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = async (id: number) => {
    const toastId = toast.loading("Menghapus order...");
    try {
      const res = await getClient(
        `/api/admin/orders/delete?id=${id}`,
        {
          method: "DELETE",
        },
        token
      );
      const result = await res.json();
      if (result.success) {
        mutate();
        toast.success(result.message, { id: toastId });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  const handleSetStatus = async (id: number, status: string) => {
    const setStatus = async () => {
      const response = await getClient(
        `/api/admin/orders/status`,
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

  return {
    state: {
      orders: data?.data || [],
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
      handleSetStatus,
    },
  };
};
