import { useEffect } from "react";
import moment from "moment";
import { Client, ClientV2, Participant } from "@/lib/types";

import { create } from "zustand";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Theme1State {
  bride: Participant | null;
  groom: Participant | null;
  countdown: Countdown;
  open: boolean;
}

interface Theme1Actions {
  setCountdown: (countdown: Countdown) => void;
  setBride: (data: Participant) => void;
  setGroom: (data: Participant) => void;
  handleOpenCover: () => void;
}

const useTheme1Store = create<Theme1State & Theme1Actions>((set) => ({
  bride: null,
  groom: null,
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  open: false,
  setCountdown: (countdown) => set(() => ({ countdown })),
  setGroom: (groom) => set(() => ({ groom })),
  setBride: (bride) => set(() => ({ bride })),
  handleOpenCover: () => set(() => ({ open: true })),
}));

const useTheme1 = (client: ClientV2) => {
  const { setCountdown, setBride, setGroom } = useTheme1Store();

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

  useEffect(() => {
    if (client) {
      const bride = client.participants.find((p) => p.role === "bride");
      const groom = client.participants.find((p) => p.role === "groom");
      setGroom(groom!);
      setBride(bride!);
    }
  }, [client]);

  return useTheme1Store();
};

export default useTheme1;
