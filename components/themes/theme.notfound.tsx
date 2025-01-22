import { afacad, montserrat } from "@/lib/fonts";
import Image from "next/image";
import React, { FC } from "react";
import ButtonPrimary from "../dashboard/elements/button.primary";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";

const ThemeNotFound: FC = () => {
  const router = useRouter();
  return (
    <div className="text-center min-h-screen flex flex-col lg:flex-row items-center justify-center gap-20 p-6">
      <Image
        alt="Not Found"
        src="/images/404.svg"
        width={0}
        height={0}
        className="w-full md:w-[70%] lg:w-[40%] h-auto"
      />
      <div>
        <h1
          className={`mb-4 text-admin-hover-dark text-center lg:text-left text-3xl md:text-4xl gap-x-4 font-semibold ${montserrat.className}`}
        >
          Tema Undangan Tidak Ditemukan
        </h1>
        <p
          className={`text-lg mb-8 text-admin-hover-dark/50 ${afacad.className} lg:max-w-md lg:text-left`}
        >
          Tema undangan yang Anda cari tidak ditemukan atau telah dihapus.
          Pastikan Anda memeriksa kembali atau informasi link yang dimasukkan.
        </p>
        <div className="flex justify-center lg:justify-start">
          <ButtonPrimary
            onClick={() => router.back()}
            title="Kembali"
            size="medium"
            icon={<IoArrowBack />}
          />
        </div>
      </div>
    </div>
  );
};

export default ThemeNotFound;
