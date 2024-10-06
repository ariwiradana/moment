import { dm } from "@/lib/fonts";
import Image from "next/image";
import { useEffect, useState } from "react";

const LoadingComponent = () => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="h-dvh w-screen bg-theme1-dark-chocolate flex justify-center items-center">
      <h1
        className={`mb-8 text-white text-2xl md:text-3xl flex flex-wrap gap-x-4 transition-all ease-in-out duration-500 ${dm.className}`}
      >
        <span className="flex items-center">
          L
          <span>
            <Image
              sizes="30px"
              className="animate-spin-slow mt-1"
              src="/icon.png"
              alt="font-moment"
              width={30}
              height={30}
            />
          </span>
          ading{dots}
        </span>
      </h1>
    </div>
  );
};

export default LoadingComponent;
