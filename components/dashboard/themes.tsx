import React, { FC, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import Link from "next/link";
import { Theme, ThemeCategory } from "@/lib/types";
import Image from "next/image";
import { BsCart, BsChevronDown } from "react-icons/bs";
import { sosmedURLs } from "@/constants/sosmed";
import { formatToRupiah } from "@/utils/formatToRupiah";

const ThemeComponent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategoryIds, setActiveCategoryIds] = useState<number[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);

  const { data: themeCategoriesResponse } = useSWR<{ data: ThemeCategory[] }>(
    `/api/_pb/_tc`,
    fetcher
  );

  const { isLoading } = useSWR<{ data: Theme[] }>(
    activeCategoryIds.length > 0
      ? `/api/_pb/_th?order=DESC&theme_category_id=${JSON.stringify(
          activeCategoryIds
        )}`
      : "/api/_pb/_th?order=DESC",
    fetcher,
    {
      onSuccess: (data) => {
        setThemes(data.data);
      },
    }
  );

  const themeCategories: ThemeCategory[] = themeCategoriesResponse?.data || [];

  if (themes.length > 0)
    return (
      <>
        <section
          data-aos="fade-up"
          className={`py-8 lg:py-16 md:py-10 bg-dashboard-dark select-none`}
          id="section3"
        >
          <div className="px-4 md:px-12 lg:px-4 max-w-screen-xl mx-auto ">
            <div
              data-aos="fade-up"
              className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
            >
              <div className="flex flex-col gap-1 lg:flex-row justify-between lg:items-center w-full gap-x-8">
                <h2
                  className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-white`}
                >
                  Koleksi Tema <br />
                  Undangan Kami
                </h2>
                <div className="h-[1px] w-full bg-white/10 hidden lg:block"></div>
                <p
                  className={`${redhat.className} text-sm text-white/70 md:max-w-[60vw] lg:max-w-[30vw] w-full lg:text-right`}
                >
                  Jelajahi pilihan tema undangan yang beragam dan dirancang
                  untuk momen spesial Anda.
                </p>
              </div>
            </div>

            <div className="flex mt-4 gap-2" data-aos="fade-up">
              <button
                onClick={() => setActiveCategoryIds([])}
                className={`py-2 lg:py-3 px-4 lg:px-6 ${
                  activeCategoryIds.length === 0
                    ? "bg-white text-dashboard-dark border-white"
                    : "text-white border-white/50"
                } rounded-full border transition-all ease-in-out duration-500 ${
                  redhat.className
                } text-xs lg:text-sm font-medium`}
              >
                Semua
              </button>
              {themeCategories.flatMap((tc) => {
                return (
                  <button
                    onClick={() => {
                      let newCategories = [...activeCategoryIds];
                      if (activeCategoryIds.includes(tc.id)) {
                        newCategories = newCategories.filter(
                          (c) => c !== tc.id
                        );
                      } else {
                        newCategories.push(tc.id);
                      }
                      setActiveCategoryIds(newCategories);
                    }}
                    className={`py-2 lg:py-3 px-4 lg:px-6 ${
                      activeCategoryIds.includes(tc.id)
                        ? "bg-white text-dashboard-dark border-white"
                        : "text-white border-white/50"
                    }  rounded-full border transition-all ease-in-out duration-500 ${
                      redhat.className
                    } text-xs lg:text-sm font-medium`}
                  >
                    {tc.name}
                  </button>
                );
              })}
            </div>

            <div
              data-aos="fade-up"
              className="grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-4 mt-8 lg:mt-11"
            >
              {isLoading
                ? Array(4)
                    .fill(0)
                    .map((_) => (
                      <div key={`Shimmer Tema Undangan ${_}`}>
                        <div className="w-full aspect-square bg-white/5 shine-dark"></div>
                        <div className="h-3 w-32 bg-white/5 mt-6 shine-dark"></div>
                        <div className="h-3 w-16 bg-white/5 mt-4 shine-dark"></div>
                        <div className="h-3 w-28 bg-white/5 mt-4 shine-dark"></div>
                        <div className="w-36 bg-white/5 mt-4 py-4 rounded-full shine-dark"></div>
                      </div>
                    ))
                : (isExpanded ? themes : themes.slice(0, 8)).map((t) => {
                    const message = `Halo, saya tertarik untuk memilih tema undangan ${t.name}`;
                    const whatsappLink = `${
                      sosmedURLs.whatsapp
                    }?text=${encodeURIComponent(message)}`;

                    return (
                      <Link
                        href={`/${t.slug}`}
                        target="_blank"
                        aria-label={`Link Preview Undangan ${t.name}`}
                        key={`Tema Undangan ${t.name}`}
                      >
                        <div
                          key={t.id}
                          className="aspect-square relative overflow-hidden"
                        >
                          <Image
                            sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                            priority
                            fill
                            src={t.thumbnail || ""}
                            alt={`Tema Undangan ${t.name}`}
                            className="object-contain shimmer"
                          />
                        </div>
                        <div className="flex flex-col mt-4">
                          <h5
                            className={`${redhat.className} text-lg text-white font-semibold mb-2`}
                          >
                            {t.name}
                          </h5>
                          <p
                            className={`${redhat.className} text-xs text-white/70`}
                          >
                            Mulai dari
                          </p>
                          {t.packages && (
                            <h6
                              className={`${redhat.className} text-lg text-white font-medium mb-3 md:mb-4 leading-6`}
                            >
                              {formatToRupiah(t.packages[0].price)}
                            </h6>
                          )}
                          <Link href={whatsappLink} target="_blank">
                            <button
                              className={`${redhat.className} justify-center text-xs transition-all ease-in-out duration-500 flex items-center gap-x-2 outline-none whitespace-nowrap rounded-full px-4 text-white bg-dashboard-dark py-2 border border-white/50 hover:bg-white hover:border-white hover:text-dashboard-dark`}
                            >
                              Pesan Sekarang
                              <BsCart />
                            </button>
                          </Link>
                        </div>
                      </Link>
                    );
                  })}
            </div>

            {!isExpanded && themes.length > 8 ? (
              <div
                className="flex justify-center mt-12"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <button
                  onClick={() => setIsExpanded((state) => !state)}
                  className={`${redhat.className} text-xs flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 text-white rounded-full px-4 py-2`}
                >
                  Tampilkan Semua Tema
                  <BsChevronDown />
                </button>
              </div>
            ) : null}
          </div>
        </section>
      </>
    );
};

export default ThemeComponent;
