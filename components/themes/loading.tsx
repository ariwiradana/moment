import { afacad, dm } from "@/lib/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingComponent = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-dvh w-screen flex p-8 items-center bg-white">
      <div>
        <h1
          className={`text-dashboard-dark text-2xl md:text-3xl flex flex-wrap gap-x-4 transition-all ease-in-out duration-500 ${dm.className}`}
        >
          <span className="flex items-center">
            Wait a M
            <span>
              <Image
                sizes="24px"
                className="animate-spin-slow mt-1"
                src="/icon.png"
                alt="font-moment"
                width={24}
                height={24}
              />
            </span>
            oment{dots}
          </span>
        </h1>
        <div className="flex items-center gap-x-2">
          <div className={`h-[0.5px] w-8 lg:w-12 bg-dashboard-dark`}></div>
          <p
            className={`${afacad.className} text-sm text-dasbg-dashboard-dark`}
          >
            Please wait while we load the invitation
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
