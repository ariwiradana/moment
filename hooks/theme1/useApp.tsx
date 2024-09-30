import { fetcher } from "@/lib/fetcher";
import { Brides } from "@/lib/types";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import useSWR from "swr";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Blobs {
  url: string;
}

export interface UseApp {
  state: {
    countdown: Countdown;
    open: boolean;
    blobs: Blobs[];
    brides: Brides;
    bridesNickname: string;
    location: string;
    dateEvent: string;
  };
  actions: {
    handleOpenCover: () => void;
  };
}

const useApp = (): UseApp => {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [open, setOpen] = useState<boolean>(false);

  const { data } = useSWR(
    `/api/images?pathname=digital-invitation/wendy/gallery`,
    fetcher
  );

  const dateEvent = "2024-10-04";
  const location = "Sukawati";
  const brides: Brides = {
    male: {
      name: "I Gede Wahyu Wiradharma",
      nickname: "Wahyu",
      child: "pertama",
      address: "Br. Ayah, Ds. Kelusa, Kec. Payangan, Kab. Gianyar, Bali",
      imageURL:
        "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/brides/male-Pu1kBjACwhfo7GmUJGaDUM8blbyrjH.jpg",
      parents: {
        male: "I Wayan Darmayasa",
        female: "Ni Made Muliari",
      },
    },
    female: {
      name: "Ni Putu Eka Pradnyani",
      nickname: "Eka",
      child: "pertama",
      address: "Br. Ayah, Ds. Kelusa, Kec. Payangan, Kab. Gianyar, Bali",
      imageURL:
        "https://dbwuumshu7s1w5jw.public.blob.vercel-storage.com/digital-invitation/wendy/brides/female-bOYCZk5NlcjRdqXI20RPcVMbfWYZ9u.jpg",
      parents: {
        male: "I Wayan Darmayasa",
        female: "Ni Made Muliari",
      },
    },
  };
  const bridesNickname = `${brides.male.nickname} & ${brides.female.nickname}`;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(moment(dateEvent).diff(now));

      setCountdown({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });

      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenCover = () => {
    setOpen(true);
  };

  return {
    state: {
      open,
      blobs: (data?.blobs as Blobs[]) || [],
      countdown,
      brides,
      bridesNickname,
      location,
      dateEvent,
    },
    actions: {
      handleOpenCover,
    },
  };
};

export default useApp;
