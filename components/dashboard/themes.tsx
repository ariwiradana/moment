import React, { FC } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Autoplay } from "swiper/modules";
import { afacad, dm } from "@/lib/fonts";
import Link from "next/link";
import { createSlug } from "@/utils/createSlug";
import ThemeCard from "./partials/theme.card";
import { Theme } from "@/lib/types";

const ThemeComponent: FC = () => {
  const { data } = useSWR("/api/themes", fetcher);

  const themes: Theme[] = data?.data || [];

  if (themes.length)
    return (
      <section className="py-24" id="section3">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex justify-between items-center">
            <h1
              className={`${dm.className} text-2xl lg:text-3xl text-dashboard-dark`}
            >
              Koleksi Tema
            </h1>
            <Link href="/tema">
              <div className="flex gap-x-2 items-center">
                <p className={`${afacad.className}`}>Semua Tema</p>
                <HiArrowLongRight />
              </div>
            </Link>
          </div>
          <div className="mt-6">
            <Swiper
              autoplay
              modules={[Autoplay]}
              spaceBetween={16}
              speed={2000}
              breakpoints={{
                0: {
                  slidesPerView: "auto",
                },
                640: {
                  slidesPerView: "auto",
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {themes.map((t) => {
                const slug = createSlug(t.name);
                return (
                  <SwiperSlide key={slug} className="max-w-[90%] md:max-w-full">
                    <ThemeCard
                      name={t.name}
                      slug={slug}
                      thumbnail={t.thumbnail as string}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    );
};

export default ThemeComponent;
