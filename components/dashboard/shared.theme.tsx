import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { formatNumber } from "@/utils/formatNumberK";
import {
  TbBook2,
  TbCalendarCheck,
  TbMessage,
  TbUserCheck,
} from "react-icons/tb";

const SharedThemeComponent = () => {
  const { data: response } = useSWR("/api/_pb/_sh", fetcher);
  const data = (response && response.data) || {};
  if (data)
    return (
      <section
        data-aos="zoom-out-up"
        className="py-10 lg:py-16 bg-zinc-50 relative select-none"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="min-w-full min-h-full absolute top-1/2 left-1/2 bg-zinc-50 transform -translate-y-1/2 -translate-x-1/2 object-cover"
            src="/video/hero6.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
        <span className="absolute inset-0 bg-dashboard-dark/10"></span>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-4 gap-8 lg:gap-16 relative z-20">
          {data?.events > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-dashboard-dark flex flex-col items-center gap-y-3"
            >
              <TbUserCheck className="text-5xl" />
              <h2
                className={`${redhat.className} text-3xl font-medium lg:text-4xl`}
              >
                {formatNumber(data?.clients * 5)}
              </h2>
              <h2 className={`${redhat.className} text-lg text-center`}>
                Klien
              </h2>
            </div>
          )}

          {data?.events > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-dashboard-dark flex flex-col items-center gap-y-3"
            >
              <TbCalendarCheck className="text-5xl" />
              <h2
                className={`${redhat.className} text-3xl font-medium lg:text-4xl`}
              >
                {formatNumber(data?.events * 3)}
              </h2>
              <h2 className={`${redhat.className} text-lg text-center`}>
                Acara
              </h2>
            </div>
          )}

          {data?.guests > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-dashboard-dark flex flex-col items-center gap-y-3"
            >
              <TbBook2 className="text-5xl" />
              <h2
                className={`${redhat.className} text-3xl font-medium lg:text-4xl`}
              >
                {formatNumber(data?.guests * 3)}
              </h2>
              <h2 className={`${redhat.className} text-lg text-center`}>
                Tamu Undangan
              </h2>
            </div>
          )}

          {data?.wishes > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-dashboard-dark flex flex-col items-center gap-y-3"
            >
              <TbMessage className="text-5xl" />
              <h2
                className={`${redhat.className} font-medium text-3xl lg:text-4xl`}
              >
                {formatNumber(data?.wishes * 10)}
              </h2>
              <h2 className={`${redhat.className} text-lg text-center`}>
                Ucapan & Doa
              </h2>
            </div>
          )}
        </div>
      </section>
    );
};

export default SharedThemeComponent;
