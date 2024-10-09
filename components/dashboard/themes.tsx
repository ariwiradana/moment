import React, { FC } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { dm } from "@/lib/fonts";
import { createSlug } from "@/utils/createSlug";
import ThemeCard from "./partials/theme.card";
import { Theme } from "@/lib/types";

const ThemeComponent: FC = () => {
  const { data } = useSWR("/api/themes", fetcher);

  const themes: Theme[] = data?.data || [];

  return (
    <section id="section3" className="section">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 py-24">
        <div className="flex justify-between items-center">
          <h1 className={`${dm.className} text-3xl text-dashboard-dark`}>
            Koleksi Tema
          </h1>
        </div>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {themes.length > 0 &&
            themes.map((t) => {
              const slug = createSlug(t.name);
              return (
                <ThemeCard
                  key={`theme-${t.slug}`}
                  name={t.name}
                  slug={slug}
                  thumbnail={t.thumbnail as string}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ThemeComponent;
