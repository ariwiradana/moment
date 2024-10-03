import { useEffect, useState, useMemo, useCallback } from "react";
import moment from "moment";
import { Client, Participant } from "@/lib/types";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UseEarthlyEleganceTheme {
  state: {
    open: boolean;
    countdown: Countdown;
    bride: Participant | null;
    groom: Participant | null;
    client: Client | null;
  };
  actions: {
    handleOpenCover: () => void;
  };
}

const useEarthlyEleganceTheme = (
  client: Client | null
): UseEarthlyEleganceTheme => {
  const [bride, setBride] = useState<Participant | null>(null);
  const [groom, setGroom] = useState<Participant | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Memoize the countdown logic so it doesn't recalculate on every render
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

  // Memoize the bride and groom state updates
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

  // Memoize the handleOpenCover function
  const handleOpenCover = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return {
    state: {
      open,
      countdown,
      bride,
      groom,
      client,
    },
    actions: {
      handleOpenCover,
    },
  };
};

export default useEarthlyEleganceTheme;
