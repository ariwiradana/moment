import React, { FC, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import Link from "next/link";
import { Client, ThemeCategory } from "@/lib/types";
import Image from "next/image";
import { BsCart, BsEye } from "react-icons/bs";
import { sosmedURLs } from "@/constants/sosmed";
import { formatToRupiah } from "@/utils/formatToRupiah";
import ButtonLight from "./elements/button.light";
import ButtonOutlinedLight from "./elements/button.outlined.white";
import ThemeShimmer from "./elements/theme.shimmer";

const ThemeComponent: FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[] | null>(null);
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);

  useSWR<{ data: ThemeCategory[] }>(`/api/_pb/_tc`, fetcher, {
    onSuccess: (data) => {
      if (data.data) {
        if (!activeCategoryId) {
          setActiveCategoryId(data.data[0].id);
        }
        setThemeCategories(data.data);
      }
    },
  });

  const { isLoading } = useSWR<{ data: Client[] }>(
    activeCategoryId ? `/api/_pb/_c?is_preview=true` : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          setClients(data.data);
        }
      },
      onError: () => {
        setClients([]);
      },
    }
  );

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
                Jelajahi pilihan tema undangan yang beragam dan dirancang untuk
                momen spesial Anda.
              </p>
            </div>
          </div>

          <div
            className="flex mt-4 gap-2 whitespace-nowrap overflow-x-auto"
            data-aos="fade-up"
          >
            {themeCategories.flatMap((tc) => {
              return (
                <button
                  onClick={() => {
                    setActiveCategoryId(tc.id);
                  }}
                  className={`py-2 lg:py-3 px-4 lg:px-6 ${
                    activeCategoryId === tc.id
                      ? "bg-white text-dashboard-dark border-white"
                      : "text-white border-white/50"
                  }  border transition-all ease-in-out duration-500 ${
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
            {isLoading ? (
              <>
                <ThemeShimmer />
                <ThemeShimmer />
                <ThemeShimmer />
                <ThemeShimmer />
              </>
            ) : (
              clients &&
              clients
                .filter(
                  (c) =>
                    c.theme_category_id === activeCategoryId && c.theme?.active
                )
                .map((c) => {
                  const message = `Halo, saya tertarik untuk memilih tema undangan ${c.theme_category?.name} ${c.theme_category?.name}`;
                  const whatsappLink = `${
                    sosmedURLs.whatsapp
                  }?text=${encodeURIComponent(message)}`;

                  return (
                    <div key={`Tema Undangan ${c.slug}`}>
                      <div className="aspect-square relative overflow-hidden group">
                        <Link
                          target="_blank"
                          aria-label={`Link Preview Undangan ${c.name}`}
                          href={`/${c.slug}`}
                          className="absolute inset-0 z-10 transition-all ease-in-out duration-500 group-hover:bg-dashboard-dark/80 flex justify-center items-center"
                        >
                          <ButtonLight
                            className="opacity-0 group-hover:opacity-100"
                            size="small"
                            title="Preview"
                            icon={<BsEye />}
                          />
                        </Link>
                        <Image
                          sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                          priority
                          fill
                          src={c.theme?.thumbnail || ""}
                          alt={`Tema Undangan ${c.name}`}
                          className="object-contain shine-dark group-hover:grayscale transition-all ease-in-out duration-500"
                        />
                      </div>
                      <div className="flex flex-col mt-2 md:mt-4">
                        <h5
                          className={`${redhat.className} text-lg text-white font-semibold mb-1 md:mb-2`}
                        >
                          {c.name}
                        </h5>
                        <p
                          className={`${redhat.className} text-xs text-white/70`}
                        >
                          Mulai dari
                        </p>
                        {c.package && (
                          <h6
                            className={`${redhat.className} text-lg text-white font-medium mb-2 md:mb-4 leading-6`}
                          >
                            {formatToRupiah(c.package.price)}
                          </h6>
                        )}
                        <Link href={whatsappLink} target="_blank">
                          <ButtonOutlinedLight
                            size="small"
                            title="Pesan Sekarang"
                            icon={<BsCart />}
                          />
                        </Link>
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ThemeComponent;
