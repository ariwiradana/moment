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
import Image from "next/image";

const SharedThemeComponent = () => {
  const { data } = useSWR("/api/_sh", fetcher);

  if (data)
    return (
      <section className="py-16 lg:py-24 bg-zinc-50 relative select-none">
        <Image
          sizes="100vw"
          src="/dashboard/shared.jpg"
          alt="image-shred"
          fill
          className="object-cover w-full h-full"
        />
        <span className="absolute inset-0 bg-black bg-opacity-20"></span>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-20">
          <div
            data-aos="fade-up"
            className="text-white flex flex-col items-center gap-y-2"
          >
            <BiParty className="text-5xl lg:text-6xl" />
            <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
              {formatNumber(data?.events)}
            </h1>
            <h2 className={`${marcellus.className} text-lg lg:text-xl`}>
              Acara
            </h2>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="text-white flex flex-col items-center gap-y-2"
          >
            <BiUser className="text-5xl lg:text-6xl" />
            <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
              {formatNumber(data?.clients)}
            </h1>
            <h2 className={`${marcellus.className} text-lg lg:text-xl`}>
              Klien
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
            <h2 className={`${marcellus.className} text-lg lg:text-xl`}>
              Ucapan & Doa
            </h2>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-white flex flex-col items-center gap-y-2"
          >
            <BiBookContent className="text-5xl lg:text-6xl" />
            <h1 className={`${dm.className} text-5xl lg:text-6xl`}>
              {formatNumber(data?.guest)}
            </h1>
            <h2 className={`${marcellus.className} text-lg lg:text-xl`}>
              Tamu Undangan
            </h2>
          </div>
        </div>
      </section>
    );
};

export default SharedThemeComponent;
