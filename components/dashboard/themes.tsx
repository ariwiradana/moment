import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import Link from "next/link";
import { Theme, ThemeCategory } from "@/lib/types";
import Image from "next/image";
import { BsCart, BsChevronDown, BsEye, BsPlayCircleFill } from "react-icons/bs";
import { sosmedURLs } from "@/constants/sosmed";
import { formatToRupiah } from "@/utils/formatToRupiah";

const ThemeComponent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategoryIds, setActiveCategoryIds] = useState<number[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [filteredThemes, setFilteredThemes] = useState<Theme[]>([]);

  const { data: themeCategoriesResponse } = useSWR<{ data: ThemeCategory[] }>(
    `/api/_pb/_tc`,
    fetcher
  );

  useSWR<{ data: Theme[] }>("/api/_pb/_th?order=DESC", fetcher, {
    onSuccess: (data) => {
      setThemes(data.data);
      setFilteredThemes(data.data);
    },
  });

  const themeCategories: ThemeCategory[] = themeCategoriesResponse?.data || [];

  useEffect(() => {
    if (activeCategoryIds.length > 0) {
      const themesFiltered = themes.filter((item) =>
        item.theme_categories?.some((theme) =>
          activeCategoryIds.includes(theme.id)
        )
      );
      setFilteredThemes(themesFiltered);
    } else {
      setFilteredThemes(themes);
    }
  }, [themes, activeCategoryIds]);

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

            <div
              className="flex mt-4 gap-2"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button
                onClick={() => setActiveCategoryIds([])}
                className={`py-2 lg:py-3 px-4 lg:px-6 ${
                  activeCategoryIds.length === 0
                    ? "bg-white text-dashboard-dark border-white"
                    : "text-white bg-white/[0.01] border-white/50"
                }  rounded-full border transition-all ease-in-out duration-500 hover:bg-white hover:border-white hover:text-dashboard-dark ${
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
                    }  rounded-full border transition-all ease-in-out duration-500 hover:bg-white hover:border-white hover:text-dashboard-dark ${
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
              data-aos-delay="400"
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-8 lg:mt-11"
            >
              {(isExpanded ? filteredThemes : filteredThemes.slice(0, 8)).map(
                (t) => {
                  const message = `Halo, saya tertarik untuk memilih tema undangan ${t.name}`;
                  const whatsappLink = `${
                    sosmedURLs.whatsapp
                  }?text=${encodeURIComponent(message)}`;

                  return (
                    <div key={`Tema Undangan ${t.name}`}>
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
                        <div className="flex gap-2 absolute top-3 md:top-6 left-3 md:left-6">
                          {t.cover_video && (
                            <div className="flex bg-white shadow-sm items-center gap-x-2 rounded-full font-medium px-3 py-2 text-dashboard-dark">
                              <p className={`text-xs ${redhat.className}`}>
                                Video Cover
                              </p>
                              <BsPlayCircleFill className="text-xs" />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col p-3 md:p-6 bg-white">
                        <h5
                          className={`${redhat.className} text-lg text-dashboard-dark font-semibold mb-2`}
                        >
                          {t.name}
                        </h5>
                        <p
                          className={`${redhat.className} text-xs text-dashboard-dark/70`}
                        >
                          Mulai dari
                        </p>
                        {t.packages && (
                          <h6
                            className={`${redhat.className} text-lg text-dashboard-dark font-medium mb-2 md:mb-4 leading-6`}
                          >
                            {formatToRupiah(t.packages[0].price)}
                          </h6>
                        )}
                        <div className="flex gap-2 flex-wrap">
                          <Link
                            href={`/${t.slug}`}
                            className="w-full md:w-auto"
                            target="_blank"
                          >
                            <button
                              className={`${redhat.className} w-full md:w-auto justify-center text-xs transition-all ease-in-out duration-500 flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 text-dashboard-dark hover:bg-dashboard-dark hover:border-dashboard-dark hover:text-white py-2`}
                            >
                              Preview
                              <BsEye />
                            </button>
                          </Link>
                          <Link
                            href={whatsappLink}
                            className="w-full md:w-auto"
                            target="_blank"
                          >
                            <button
                              className={`${redhat.className} w-full md:w-auto justify-center text-xs transition-all ease-in-out duration-500 flex items-center gap-x-2 outline-none border whitespace-nowrap border-dashboard-dark rounded-full px-4 text-white bg-dashboard-dark py-2`}
                            >
                              Pesan Sekarang
                              <BsCart />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
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
