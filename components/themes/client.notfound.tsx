import { comforta, montserrat } from "@/lib/fonts";
import React from "react";
import { BiSolidUserBadge } from "react-icons/bi";

const ClientNotFound = () => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col bg-opacity-[97%] p-6">
      <BiSolidUserBadge className="text-7xl mb-4"/>
      <h1
        className={`text-3xl font-semibold mb-4 text-admin-hover-dark ${montserrat.className}`}
      >
        Client Not Found
      </h1>
      <p
        className={`text-base lg:text-lg mb-8 text-gray-700 ${comforta.className}`}
      >
        The client you&lsquo;re looking for does not exist or has
        been removed.
      </p>
    </div>
  );
};

export default ClientNotFound;
