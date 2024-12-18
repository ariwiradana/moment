import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import moment from "moment";
import { Client, Event, Participant, Review } from "@/lib/types";
import toast from "react-hot-toast";
import { getClient } from "@/lib/client";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { z } from "zod";
import { BiCheck } from "react-icons/bi";

export interface useAruna {
  refs: {
    audioRef: React.RefObject<HTMLAudioElement> | null;
  };
  state: {
    open: boolean;
    isPlaying: boolean;
    bride: Participant | null;
    groom: Participant | null;
    client: Client | null;
  };
  actions: {
    handleOpenCover: () => void;
    handlePlayPause: () => void;
    handleCopyRekening: (rekening: string) => void;
    handleAddToCalendar: (event: Event) => void;
    setIsPlaying: (isPlaying: boolean) => void;
  };
}

const useAruna = (client: Client | null): useAruna => {
  const [bride, setBride] = useState<Participant | null>(null);
  const [groom, setGroom] = useState<Participant | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const brideParticipant = useMemo(
    () => client?.participants?.find((p) => p.role === "bride") || null,
    [client]
  );
  const groomParticipant = useMemo(
    () => client?.participants?.find((p) => p.role === "groom") || null,
    [client]
  );

  useEffect(() => {
    if (client) {
      setBride(brideParticipant);
      setGroom(groomParticipant);
    }
  }, [client]);

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

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      } else if (
        document.visibilityState === "visible" &&
        isPlaying &&
        audioRef.current
      ) {
        audioRef.current.play();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  const handleCopyRekening = (rekening: string) => {
    navigator.clipboard
      .writeText(rekening)
      .then(() => {
        toast.success("Berhasil disalin.", {
          icon: (
            <div className="p-1 text-sm bg-aruna-dark text-white">
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
      open,
      bride,
      groom,
      client,
      isPlaying,
    },
    actions: {
      handleOpenCover,
      handlePlayPause,
      handleCopyRekening,
      handleAddToCalendar,
      setIsPlaying,
    },
  };
};

export default useAruna;
