import React from "react";
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

const ClientComponent = () => {
  const { data, isLoading } = useSWR("/api/_pb/_c?status=completed", fetcher);

  const clients: Client[] = data?.data || [];

  return (
    <section className="relative select-none bg-white pb-8 lg:pb-16">
      <div data-aos="fade-up">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-6">
            <div className="w-full aspect-square shimmer"></div>
            <div className="w-full aspect-square shimmer"></div>
            <div className="w-full aspect-square shimmer hidden md:block"></div>
            <div className="w-full aspect-square shimmer hidden 2xl:block"></div>
            <div className="w-full aspect-square shimmer hidden 4xl:block"></div>
            <div className="w-full aspect-square shimmer hidden 4xl:block"></div>
          </div>
        ) : (
          <div>
            <Swiper
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 3000,
              }}
              navigation={{
                nextEl: ".action-next",
                prevEl: ".action-prev",
              }}
              speed={1000}
              breakpoints={{
                0: {
                  slidesPerView: 2, // Mobile (small screens)
                },
                480: {
                  slidesPerView: 2, // Small mobile screens (e.g., older phones)
                },
                768: {
                  slidesPerView: 3, // Tablets
                },
                1440: {
                  slidesPerView: 4, // Large screens (e.g., desktops)
                },
                1920: {
                  slidesPerView: 6, // Extra-large screens (e.g., large TVs)
                },
              }}
              spaceBetween={0}
            >
              {clients.length > 0 &&
                clients.map((c) => (
                  <SwiperSlide key={`client-${c.id}`}>
                    <div className="aspect-square text-white relative">
                      <Image
                        sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, (max-width: 1024px) 720px, 720px"
                        src={
                          c.cover ||
                          `https://placehold.co/400/png?font=red-hat-display&text=${c.name.replaceAll(
                            " ",
                            "-"
                          )}`
                        }
                        alt={`Thumbnail undangan digital ${c.name}`}
                        fill
                        className="object-cover w-full h-full shimmer"
                      />
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>

      <div className="mt-4 md:mt-8 lg:mt-10 flex-col px-4 md:px-12 lg:px-4 lg:flex-row flex justify-between gap-2 max-w-screen-xl mx-auto">
        <h3
          data-aos="fade-up"
          data-aos-delay="200"
          className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-dashboard-dark`}
        >
          Klien Yang Telah
          <br />
          Menggunakan Jasa Kami
        </h3>
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className={`${redhat.className} text-base text-dashboard-dark/70`}
        >
          Beberapa klien yang mempercayakan momen penting mereka kepada kami
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex gap-3 mt-2 lg:mt-0"
        >
          <button
            aria-label="Button Previous Client"
            className="w-12 h-12 action-prev aspect-square rounded-full border border-zinc-400 flex justify-center items-center disabled:opacity-60"
          >
            <HiOutlineArrowLongLeft />
          </button>
          <button
            aria-label="Button Next Client"
            className="w-12 h-12 action-next aspect-square rounded-full border border-zinc-400 flex justify-center items-center disabled:opacity-60"
          >
            <HiOutlineArrowLongRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClientComponent;
