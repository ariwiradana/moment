import { Client } from "@/lib/types";
import moment from "moment";
import { useEffect, useState } from "react";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const useEvents = (client: Client) => {
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
      const newTimeRemaining = client!.events.map((event) => {
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

    const intervalId = setInterval(updateCountdowns, 1000);
    updateCountdowns();

    return () => clearInterval(intervalId);
  }, [client?.events]);
  return {
    state: {
      timeRemainings,
    },
  };
};

export default useEvents;
