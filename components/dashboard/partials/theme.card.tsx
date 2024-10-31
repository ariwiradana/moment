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
        className={`select-none py-4 lg:p-10 rounded group transition-all ease-in-out duration-1000 relative overflow-hidden border flex flex-col justify-between h-full`}
      >
        <div>
          <p
            className={`${afacad.className} text-xl text-center text-gray-500`}
          >
            {theme.category && showActions
              ? `Undangan ${theme.category}`
              : "Tema Undangan"}
          </p>

          <h1
            className={`${marcellus.className} text-2xl lg:text-4xl text-center text-dashboard-dark leading-8`}
          >
            {theme.name}
          </h1>
          {showActions && (
            <div className="flex justify-center mt-3">
              <div className="flex gap-3">
                {theme.cover_video && (
                  <div className="flex bg-dashboard-dark items-center gap-x-2 rounded-full font-medium px-3 py-1 text-white">
                    <p className={`text-xs md:text-sm ${afacad.className}`}>
                      Video Cover
                    </p>
                    <BiPlayCircle />
                  </div>
                )}

                {[0, 1].includes(index) && (
                  <div className="flex bg-gray-200 items-center gap-x-2 rounded-full font-medium px-3 py-1 text-dashboard-dark">
                    <p className={`text-xs md:text-sm ${afacad.className}`}>
                      Desain Baru
                    </p>
                    <BiNews />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <div>
          {showActions ? (
            <Link href={`/${theme.slug}`} target="_blank">
              <div className="w-full aspect-[3/4.5] relative transform group-hover:scale-[1.02] transition-transform delay-200 ease-in-out duration-500 mt-8">
                <ImageShimmer
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 260px"
                  priority
                  fill
                  src={theme.thumbnail as string}
                  className="w-full h-full object-contain"
                  alt={`theme-${theme.name}`}
                />
              </div>
            </Link>
          ) : (
            <div className="w-full aspect-[3/4.5] relative transform transition-transform delay-200 ease-in-out duration-500 mt-8">
              <ImageShimmer
                sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 260px"
                priority
                fill
                src={theme.thumbnail as string}
                className="w-full h-full object-contain"
                alt={`theme-${theme.name}`}
              />
            </div>
          )}
        </div>
      </div>
    );
};

export default ThemeCard;
