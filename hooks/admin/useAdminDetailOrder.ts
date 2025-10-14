import { Order } from "@/lib/types";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

export const useAdminDetailOrder = (id: number, token: string | null) => {
  const {
    data: orders,
    mutate,
    isLoading,
  } = useSWR<{
    success: boolean;
    data: Order[];
  }>(id ? `/api/admin/orders?id=${id}` : undefined, (url: string) =>
    fetcher(url, token)
  );

  const handlePrint = () => window.print();

  return {
    state: {
      order: orders?.data[0],
      isLoading,
    },
    actions: {
      handlePrint,
      mutate,
    },
  };
};
