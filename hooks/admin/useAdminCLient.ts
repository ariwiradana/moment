import useSWR from "swr";
import { ClientV2 } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";

export const useAdminClient = (slug: string) => {
  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: ClientV2[];
  }>(slug ? `/api/clientv2?slug=${slug}` : undefined, fetcher);

  return {
    state: {
      client: data?.data[0] || null,
      isLoading,
      isError: error,
    },
    actions: {
      mutate,
    },
  };
};
