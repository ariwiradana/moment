import useSWR from "swr";
import { Theme } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";

export const useAdminThemes = () => {
  const { data, error, mutate } = useSWR<{ success: boolean; data: Theme[] }>(
    "/api/themes",
    fetcher
  );

  return {
    themes: data?.data || [],
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};
