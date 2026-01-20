import React, { memo } from "react";
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
import Head from "next/head";

const SharedThemeComponent = () => {
  const { data: response } = useSWR("/api/guest/stats", fetcher);
  const data = response?.data;

  if (!data) return null;

  const stats = [
    { icon: TbUserCheck, value: data.clients, label: "Klien" },
    { icon: TbCalendarCheck, value: data.events, label: "Acara" },
    { icon: TbBook2, value: data.guests, label: "Tamu Undangan" },
    { icon: TbMessage, value: data.wishes, label: "Ucapan & Doa" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Moment Invitation",
    url: "https://momentinvitation.com",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Total Klien",
        value: data.clients,
      },
      {
        "@type": "PropertyValue",
        name: "Total Acara",
        value: data.events,
      },
      {
        "@type": "PropertyValue",
        name: "Total Tamu Undangan",
        value: data.guests,
      },
      {
        "@type": "PropertyValue",
        name: "Ucapan & Doa",
        value: data.wishes,
      },
    ],
  };


  return (
    <section className="py-10 md:py-14 lg:py-16 bg-zinc-50 relative select-none overflow-hidden">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="absolute inset-0 w-full h-full">
        <video
          className="min-w-full min-h-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover"
          src="/video/hero6.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      </div>
      <span
        className="absolute inset-0 bg-dashboard-dark/5"
        aria-hidden="true"
      ></span>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 grid md:grid-cols-4 gap-8 lg:gap-16 relative z-20">
        {stats.map(({ icon: Icon, value, label }, i) =>
          value > 0 ? (
            <div
              key={i}
              className="text-dashboard-dark flex flex-col items-center"
            >
              <Icon aria-hidden="true" className="text-4xl" />
              <div aria-live="polite">
                <CountUp
                  aria-label={`${value} ${label}`}
                  from={0}
                  to={value}
                  separator=","
                  direction="up"
                  duration={1}
                  className={`${redhat.className} text-2xl font-medium lg:text-3xl`}
                />
              </div>
              <p className={`${redhat.className} text-lg text-center`}>
                {label}
              </p>
            </div>
          ) : null,
        )}
      </div>
    </section>
  );
};

export default memo(SharedThemeComponent);
