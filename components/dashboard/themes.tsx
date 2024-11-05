import React, { FC } from "react";
import { HiArrowLongRight } from "react-icons/hi2";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { afacad, dm } from "@/lib/fonts";
import Link from "next/link";
import ThemeCard from "./partials/theme.card";
import { Theme } from "@/lib/types";
import ButtonPrimary from "./elements/button.primary";
import { BiGridHorizontal } from "react-icons/bi";

const ThemeComponent: FC = () => {
  const { data } = useSWR("/api/_pb/_th?order=DESC", fetcher);

  const themes: Theme[] = data?.data || [];

  const slideThemes = themes && themes.length > 3 ? themes.slice(0, 3) : themes;

  if (slideThemes.length > 0)
    return (
      <section
        data-aos="fade-up"
        className="py-16 lg:py-24 bg-zinc-50 select-none"
        id="section3"
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 lg:px-24">
          <div
            className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            data-aos="fade-up"
          >
            <div>
              <h1
                className={`${dm.className} text-3xl md:text-4xl lg:text-5xl text-dashboard-dark font-semibold`}
              >
                Koleksi Tema Undangan
              </h1>
              <p
                className={`${afacad.className} text-gray-500 text-lg md:text-xl mt-3 lg:max-w-[70%]`}
              >
                Jelajahi berbagai tema undangan yang dirancang khusus untuk
                menyesuaikan dengan konsep acara Anda.
              </p>
            </div>
            <Link href="/tema" aria-label="all-theme-link">
              <div className="flex gap-x-2 items-center">
                <p
                  className={`${afacad.className} text-lg whitespace-nowrap font-medium`}
                >
                  Lihat Semua Tema
                </p>
                <HiArrowLongRight className="mt-1 text-xl" />
              </div>
            </Link>
          </div>

          <div
            data-aos="fade-up"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
          >
            {slideThemes.map((t, index) => {
              return (
                <div
                  key={t.id}
                  className={`${
                    index === slideThemes.length - 1 && "md:hidden lg:block"
                  }`}
                >
                  <ThemeCard index={index} theme={t} />
                </div>
              );
            })}
          </div>

          <div
            className="mt-8 flex justify-center md:hidden"
            data-aos="fade-up"
          >
            <Link href="/tema" aria-label="all-theme-link">
              <ButtonPrimary
                icon={<BiGridHorizontal />}
                title="Lihat Semua Tema"
                size="medium"
              />
            </Link>
          </div>
        </div>
      </section>
    );
};

export default ThemeComponent;
