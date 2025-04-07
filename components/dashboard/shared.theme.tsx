import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import {
  TbBook2,
  TbCalendarCheck,
  TbMessage,
  TbUserCheck,
} from "react-icons/tb";
import CountUp from "./elements/count.up";

const SharedThemeComponent = () => {
  const { data: response } = useSWR("/api/_pb/_sh", fetcher);
  const data = (response && response.data) || null;
  if (data)
    return (
      <section className="py-10 md:py-14 lg:py-16 bg-zinc-50 relative select-none overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            className="min-w-full min-h-full absolute top-1/2 left-1/2 bg-zinc-50 transform -translate-y-1/2 -translate-x-1/2 object-cover"
            src="/video/hero6.mp4"
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>
        <span className="absolute inset-0 bg-dashboard-dark/5"></span>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-4 gap-8 lg:gap-16 relative z-20">
          {data?.events > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-dashboard-dark flex flex-col items-center"
            >
              <TbUserCheck className="text-4xl" />
              <CountUp
                from={0}
                to={data?.clients}
                direction="up"
                duration={1}
                className={`${redhat.className} text-2xl font-medium lg:text-3xl`}
              />
              <h2 className={`${redhat.className} text-lg text-center`}>
                Klien
              </h2>
            </div>
          )}

          {data?.events > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              className="text-dashboard-dark flex flex-col items-center"
            >
              <TbCalendarCheck className="text-4xl" />
              <CountUp
                from={0}
                to={data?.events}
                separator=","
                direction="up"
                duration={1}
                className={`${redhat.className} text-2xl font-medium lg:text-3xl`}
              />
              <h2 className={`${redhat.className} text-center`}>Acara</h2>
            </div>
          )}

          {data?.guests > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-dashboard-dark flex flex-col items-center"
            >
              <TbBook2 className="text-4xl" />
              <CountUp
                from={0}
                to={data?.guests}
                separator=","
                direction="up"
                duration={1}
                className={`${redhat.className} text-2xl font-medium lg:text-3xl`}
              />
              <h2 className={`${redhat.className} text-center`}>
                Tamu Undangan
              </h2>
            </div>
          )}

          {data?.wishes > 0 && (
            <div
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-dashboard-dark flex flex-col items-center"
            >
              <TbMessage className="text-4xl" />
              <CountUp
                from={0}
                to={data?.wishes}
                separator=","
                direction="up"
                duration={1}
                className={`${redhat.className} text-2xl font-medium lg:text-3xl`}
              />
              <h2 className={`${redhat.className} text-center`}>
                Ucapan & Doa
              </h2>
            </div>
          )}
        </div>
      </section>
    );
};

export default SharedThemeComponent;
