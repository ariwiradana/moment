import { afacad, marcellus } from "@/lib/fonts";
import React from "react";
import { HiUserGroup } from "react-icons/hi2";

const ClientNotFound = () => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col bg-dashboard-dark p-6">
      <HiUserGroup className="text-7xl mb-4 text-white" />
      <h1
        className={`mb-4 text-white text-4xl flex flex-wrap gap-x-4 ${marcellus.className}`}
      >
        Klien Tidak Ditemukan
      </h1>
      <p className={`text-base mb-8 text-white/50 ${afacad.className}`}>
        Klien yang Anda cari tidak ditemukan atau telah dihapus
      </p>
    </div>
  );
};

export default ClientNotFound;
