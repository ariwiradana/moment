import React, { FC } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Autoplay, Pagination } from "swiper/modules";
import { afacad, dm } from "@/lib/fonts";
import Link from "next/link";
import { createSlug } from "@/utils/createSlug";
import ThemeCard from "./partials/theme.card";
import { Theme } from "@/lib/types";

const ThemeComponent: FC = () => {
  const { data } = useSWR("/api/themes", fetcher);

  const themes: Theme[] = data?.data || [];

  const slideThemes = themes && themes.length > 5 ? themes.slice(5) : themes;

  if (slideThemes.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 bg-zinc-50"
        id="section3"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24">
          <div data-aos="fade-up" className="flex justify-between items-center">
            <h1
              className={`${dm.className} text-2xl lg:text-4xl text-dashboard-dark`}
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
          <div className="mt-6" data-aos="fade-up" data-aos-delay="200">
            <Swiper
              autoplay
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              speed={1000}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
            >
              {slideThemes.map((t) => {
                const slug = createSlug(t.name);
                return (
                  <SwiperSlide key={slug} className="w-full mb-12 md:mb-6">
                    <ThemeCard
                      category={t.category as string}
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
