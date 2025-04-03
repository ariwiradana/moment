import { Event } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useParticipants from "./useParticipants";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useEvents = () => {
  const { client } = useClientStore();
  const events = useMemo(() => client?.events || [], [client?.events]);
  const {
    state: { bride, groom },
  } = useParticipants();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [timeRemainings, setTimeRemainings] = useState<TimeRemaining[]>(
    events.length > 0
      ? events.map(() => ({ days: 0, hours: 0, minutes: 0, seconds: 0 }))
      : []
  );

  const switchEventIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (events.length === 0) return;

    const updateCountdowns = () => {
      const now = new Date();
      setTimeRemainings(
        events.map((event) => {
          const targetDateTime = new Date(`${event.date}T${event.start_time}`);
          const diffMs = targetDateTime.getTime() - now.getTime();

          return {
            days: Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24))),
            hours: Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24)),
            minutes: Math.max(0, Math.floor((diffMs / (1000 * 60)) % 60)),
            seconds: Math.max(0, Math.floor((diffMs / 1000) % 60)),
          };
        })
      );
    };

    // Update countdown setiap 1 detik agar lebih akurat
    countdownIntervalRef.current = setInterval(updateCountdowns, 1000);
    updateCountdowns();

    // Ganti event setiap 8 detik
    switchEventIntervalRef.current = setInterval(() => {
      if (events.length > 1) {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
          setFade(true);
        }, 500);
      }
    }, 8000);

    return () => {
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
      if (switchEventIntervalRef.current)
        clearInterval(switchEventIntervalRef.current);
    };
  }, [events]);

  const images = useMemo(
    () => events.map((event) => event.image as string),
    [events]
  );

  const formatDateTime = (date: string, time: string) => {
    const d = new Date(`${date}T${time}Z`);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const handleAddToCalendar = useCallback(
    (event: Event) => {
      const startDateFormatted = `${event.date.replace(/-/g, "")}T${(
        parseInt(event.start_time.split(":")[0]) - 8
      )
        .toString()
        .padStart(2, "0")}${event.start_time.split(":")[1]}00Z`;

      const endDateFormatted = `${event.date.replace(/-/g, "")}T${
        event.end_time === "selesai"
          ? "235900"
          : (parseInt(event.end_time.split(":")[0]) - 8)
              .toString()
              .padStart(2, "0") + event.end_time.split(":")[1]
      }00Z`;

      console.log(event.start_time, event.end_time, event.date);
      const participants = `${groom?.nickname} & ${bride?.nickname}`;
      const description = `${client?.opening_title},\n\n${
        client?.opening_description
      }\n\nAcara: ${event.name}\nTanggal: ${new Date(
        event.date
      ).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })}\nWaktu: ${event.start_time} WITA - ${event.end_time} WITA\nTempat: ${
        event.address
      }\n\n${client?.closing_description}\n\nSalam hangat,\n${participants}`;

      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        `Undangan ${event.name} - ${participants}`
      )}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(
        description
      )}&location=${encodeURIComponent(event.address)}&sf=true&output=xml`;

      window.open(googleCalendarUrl, "_blank");
    },
    [groom, bride, client]
  );

  return {
    state: {
      events,
      currentIndex,
      fade,
      timeRemainings,
      images,
    },
    actions: {
      handleAddToCalendar,
    },
  };
};

export default useEvents;
