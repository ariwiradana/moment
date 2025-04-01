import { Event } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import { useEffect, useState } from "react";
import useParticipants from "./useParticipants";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useEvents = () => {
  const { client } = useClientStore();
  const events: Event[] = client?.events || [];
  const { state } = useParticipants();

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [timeRemainings, setTimeRemainings] = useState<TimeRemaining[]>(
    events.length > 0
      ? events.map(() => ({ days: 0, hours: 0, minutes: 0, seconds: 0 }))
      : []
  );

  useEffect(() => {
    if (events.length === 0) return;

    const updateCountdowns = () => {
      const newTimeRemaining = events.map((event) => {
        const targetDateTime = new Date(`${event.date}T${event.start_time}`);
        const now = new Date();
        const diffMs = targetDateTime.getTime() - now.getTime();

        const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24));
        const minutes = Math.max(0, Math.floor((diffMs / (1000 * 60)) % 60));
        const seconds = Math.max(0, Math.floor((diffMs / 1000) % 60));

        return { days, hours, minutes, seconds };
      });

      setTimeRemainings(newTimeRemaining);
    };

    const switchEventInterval = setInterval(() => {
      if (events.length > 1) {
        setFade(false);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
          setFade(true);
        }, 500);
      }
    }, 8000);

    const countdownInterval = setInterval(updateCountdowns, 1000);
    updateCountdowns();

    return () => {
      clearInterval(switchEventInterval);
      clearInterval(countdownInterval);
    };
  }, [events]);

  const images: string[] = events?.map((event) => event.image as string) || [];

  const formatDateTime = (date: string, time: string) => {
    const d = new Date(`${date}T${time}Z`);
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const handleAddToCalendar = (event: Event) => {
    const startDate = formatDateTime(event.date, event.start_time);
    const endDate = formatDateTime(
      event.date,
      event.end_time === "Selesai" ? "23:59" : event.end_time
    );
    const participants = `${state.groom?.nickname} & ${state.bride?.nickname}`;
    const description = `${client?.opening_title},\n\n${
      client?.opening_description
    }\n\nAcara: ${event.name}\nTanggal: ${new Date(
      event.date
    ).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}\nWaktu: ${event.start_time} - ${event.end_time}\nTempat: ${
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
