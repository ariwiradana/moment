import moment from "moment";
import { useEffect, useState } from "react";

interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface UseHero {
  state: {
    countdown: Countdown;
  };
  actions: {};
}

const useHero = (targetDate: string): UseHero => {
  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const duration = moment.duration(moment(targetDate).diff(now));

      setCountdown({
        days: Math.floor(duration.asDays()),
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });

      // Clear the interval if the countdown is complete
      if (duration.asSeconds() <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [targetDate]);

  return {
    state: {
      countdown,
    },
    actions: {},
  };
};

export default useHero;
