import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import moment from "moment";
import { Client, Participant, Review } from "@/lib/types";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface FormData {
  name: string;
  wishes: string;
  attendant: string;
}

export interface useTheme1 {
  refs: {
    audioRef: React.RefObject<HTMLAudioElement> | null;
  };
  state: {
    loading: boolean;
    open: boolean;
    isPlaying: boolean;
    countdown: Countdown;
    bride: Participant | null;
    groom: Participant | null;
    client: Client | null;
    formData: FormData;
    reviews: Review[] | null;
    errors: Record<string, string | undefined>;
    otherParticipants: Participant[] | null;
  };
  actions: {
    handleOpenCover: () => void;
    handleChange: (name: string, value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handlePlayPause: () => void;
    handleCopyRekening: (rekening: string) => void;
  };
}

const initialReviewForm = {
  name: "",
  attendant: "Hadir",
  wishes: "",
};

const useTheme1 = (client: Client | null): useTheme1 => {
  const [bride, setBride] = useState<Participant | null>(null);
  const [groom, setGroom] = useState<Participant | null>(null);
  const [otherParticipants, setOtherParticipants] = useState<
    Participant[] | null
  >(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [formData, setFormData] = useState<FormData>(initialReviewForm);
  const [page] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, mutate } = useSWR(
    client?.id
      ? `/api/wishes?page=${page}&limit=${limit}&client_id=${client.id}`
      : null,
    fetcher
  );

  const reviewSchema = z.object({
    name: z
      .string()
      .min(1, "Nama harus diisi")
      .max(100, "Nama tidak boleh melebihi 100 karakter"),
    wishes: z
      .string()
      .min(1, "Kolom ucapan tidak boleh kosong")
      .max(500, "Ucapan tidak boleh melebihi 500 karakter"),
  });

  const reviews: Review[] = data?.data ?? [];

  const handleChange = (name: string, value: string) => {
    setFormData((state) => ({ ...state, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = { client_id: Number(client?.id), ...formData };

    setLoading(true);
    try {
      reviewSchema.parse(formData);
      const createReview = async () => {
        const response = await getClient(`/api/wishes`, {
          method: "POST",
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          const errorResult = await response.json();
          throw new Error(errorResult.message);
        }
        return await response.json();
      };

      toast.promise(createReview(), {
        loading: "Memberikan ucapan...",
        success: () => {
          mutate();
          setLoading(false);
          setFormData(initialReviewForm);
          return "Berhasil memberikan ucapan";
        },
        error: (error: any) => {
          return error.message || "Gagal memberikan ucapan";
        },
      });
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

  const updateCountdown = useMemo(() => {
    if (!client) return () => {};

    return () => {
      if (client) {
        const events = client?.events || [];
        const allSameDate =
          events.length > 0
            ? events.every(
                (event) =>
                  new Date(event.date).toDateString() ===
                  new Date(events[0].date).toDateString()
              )
            : false;

        if (allSameDate) {
          const now = moment();
          const eventTime = moment(events[0].date);
          const duration = moment.duration(eventTime.diff(now));

          const newCountdown = {
            days: Math.floor(duration.asDays()),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds(),
          };

          // Only update the countdown state if values have changed
          setCountdown((prevCountdown) => {
            if (
              prevCountdown.days !== newCountdown.days ||
              prevCountdown.hours !== newCountdown.hours ||
              prevCountdown.minutes !== newCountdown.minutes ||
              prevCountdown.seconds !== newCountdown.seconds
            ) {
              return newCountdown;
            }
            return prevCountdown;
          });
        }
      }
    };
  }, [client]);

  const brideParticipant = useMemo(
    () => client?.participants.find((p) => p.role === "bride") || null,
    [client]
  );

  const groomParticipant = useMemo(
    () => client?.participants.find((p) => p.role === "groom") || null,
    [client]
  );

  const otherParticipantData = useMemo(
    () => client?.participants.filter((p) => p.role === "participant") || null,
    [client]
  );

  useEffect(() => {
    if (client) {
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      setBride(brideParticipant);
      setGroom(groomParticipant);
      setOtherParticipants(otherParticipantData);

      return () => clearInterval(interval);
    }
  }, [client, updateCountdown, brideParticipant, groomParticipant]);

  const handleOpenCover = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleCopyRekening = (rekening: string) => {
    navigator.clipboard
      .writeText(rekening)
      .then(() => {
        toast.success("No rekening berhasil disalin");
      })
      .catch((err) => {
        toast.error("No rekening gagal disalin");
      });
  };

  return {
    refs: {
      audioRef,
    },
    state: {
      loading,
      open,
      countdown,
      bride,
      groom,
      client,
      formData,
      reviews,
      errors,
      isPlaying,
      otherParticipants,
    },
    actions: {
      handleOpenCover,
      handleChange,
      handleSubmit,
      handlePlayPause,
      handleCopyRekening,
    },
  };
};

export default useTheme1;
