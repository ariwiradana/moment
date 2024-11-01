import { afacad, marcellus } from "@/lib/fonts";
import Link from "next/link";
import React, { FC } from "react";
import { BiNews, BiPlayCircle } from "react-icons/bi";
import ImageShimmer from "@/components/image.shimmer";
import { Theme } from "@/lib/types";

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
          {showActions ? (
            <Link href={`/${theme.slug}`} target="_blank">
              <div className="w-full aspect-square relative transform group-hover:scale-[1.02] transition-transform delay-200 ease-in-out duration-500 rounded overflow-hidden">
                <ImageShimmer
                  sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                  priority
                  fill
                  src={theme.thumbnail as string}
                  className="w-full h-full object-cover"
                  alt={`theme-${theme.name}`}
                />
              </div>
            </Link>
          ) : (
            <div className="w-full aspect-square relative transform transition-transform delay-200 ease-in-out duration-500 rounded overflow-hidden">
              <ImageShimmer
                sizes="(max-width: 640px) 360px, (max-width: 768px) 480px, (max-width: 1024px) 720px, 720px"
                priority
                fill
                src={theme.thumbnail as string}
                className="w-full h-full object-cover"
                alt={`theme-${theme.name}`}
              />
            </div>
          )}
        </div>
        {showActions && (
          <div className="flex gap-2 absolute top-4 left-4">
            {theme.cover_video && (
              <div className="flex bg-dashboard-dark shadow-sm items-center gap-x-2 rounded font-medium px-3 py-2 text-white">
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  Video Cover
                </p>
                <BiPlayCircle />
              </div>
            )}

            {index === 0 && (
              <div className="flex bg-white shadow-sm items-center gap-x-2 rounded font-medium px-3 py-2 text-dashboard-dark">
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  Desain Baru
                </p>
                <BiNews />
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
          <p className={`${afacad.className} text-xl text-gray-500`}>
            {theme.category && showActions
              ? `Undangan ${theme.category}`
              : "Tema Undangan"}
          </p>
          <h1
            className={`${marcellus.className} text-2xl lg:text-4xl text-dashboard-dark leading-8`}
          >
            {theme.name}
          </h1>
          <div className="flex gap-2 mt-3">
            {theme.packages?.map((pk) => (
              <div
                key={`package-${pk.name}`}
                className="flex bg-gray-200 items-center gap-x-2 rounded font-medium px-3 py-2 text-dashboard-dark"
              >
                <p className={`text-xs md:text-sm ${afacad.className}`}>
                  {pk.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
};

export default ThemeCard;
