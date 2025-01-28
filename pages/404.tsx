import { afacad, montserrat } from "@/lib/fonts";
import Image from "next/image";
import React, { FC } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";
import ButtonPrimary from "@/components/dashboard/elements/button.primary";

const NotFound: FC = () => {
  const router = useRouter();
  return (
    <div className="text-center min-h-dvh flex flex-col lg:flex-row items-center justify-center gap-20 p-6">
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
          Halaman Tidak Ditemukan
        </h1>
        <p
          className={`text-lg mb-8 text-admin-hover-dark/50 ${afacad.className} lg:max-w-md lg:text-left`}
        >
          Halaman yang Anda cari tidak ditemukan atau telah dihapus. Pastikan
          Anda memeriksa kembali atau informasi link yang dimasukkan.
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

export default NotFound;
