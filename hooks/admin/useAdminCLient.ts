import useSWR from "swr";
import { ClientV2 } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export const useAdminClient = (slug: string) => {
  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: ClientV2[];
  }>(slug ? `/api/clientv2?slug=${slug}` : undefined, fetcher);

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

  return {
    client: data?.data[0] || null,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
