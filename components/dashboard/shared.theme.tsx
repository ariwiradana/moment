import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dm, marcellus } from "@/lib/fonts";
import { TiContacts, TiDocumentText, TiMessages } from "react-icons/ti";
import { formatNumber } from "@/utils/formatNumberK";

const SharedThemeComponent = () => {
  const { data } = useSWR("/api/total-shared", fetcher);

  return (
    <section className="py-16 lg:py-36 bg-zinc-50 relative" id="section4">
      <span className="absolute inset-0 bg-[url('/dashboard/shared.jpg')] bg-repeat bg-cover bg-center"></span>
      <span className="absolute inset-0 bg-black bg-opacity-20"></span>
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-3 gap-16 relative z-20">
        <div
          data-aos="fade-up"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <TiDocumentText className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-7xl`}>
            {formatNumber(data?.events)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-xl`}>
            Undangan Acara
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <TiMessages className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-7xl`}>
            {formatNumber(data?.wishes)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-xl`}>
            Ucapan & Doa
          </h2>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-white flex flex-col items-center gap-y-2"
        >
          <TiContacts className="text-5xl lg:text-6xl" />
          <h1 className={`${dm.className} text-5xl lg:text-7xl`}>
            {formatNumber(data?.guest)}
          </h1>
          <h2 className={`${marcellus.className} text-base lg:text-xl`}>
            Tamu Undangan
          </h2>
        </div>
      </div>
    </section>
  );
};

export default SharedThemeComponent;
