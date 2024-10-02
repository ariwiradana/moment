import useSWR from "swr";
import { Theme } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";

export const useAdminThemes = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Theme[];
    total_rows: number;
  }>(`/api/themes?page=${page}&limit=${limit}`, fetcher);

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
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
    },
  };
};
