import { comforta, montserrat } from "@/lib/fonts";
import React, { FC } from "react";
import { BiSolidFolderOpen } from "react-icons/bi";

interface Props {
  theme: string;
}
const ThemeNotFound: FC<Props> = (props) => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col bg-opacity-[97%] p-6">
      <BiSolidFolderOpen className="text-7xl mb-4" />
      <h1
        className={`text-3xl font-semibold mb-4 text-admin-hover-dark ${montserrat.className}`}
      >
        Theme Not Found
      </h1>
      <p
        className={`text-base lg:text-lg mb-8 text-gray-700 ${comforta.className}`}
      >
        The {props.theme} theme you&lsquo;re looking for does not exist or has
        been removed.
      </p>
    </div>
  );
};

export default ThemeNotFound;