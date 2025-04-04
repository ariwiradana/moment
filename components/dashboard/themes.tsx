import React, { FC, useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { Client, ThemeCategory } from "@/lib/types";
import ThemeShimmer from "./elements/theme.shimmer";
import ThemeCard from "./partials/theme.card";

const ThemeComponent: FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
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
    activeCategoryId
      ? `/api/_pb/_c?is_preview=true&theme_category_id=${activeCategoryId}&order=DESC`
      : null,
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
            className="mt-4 gap-2 whitespace-nowrap overflow-x-auto hidden"
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
            className="grid grid-cols-2 md:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-8 mt-8 lg:mt-11"
          >
            {isLoading ? (
              <>
                <ThemeShimmer />
                <ThemeShimmer />
                <ThemeShimmer />
                <ThemeShimmer />
              </>
            ) : (
              clients.map((client) => {
                return (
                  <ThemeCard
                    client={client}
                    key={`Tema Undangan ${client?.theme?.name}`}
                  />
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
