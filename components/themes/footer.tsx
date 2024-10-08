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
    <nav className={`p-6 ${afacad.className} bg-white relative z-20`}>
      <ul className="flex justify-center gap-2 items-center bg-white">
        <li className="font-semibold text-dashboard-dark text-base flex items-center gap-x-1">
          <div className="relative w-10 md:w-12 aspect-video">
            <Image
              alt="logo"
              fill
              className="object-cover"
              src="/logo.png"
              sizes="80px"
            />
          </div>
        </li>
        <li
          className={`flex items-center justify-center gap-2 text-base mt-2 text-dashboard-dark`}
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
      </ul>
    </nav>
  );
};

export default FooterComponent;
