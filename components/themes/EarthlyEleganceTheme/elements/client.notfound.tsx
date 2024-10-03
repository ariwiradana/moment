import { comforta, satisfy } from "@/lib/fonts";
import React from "react";

const ClientNotFound = () => {
  return (
    <div
      className={`bg-[url('/images/theme1/pattern2.png')] bg-cover bg-no-repeat`}
    >
      <div className="text-center min-h-screen flex items-center justify-center bg-admin-hover-dark flex-col bg-opacity-[97%] p-6">
        <h1
          className={`text-3xl font-semibold mb-4 text-theme1-gold ${satisfy.className}`}
        >
          Client Not Found
        </h1>
        <p
          className={`text-base lg:text-lg mb-8 text-white ${comforta.className}`}
        >
          The client you&lsquo;re looking for does not exist or has been removed.
        </p>
      </div>
    </div>
  );
};

export default ClientNotFound;
