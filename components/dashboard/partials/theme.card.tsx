import { afacad, marcellus } from "@/lib/fonts";
import Link from "next/link";
import React, { FC } from "react";
import { BiNews, BiPlayCircle } from "react-icons/bi";
import ImageShimmer from "@/components/image.shimmer";
import { Package, Theme } from "@/lib/types";

interface Props {
  theme: Theme;
  showActions?: boolean;
  index?: number;
  className?: string;
}

const ThemeCard: FC<Props> = ({ theme, showActions = true, index = 0 }) => {
  if (theme.name)
    return (
      <div
        className={`select-none rounded group transition-all ease-in-out duration-1000 relative overflow-hidden flex flex-col h-full`}
      >
        <div>
          <Link href={`/${theme.slug}`} target="_blank">
            <div className="w-full aspect-square relative rounded overflow-hidden">
              <ImageShimmer
                sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                priority
                fill
                src={
                  (theme.thumbnail as string) ||
                  `https://placehold.co/600/png?font=afacad`
                }
                className="w-full h-full object-cover group-hover:scale-105 transition-transform delay-200 ease-in-out duration-500"
                alt={`theme-${theme.name}`}
              />
            </div>
          </Link>
        </div>
        {showActions && (
          <div className="flex gap-2 absolute top-4 left-4">
            {theme.cover_video && (
              <div className="flex bg-dashboard-dark shadow-sm items-center gap-x-2 rounded-full font-medium px-3 py-2 text-white">
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  Video Cover
                </p>
                <BiPlayCircle />
              </div>
            )}

            {[0].includes(index) && (
              <div className="flex bg-white shadow-sm items-center gap-x-2 rounded-full font-medium px-3 py-2 text-dashboard-dark">
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  Desain Baru
                </p>
                <BiNews />
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
          <p
            className={`${afacad.className} text-sm md:text-base uppercase flex text-gray-500`}
          >
            {theme.packages?.map((pk: Package, index) => (
              <p key={pk.name} className="flex items-center">
                {pk.name}
                {index !== (theme.packages as Package[])?.length - 1 && (
                  <div className="w-[3px] h-[3px] bg-gray-400 rounded-full mx-2"></div>
                )}
              </p>
            ))}
          </p>
          <h1
            className={`${marcellus.className} text-xl lg:text-2xl text-dashboard-dark leading-8 font-medium`}
          >
            {theme.name}
          </h1>
          <div className="flex gap-3 mt-2">
            {theme.theme_categories?.map((tc) => (
              <div
                key={`theme-category-${tc.name}`}
                className="flex bg-dashboard-dark/5 items-center gap-x-2 rounded-full font-medium px-3 py-2 text-dashboard-dark"
              >
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  {tc.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ThemeCard;
