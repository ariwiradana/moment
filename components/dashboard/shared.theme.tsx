import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dm, marcellus } from "@/lib/fonts";
import { formatNumber } from "@/utils/formatNumberK";
import {
  BiBookContent,
  BiMessageDetail,
  BiParty,
  BiUser,
} from "react-icons/bi";

const SharedThemeComponent = () => {
  const { data } = useSWR("/api/total-shared", fetcher);

  return (
    <section className="py-16 lg:py-24 bg-zinc-50 relative">
      <span className="absolute inset-0 bg-[url('/dashboard/shared.jpg')] bg-repeat bg-cover bg-center"></span>
      <span className="absolute inset-0 bg-black bg-opacity-20"></span>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 relative z-20">
        <div
          data-aos="fade-up"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <BiParty className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
            {formatNumber(data?.events)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-lg`}>
            Acara
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <BiUser className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
            {formatNumber(data?.clients)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-lg`}>
            Kien
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <BiMessageDetail className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
            {formatNumber(data?.wishes)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-lg`}>
            Ucapan & Doa
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <BiBookContent className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
            {formatNumber(data?.guest)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-lg`}>
            Tamu Undangan
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SharedThemeComponent;
