import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import moment from "moment";
import { Client, Event, Participant, Review } from "@/lib/types";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { BiCheck, BiLoader, BiSolidCheckCircle, BiX } from "react-icons/bi";
import ReactAudioPlayer from "react-audio-player";

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

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface useSamaya {
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
    timeRemainings: TimeRemaining[];
  };
  actions: {
    handleOpenCover: () => void;
    handleChange: (name: string, value: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handlePlayPause: () => void;
    handleCopyRekening: (rekening: string) => void;
    handleAddToCalendar: (event: Event) => void;
    setIsPlaying: (isPlaying: boolean) => void;
  };
}

const initialReviewForm = {
  name: "",
  attendant: "Hadir",
  wishes: "",
};

const useSamaya = (client: Client | null): useSamaya => {
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeRemainings, setTimeRemainings] = useState<TimeRemaining[]>(
    client?.events
      ? client?.events.map(() => ({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }))
      : []
  );

  useEffect(() => {
    if (!client?.events) return;

    const updateCountdowns = () => {
      const newTimeRemaining = client.events!.map((event) => {
        const targetDateTime = moment(
          `${event.date} ${event.start_time}`,
          "YYYY-MM-DD HH:mm"
        );
        const now = moment();
        const diffDuration = moment.duration(targetDateTime.diff(now));

        if (diffDuration.asMilliseconds() > 0) {
          return {
            days: Math.floor(diffDuration.asDays()),
            hours: diffDuration.hours(),
            minutes: diffDuration.minutes(),
            seconds: diffDuration.seconds(),
          };
        } else {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      });

      setTimeRemainings(newTimeRemaining);
    };

    const intervalId = setInterval(updateCountdowns, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data, mutate } = useSWR(
    client?.id
      ? `/api/_pb/_w?page=${page}&limit=${limit}&client_id=${client.id}`
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
    const toastSubmit = toast.loading("Memberikan ucapan...");
    try {
      reviewSchema.parse(formData);
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
          icon: (
            <div className="p-1 rounded bg-samaya-primary">
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
          const eventTime = moment(`${events[0].date} ${events[0].start_time}`);
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
        toast.success("Berhasil disalin.", {
          icon: (
            <div className="p-1 rounded bg-samaya-primary">
              <BiCheck />
            </div>
          ),
        });
      })
      .catch((err) => {
        toast.error("Gagal disalin");
      });
  };

  const formatDateTime = (date: string, time: string) => {
    return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm")
      .utc()
      .format("YYYYMMDDTHHmmss[Z]");
  };

  const handleAddToCalendar = (event: Event) => {
    const startDate = formatDateTime(event.date, event.start_time);
    const endDate = formatDateTime(
      event.date,
      event.end_time === "Selesai" ? "23:59" : event.end_time
    );
    const participants = `${groom?.nickname} & ${bride?.nickname}`;
    const description = `${client?.opening_title},\n\n${
      client?.opening_description
    }\n\nAcara: ${event.name}\nTanggal: ${moment(event.date).format(
      "dddd, DD MMMM YYYY"
    )}\nWaktu: ${event.start_time} - ${event.end_time}\nTempat: ${
      event.address
    }\n\n${client?.closing_description}\n\nSalam hangat,\n${participants}`;

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      `Undangan ${event.name} - ${participants}`
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(event.address)}&sf=true&output=xml`;

    window.open(googleCalendarUrl, "_blank");
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
      timeRemainings,
    },
    actions: {
      handleOpenCover,
      handleChange,
      handleSubmit,
      handlePlayPause,
      handleCopyRekening,
      handleAddToCalendar,
      setIsPlaying,
    },
  };
};

export default useSamaya;
