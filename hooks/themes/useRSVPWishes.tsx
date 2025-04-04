import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { Review } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const attendantText: Record<string, string> = useMemo(
    () => ({
      Hadir: "Saya akan hadir",
      "Tidak Hadir": "Maaf saya tidak bisa hadir",
      "Masih Ragu": "Maaf saya masih ragu",
    }),
    []
  );

  const { client } = useClientStore();

  const [formData, setFormData] = useState<FormData>(initialReviewForm);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [limit] = useState<number>(8);
  const [page, setPage] = useState(1);
  const [wishes, setWishes] = useState<Review[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);

  const wisheschema = z.object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(100, "Nama tidak boleh melebihi 100 karakter"),
    wishes: z
      .string()
      .min(1, "Kolom ucapan tidak boleh kosong")
      .max(500, "Ucapan tidak boleh melebihi 500 karakter"),
  });

  const { mutate } = useSWR<{
    data: Review[];
    total_rows: number;
  }>(
    client?.id
      ? `/api/_pb/_w?page=${page}&limit=${limit}&client_id=${client.id}`
      : null,
    fetcher,
    {
      onSuccess: (data) => {
        setWishes(data.data);
        setTotalRows(data?.total_rows);
      },
    }
  );

  const handleChange = useCallback((name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { client_id: Number(client?.id), ...formData };

    setLoading(true);
    try {
      wisheschema.parse(formData);
      const toastSubmit = toast.loading("Memberikan ucapan...");
      const response = await getClient(`/api/_pb/_w`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.message);
      }

      const result = await response.json();

      if (result.success) {
        mutate();
        setLoading(false);
        setFormData(initialReviewForm);
        toast.success("Berhasil. Terima kasih atas ucapannya!", {
          id: toastSubmit,
          icon: <div>{icon}</div>,
        });
      } else {
        toast.error("Gagal membuat ucapan", { id: toastSubmit });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors: Record<string, string | undefined> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(formattedErrors);
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePagination = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value);
    },
    []
  );

  return {
    state: {
      attendantText,
      loading,
      errors,
      wishes,
      totalRows,
      limit,
      page,
      formData,
    },
    actions: {
      handleSubmit,
      handleChange,
      handleChangePagination,
    },
  };
};

export default useRSVPWishes;
