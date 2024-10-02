import useSWR from "swr";
import { ClientV2 } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export const useAdminClients = () => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: ClientV2[];
    total_rows: number;
  }>(`/api/clientv2?page=${page}&limit=${limit}`, fetcher);

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    let toastId: string | undefined;
    if (isLoading && !isLoadingRef.current) {
      toastId = toast.loading("Loading client data...");
    } else if (!isLoading && isLoadingRef.current) {
      if (data) {
        toast.success("Client data loaded successfully!", {
          id: toastId,
        });
      } else {
        toast.error("Failed to load client data.", {
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

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
  setPage(value);
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
    },
  };
};
