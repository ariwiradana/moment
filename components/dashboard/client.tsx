import React, { useEffect, useMemo, useState } from "react";
import { redhat } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import {
  HiOutlineArrowLongLeft,
  HiOutlineArrowLongRight,
} from "react-icons/hi2";
import Head from "next/head";

const ClientComponent = () => {
  const { data, isLoading } = useSWR("/api/guest?status=done", fetcher);
  const clients: Client[] = useMemo(() => data?.data || [], [data]);

  const [slidesPerView, setSlidesPerView] = useState(2);

  const updateSlides = () => {
    const width = window.innerWidth;
    if (width >= 1920) setSlidesPerView(6);
    else if (width >= 1440) setSlidesPerView(4);
    else if (width >= 768) setSlidesPerView(3);
    else setSlidesPerView(2);
  };

  useEffect(() => {
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section
      id="clients"
      aria-labelledby="clients-title"
      className="relative bg-white pb-8 lg:pb-16"
    >
      <Head>
        {clients.map((client) => (
          <script
            key={client.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: `Undangan ${client.name}`,
                image: client.cover,
                description: `Klien Moment Invitation menggunakan tema ${client.theme?.name}`,
                creator: {
                  "@type": "Organization",
                  name: "Moment Invitation",
                  url: `https://momentinvitation.com/${client.slug}`,
                },
                about: {
                  "@type": "Product",
                  name: `Tema ${client.theme?.name}`,
                },
              }),
            }}
          />
        ))}
      </Head>
      <div>
        {isLoading ? (
          <div
            className={`grid`}
            style={{
              gridTemplateColumns: `repeat(${slidesPerView}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: slidesPerView }).map((_, idx) => (
              <div key={idx} className="w-full aspect-square shimmer" />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000 }}
            navigation={{
              nextEl: ".action-next",
              prevEl: ".action-prev",
            }}
            speed={500}
            breakpoints={{
              0: { slidesPerView: 2 },
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
              1920: { slidesPerView: 6 },
            }}
          >
            {clients.map((c, index) => (
              <SwiperSlide key={c.id}>
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, (max-width: 1024px) 720px, 720px"
                    src={
                      c.cover ||
                      `https://placehold.co/400/png?font=red-hat-display&text=${c.name.replaceAll(
                        " ",
                        "-",
                      )}`
                    }
                    alt={`Klien Moment Invitation - Undangan digital Bali: ${c.name}`}
                    fill
                    className="object-cover"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className="mt-4 md:mt-8 lg:mt-10 flex flex-col lg:flex-row justify-between gap-2 px-4 md:px-12 lg:px-4 max-w-screen-xl mx-auto xl:items-center">
        <h2
          id="clients-title"
          className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl font-semibold text-dashboard-dark max-w-lg`}
        >
          Klien Yang Telah
          <br />
          Menggunakan Jasa Kami
        </h2>
        <p className={`${redhat.className} text-base text-dashboard-dark/70`}>
          Beberapa klien yang mempercayakan momen acara spesial mereka kepada
          kami.
        </p>
        <div className="flex gap-3 mt-2 lg:mt-0">
          <button
            aria-label="Button Previous Client"
            className="action-prev w-12 h-12 action-prev aspect-square rounded-full border border-zinc-400 flex justify-center items-center disabled:opacity-60"
          >
            <HiOutlineArrowLongLeft />
          </button>
          <button
            aria-label="Button Next Client"
            className="action-next w-12 h-12 action-next aspect-square rounded-full border border-zinc-400 flex justify-center items-center disabled:opacity-60"
          >
            <HiOutlineArrowLongRight />
          </button>
        </div>
      </div>
      <p className="sr-only">
        Daftar klien yang telah menggunakan layanan undangan digital Bali dari
        Moment Invitation untuk berbagai acara spesial.
      </p>
    </section>
  );
};

export default ClientComponent;
