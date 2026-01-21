import React, { FC, useState, useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { redhat } from "@/lib/fonts";
import { ThemeCategory, ThemeUsage } from "@/lib/types";
import ThemeShimmer from "./elements/theme.shimmer";
import ThemeCard from "./partials/theme.card";
import Head from "next/head";

export const THEME_VIDEOS = new Set(["samaya", "aruna", "nirvaya"]);

const ThemeComponent: FC = () => {
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [themeCategories, setThemeCategories] = useState<ThemeCategory[]>([]);
  const [themes, setThemes] = useState<ThemeUsage[]>([]);
  const [bestSeller, setBestSeller] = useState<string>("");
  const [newest, setNewest] = useState<string>("");

  console.log({ themeCategories });

  const { isLoading } = useSWR<{ data: ThemeUsage[] }>(
    `/api/guest/themes/usage`,
    fetcher,
    {
      onSuccess: (data) => {
        if (data.data) {
          const best =
            data.data.length > 0
              ? data.data.reduce((max, theme) =>
                  theme.usage_count > max.usage_count ? theme : max,
                )
              : null;

          const bestTheme = best && best.usage_count > 0 ? best.slug : "";

          const newest = data.data.reduce((latest, theme) => {
            return new Date(theme.created_at as string) >
              new Date(latest.created_at as string)
              ? theme
              : latest;
          });
          setThemes(data.data);
          setBestSeller(bestTheme);
          setNewest(newest?.slug);
        }
      },
      revalidateOnFocus: false,
    },
  );

  useSWR<{ data: ThemeCategory[] }>(`/api/guest/theme-categories`, fetcher, {
    onSuccess: (data) => {
      if (data.data) {
        setThemeCategories(data.data);
        if (!activeCategoryId) setActiveCategoryId(data.data[0].id);
      }
    },
    revalidateOnFocus: false,
  });

  const displayedThemes = useMemo(() => themes, [themes]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Koleksi Tema Undangan Digital Moment Invitation",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: displayedThemes.map((theme, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `Tema Undangan Digital ${theme.name}`,
        description:
          theme.description ||
          `Tema undangan digital ${theme.name} dari Moment Invitation`,
        image: theme.phone_thumbnail,
        url: `https://momentinvitation.com/${theme.client_slug}`,
        sku: theme.slug,
        brand: {
          "@type": "Organization",
          name: "Moment Invitation",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          price: theme.start_from,
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/NewCondition",
        },
        ...(THEME_VIDEOS.has(theme.slug) && {
          video: {
            "@type": "VideoObject",
            name: theme.name,
            description:
              theme.description || `Video tema undangan digital ${theme.name}`,
            thumbnailUrl: theme.phone_thumbnail,
            contentUrl: `/video/themes/${theme.slug}.mp4`,
            uploadDate: theme.created_at,
            publisher: {
              "@type": "Organization",
              name: "Moment Invitation",
            },
          },
        }),
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <div className="px-4 md:px-12 lg:px-4 max-w-screen-xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center w-full gap-x-8 gap-1">
            <h2
              className={`${redhat.className} max-w-2xl w-full text-2xl md:text-3xl lg:text-4xl font-semibold text-white`}
            >
              Koleksi Tema Undangan Digital Bali
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
