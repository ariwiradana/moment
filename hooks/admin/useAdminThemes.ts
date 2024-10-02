import useSWR from "swr";
import { Theme } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

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

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    let toastId: string | undefined;
    if (isLoading && !isLoadingRef.current) {
      toastId = toast.loading("Loading theme data...");
    } else if (!isLoading && isLoadingRef.current) {
      if (data) {
        toast.success("Theme data loaded successfully!", {
          id: toastId,
        });
      } else {
        toast.error("Failed to load theme data.", {
          id: toastId,
        });
      }
    }
    isLoadingRef.current = isLoading;
    return () => {
      if (toastId) {
        toast.dismiss(toastId);
      }
    };
  }, [isLoading, data]);

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
