import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dm, marcellus } from "@/lib/fonts";
import { formatNumber } from "@/utils/formatNumberK";
import {
  BiBookContent,
  BiCalendarCheck,
  BiMessageDetail,
  // BiUser,
} from "react-icons/bi";
import Image from "next/image";

const SharedThemeComponent = () => {
  const { data: response } = useSWR("/api/_pb/_sh", fetcher);
  const data = (response && response.data) || {};
  if (data)
    return (
      <section className="py-16 lg:py-24 bg-zinc-50 relative select-none">
        <Image
          sizes="100vw"
          src="/dashboard/shared.jpg"
          alt="Background undangan digital Moment"
          fill
          className="object-cover w-full h-full"
        />
        <span className="absolute inset-0 bg-black bg-opacity-20"></span>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-3 gap-16 relative z-20">
          {/* {data?.clients > 0 && (
            <div
              data-aos="fade-up"
              className="text-white flex flex-col items-center gap-y-3"
            >
              <BiUser className="text-6xl" />
              <h2 className={`${dm.className} text-5xl lg:text-6xl`}>
                {formatNumber(data?.clients)}
              </h2>
              <h2
                className={`${marcellus.className} text-xl text-center`}
              >
                Klien
              </h2>
            </div>
          )} */}
          {data?.events > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-white flex flex-col items-center gap-y-3"
            >
              <BiCalendarCheck className="text-6xl" />
              <h2 className={`${dm.className} text-5xl lg:text-6xl`}>
                {formatNumber(data?.events)}
              </h2>
              <h2
                className={`${marcellus.className} text-xl text-center`}
              >
                Acara
              </h2>
            </div>
          )}

          {data?.guests > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-white flex flex-col items-center gap-y-3"
            >
              <BiBookContent className="text-6xl" />
              <h2 className={`${dm.className} text-5xl lg:text-6xl`}>
                {formatNumber(data?.guests)}
              </h2>
              <h2
                className={`${marcellus.className} text-xl text-center`}
              >
                Tamu Undangan
              </h2>
            </div>
          )}

          {data?.wishes > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-white flex flex-col items-center gap-y-3"
            >
              <BiMessageDetail className="text-6xl" />
              <h2 className={`${dm.className} text-5xl lg:text-6xl`}>
                {formatNumber(data?.wishes)}
              </h2>
              <h2
                className={`${marcellus.className} text-xl text-center`}
              >
                Ucapan & Doa
              </h2>
            </div>
          )}
        </div>
      </section>
    );
};

export default SharedThemeComponent;
