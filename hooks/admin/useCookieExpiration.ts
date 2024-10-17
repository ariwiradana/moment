import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useCookieExpiration = (
  cookieName: string,
  expirationTime: number,
  unit: "days" | "hours" | "minutes"
) => {
  const [cookieValue, setCookieValue] = useState<string | null>(null);
  const [remainingTime, setRemainingTime] = useState<string | null>(null);

  useEffect(() => {
    const value = Cookies.get(cookieName);
    setCookieValue(value || null);

    if (value) {
      let expirationInMillis: number;

      switch (unit) {
        case "days":
          expirationInMillis = expirationTime * 24 * 60 * 60 * 1000; // Convert days to milliseconds
          break;
        case "hours":
          expirationInMillis = expirationTime * 60 * 60 * 1000; // Convert hours to milliseconds
          break;
        case "minutes":
          expirationInMillis = expirationTime * 60 * 1000; // Convert minutes to milliseconds
          break;
        default:
          expirationInMillis = 0;
      }

      // Calculate creation time from cookie
      const creationTime = Cookies.get(`${cookieName}_creation_time`);
      const creationTimestamp = creationTime
        ? Number(creationTime)
        : Date.now();

      // Calculate remaining time
      const timeElapsed = Date.now() - creationTimestamp;
      const timeRemaining = expirationInMillis - timeElapsed;

      if (timeRemaining > 0) {
        const minutes = Math.floor((timeRemaining / 1000 / 60) % 60);
        const seconds = Math.floor((timeRemaining / 1000) % 60);
        setRemainingTime(`${minutes}m ${seconds}s`);
      } else {
        setRemainingTime("Expired");
      }
    } else {
      setRemainingTime(null);
    }
  }, [cookieName, expirationTime, unit]);

  return { remainingTime };
};

export default useCookieExpiration;
