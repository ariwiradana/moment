import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import moment from "moment";
import { Client, Participant, Review } from "@/lib/types";
import toast from "react-hot-toast";
import { useClient } from "@/lib/client";
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
  };
  actions: {
    handleOpenCover: () => void;
    handleChange: (name: string, value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleAddEvent: () => void;
    handlePlayPause: () => void;
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
      ? `/api/reviews?page=${page}&limit=${limit}&client_id=${client.id}`
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
        const response = await useClient(`/api/reviews`, {
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
      const now = moment();
      const eventTime = moment(client.date);
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

  useEffect(() => {
    if (client) {
      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      setBride(brideParticipant);
      setGroom(groomParticipant);

      return () => clearInterval(interval);
    }
  }, [client, updateCountdown, brideParticipant, groomParticipant]);

  const handleOpenCover = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const handleAddEvent = () => {
    const title = `Undangan Pernikahan ${groom?.nickname} & ${bride?.nickname}`;
    const details = `Dengan hormat, kami mengundang Anda untuk hadir dan memberikan doa restu pada acara pernikahan kami yang akan dilaksanakan pada:

Hari/Tanggal: ${moment(client?.date).format("dddd, D MMMM YYYY")}
Waktu: ${client?.start_time} - ${client?.end_time}
Tempat: ${client?.address_full}

Kami berharap kehadiran Anda untuk turut serta merayakan momen bahagia ini.`;
    const location = client?.address_full as string;

    const startDate = moment(
      `${client?.date} ${client?.start_time}`,
      "YYYY-MM-DD HH:mm"
    ).format("YYYYMMDDTHHmmss");
    let endDate;
    if (
      client?.end_time === "24:00" ||
      client?.end_time?.toLowerCase() === "selesai"
    ) {
      endDate = moment(`${client?.date} 23:59`, "YYYY-MM-DD HH:mm")
        .add(1, "minute")
        .format("YYYYMMDDTHHmmss");
    } else {
      endDate = moment(
        `${client?.date} ${client?.end_time}`,
        "YYYY-MM-DD HH:mm"
      ).format("YYYYMMDDTHHmmss");
    }

    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(
      location
    )}&dates=${startDate}/${endDate}`;

    window.open(url, "_blank");
  };

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
    },
    actions: {
      handleOpenCover,
      handleChange,
      handleSubmit,
      handleAddEvent,
      handlePlayPause,
    },
  };
};

export default useTheme1;
