import React, { FC, useState, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { ThemeCategory, ThemeUsage } from "@/lib/types";
import ThemeShimmer from "./elements/theme.shimmer";
import ThemeCard from "./partials/theme.card";
import Head from "next/head";

const ThemeComponent: FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);
  const [themes, setThemes] = useState<ThemeUsage[]>([]);
  const [bestSeller, setBestSeller] = useState<string>("");
  const [newest, setNewest] = useState<string>("");

  const { isLoading } = useSWR<{ data: ThemeUsage[] }>(
    `/api/_pb/_th/_uc`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          const best = data.data.reduce((max, theme) =>
            theme.usage_count > max.usage_count ? theme : max
          );
          const newest = data.data.reduce((latest, theme) => {
            return new Date(theme.created_at as string) >
              new Date(latest.created_at as string)
              ? theme
              : latest;
          });
          setThemes(data.data);
          setBestSeller(best.slug);
          setNewest(newest?.slug);
        }
      },
      revalidateOnFocus: false,
    }
  );

  useSWR<{ data: ThemeCategory[] }>(`/api/_pb/_tc`, fetcher, {
    onSuccess: (data) => {
      if (data.data) {
        setThemeCategories(data.data);
        if (!activeCategoryId) setActiveCategoryId(data.data[0].id);
      }
    },
    revalidateOnFocus: false,
  });

  const displayedThemes = useMemo(() => themes, [themes]);
  const displayedCategories = useMemo(() => themeCategories, [themeCategories]);

  const jsonLdThemes = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: displayedThemes.map((theme, index) => ({
      "@type": "VideoObject",
      position: index + 1,
      name: theme.name,
      description:
        theme.description ||
        "Tema undangan digital Bali elegan dari Moment Invitation",
      thumbnailUrl: theme.phone_thumbnail,
      contentUrl: `/video/themes/${theme.slug}.mp4`,
      uploadDate: theme.created_at,
      publisher: {
        "@type": "Organization",
        name: "Moment Invitation",
      },
    })),
  };

  return (
    <section
      className="py-8 md:py-10 lg:py-16 bg-dashboard-dark select-none"
      id="section3"
    >
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdThemes) }}
        />
      </Head>
      <div className="px-4 md:px-12 lg:px-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full gap-x-8 gap-1">
            <h2
              className={`${redhat.className} text-2xl md:text-3xl lg:text-4xl whitespace-nowrap font-semibold text-white`}
            >
              Koleksi Tema <br />
              Undangan Kami
            </h2>
            <div className="h-[1px] w-full bg-white/10 hidden lg:block"></div>
            <p
              className={`${redhat.className} text-base text-white/70 md:max-w-[60vw] lg:max-w-[30vw] w-full lg:text-right`}
            >
              Jelajahi pilihan tema undangan digital Bali, minimalis, modern,
              dan elegan, untuk momen spesial Anda.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4 gap-2 whitespace-nowrap overflow-x-auto hidden">
          {displayedCategories.map((tc) => (
            <button
              aria-pressed={activeCategoryId === tc.id}
              key={tc.id}
              onClick={() => setActiveCategoryId(tc.id)}
              className={`py-2 lg:py-3 px-4 lg:px-6 border transition-all duration-500 ${
                redhat.className
              } text-sm lg:text-base font-medium ${
                activeCategoryId === tc.id
                  ? "bg-white text-dashboard-dark border-white"
                  : "text-white border-white/50"
              }`}
            >
              {tc.name}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-8 lg:mt-11">
          {isLoading
            ? Array.from({ length: 4 }).map((_, idx) => (
                <ThemeShimmer key={idx} />
              ))
            : displayedThemes.map((theme, index) => (
                <ThemeCard
                  key={theme.slug}
                  index={index}
                  bestSeller={bestSeller === theme.slug}
                  newest={newest === theme.slug}
                  theme={theme}
                />
              ))}
        </div>
      </div>
      <p className="sr-only">
        Tema undangan digital Bali, template undangan minimalis, tema undangan
        pernikahan dan mempandes online.
      </p>
    </section>
  );
};

export default React.memo(ThemeComponent);
