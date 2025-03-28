import React, { FC, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import Link from "next/link";
import { Theme, ThemeCategory } from "@/lib/types";
import Image from "next/image";
import { BsCart, BsChevronDown, BsEye } from "react-icons/bs";
import { sosmedURLs } from "@/constants/sosmed";

const ThemeComponent: FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);

  const { data: themeCategoriesResponse } = useSWR<{ data: ThemeCategory[] }>(
    `/api/_pb/_tc`,
    fetcher
  );

  useSWR<{ data: Theme[] }>(
    activeCategoryId
      ? `/api/_pb/_th?order=DESC&theme_category_id=${activeCategoryId}`
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
          className={`${
            themes.length > 8 ? "py-8" : "pt-8"
          } lg:py-16 md:py-10 bg-dashboard-dark select-none`}
          id="section3"
        >
          <div className="max-w-screen-xl mx-auto">
            <div
              className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center px-4 md:px-12 lg:px-0"
              data-aos="fade-up"
            >
              <div className="flex flex-col gap-1 lg:flex-row justify-between lg:items-center w-full gap-x-8">
                <h2
                  className={`${redhat.className} text-3xl lg:text-4xl whitespace-nowrap font-semibold text-white`}
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
              className="flex mt-4 gap-2 overflow-x-auto max-w-screen-xl mx-auto px-4 md:px-12 lg:px-0"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button
                onClick={() => setActiveCategoryId(null)}
                className={`py-2 lg:py-3 px-4 lg:px-6 ${
                  activeCategoryId === null
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
                    onClick={() => setActiveCategoryId(tc.id)}
                    className={`py-2 lg:py-3 px-4 lg:px-6 ${
                      activeCategoryId === tc.id
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8 lg:mt-11"
            >
              {(isExpanded ? themes : themes.slice(0, 8)).map((t) => {
                const message = `Halo, saya tertarik untuk memilih tema undangan ${name}`;
                const whatsappLink = `${
                  sosmedURLs.whatsapp
                }?text=${encodeURIComponent(message)}`;

                return (
                  <div
                    key={`Tema Undangan ${t.name}`}
                    className="bg-white/[0.02] px-4 lg:px-8 py-8 md:py-10 lg:py-12 group"
                  >
                    <div
                      key={t.id}
                      className="aspect-[3/4] relative overflow-hidden"
                    >
                      <Image
                        sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                        priority
                        fill
                        src={t.phone_thumbnail || ""}
                        alt={`Tema Undangan ${t.name}`}
                        className="object-contain shimmer"
                      />
                    </div>
                    <div className="flex flex-col items-center">
                      <p
                        className={`${redhat.className} text-sm text-white/70 mt-4`}
                      >
                        Tema
                      </p>
                      <h5
                        className={`${redhat.className} text-xl text-white font-medium mb-2`}
                      >
                        {t.name}
                      </h5>
                      <Link href={`/${t.slug}`} target="_blank">
                        <button
                          className={`${redhat.className} justify-center text-xs hover:bg-white/5 transition-all ease-in-out duration-500 flex items-center gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 text-white py-2`}
                        >
                          Preview
                          <BsEye />
                        </button>
                      </Link>
                      <Link href={whatsappLink} target="_blank">
                        <button
                          className={`${redhat.className} justify-center text-xs hover:bg-white/5 transition-all ease-in-out duration-500 flex items-center mt-3 gap-x-2 outline-none border whitespace-nowrap border-zinc-400 rounded-full px-4 text-white py-2`}
                        >
                          Pesan Sekarang
                          <BsCart />
                        </button>
                      </Link>
                    </div>
                  </div>
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
