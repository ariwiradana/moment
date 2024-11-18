import useSWR from "swr";
import { Testimonials } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";

export const useAdminTestimonials = (token: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Testimonials[];
    total_rows: number;
  }>(token ? `/api/_ts?page=${page}&limit=${limit}` : null, (url: string) =>
    fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = (id: number) => {
    const deleteTestimonial = getClient(
      `/api/_ts?id=${id}`,
      {
        method: "DELETE",
      },
      token
    );
    toast.promise(deleteTestimonial, {
      loading: "Deleting testimonials...",
      success: () => {
        mutate();
        return "Successfully deleted testimonials";
      },
      error: (error: any) => {
        return error.message || "Failed to delete testimonials";
      },
    });
  };

  return {
    state: {
      testimonials: data?.data || [],
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
