import { afacad, marcellus } from "@/lib/fonts";
import Link from "next/link";
import React, { FC } from "react";
import ButtonPrimary from "../elements/button.primary";
import { BiShowAlt } from "react-icons/bi";
import Image from "next/image";

interface Props {
  name: string;
  slug?: string;
  thumbnail: string;
  hasPreview?: boolean;
}

const ThemeCard: FC<Props> = ({ name, slug, thumbnail, hasPreview = true }) => {
  return (
    <div className="bg-gray-50 p-10 lg:p-12 rounded group hover:bg-gray-100 transition-all ease-in-out duration-1000">
      <p className={`${afacad.className} text-center text-gray-400`}>
        Tema Undangan
      </p>
      <h1
        className={`${marcellus.className} text-2xl text-center text-dashboard-dark leading-7`}
      >
        {name}
      </h1>
      {hasPreview && (
        <div className="flex justify-center mt-4">
          <Link href={`/${slug}`} target="_blank">
            <ButtonPrimary
              title="Preview"
              size="extrasmall"
              icon={<BiShowAlt />}
            />
          </Link>
        </div>
      )}
      <div className="w-full h-96 lg:h-[400px] relative transform group-hover:scale-[1.02] transition-transform delay-200 ease-in-out duration-500 mt-6">
        <Image
          fill
          src={thumbnail as string}
          className="w-full h-full object-contain"
          alt={`theme-${name}`}
        />
      </div>
    </div>
  );
};

export default ThemeCard;
