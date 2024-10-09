import React, { FC } from "react";
import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { afacad } from "@/lib/fonts";
import Image from "next/image";

const FooterComponent: FC = () => {
  return (
    <nav className={`p-6 ${afacad.className} relative`}>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <ul
        className="flex flex-col justify-center gap-2 items-center relative z-30"
        data-aos="zoom-in-up"
      >
        <li
          className={`flex items-center justify-center gap-2 text-base mt-2 text-white`}
        >
          <Link target="_blank" href="https://wa.me/+6281246768627">
            <AiOutlineWhatsApp />
          </Link>
          <Link target="_blank" href="https://instagram.com/moment">
            <AiOutlineInstagram />
          </Link>
          <Link target="_blank" href="mailto:moment.invitations@gmail.com">
            <AiOutlineMail />
          </Link>
        </li>
        <li className="font-semibold text-white text-base flex items-center gap-x-1 z-30 relative">
          <span className={`${afacad.className} text-xs font-light`}>
            Designed by
          </span>
          <div className="relative w-10 md:w-12 aspect-video">
            <Image
              alt="logo"
              fill
              className="object-cover"
              src="/logo-white.png"
              sizes="50px"
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default FooterComponent;
