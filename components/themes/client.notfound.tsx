import { afacad, dm, } from "@/lib/fonts";
import Image from "next/image";
import React from "react";
import { BiSolidUserBadge } from "react-icons/bi";

const ClientNotFound = () => {
  return (
    <div className="text-center min-h-screen flex items-center justify-center flex-col bg-opacity-[97%] p-6">
      <BiSolidUserBadge className="text-7xl mb-4 text-dashboard-dark" />
      <h1
        className={`mb-8 text-dashboard-secondary text-4xl flex flex-wrap gap-x-4 ${dm.className}`}
      >
        Client{" "}
        <span className="flex items-center">
          N
          <span>
            <Image
              sizes="30px"
              className=""
              src="/icon.png"
              alt="font-moment"
              width={30}
              height={30}
            />
          </span>
          t
        </span>
        <span className="flex items-center">
          F
          <span>
            <Image
              sizes="30px"
              className=""
              src="/icon.png"
              alt="font-moment"
              width={30}
              height={30}
            />
          </span>
          und
        </span>
      </h1>
      <p className={`text-base mb-8 text-gray-700 ${afacad.className}`}>
        The client you&lsquo;re looking for does not exist or has been removed.
      </p>
    </div>
  );
};

export default ClientNotFound;
