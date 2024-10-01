import { useEffect } from "react";
import moment from "moment";
import { Client } from "@/lib/types";

import { create } from "zustand";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Theme1State {
  countdown: Countdown;
  open: boolean;
}

interface Theme1Actions {
  setCountdown: (countdown: Countdown) => void;
  handleOpenCover: () => void;
}

const useTheme1Store = create<Theme1State & Theme1Actions>((set) => ({
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  open: false,
  setCountdown: (countdown) => set(() => ({ countdown })),
  handleOpenCover: () => set(() => ({ open: true })),
}));

const useTheme1 = (client: Client) => {
  const { setCountdown } = useTheme1Store();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(moment(client.date).diff(now));

      const countdown = {
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      };

      setCountdown(countdown);

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [client.date, setCountdown]);

  return useTheme1Store();
};

export default useTheme1;
