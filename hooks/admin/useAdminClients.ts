import useSWR from "swr";
import { Client } from "@/lib/types";
import { fetcher } from "@/lib/fetcher";
import { useState } from "react";
import { getClient } from "@/lib/client";
import toast from "react-hot-toast";

export const useAdminClients = (token: string | null) => {
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

  const { data, error, mutate, isLoading } = useSWR<{
    success: boolean;
    data: Client[];
    total_rows: number;
  }>(
    token ? `/api/admin/client?page=${page}&limit=${limit}` : null,
    (url: string) => fetcher(url, token)
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleDelete = (id: number) => {
    const deleteClient = getClient(
      `/api/admin/client?id=${id}`,
      { method: "DELETE" },
      token
    );

    toast.promise(deleteClient, {
      loading: "Menghapus klien...",
      success: () => {
        mutate();
        return "Klien berhasil dihapus";
      },
      error: (error: any) => {
        return error.message || "Gagal menghapus klien";
      },
    });
  };

  const handleCopyURL = (slug: string) => {
    navigator.clipboard
      .writeText(slug)
      .then(() => {
        toast.success("URL berhasil disalin");
      })
      .catch(() => {
        toast.error("Gagal menyalin URL");
      });
  };

  const handleSetAsPreview = async (id: number, is_preview: boolean) => {
    const setAsPreview = async () => {
      const res = await getClient(
        "/api/admin/client/preview",
        {
          method: "POST",
          body: JSON.stringify({ id, is_preview }),
        },
        token
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      return data;
    };

    toast.promise(setAsPreview(), {
      loading: is_preview
        ? "Mengaktifkan sebagai preview..."
        : "Menonaktifkan preview...",
      success: () => {
        mutate();
        return is_preview
          ? "Berhasil diatur sebagai preview"
          : "Berhasil menonaktifkan preview";
      },
      error: (error: any) => {
        return (
          error.message ||
          (is_preview
            ? "Gagal mengatur sebagai preview"
            : "Gagal menonaktifkan preview")
        );
      },
    });
  };

  const handleChangeStatus = async (id: number, status: string) => {
    const statusMessages = (status: string) => {
      switch (status) {
        case "active":
          return {
            loading: "Mengaktifkan klien...",
            success: "Berhasil mengaktifkan klien",
            error: "Gagal mengaktifkan klien",
          };
        case "inactive":
          return {
            loading: "Menonaktifkan klien...",
            success: "Berhasil menonaktifkan klien",
            error: "Gagal menonaktifkan klien",
          };
        case "done":
          return {
            loading: "Menandai klien sebagai selesai...",
            success: "Berhasil menandai klien sebagai selesai",
            error: "Gagal menandai klien sebagai selesai",
          };
        default:
          return {
            loading: "Memproses status klien...",
            success: "Berhasil memperbarui status klien",
            error: "Gagal memperbarui status klien",
          };
      }
    };

    const messages = statusMessages(status);

    toast.promise(
      (async () => {
        const res = await getClient(
          "/api/admin/client/status",
          {
            method: "POST",
            body: JSON.stringify({ id, status }),
          },
          token
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        mutate();
        return data;
      })(),
      {
        loading: messages.loading,
        success: messages.success,
        error: messages.error,
      }
    );
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
      handleDelete,
      handleCopyURL,
      handleSetAsPreview,
      handleChangeStatus,
    },
  };
};
