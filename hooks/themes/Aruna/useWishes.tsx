import { getClient } from "@/lib/client";
import { fetcher } from "@/lib/fetcher";
import { Client, Review } from "@/lib/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiCheck } from "react-icons/bi";
import useSWR from "swr";
import { z } from "zod";

interface FormData {
  name: string;
  wishes: string;
  attendant: string;
}

interface UseWishes {
  state: {
    attendantText: Record<string, string>;
    formData: FormData;
    errors: Record<string, string | undefined>;
    loading: boolean;
    limit: number;
    page: number;
    wishes: Review[];
    totalRows: number;
  };
  actions: {
    handleChange: (name: string, value: string) => void;
    handleChangePagination: (
      event: React.ChangeEvent<unknown>,
      value: number
    ) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  };
}

const useWishes = (client: Client): UseWishes => {
  const attendantText: Record<string, string> = {
    Hadir: "Saya akan hadir",
    "Tidak Hadir": "Maaf saya tidak bisa hadir",
    "Masih Ragu": "Maaf saya masih ragu",
  };

  const initialReviewForm = {
    name: "",
    attendant: "Hadir",
    wishes: "",
  };

  const [formData, setFormData] = useState<FormData>(initialReviewForm);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [limit] = useState<number>(4);
  const [page, setPage] = useState(1);
  const [wishes, setWishes] = useState<Review[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);

  const { data: fetchedWishes, mutate } = useSWR(
    client?.id
      ? `/api/_pb/_w?page=${page}&limit=${limit}&client_id=${client?.id}`
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
    }
  );

  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    if (fetchedWishes && fetchedWishes.data.length > 0) {
      setWishes(fetchedWishes.data);
      setTotalRows(fetchedWishes.total_rows);
    }
  }, [fetchedWishes]);

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

  const handleChange = (name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // Reset errors sebelum validasi

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
        mutate(); // Reload data ucapan
        setFormData(initialReviewForm); // Reset form
        toast.success("Berhasil. Terima kasih atas ucapannya!", {
          id: toastSubmit,
          icon: (
            <div className="p-1 text-sm bg-aruna-dark text-white">
              <BiCheck />
            </div>
          ),
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

  return {
    state: {
      attendantText,
      errors,
      formData,
      limit,
      loading,
      page,
      totalRows,
      wishes,
    },
    actions: {
      handleChangePagination,
      handleSubmit,
      handleChange,
    },
  };
};

export default useWishes;
