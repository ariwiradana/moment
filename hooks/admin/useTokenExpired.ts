import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const useTokenExpiration = () => {
  const [isExpired, setIsExpired] = useState<boolean>(true);

  useEffect(() => {
    const token = Cookies.get("token");

    const checkTokenExpiration = (token: string | undefined) => {
      if (!token) return true;

      const decoded: any = jwt.decode(token);

      if (decoded && decoded.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
      }

      return true;
    };

    setIsExpired(checkTokenExpiration(token));
  }, []);

  return isExpired;
};

export default useTokenExpiration;
