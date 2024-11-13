import React from "react";
import { afacad, dm, marcellus } from "@/lib/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Client } from "@/lib/types";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

const ClientComponent = () => {
  const { data } = useSWR(
    "/api/_pb/_c?status=completed&is_preview=false",
    fetcher
  );

  const clients: Client[] = data?.data || [];

  if (clients.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 relative select-none"
        id="section5"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24 relative">
          <div data-aos="fade-up">
            <h2
              className={`${dm.className} text-4xl md:text-5xl lg:text-6xl font-bold`}
            >
              Klien Yang Telah
              <br />
              Menggunakan Jasa Kami
            </h2>
            <p
              className={`${afacad.className} text-lg md:text-xl mt-3 text-gray-500`}
            >
              Beberapa klien yang mempercayakan momen penting mereka kepada kami
            </p>
          </div>
          <div className="my-6 w-full" data-aos="fade-up">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
              }}
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              speed={1000}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
              spaceBetween={16}
            >
              {clients.length > 0 &&
                clients.map((c) => (
                  <SwiperSlide
                    key={`client-${c.id}`}
                    className="bg-dashboard-dark p-8 rounded aspect-square text-white relative mb-8"
                  >
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#000000ca]"></div>
                    <Image
                      sizes="(max-width: 640px) 320px, (max-width: 768px) 460px, (max-width: 1024px) 720px, 720px"
                      src={
                        c.cover ||
                        `https://placehold.co/400/png?font=playfair-display`
                      }
                      alt={`client-${c.id}`}
                      fill
                      className="object-cover w-full h-full rounded"
                    />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                      <h2
                        className={`w-full flex gap-2 ${marcellus.className} text-xl`}
                      >
                        <span className="line-clamp-1">
                          {c.name}
                        </span>
                      </h2>
                      <p
                        className={`font-light text-zinc-200 ${afacad.className}`}
                      >
                        Undangan {c.theme_category?.name}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default ClientComponent;
