import { afacad, montserrat } from "@/lib/fonts";
import Link from "next/link";
import React from "react";
import { TbGiftCardFilled } from "react-icons/tb";

const ClientNotFound = () => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col bg-admin-hover-dark p-6">
      <TbGiftCardFilled className="text-9xl mb-4 text-dashboard-primary" />
      <h1
        className={`mb-4 text-white text-3xl md:text-4xl flex flex-wrap gap-x-4 font-semibold ${montserrat.className}`}
      >
        Undangan Tidak Ditemukan
      </h1>
      <p
        className={`text-lg mb-8 text-white/50 ${afacad.className} max-w-screen-sm`}
      >
        Undangan yang Anda cari tidak ditemukan atau telah dihapus. Pastikan
        Anda memeriksa kembali atau informasi link yang dimasukkan.
      </p>
      <Link
        href="/"
        className={`text-dashboard-primary underline underline-offset-4 ${afacad.className}`}
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default ClientNotFound;
