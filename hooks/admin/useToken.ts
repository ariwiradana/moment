import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const retrievedToken = Cookies.get("token");
    setToken(retrievedToken || null);
  }, []);

  return token;
};

export default useToken;
