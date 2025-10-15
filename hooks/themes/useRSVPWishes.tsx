import { DummyWishes } from "@/constants/dummyWishes";
import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { Wish } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import React, { ReactNode, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import { z } from "zod";

interface FormData {
  name: string;
  wishes: string;
  attendant: string;
}

const initialReviewForm: FormData = {
  name: "",
  attendant: "Hadir",
  wishes: "",
};

const useRSVPWishes = (icon: ReactNode) => {
  const { client } = useClientStore();

  const attendantText: Record<string, string> = useMemo(
    () => ({
      Hadir: "Saya akan hadir",
      "Tidak Hadir": "Maaf saya tidak bisa hadir",
      "Masih Ragu": "Maaf saya masih ragu",
    }),
    []
  );

  const [formData, setFormData] = useState<FormData>(initialReviewForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [page, setPage] = useState(1);
  const limit = 6;

  const wisheschema = useMemo(
    () =>
      z.object({
        name: z
          .string()
          .min(1, "Nama harus diisi")
          .max(100, "Nama tidak boleh melebihi 100 karakter"),
        wishes: z
          .string()
          .min(1, "Kolom ucapan tidak boleh kosong")
          .max(500, "Ucapan tidak boleh melebihi 500 karakter"),
      }),
    []
  );

  const { data, mutate } = useSWR<{ data: Wish[]; total_rows: number }>(
    client?.id && client.status === "active"
      ? `/api/guest/wishes?page=${page}&limit=${limit}&client_id=${client.id}`
      : null,
    fetcher,
    { keepPreviousData: true, revalidateOnFocus: false }
  );

  const wishes = data?.data ?? DummyWishes;
  console.log({ wishes });
  const totalRows = data?.total_rows ?? 0;

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        wisheschema.parse(formData);
        const toastId = toast.loading("Memberikan ucapan...");
        const response = await getClient(`/api/guest/wishes`, {
          method: "POST",
          body: JSON.stringify({ client_id: client?.id, ...formData }),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const result = await response.json();

        if (result.success) {
          // Optimistic update: fetch ulang data tanpa menunggu SWR refetch
          mutate();
          setFormData(initialReviewForm);
          toast.success("Berhasil. Terima kasih atas ucapannya!", {
            id: toastId,
            icon: <div>{icon}</div>,
          });
        } else {
          toast.error("Gagal membuat ucapan", { id: toastId });
        }
      } catch (err) {
        if (err instanceof z.ZodError) {
          const formattedErrors: Record<string, string> = {};
          err.errors.forEach((e) => {
            if (e.path[0]) formattedErrors[e.path[0] as string] = e.message;
          });
          setErrors(formattedErrors);
        } else {
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    },
    [client?.id, formData, mutate, icon, wisheschema]
  );

  const handleChangePagination = useCallback((_: unknown, value: number) => {
    setPage(value);
  }, []);

  return {
    state: {
      attendantText,
      formData,
      errors,
      loading,
      wishes,
      page,
      limit,
      totalRows,
    },
    actions: {
      handleChange,
      handleSubmit,
      handleChangePagination,
    },
  };
};

export default useRSVPWishes;
