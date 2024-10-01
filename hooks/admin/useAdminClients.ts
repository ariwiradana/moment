import useSWR from "swr";
import { ClientV2 } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";

export const useAdminClients = () => {
  const { data, error, mutate } = useSWR<{
    success: boolean;
    data: ClientV2[];
  }>("/api/clientv2", fetcher);

  return {
    clients: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
