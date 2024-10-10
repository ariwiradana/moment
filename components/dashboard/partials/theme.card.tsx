import { afacad, marcellus } from "@/lib/fonts";
import Link from "next/link";
import React, { FC } from "react";
import ButtonPrimary from "../elements/button.primary";
import { BiEditAlt, BiShowAlt } from "react-icons/bi";
import ImageShimmer from "@/components/image.shimmer";

interface Props {
  name: string;
  slug?: string;
  thumbnail: string;
  hasPreview?: boolean;
  category?: string;
}

const ThemeCard: FC<Props> = ({
  name,
  slug,
  thumbnail,
  category,
  hasPreview = true,
}) => {
  const handleChooseTheme = (name: string, category: string) => {
    const message = `Halo, saya tertarik untuk memilih tema undangan ini:\n\n- Kategori: ${category}\n- Tema: ${name}`;
    const whatsappLink = `https://wa.me/+6281246768627?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink);
  };

  return (
    <div className="select-none lg:p-8 rounded group transition-all ease-in-out duration-1000 relative overflow-hidden">
      {hasPreview && (
        <p className={`${afacad.className} text-center text-gray-500`}>
          {category && hasPreview ? `Undangan ${category}` : "Tema Undangan"}
        </p>
      )}
      <h1
        className={`${marcellus.className} text-2xl lg:text-3xl text-center text-dashboard-dark leading-8`}
      >
        {name}
      </h1>
      <div className="w-full aspect-[3/3] relative transform group-hover:scale-[1.02] transition-transform delay-200 ease-in-out duration-500 mt-6">
        <ImageShimmer
          priority
          fill
          src={thumbnail as string}
          className="w-full h-full object-contain"
          alt={`theme-${name}`}
        />
      </div>
      <div className="flex justify-center gap-3 mt-8">
        {hasPreview && (
          <>
            <div className="flex justify-center">
              <Link href={`/${slug}`} target="_blank">
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
                title="Pilih Design"
                size="small"
                icon={<BiEditAlt />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ThemeCard;
