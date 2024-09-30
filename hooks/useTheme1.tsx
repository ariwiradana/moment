import { useEffect } from "react";
import moment from "moment";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Informations } from "@/lib/types";

import { create } from "zustand";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Blobs {
  url: string;
}

interface Theme1State {
  countdown: Countdown;
  open: boolean;
  blobs: Blobs[];
}

interface Theme1Actions {
  setCountdown: (countdown: Countdown) => void;
  setBlobs: (blobs: Blobs[]) => void;
  handleOpenCover: () => void;
}

const useTheme1Store = create<Theme1State & Theme1Actions>((set) => ({
  countdown: { days: 0, hours: 0, minutes: 0, seconds: 0 },
  open: false,
  blobs: [],
  setCountdown: (countdown) => set(() => ({ countdown })),
  setBlobs: (blobs) => set(() => ({ blobs })),
  handleOpenCover: () => set(() => ({ open: true })),
}));

const useTheme1 = (informations: Informations) => {
  const { setCountdown, setBlobs } = useTheme1Store();
  const { data } = useSWR(
    `/api/images?pathname=digital-invitation/${informations.prefix}/gallery`,
    fetcher
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(moment(informations.date).diff(now));

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
  }, [informations.date, setCountdown]);

  useEffect(() => {
    if (data?.blobs) {
      setBlobs(data.blobs);
    }
  }, [data, setBlobs]);

  return useTheme1Store();
};

export default useTheme1;
