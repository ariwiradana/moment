import useSWR from "swr";
import { Client } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";

export const useAdminClients = () => {
  const { data, error, mutate } = useSWR<{ success: boolean; data: Client[] }>(
    "/api/clients",
    fetcher
  );

  return {
    clients: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
