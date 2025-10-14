import { Event, TimeRemaining } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useParticipants from "./useParticipants";

const useEvents = () => {
  const { client } = useClientStore();
  const events = useMemo(() => client?.events || [], [client?.events]);
  const {
    state: { bride, groom },
  } = useParticipants();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [timeRemainings, setTimeRemainings] = useState<TimeRemaining[]>(() =>
    events.map(() => ({ days: 0, hours: 0, minutes: 0, seconds: 0 }))
  );

  const switchEventIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update countdown tiap detik
  useEffect(() => {
    if (!events.length) return;

    const updateCountdowns = () => {
      const now = new Date();
      setTimeRemainings((prev) =>
        events.map((event, idx) => {
          let targetDateTime = new Date(`${event.date}T${event.start_time}`);

          if (targetDateTime.getTime() < now.getTime()) {
            targetDateTime = new Date();
            targetDateTime.setDate(now.getDate() + idx + 1);
            const [hours, minutes] = event.start_time.split(":").map(Number);
            targetDateTime.setHours(hours, minutes, 0, 0);
          }

          const diffMs = targetDateTime.getTime() - now.getTime();

          const newCountdown = {
            days: Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24))),
            hours: Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24)),
            minutes: Math.max(0, Math.floor((diffMs / (1000 * 60)) % 60)),
            seconds: Math.max(0, Math.floor((diffMs / 1000) % 60)),
          };

          // Hanya update state jika berubah (optional untuk performance)
          const prevCountdown = prev[idx];
          if (
            prevCountdown.days !== newCountdown.days ||
            prevCountdown.hours !== newCountdown.hours ||
            prevCountdown.minutes !== newCountdown.minutes ||
            prevCountdown.seconds !== newCountdown.seconds
          ) {
            return newCountdown;
          }
          return prevCountdown;
        })
      );
    };

    updateCountdowns();
    countdownIntervalRef.current = setInterval(updateCountdowns, 1000);

    return () => {
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
    };
  }, [events]);

  // Switch event tiap 8 detik
  useEffect(() => {
    if (events.length < 2) return;

    switchEventIntervalRef.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % events.length);
        setFade(true);
      }, 500);
    }, 8000);

    return () => {
      if (switchEventIntervalRef.current)
        clearInterval(switchEventIntervalRef.current);
    };
  }, [events.length]);

  const images = useMemo(() => events.map((e) => e.image || ""), [events]);

  const handleAddToCalendar = useCallback(
    (event: Event) => {
      const formatDate = (date: string, time: string) =>
        `${date.replace(/-/g, "")}T${(parseInt(time.split(":")[0]) - 8)
          .toString()
          .padStart(2, "0")}${time.split(":")[1]}00Z`;

      const startDateFormatted = formatDate(event.date, event.start_time);
      const endDateFormatted = formatDate(
        event.date,
        event.end_time === "selesai" ? "23:59" : event.end_time
      );

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
      })}\nWaktu: ${event.start_time} - ${event.end_time} \nTempat: ${
        event.address
      }\n\n${client?.closing_description}\n\nSalam hangat,\n${participants}`;

      window.open(
        `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
          `Undangan ${event.name} - ${participants}`
        )}&dates=${startDateFormatted}/${endDateFormatted}&details=${encodeURIComponent(
          description
        )}&location=${encodeURIComponent(event.address)}&sf=true&output=xml`,
        "_blank"
      );
    },
    [groom, bride, client]
  );

  return {
    state: { events, currentIndex, fade, timeRemainings, images },
    actions: { handleAddToCalendar },
  };
};

export default useEvents;
