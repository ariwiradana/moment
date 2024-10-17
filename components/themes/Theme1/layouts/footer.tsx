import React, { FC } from "react";
import Link from "next/link";
import {
  AiOutlineInstagram,
  AiOutlineMail,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { afacad } from "@/lib/fonts";
import Image from "next/image";
import { sosmedURLs } from "@/constants/sosmed";

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
          <Link
            aria-label="footer-whatsapp-link"
            target="_blank"
            href={sosmedURLs.whatsapp}
          >
            <AiOutlineWhatsApp />
          </Link>
          <Link
            aria-label="footer-instagram-link"
            target="_blank"
            href={sosmedURLs.instagram}
          >
            <AiOutlineInstagram />
          </Link>
          <Link
            aria-label="footer-email-link"
            target="_blank"
            href={sosmedURLs.email}
          >
            <AiOutlineMail />
          </Link>
          <Link
            aria-label="footer-youtube-link"
            target="_blank"
            href={sosmedURLs.youtube}
          >
            <AiOutlineYoutube />
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
