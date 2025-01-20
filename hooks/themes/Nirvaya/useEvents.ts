import { Event } from "@/lib/types";
import useClientStore from "@/store/useClientStore";
import moment from "moment";
import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useEvents = () => {
  const { client } = useClientStore();
  const events: Event[] = client?.events || [];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);
  const [timeRemainings, setTimeRemainings] = useState<TimeRemaining[]>(
    events.length > 0
      ? events.map(() => ({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }))
      : []
  );

  useEffect(() => {
    if (events.length === 0) return;

    const updateCountdowns = () => {
      const newTimeRemaining = events.map((event) => {
        const targetDateTime = moment(
          `${event.date} ${event.start_time}`,
          "YYYY-MM-DD HH:mm"
        );
        const now = moment();
        const diffDuration = moment.duration(targetDateTime.diff(now));

        return {
          days: Math.max(0, Math.floor(diffDuration.asDays())),
          hours: Math.max(0, diffDuration.hours()),
          minutes: Math.max(0, diffDuration.minutes()),
          seconds: Math.max(0, diffDuration.seconds()),
        };
      });

      setTimeRemainings(newTimeRemaining);
    };

    const switchEventInterval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
        setFade(true);
      }, 500);
    }, 8000);

    const countdownInterval = setInterval(updateCountdowns, 1000);
    updateCountdowns();

    return () => {
      clearInterval(switchEventInterval);
      clearInterval(countdownInterval);
    };
  }, [events]);

  return {
    state: {
      events,
      currentIndex,
      fade,
      timeRemainings,
    },
  };
};

export default useEvents;
