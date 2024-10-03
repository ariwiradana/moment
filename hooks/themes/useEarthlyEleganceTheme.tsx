import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (client) {
      const updateCountdown = () => {
        const now = moment();
        const eventTime = moment(client.date);
        const duration = moment.duration(eventTime.diff(now));

        setCountdown({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds(),
        });
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);

      const brideParticipant =
        client.participants.find((p) => p.role === "bride") || null;
      const groomParticipant =
        client.participants.find((p) => p.role === "groom") || null;

      setBride(brideParticipant);
      setGroom(groomParticipant);

      return () => clearInterval(interval);
    }
  }, [client]);

  const handleOpenCover = () => {
    setOpen((prevOpen) => !prevOpen);
  };

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
