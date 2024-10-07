import React, { FC } from "react";
import Link from "next/link";
import {
  AiOutlineFacebook,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { afacad } from "@/lib/fonts";
import Image from "next/image";

const FooterComponent: FC = () => {
  return (
    <nav className={`p-6 ${afacad.className} bg-white relative z-20`}>
      <ul className="flex flex-col gap-2 items-center bg-white">
        <li className="font-semibold text-dashboard-dark text-base flex items-center gap-x-1">
          <div className="relative w-12 md:w-16 aspect-video">
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
          <Link target="_blank" href="https://www.instagram.com/moment">
            <AiOutlineFacebook />
          </Link>
          <Link target="_blank" href="https://wa.me/+6281246768627">
            <AiOutlineWhatsApp />
          </Link>
          <Link target="_blank" href="mailto:moment.invitations@gmail.com">
            <AiOutlineMail />
          </Link>
          <Link
            target="_blank"
            href="http://www.youtube.com/@moment.invitations"
          >
            <AiOutlineYoutube />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FooterComponent;
