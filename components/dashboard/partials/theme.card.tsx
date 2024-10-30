import { afacad, marcellus } from "@/lib/fonts";
import Link from "next/link";
import React, { FC } from "react";
import ButtonPrimary from "../elements/button.primary";
import { BiCalendarEvent, BiShowAlt } from "react-icons/bi";
import ImageShimmer from "@/components/image.shimmer";
import { Package } from "@/lib/types";
import { sosmedURLs } from "@/constants/sosmed";

interface Props {
  name: string;
  slug?: string;
  thumbnail: string;
  hasPreview?: boolean;
  category?: string;
  availablePackages?: Package[];
}

const ThemeCard: FC<Props> = ({
  name,
  slug,
  thumbnail,
  category,
  hasPreview = true,
  availablePackages,
}) => {
  const handleChooseTheme = (name: string, category: string) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ini:\n\n- Kategori: ${category}\n- Tema: ${name}`;
    const whatsappLink = `${sosmedURLs.whatsapp}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  };

  if (name)
    return (
      <div className="select-none py-8 lg:p-10 rounded group transition-all ease-in-out duration-1000 relative overflow-hidden border">
        <p className={`${afacad.className} text-xl text-center text-gray-500`}>
          {category && hasPreview ? `Undangan ${category}` : "Tema Undangan"}
        </p>

        <h1
          className={`${marcellus.className} text-2xl lg:text-4xl text-center text-dashboard-dark leading-8`}
        >
          {name}
        </h1>
        <div className="flex justify-center mt-3">
          <div className="flex gap-2">
            {availablePackages?.map((pk: Package) => (
              <p
                key={`package-${pk.id}`}
                className={`text-dashboard-dark bg-gray-200 rounded-full font-medium px-3 py-1 md:text-lg ${afacad.className}`}
              >
                {pk.name}
              </p>
            ))}
          </div>
        </div>
        <div className="w-full aspect-[3/3] relative transform group-hover:scale-[1.02] transition-transform delay-200 ease-in-out duration-500 mt-6">
          <ImageShimmer
            sizes="(max-width: 640px) 180px, (max-width: 768px) 220px, (max-width: 1024px) 260px, 260px"
            priority
            fill
            src={thumbnail as string}
            className="w-full h-full object-contain"
            alt={`theme-${name}`}
          />
        </div>
        <div className="flex justify-center gap-3">
          {hasPreview && (
            <>
              <div className="flex justify-center">
                <Link
                  aria-label={`${slug}-preview-link`}
                  href={`/${slug}`}
                  target="_blank"
                >
                  <ButtonPrimary
                    title="Preview"
                    size="small"
                    icon={<BiShowAlt />}
                  />
                </Link>
              </div>
              <div className="flex justify-center">
                <ButtonPrimary
                  onClick={() => handleChooseTheme(name, category as string)}
                  title="Pilih Tema"
                  size="small"
                  icon={<BiCalendarEvent />}
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
};

export default ThemeCard;
