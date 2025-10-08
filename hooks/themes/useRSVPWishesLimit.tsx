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

// Static constants
const ATTENDANT_TEXT: Record<string, string> = {
  Hadir: "Saya akan hadir",
  "Tidak Hadir": "Maaf saya tidak bisa hadir",
  "Masih Ragu": "Maaf saya masih ragu",
};

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

const useRSVPWishesLimit = (icon: ReactNode, limitPage: number) => {
  const { client } = useClientStore();

  const [formData, setFormData] = useState<FormData>(initialReviewForm);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [wishes, setWishes] = useState<Review[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [limit] = useState(limitPage || 8);
  const [page, setPage] = useState(1);

  // Lock scroll when modal open
  useEffect(() => {
    document.body.classList.toggle("no-scroll", isOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [isOpen]);

  // Memoize SWR URL
  const fetchUrl = useMemo(
    () =>
      client?.id
        ? `/api/_pb/_w?page=${page}&limit=${limit}&client_id=${client.id}`
        : null,
    [client?.id, page, limit]
  );

  const { mutate, isLoading: isLoadingWishes } = useSWR<{
    data: Review[];
    total_rows: number;
  }>(fetchUrl, fetcher, {
    onSuccess: (data) => {
      setWishes(data.data);
      setTotalRows(data.total_rows);
    },
  });

  // Form change handler
  const handleChange = useCallback((name: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }, []);

  // Submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        wisheschema.parse(formData);
        const toastSubmit = toast.loading("Memberikan ucapan...");

        const response = await getClient(`/api/_pb/_w`, {
          method: "POST",
          body: JSON.stringify({ client_id: Number(client?.id), ...formData }),
        });

        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }

        const result = await response.json();

        if (result.success) {
          await mutate();
          setFormData(initialReviewForm);
          toast.success("Berhasil. Terima kasih atas ucapannya!", {
            id: toastSubmit,
            icon: <div>{icon}</div>,
          });
          setIsOpen(false);
        } else {
          toast.error("Gagal membuat ucapan", { id: toastSubmit });
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const formattedErrors: Record<string, string | undefined> = {};
          error.errors.forEach((err) => {
            if (err.path[0])
              formattedErrors[err.path[0] as string] = err.message;
          });
          setErrors(formattedErrors);
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    },
    [formData, client?.id, icon, mutate]
  );

  // Pagination change handler
  const handleChangePagination = useCallback((_: unknown, value: number) => {
    setPage(value);
  }, []);

  return {
    state: {
      attendantText: ATTENDANT_TEXT,
      loading,
      errors,
      wishes,
      totalRows,
      formData,
      isOpen,
      isLoadingWishes,
      page,
      limit,
    },
    actions: {
      handleSubmit,
      handleChange,
      setIsOpen,
      handleChangePagination,
      setPage,
    },
  };
};

export default useRSVPWishesLimit;
